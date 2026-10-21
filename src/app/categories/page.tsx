'use client';

import React, { useState, useMemo, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  ALL_PLATFORMS,
  ALL_CATEGORIES,
  SEED_TRENDS,
  SUPPORTED_COUNTRIES,
  WORLD_REGIONS,
  getCountryFlag,
} from '@/data/seedTrends';
import { PlatformLogo, CategoryLogo } from '@/components/BrandIcons';
import OpportunityScoreBadge from '@/components/OpportunityScoreBadge';
import SparklineChart from '@/components/SparklineChart';
import { storage } from '@/lib/storage';
import {
  Sparkles,
  ArrowRight,
  TrendingUp,
  Flame,
  Search,
  ChevronRight,
  Globe,
  MapPin,
  Bookmark,
  Share2,
  Check,
  Layers,
  ArrowUpRight,
  Compass,
  SlidersHorizontal,
  RotateCcw,
  Eye,
  CheckCircle2,
} from 'lucide-react';

export default function CategoriesPage() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCountry, setSelectedCountry] = useState<string>('all');
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [selectedSpeed, setSelectedSpeed] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'all-categories' | 'focused-category' | 'by-country'>('all-categories');
  const [focusedCategory, setFocusedCategory] = useState<string>('Technology & AI');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<string>>(new Set());
  const [activeStickyCategory, setActiveStickyCategory] = useState<string>('');

  // Sync bookmarks
  useEffect(() => {
    const syncBookmarks = () => {
      const bmarks = storage.getBookmarks().map((b) => b.id);
      setBookmarkedIds(new Set(bmarks));
    };
    syncBookmarks();
    window.addEventListener('creator_trends_storage_updated', syncBookmarks);
    return () => window.removeEventListener('creator_trends_storage_updated', syncBookmarks);
  }, []);

  const handleBookmarkToggle = (trend: any) => {
    const isSaved = bookmarkedIds.has(trend.id);
    if (isSaved) {
      storage.removeBookmark(trend.id);
      const next = new Set(bookmarkedIds);
      next.delete(trend.id);
      setBookmarkedIds(next);
    } else {
      storage.addBookmark(trend);
      const next = new Set(bookmarkedIds);
      next.add(trend.id);
      setBookmarkedIds(next);
    }
  };

  const handleShare = async (trendId: string) => {
    const shareUrl = `${window.location.origin}/trends/${trendId}`;
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(shareUrl);
      setCopiedId(trendId);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  // Scroll to category section smoothly
  const scrollToCategory = (categoryName: string) => {
    setActiveStickyCategory(categoryName);
    if (viewMode !== 'all-categories') {
      setViewMode('all-categories');
    }
    setTimeout(() => {
      const el = document.getElementById(`category-section-${categoryName.replace(/\s+/g, '-').toLowerCase()}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 50);
  };

  // Filter trends based on current controls
  const filteredTrends = useMemo(() => {
    return SEED_TRENDS.filter((trend) => {
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = trend.title.toLowerCase().includes(q);
        const matchDesc = trend.description.toLowerCase().includes(q);
        const matchCat = trend.category.toLowerCase().includes(q);
        const matchCountry = trend.country.toLowerCase().includes(q) || trend.countryCode.toLowerCase().includes(q);
        const matchTags = trend.relatedHashtags.some((h) => h.toLowerCase().includes(q));
        const matchKeywords = trend.relatedKeywords.some((k) => k.toLowerCase().includes(q));
        if (!matchTitle && !matchDesc && !matchCat && !matchCountry && !matchTags && !matchKeywords) {
          return false;
        }
      }

      // Country
      if (selectedCountry !== 'all') {
        const matchC =
          trend.country.toLowerCase() === selectedCountry.toLowerCase() ||
          trend.countryCode.toLowerCase() === selectedCountry.toLowerCase();
        if (!matchC) return false;
      }

      // Region
      if (selectedRegion !== 'all') {
        if (!trend.region || trend.region.toLowerCase() !== selectedRegion.toLowerCase()) {
          // Check if country matches region
          const countryMatch = SUPPORTED_COUNTRIES.find(
            (c) => c.name.toLowerCase() === trend.country.toLowerCase() || c.code.toLowerCase() === trend.countryCode.toLowerCase()
          );
          if (!countryMatch || countryMatch.region.toLowerCase() !== selectedRegion.toLowerCase()) {
            return false;
          }
        }
      }

      // Growth Speed
      if (selectedSpeed === 'breakout' && trend.growthPercentage < 150) return false;
      if (selectedSpeed === 'explosive' && trend.growthPercentage < 240) return false;

      return true;
    });
  }, [searchQuery, selectedCountry, selectedRegion, selectedSpeed]);

  // Category statistics map
  const categoryStats = useMemo(() => {
    const stats: Record<
      string,
      {
        total: number;
        avgScore: number;
        maxGrowth: number;
        countries: { name: string; flag: string }[];
      }
    > = {};

    ALL_CATEGORIES.forEach((cat) => {
      const inCat = SEED_TRENDS.filter((t) => t.category.toLowerCase() === cat.toLowerCase());
      const maxGrowth = inCat.reduce((max, t) => Math.max(max, t.growthPercentage), 0);
      const avgScore = inCat.length
        ? Math.round(inCat.reduce((acc, t) => acc + t.opportunityScore, 0) / inCat.length)
        : 0;

      const seenCountries = new Set<string>();
      const countryList: { name: string; flag: string }[] = [];
      inCat.forEach((t) => {
        if (!seenCountries.has(t.countryCode)) {
          seenCountries.add(t.countryCode);
          countryList.push({ name: t.country, flag: getCountryFlag(t.countryCode || t.country) });
        }
      });

      stats[cat] = {
        total: inCat.length,
        avgScore,
        maxGrowth,
        countries: countryList,
      };
    });

    return stats;
  }, []);

  const resetAllFilters = () => {
    setSearchQuery('');
    setSelectedCountry('all');
    setSelectedRegion('all');
    setSelectedSpeed('all');
  };

  const hasActiveFilters = searchQuery !== '' || selectedCountry !== 'all' || selectedRegion !== 'all' || selectedSpeed !== 'all';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* ============================================================== */}
      {/* 1. HERO HEADER SECTION */}
      {/* ============================================================== */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-900/20 via-slate-900 to-slate-950 border border-purple-500/20 p-6 sm:p-10 text-white shadow-2xl">
        <div className="absolute -right-20 -top-20 w-80 h-80 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-cyan-600/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-4 max-w-4xl">
          {/* Live Global Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold text-purple-200">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
            <Globe className="w-4 h-4 text-cyan-400" />
            <span>Worldwide Category Intelligence • 18 Niches • {SEED_TRENDS.length} Exact Live Topics Ingested</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight">
            Exact Trending Topics <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-cyan-400 to-pink-400">
              From All Categories All Over The World.
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
            Explore live, verified breakout content across North America, Asia-Pacific, Europe, Latin America, and the Middle East.
            Seamlessly organized into 18 creator niches so you can spot what&apos;s surging globally before it hits your local feeds.
          </p>

          {/* Quick Stats Grid Banner */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-white/10">
            <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
              <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">Total Categories</span>
              <span className="text-xl sm:text-2xl font-black text-white">18 Niches</span>
            </div>
            <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
              <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">Global Markets</span>
              <span className="text-xl sm:text-2xl font-black text-cyan-300">14+ Sovereign</span>
            </div>
            <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
              <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">Top Surging Niche</span>
              <span className="text-xl sm:text-2xl font-black text-emerald-400">+340% Peak</span>
            </div>
            <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
              <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">AI Studio Ready</span>
              <span className="text-xl sm:text-2xl font-black text-purple-300">1-Click Hooks</span>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* 2. NAVIGATION BAR & VIEW SWITCHER */}
      {/* ============================================================== */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
        {/* View Switcher Tabs */}
        <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800/80 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-700/80">
          <button
            onClick={() => setViewMode('all-categories')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              viewMode === 'all-categories'
                ? 'bg-purple-600 text-white shadow-md'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Browse All 18 Categories</span>
          </button>

          <button
            onClick={() => setViewMode('focused-category')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              viewMode === 'focused-category'
                ? 'bg-purple-600 text-white shadow-md'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Category Deep Dive</span>
          </button>

          <button
            onClick={() => setViewMode('by-country')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              viewMode === 'by-country'
                ? 'bg-purple-600 text-white shadow-md'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>By Country Hub</span>
          </button>
        </div>

        {/* Search Bar Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search exact topics, keywords, hashtags, or country..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* ============================================================== */}
      {/* 3. WORLDWIDE COUNTRY & REGION FILTER BAR */}
      {/* ============================================================== */}
      <div className="space-y-3 bg-slate-50/80 dark:bg-slate-900/50 p-4 sm:p-5 rounded-3xl border border-slate-200/80 dark:border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <span className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
            <Globe className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            <span>Filter by World Market:</span>
          </span>

          {hasActiveFilters && (
            <button
              onClick={resetAllFilters}
              className="text-xs text-purple-600 dark:text-purple-400 font-bold hover:underline flex items-center gap-1 self-start sm:self-auto"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset All Filters</span>
            </button>
          )}
        </div>

        {/* Country Selector Pills Ribbon */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <button
            onClick={() => setSelectedCountry('all')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
              selectedCountry === 'all'
                ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 border-slate-900 dark:border-white shadow-sm'
                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-purple-300'
            }`}
          >
            <span>🌐</span>
            <span>All Worldwide ({SEED_TRENDS.length})</span>
          </button>

          {SUPPORTED_COUNTRIES.filter((c) => c.code !== 'GL').map((country) => {
            const count = SEED_TRENDS.filter(
              (t) =>
                t.country.toLowerCase() === country.name.toLowerCase() ||
                t.countryCode.toLowerCase() === country.code.toLowerCase()
            ).length;
            const isSelected = selectedCountry.toLowerCase() === country.name.toLowerCase();

            return (
              <button
                key={country.code}
                onClick={() => setSelectedCountry(isSelected ? 'all' : country.name)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
                  isSelected
                    ? 'bg-purple-600 text-white border-purple-600 shadow-sm scale-105'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-purple-300'
                }`}
              >
                <span>{country.flag}</span>
                <span>{country.name}</span>
                <span className="text-[10px] opacity-75 font-normal">({count})</span>
              </button>
            );
          })}
        </div>

        {/* Speed / Velocity Filter Badges */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-200/60 dark:border-slate-800">
          <span className="text-[11px] font-semibold text-slate-400">Velocity Surge:</span>
          <button
            onClick={() => setSelectedSpeed('all')}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold ${
              selectedSpeed === 'all'
                ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700'
            }`}
          >
            All Speeds
          </button>
          <button
            onClick={() => setSelectedSpeed('breakout')}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1 ${
              selectedSpeed === 'breakout'
                ? 'bg-rose-600 text-white'
                : 'bg-white dark:bg-slate-800 text-rose-600 dark:text-rose-400 border border-slate-200 dark:border-slate-700'
            }`}
          >
            <Flame className="w-3 h-3" />
            <span>Breakout (&gt;150% surge)</span>
          </button>
          <button
            onClick={() => setSelectedSpeed('explosive')}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1 ${
              selectedSpeed === 'explosive'
                ? 'bg-emerald-600 text-white'
                : 'bg-white dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 border border-slate-200 dark:border-slate-700'
            }`}
          >
            <TrendingUp className="w-3 h-3" />
            <span>Explosive (&gt;240% surge)</span>
          </button>
        </div>
      </div>

      {/* ============================================================== */}
      {/* 4. UNIQUE 18-CATEGORY MATRIX NAVIGATOR CARDS */}
      {/* ============================================================== */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            <h2 className="text-lg font-black text-slate-900 dark:text-white">
              Category Navigator ({ALL_CATEGORIES.length} Niches)
            </h2>
          </div>
          <span className="text-xs text-slate-400">Click any category to jump or inspect</span>
        </div>

        {/* 18 Category Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {ALL_CATEGORIES.map((cat) => {
            const stats = categoryStats[cat] || { total: 0, avgScore: 0, maxGrowth: 0, countries: [] };
            const isActive =
              viewMode === 'focused-category'
                ? focusedCategory === cat
                : activeStickyCategory === cat;

            return (
              <button
                key={cat}
                onClick={() => {
                  if (viewMode === 'focused-category') {
                    setFocusedCategory(cat);
                  } else {
                    scrollToCategory(cat);
                  }
                }}
                className={`p-3.5 rounded-2xl border text-left transition-all relative overflow-hidden group flex flex-col justify-between ${
                  isActive
                    ? 'bg-purple-50 dark:bg-purple-950/60 border-purple-500 shadow-md ring-2 ring-purple-500/20'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-purple-300 dark:hover:border-purple-700 hover:shadow-sm'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <CategoryLogo category={cat} size="sm" showBackground />
                    <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-1.5 py-0.5 rounded-md">
                      +{stats.maxGrowth}%
                    </span>
                  </div>

                  <h3 className="font-extrabold text-xs text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors line-clamp-1">
                    {cat}
                  </h3>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 block mt-0.5">
                    {stats.total} {stats.total === 1 ? 'topic' : 'topics'}
                  </span>
                </div>

                {/* Country Flags in this Category */}
                <div className="flex items-center gap-1 mt-3 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400">Markets:</span>
                  <div className="flex items-center gap-0.5">
                    {stats.countries.slice(0, 4).map((c, i) => (
                      <span key={i} title={c.name} className="text-xs">
                        {c.flag}
                      </span>
                    ))}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ============================================================== */}
      {/* 5. VIEW MODE A: BROWSE ALL 18 CATEGORIES (CATEGORIZED FEED) */}
      {/* ============================================================== */}
      {viewMode === 'all-categories' && (
        <div className="space-y-12">
          {ALL_CATEGORIES.map((cat) => {
            const inCat = filteredTrends.filter((t) => t.category.toLowerCase() === cat.toLowerCase());
            const catStat = categoryStats[cat];

            if (inCat.length === 0 && hasActiveFilters) return null;

            return (
              <section
                key={cat}
                id={`category-section-${cat.replace(/\s+/g, '-').toLowerCase()}`}
                className="scroll-mt-24 p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6"
              >
                {/* Category Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-3.5">
                    <CategoryLogo category={cat} size="lg" showBackground />
                    <div>
                      <div className="flex items-center flex-wrap gap-2">
                        <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                          {cat}
                        </h2>
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-purple-100 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300">
                          {inCat.length} Active Worldwide {inCat.length === 1 ? 'Topic' : 'Topics'}
                        </span>
                        <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                          <TrendingUp className="w-3.5 h-3.5" />
                          Up to +{catStat?.maxGrowth}% Surge
                        </span>
                      </div>

                      {/* Markets Included */}
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-slate-400">Trending in:</span>
                        <div className="flex items-center gap-1.5">
                          {catStat?.countries.map((c, i) => (
                            <span
                              key={i}
                              className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md"
                            >
                              <span>{c.flag}</span>
                              <span>{c.name}</span>
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setFocusedCategory(cat);
                        setViewMode('focused-category');
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-50 dark:bg-purple-950/60 hover:bg-purple-100 text-purple-700 dark:text-purple-300 text-xs font-bold transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Deep Dive</span>
                    </button>

                    <Link
                      href={`/trends?category=${encodeURIComponent(cat)}`}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold hover:bg-slate-200 transition-colors"
                    >
                      <span>Full Feed</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* Topics Grid */}
                {inCat.length === 0 ? (
                  <div className="py-8 text-center bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800">
                    <p className="text-xs text-slate-400">
                      No active topics found for this filter criteria in {cat}.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {inCat.map((trend) => (
                      <div
                        key={trend.id}
                        className="p-5 rounded-2xl bg-slate-50/80 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 hover:border-purple-400 dark:hover:border-purple-600 hover:shadow-lg transition-all flex flex-col justify-between group"
                      >
                        <div>
                          {/* Top Badges: Country + Platform + Score */}
                          <div className="flex items-center justify-between gap-2 mb-3">
                            <div className="flex items-center gap-1.5">
                              {/* Country Flag Badge */}
                              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-900 px-2 py-0.5 rounded-lg border border-slate-200 dark:border-slate-700 shadow-2xs">
                                <span>{getCountryFlag(trend.countryCode || trend.country)}</span>
                                <span>{trend.country}</span>
                              </span>

                              {/* Platform Badge */}
                              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-900 px-2 py-0.5 rounded-lg border border-slate-200 dark:border-slate-700 capitalize">
                                <PlatformLogo platform={trend.platform} size="xs" />
                                <span>{trend.platform}</span>
                              </span>
                            </div>

                            <OpportunityScoreBadge score={trend.opportunityScore} size="sm" />
                          </div>

                          {/* Title */}
                          <Link href={`/trends/${trend.id}`}>
                            <h3 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors line-clamp-2 leading-snug">
                              {trend.title}
                            </h3>
                          </Link>

                          {/* Description */}
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                            {trend.description}
                          </p>

                          {/* Top Viral Hashtags */}
                          <div className="flex flex-wrap items-center gap-1.5 mt-3">
                            {trend.relatedHashtags.slice(0, 3).map((tag) => (
                              <span
                                key={tag}
                                className="text-[10px] font-medium text-slate-600 dark:text-slate-400 bg-white dark:bg-slate-900 px-2 py-0.5 rounded-md border border-slate-200/60 dark:border-slate-700/60"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Bottom Stats & Action Buttons */}
                        <div className="mt-4 pt-3.5 border-t border-slate-200/80 dark:border-slate-700/80">
                          <div className="flex items-center justify-between text-xs mb-3">
                            <div>
                              <span className="text-[10px] text-slate-400 block uppercase font-medium">Search Volume</span>
                              <span className="font-black text-slate-900 dark:text-white text-sm">
                                {trend.searchVolumeFormatted}
                              </span>
                            </div>

                            <div className="text-right">
                              <span className="text-[10px] text-slate-400 block uppercase font-medium">Growth Velocity</span>
                              <span className="font-black text-emerald-600 dark:text-emerald-400 text-sm flex items-center justify-end gap-0.5">
                                <TrendingUp className="w-3.5 h-3.5" />
                                +{trend.growthPercentage}%
                              </span>
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="grid grid-cols-2 gap-2">
                            <Link
                              href={`/generator?trend=${encodeURIComponent(trend.title)}&platform=${trend.platform}&category=${encodeURIComponent(trend.category)}`}
                              className="px-2.5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                            >
                              <Sparkles className="w-3.5 h-3.5" />
                              <span>AI Ideas</span>
                            </Link>

                            <Link
                              href={`/trends/${trend.id}`}
                              className="px-2.5 py-2 rounded-xl bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs flex items-center justify-center gap-1 transition-colors"
                            >
                              <span>Intel Deep Dive</span>
                              <ChevronRight className="w-3.5 h-3.5" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </section>
            );
          })}
        </div>
      )}

      {/* ============================================================== */}
      {/* 6. VIEW MODE B: CATEGORY DEEP DIVE FOCUS MODE */}
      {/* ============================================================== */}
      {viewMode === 'focused-category' && (
        <div className="space-y-8">
          {/* Active Focused Category Spotlight Card */}
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-purple-900/10 via-slate-900/40 to-cyan-900/10 border border-purple-500/20 shadow-md">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <CategoryLogo category={focusedCategory} size="lg" showBackground />
                <div>
                  <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                    {focusedCategory} Deep Dive
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Viewing all worldwide trending opportunities detected in {focusedCategory}.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <select
                  value={focusedCategory}
                  onChange={(e) => setFocusedCategory(e.target.value)}
                  className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-bold outline-none"
                >
                  {ALL_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Topics under this focused category */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
              {SEED_TRENDS.filter((t) => t.category.toLowerCase() === focusedCategory.toLowerCase()).map((trend) => (
                <div
                  key={trend.id}
                  className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-lg">
                        <span>{getCountryFlag(trend.countryCode || trend.country)}</span>
                        <span>{trend.country}</span>
                      </span>

                      <OpportunityScoreBadge score={trend.opportunityScore} size="sm" />
                    </div>

                    <Link href={`/trends/${trend.id}`}>
                      <h3 className="font-extrabold text-base text-slate-900 dark:text-white hover:text-purple-600 transition-colors line-clamp-2">
                        {trend.title}
                      </h3>
                    </Link>

                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 line-clamp-3 leading-relaxed">
                      {trend.description}
                    </p>

                    {/* Top Queries with % */}
                    <div className="mt-4 space-y-1.5">
                      <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">
                        Fastest Rising Queries:
                      </span>
                      {trend.relatedQueries.slice(0, 2).map((q, i) => (
                        <div key={i} className="flex items-center justify-between text-xs bg-slate-50 dark:bg-slate-800/60 p-1.5 rounded-lg">
                          <span className="text-slate-700 dark:text-slate-300 truncate max-w-[200px] text-[11px]">&quot;{q.query}&quot;</span>
                          <span className="text-emerald-600 font-bold text-[10px]">{q.growth}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-400 block uppercase">Monthly Demand</span>
                      <strong className="text-slate-900 dark:text-white text-sm">{trend.searchVolumeFormatted}</strong>
                    </div>

                    <Link
                      href={`/generator?trend=${encodeURIComponent(trend.title)}&platform=${trend.platform}&category=${encodeURIComponent(trend.category)}`}
                      className="px-3 py-1.5 rounded-xl bg-purple-600 text-white font-bold text-xs flex items-center gap-1 hover:bg-purple-700 shadow-sm"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Create Pack</span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 7. VIEW MODE C: BY GLOBAL MARKET / COUNTRY HUB */}
      {/* ============================================================== */}
      {viewMode === 'by-country' && (
        <div className="space-y-10">
          <div className="p-6 rounded-3xl bg-slate-900 text-white border border-slate-800">
            <h2 className="text-2xl font-black">Worldwide Sovereign Markets Explorer</h2>
            <p className="text-xs text-slate-400 mt-1">
              Select a sovereign nation to view its dominant trending topics, categorized across creator niches.
            </p>
          </div>

          {SUPPORTED_COUNTRIES.filter((c) => c.code !== 'GL').map((country) => {
            const countryTrends = SEED_TRENDS.filter(
              (t) =>
                t.country.toLowerCase() === country.name.toLowerCase() ||
                t.countryCode.toLowerCase() === country.code.toLowerCase()
            );

            if (countryTrends.length === 0) return null;

            return (
              <section
                key={country.code}
                className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6"
              >
                <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{country.flag}</span>
                    <div>
                      <h3 className="text-xl font-black text-slate-900 dark:text-white">
                        Trending in {country.name}
                      </h3>
                      <p className="text-xs text-slate-400">
                        {countryTrends.length} verified topics across {new Set(countryTrends.map((t) => t.category)).size} categories
                      </p>
                    </div>
                  </div>

                  <Link
                    href={`/global?country=${encodeURIComponent(country.name)}`}
                    className="text-xs font-bold text-purple-600 dark:text-purple-400 hover:underline flex items-center gap-1"
                  >
                    <span>Full radar</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {countryTrends.map((trend) => (
                    <div
                      key={trend.id}
                      className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300">
                            {trend.category}
                          </span>
                          <OpportunityScoreBadge score={trend.opportunityScore} size="sm" />
                        </div>

                        <Link href={`/trends/${trend.id}`}>
                          <h4 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white hover:text-purple-600 transition-colors line-clamp-2">
                            {trend.title}
                          </h4>
                        </Link>

                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 line-clamp-2">
                          {trend.description}
                        </p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs">
                        <div>
                          <span className="text-[10px] text-slate-400 block uppercase">Monthly Searches</span>
                          <strong className="text-slate-900 dark:text-white">{trend.searchVolumeFormatted}</strong>
                        </div>
                        <Link
                          href={`/generator?trend=${encodeURIComponent(trend.title)}&platform=${trend.platform}&category=${encodeURIComponent(trend.category)}`}
                          className="px-2.5 py-1.5 rounded-lg bg-purple-600 text-white font-bold text-xs"
                        >
                          Generate
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      )}
    </div>
  );
}
