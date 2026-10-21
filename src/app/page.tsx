'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { SEED_TRENDS, ALL_CATEGORIES, ALL_PLATFORMS, getCountryFlag } from '@/data/seedTrends';
import TrendCard, { PlatformIconBadge } from '@/components/TrendCard';
import { PlatformLogo, CategoryLogo } from '@/components/BrandIcons';
import OpportunityScoreBadge from '@/components/OpportunityScoreBadge';
import {
  Search,
  Sparkles,
  TrendingUp,
  Globe2,
  ArrowRight,
  Flame,
  Zap,
  BarChart3,
  Calendar,
  Layers,
  CheckCircle2,
  Plus,
  Compass,
  ChevronRight,
} from 'lucide-react';

export default function HomePage() {
  const router = useRouter();
  const [heroSearch, setHeroSearch] = useState('');
  const [customCategories, setCustomCategories] = useState<string[]>([]);
  const [newCatInput, setNewCatInput] = useState('');
  const [showAddCatModal, setShowAddCatModal] = useState(false);
  const [categoryTab, setCategoryTab] = useState<string>('youtube');
  const [categoryMode, setCategoryMode] = useState<'platforms' | 'niches'>('platforms');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (heroSearch.trim()) {
      router.push(`/search?q=${encodeURIComponent(heroSearch.trim())}`);
    } else {
      router.push('/trends');
    }
  };

  const handleAddCustomCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCatInput.trim() && !ALL_CATEGORIES.includes(newCatInput.trim())) {
      setCustomCategories([...customCategories, newCatInput.trim()]);
      setNewCatInput('');
      setShowAddCatModal(false);
    }
  };

  const featuredTrends = SEED_TRENDS.slice(0, 6);

  // Category color mapping
  const categoryGradients: Record<string, string> = {
    'Technology & AI': 'from-purple-500 to-indigo-600',
    'Business & Entrepreneurship': 'from-blue-500 to-cyan-600',
    'Digital Marketing': 'from-cyan-500 to-teal-600',
    'Gaming': 'from-violet-500 to-fuchsia-600',
    'Entertainment': 'from-rose-500 to-pink-600',
    'Sports & Cricket': 'from-emerald-500 to-green-600',
    'Fashion & Beauty': 'from-pink-500 to-rose-600',
    'Health & Fitness': 'from-teal-500 to-emerald-600',
    'Education': 'from-amber-500 to-orange-600',
    'Finance': 'from-emerald-600 to-teal-700',
    'Travel': 'from-sky-500 to-blue-600',
    'Food': 'from-orange-500 to-amber-600',
    'Lifestyle': 'from-purple-600 to-pink-500',
    'Politics & World News': 'from-slate-600 to-slate-800',
    'Science': 'from-indigo-600 to-blue-700',
    'Automotive': 'from-red-500 to-rose-700',
    'Real Estate': 'from-amber-600 to-yellow-600',
    'Creator Economy': 'from-fuchsia-600 to-purple-600',
  };

  return (
    <div className="w-full">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28 bg-gradient-to-b from-purple-900/10 via-transparent to-transparent">
        {/* Animated Glow Blobs */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-purple-600/25 via-blue-600/20 to-cyan-500/20 rounded-full blur-[100px] pointer-events-none animate-glow-pulse" />
        <div className="absolute top-12 left-10 w-72 h-72 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-20 right-10 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          {/* Trending Worldwide Indicator */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 dark:bg-slate-900/90 border border-purple-200 dark:border-purple-800/80 shadow-md shadow-purple-500/10 mb-6 animate-pulse-subtle">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
            <Globe2 className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
              Trending Worldwide • 12,480+ Rising Topics Ingested Today
            </span>
          </div>

          {/* Main Headline & Subheadline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white max-w-4xl mx-auto leading-[1.12]">
            Find Your Next <br />
            <span className="text-gradient-brand">Viral Content Idea.</span>
          </h1>

          <p className="mt-6 text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Discover trending topics, viral conversations, rising keywords, and content opportunities across social
            media platforms worldwide — all in one place.
          </p>

          {/* Prominent Search Bar */}
          <form
            onSubmit={handleSearchSubmit}
            className="mt-8 max-w-2xl mx-auto flex flex-col sm:flex-row items-center gap-2 p-2 rounded-2xl bg-white dark:bg-slate-900 border-2 border-purple-300 dark:border-purple-700/80 shadow-xl shadow-purple-600/10"
          >
            <div className="flex-1 flex items-center gap-3 px-3 py-1 w-full">
              <Search className="w-5 h-5 text-purple-600 dark:text-purple-400 flex-shrink-0" />
              <input
                type="text"
                value={heroSearch}
                onChange={(e) => setHeroSearch(e.target.value)}
                placeholder="Search any topic, keyword, niche, or trend..."
                className="w-full text-sm sm:text-base bg-transparent text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold text-sm shadow-md transition-all hover:shadow-purple-500/25 flex items-center justify-center gap-2 flex-shrink-0"
            >
              <Search className="w-4 h-4" />
              <span>Search Trends</span>
            </button>
          </form>

          {/* CTAs & Floating Platform Icons Row */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/trends"
              className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs sm:text-sm shadow-sm transition-all flex items-center gap-2"
            >
              <span>Explore All Trends</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/categories"
              className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs sm:text-sm border border-slate-200 dark:border-slate-700 transition-all flex items-center gap-2"
            >
              <span>Browse Categories</span>
            </Link>

            <Link
              href="/generator"
              className="px-5 py-2.5 rounded-xl bg-purple-50 dark:bg-purple-950/50 hover:bg-purple-100 dark:hover:bg-purple-900/60 text-purple-700 dark:text-purple-300 font-bold text-xs sm:text-sm border border-purple-200 dark:border-purple-800 transition-all flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>AI Content Studio</span>
            </Link>
          </div>

          {/* Floating Platform Icons Carousel */}
          <div className="mt-10 pt-6 border-t border-slate-200/60 dark:border-slate-800/80 max-w-4xl mx-auto">
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4">
              Real-Time Ingestion Across 9 Major Social Networks
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
              {ALL_PLATFORMS.map((platform) => (
                <Link
                  key={platform.id}
                  href={`/platforms/${platform.id}`}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-purple-400 dark:hover:border-purple-600 hover:scale-105 transition-all text-xs font-medium text-slate-700 dark:text-slate-300"
                >
                  <PlatformIconBadge platform={platform.id as any} />
                  <span>{platform.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* LIVE TREND FEED TEASER */}
      <section className="py-12 bg-white dark:bg-slate-900/60 border-y border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-2 text-rose-600 font-bold text-xs uppercase tracking-wider mb-1">
                <Flame className="w-4 h-4" /> Live Market Velocity
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                Featured Breakout Topics
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                Topics surging right now with high content opportunity scores and transparent provenance labels.
              </p>
            </div>

            <Link
              href="/trends"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-purple-600 dark:text-purple-400 hover:underline"
            >
              <span>View All 50+ Trends</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredTrends.map((trend) => (
              <TrendCard key={trend.id} trend={trend} />
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORY & PLATFORM TREND INTELLIGENCE SECTION */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 font-bold text-xs uppercase tracking-wider mb-1">
              <Layers className="w-4 h-4" /> Multi-Platform Content Intelligence
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              Trending Topics by Category & Platform
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Explore live viral content organized across YouTube, Instagram, Facebook, LinkedIn, TikTok, and creator niches.
            </p>
          </div>

          <div className="flex items-center gap-2">
            {/* View Mode Switcher */}
            <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700/80">
              <button
                onClick={() => {
                  setCategoryMode('platforms');
                  setCategoryTab('youtube');
                }}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                  categoryMode === 'platforms'
                    ? 'bg-white dark:bg-slate-900 text-purple-600 dark:text-purple-400 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                Social Networks
              </button>
              <button
                onClick={() => {
                  setCategoryMode('niches');
                  setCategoryTab('Technology & AI');
                }}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                  categoryMode === 'niches'
                    ? 'bg-white dark:bg-slate-900 text-purple-600 dark:text-purple-400 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                Creator Niches
              </button>
            </div>

            <Link
              href="/categories"
              className="text-xs sm:text-sm font-bold text-purple-600 dark:text-purple-400 hover:underline ml-2"
            >
              All Categories →
            </Link>
          </div>
        </div>

        {/* CATEGORY SELECTOR TABS WITH LOGO ICONS */}
        {categoryMode === 'platforms' ? (
          <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none mb-8">
            {ALL_PLATFORMS.filter((p) => p.id !== 'custom').map((p) => {
              const count = SEED_TRENDS.filter((t) => t.platform === p.id).length;
              const isActive = categoryTab === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => setCategoryTab(p.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all border ${
                    isActive
                      ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 border-slate-900 dark:border-white shadow-md scale-105'
                      : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-purple-300 dark:hover:border-purple-700 hover:bg-slate-50 dark:hover:bg-slate-800/60'
                  }`}
                >
                  <PlatformLogo platform={p.id} size="sm" />
                  <span>{p.name}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                      isActive
                        ? 'bg-white/20 text-white dark:bg-slate-900/20 dark:text-slate-900'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 mb-8">
            {[...ALL_CATEGORIES, ...customCategories].map((cat) => {
              const count = SEED_TRENDS.filter((t) => t.category.toLowerCase() === cat.toLowerCase()).length;
              const isActive = categoryTab === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setCategoryTab(cat)}
                  className={`flex items-center gap-2.5 p-3 rounded-2xl border text-left transition-all ${
                    isActive
                      ? 'bg-purple-50 dark:bg-purple-950/60 border-purple-400 dark:border-purple-600 shadow-sm ring-2 ring-purple-500/20'
                      : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-purple-300 dark:hover:border-purple-700'
                  }`}
                >
                  <CategoryLogo category={cat} size="xs" showBackground={true} />
                  <div className="min-w-0 flex-1">
                    <span className="block font-bold text-xs text-slate-900 dark:text-white truncate">
                      {cat}
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium">
                      {count} topics
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {/* TRENDING TOPICS UNDER THIS CATEGORY SECTION */}
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2">
              {categoryMode === 'platforms' ? (
                <>
                  <PlatformLogo platform={categoryTab} size="sm" />
                  <span className="text-sm font-extrabold text-slate-900 dark:text-white capitalize">
                    {categoryTab === 'x' ? 'X (Twitter)' : categoryTab} Trending Content
                  </span>
                </>
              ) : (
                <>
                  <CategoryLogo category={categoryTab} size="xs" showBackground={false} />
                  <span className="text-sm font-extrabold text-slate-900 dark:text-white">
                    {categoryTab} Trending Topics
                  </span>
                </>
              )}
            </div>

            <Link
              href={
                categoryMode === 'platforms'
                  ? `/platforms/${categoryTab}`
                  : `/trends?category=${encodeURIComponent(categoryTab)}`
              }
              className="text-xs font-bold text-purple-600 dark:text-purple-400 hover:underline flex items-center gap-1"
            >
              <span>View full feed</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Cards Grid */}
          {(() => {
            const filtered =
              categoryMode === 'platforms'
                ? SEED_TRENDS.filter((t) => t.platform === categoryTab)
                : SEED_TRENDS.filter(
                    (t) => t.category.toLowerCase() === categoryTab.toLowerCase()
                  );

            if (filtered.length === 0) {
              return (
                <div className="py-12 text-center bg-slate-50 dark:bg-slate-900/50 rounded-3xl border border-dashed border-slate-200 dark:border-slate-800">
                  <p className="text-xs text-slate-400">
                    No active seed topics in this category for the current filter.
                  </p>
                  <Link
                    href="/trends"
                    className="inline-block mt-3 px-4 py-1.5 rounded-xl bg-purple-600 text-white font-bold text-xs"
                  >
                    Browse All Trending Topics
                  </Link>
                </div>
              );
            }

            return (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filtered.map((trend) => (
                  <div
                    key={trend.id}
                    className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-purple-300 dark:hover:border-purple-600/80 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between group"
                  >
                    <div>
                      {/* Top Badges */}
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <div className="flex items-center gap-1.5">
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-lg">
                            <span>{getCountryFlag(trend.countryCode || trend.country)}</span>
                            <span>{trend.country}</span>
                          </span>

                          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-lg">
                            <PlatformLogo platform={trend.platform} size="xs" />
                            <span className="capitalize">{trend.platform}</span>
                          </span>
                        </div>

                        <OpportunityScoreBadge
                          score={trend.opportunityScore}
                          size="sm"
                        />
                      </div>

                      {/* Title */}
                      <Link href={`/trends/${trend.id}`}>
                        <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors line-clamp-2">
                          {trend.title}
                        </h3>
                      </Link>

                      {/* Description */}
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                        {trend.description}
                      </p>

                      {/* Formats Pills */}
                      <div className="flex flex-wrap items-center gap-1.5 mt-3">
                        {trend.formats.slice(0, 3).map((f) => (
                          <span
                            key={f}
                            className="text-[10px] font-medium text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/80 px-2 py-0.5 rounded-md border border-slate-200/60 dark:border-slate-700/50"
                          >
                            {f}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Bottom Stats & Fast Actions */}
                    <div className="mt-4 pt-3.5 border-t border-slate-100 dark:border-slate-800">
                      <div className="flex items-center justify-between text-xs mb-3">
                        <div>
                          <span className="text-[10px] text-slate-400 block uppercase font-medium">Monthly Searches</span>
                          <span className="font-extrabold text-slate-900 dark:text-white">
                            {trend.searchVolumeFormatted}
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="text-[10px] text-slate-400 block uppercase font-medium">Growth</span>
                          <span className="font-extrabold text-emerald-600 dark:text-emerald-400 flex items-center justify-end gap-0.5">
                            <TrendingUp className="w-3 h-3" />
                            +{trend.growthPercentage}%
                          </span>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="grid grid-cols-2 gap-2">
                        <Link
                          href={`/generator?trend=${encodeURIComponent(trend.title)}&platform=${trend.platform}&category=${encodeURIComponent(trend.category)}`}
                          className="px-2.5 py-2 rounded-xl bg-purple-50 dark:bg-purple-950/60 hover:bg-purple-100 dark:hover:bg-purple-900/60 text-purple-700 dark:text-purple-300 font-bold text-[11px] flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                        >
                          <Sparkles className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                          <span>AI Ideas</span>
                        </Link>

                        <Link
                          href={`/trends/${trend.id}`}
                          className="px-2.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-[11px] flex items-center justify-center gap-1 transition-colors"
                        >
                          <span>Full Intel</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            );
          })()}
        </div>

        {/* Custom Category Modal */}
        {showAddCatModal && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 max-w-md w-full shadow-2xl animate-in zoom-in-95 duration-150">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Create Custom Category</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
                Add a specialized niche or industry to your discovery dashboard.
              </p>
              <form onSubmit={handleAddCustomCategory}>
                <input
                  type="text"
                  placeholder="e.g. Bio-Manufacturing, Indie SaaS, Urban Farming"
                  value={newCatInput}
                  onChange={(e) => setNewCatInput(e.target.value)}
                  className="w-full text-sm p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white mb-4 focus:ring-2 focus:ring-purple-500 outline-none"
                  autoFocus
                />
                <div className="flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowAddCatModal(false)}
                    className="px-4 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-xs rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold"
                  >
                    Add Category
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </section>

      {/* OPPORTUNITY SCORE EXPLAINER SECTION */}
      <section className="py-16 bg-slate-900 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 bg-cyan-950/80 border border-cyan-800 px-3 py-1 rounded-full">
                Transparent Trend Intelligence
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold mt-4 leading-tight">
                Prioritize Topics With The <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-cyan-400 to-pink-400">
                  Content Opportunity Score.
                </span>
              </h2>
              <p className="mt-4 text-sm text-slate-300 leading-relaxed">
                Never guess which topic to record next. Our transparent algorithm balances search acceleration, volume stability,
                niche freshness, and competitive density so you publish before the market saturates.
              </p>

              <div className="mt-8 space-y-3">
                <div className="flex items-start gap-3">
                  <div className="p-1.5 rounded-lg bg-purple-500/20 text-purple-400 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">No Black Boxes or Fake Virality Guarantees</h4>
                    <p className="text-xs text-slate-400">
                      Every factor (growth, demand, competition) is broken down transparently with honest provenance tags.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-1.5 rounded-lg bg-cyan-500/20 text-cyan-400 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">One-Click AI Content Pack Generation</h4>
                    <p className="text-xs text-slate-400">
                      Turn any trend into 10 content ideas, 5 viral hooks, YouTube concepts, and ready-to-shoot Reel scripts.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-1.5 rounded-lg bg-pink-500/20 text-pink-400 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Direct Content Calendar Scheduling</h4>
                    <p className="text-xs text-slate-400">
                      Schedule ideas into daily, weekly, or monthly publishing slots with status tracking.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex gap-3">
                <Link
                  href="/trends"
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-purple-600/30 hover:opacity-95"
                >
                  Explore Opportunity Ratings
                </Link>
                <Link
                  href="/generator"
                  className="px-6 py-3 rounded-xl bg-slate-800 text-slate-200 border border-slate-700 font-bold text-xs sm:text-sm hover:bg-slate-700"
                >
                  Test AI Generator
                </Link>
              </div>
            </div>

            {/* Visual breakdown mock card */}
            <div className="rounded-3xl bg-slate-950/80 border border-slate-800 p-6 sm:p-8 shadow-2xl relative">
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
                <div>
                  <span className="text-[10px] text-purple-400 uppercase font-extrabold tracking-wider">
                    Score Breakdown Example
                  </span>
                  <h3 className="font-bold text-base text-white">Autonomous AI Agents for Small Business</h3>
                </div>
                <div className="px-3 py-1 rounded-xl bg-purple-600/20 border border-purple-500/40 text-purple-300 font-extrabold text-sm">
                  94 / 100
                </div>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <div className="flex justify-between text-slate-300 mb-1">
                    <span>Growth Velocity (+184% 14d)</span>
                    <strong className="text-purple-400">95%</strong>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-purple-500 h-full rounded-full w-[95%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-slate-300 mb-1">
                    <span>Search Demand (320K/mo)</span>
                    <strong className="text-cyan-400">92%</strong>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-cyan-500 h-full rounded-full w-[92%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-slate-300 mb-1">
                    <span>Trend Freshness (Detected 2d ago)</span>
                    <strong className="text-emerald-400">98%</strong>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-full rounded-full w-[98%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-slate-300 mb-1">
                    <span>Low Competition Advantage</span>
                    <strong className="text-pink-400">88%</strong>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-pink-500 h-full rounded-full w-[88%]" />
                  </div>
                </div>
              </div>

              <div className="mt-6 p-3 rounded-xl bg-purple-950/40 border border-purple-800/60 text-[11px] text-purple-200">
                💡 <strong>Opportunity Diagnosis:</strong> Exceptional early-mover window. High search acceleration with favorable creator competition ratio. Recommended for immediate video and short-form scripts.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA SECTION */}
      <section className="py-20 text-center relative overflow-hidden bg-gradient-to-b from-transparent via-purple-900/5 to-purple-900/10">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white">
            Ready to Find Your Next Viral Topic?
          </h2>
          <p className="mt-4 text-base text-slate-600 dark:text-slate-300 max-w-xl mx-auto">
            Join thousands of creators using Creator Trends to research topics, generate high-converting hooks, and plan content with confidence.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/signup"
              className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500 hover:opacity-95 text-white font-bold text-sm shadow-xl shadow-purple-600/25"
            >
              Get Started Free
            </Link>
            <Link
              href="/pricing"
              className="px-8 py-3.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-bold text-sm hover:bg-slate-50 dark:hover:bg-slate-700"
            >
              View Pricing Plans
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
