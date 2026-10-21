'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { SEED_TRENDS, ALL_CATEGORIES, ALL_PLATFORMS, SUPPORTED_COUNTRIES } from '@/data/seedTrends';
import TrendCard from '@/components/TrendCard';
import { PlatformId, TrendStatus, ContentFormat, DemandLevel, CompetitionLevel } from '@/types';
import { PlatformLogo, CategoryLogo } from '@/components/BrandIcons';
import {
  Search,
  Filter,
  SlidersHorizontal,
  RotateCcw,
  Sparkles,
  ArrowUpDown,
  X,
  Layers,
  ChevronDown,
} from 'lucide-react';

export default function TrendsPage() {
  return (
    <Suspense fallback={<div className="max-w-7xl mx-auto p-12 text-center text-xs text-slate-400">Loading Trend Discovery Engine...</div>}>
      <TrendsContent />
    </Suspense>
  );
}

function TrendsContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';
  const initialPlatform = searchParams.get('platform') || 'all';
  const initialQuery = searchParams.get('q') || '';

  // Filter States
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedPlatform, setSelectedPlatform] = useState<string>(initialPlatform);
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [selectedCountry, setSelectedCountry] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedFormat, setSelectedFormat] = useState<string>('all');
  const [selectedDemand, setSelectedDemand] = useState<string>('all');
  const [selectedCompetition, setSelectedCompetition] = useState<string>('all');
  const [dateRange, setDateRange] = useState<string>('30d');
  const [sortBy, setSortBy] = useState<string>('opportunity');
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Filter logic
  const filteredTrends = useMemo(() => {
    return SEED_TRENDS.filter((trend) => {
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = trend.title.toLowerCase().includes(q);
        const matchesDesc = trend.description.toLowerCase().includes(q);
        const matchesCat = trend.category.toLowerCase().includes(q);
        const matchesTags = trend.relatedHashtags.some((h) => h.toLowerCase().includes(q));
        const matchesKeywords = trend.relatedKeywords.some((k) => k.toLowerCase().includes(q));
        if (!matchesTitle && !matchesDesc && !matchesCat && !matchesTags && !matchesKeywords) {
          return false;
        }
      }

      // Platform
      if (selectedPlatform !== 'all' && trend.platform !== selectedPlatform) {
        return false;
      }

      // Category
      if (selectedCategory !== 'all' && trend.category.toLowerCase() !== selectedCategory.toLowerCase()) {
        return false;
      }

      // Country
      if (selectedCountry !== 'all') {
        const matchCountry =
          trend.country.toLowerCase() === selectedCountry.toLowerCase() ||
          trend.countryCode.toLowerCase() === selectedCountry.toLowerCase();
        if (!matchCountry) return false;
      }

      // Status
      if (selectedStatus !== 'all' && trend.status.toLowerCase() !== selectedStatus.toLowerCase()) {
        return false;
      }

      // Format
      if (selectedFormat !== 'all') {
        const hasFormat = trend.formats.some((f) => f.toLowerCase() === selectedFormat.toLowerCase());
        if (!hasFormat) return false;
      }

      // Demand
      if (selectedDemand !== 'all' && trend.demandLevel.toLowerCase() !== selectedDemand.toLowerCase()) {
        return false;
      }

      // Competition
      if (
        selectedCompetition !== 'all' &&
        trend.competitionLevel.toLowerCase() !== selectedCompetition.toLowerCase()
      ) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'opportunity') return b.opportunityScore - a.opportunityScore;
      if (sortBy === 'growth') return b.growthPercentage - a.growthPercentage;
      if (sortBy === 'volume') return b.searchVolume - a.searchVolume;
      if (sortBy === 'recent') return new Date(b.detectedAt).getTime() - new Date(a.detectedAt).getTime();
      return 0;
    });
  }, [
    searchQuery,
    selectedPlatform,
    selectedCategory,
    selectedCountry,
    selectedStatus,
    selectedFormat,
    selectedDemand,
    selectedCompetition,
    sortBy,
  ]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedPlatform('all');
    setSelectedCategory('all');
    setSelectedCountry('all');
    setSelectedStatus('all');
    setSelectedFormat('all');
    setSelectedDemand('all');
    setSelectedCompetition('all');
    setDateRange('30d');
    setSortBy('opportunity');
  };

  const hasActiveFilters =
    searchQuery !== '' ||
    selectedPlatform !== 'all' ||
    selectedCategory !== 'all' ||
    selectedCountry !== 'all' ||
    selectedStatus !== 'all' ||
    selectedFormat !== 'all' ||
    selectedDemand !== 'all' ||
    selectedCompetition !== 'all';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/40 px-2.5 py-1 rounded-full mb-1">
            <Sparkles className="w-3.5 h-3.5" /> Real-Time Cross-Platform Index
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Trend Discovery Engine
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Filter topics across platforms, regions, demand levels, and content formats.
          </p>
        </div>

        {/* Sort & Mobile Filter Toggle */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-medium text-slate-700 dark:text-slate-300">
            <ArrowUpDown className="w-3.5 h-3.5 text-purple-600" />
            <span className="hidden sm:inline">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent font-bold text-slate-900 dark:text-white outline-none cursor-pointer"
            >
              <option value="opportunity" className="bg-white dark:bg-slate-900">Highest Opportunity</option>
              <option value="growth" className="bg-white dark:bg-slate-900">Highest Growth %</option>
              <option value="volume" className="bg-white dark:bg-slate-900">Search Volume</option>
              <option value="recent" className="bg-white dark:bg-slate-900">Most Recent</option>
            </select>
          </div>

          <button
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className="lg:hidden flex items-center gap-1.5 px-3 py-2 rounded-xl bg-purple-600 text-white text-xs font-bold shadow-sm"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>Filters</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Sidebar Filters + Cards Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Desktop Filter Sidebar */}
        <aside
          className={`lg:block ${
            showMobileFilters ? 'block fixed inset-0 z-50 bg-black/50 p-4 backdrop-blur-sm overflow-y-auto' : 'hidden'
          }`}
        >
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm space-y-6 max-h-[calc(100vh-100px)] overflow-y-auto lg:sticky lg:top-24">
            {/* Sidebar Title */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <span className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <Filter className="w-4 h-4 text-purple-600" /> Filter Engine
              </span>

              {hasActiveFilters && (
                <button
                  onClick={resetFilters}
                  className="text-xs text-purple-600 hover:text-purple-700 font-semibold flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" /> Reset
                </button>
              )}

              {showMobileFilters && (
                <button
                  onClick={() => setShowMobileFilters(false)}
                  className="lg:hidden p-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Keyword Search */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                Keyword / Topic
              </label>
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="e.g. AI, IPL, Clean UI..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full text-xs pl-8 pr-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-purple-500/20 outline-none"
                />
              </div>
            </div>

            {/* Platform Filter */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                Platform
              </label>
              <select
                value={selectedPlatform}
                onChange={(e) => setSelectedPlatform(e.target.value)}
                className="w-full text-xs p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-medium outline-none cursor-pointer"
              >
                <option value="all">All Platforms (10 Supported)</option>
                {ALL_PLATFORMS.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Category Filter */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full text-xs p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-medium outline-none cursor-pointer"
              >
                <option value="all">All Categories (18 Niches)</option>
                {ALL_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Country / Region */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                Target Region
              </label>
              <select
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                className="w-full text-xs p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-medium outline-none cursor-pointer"
              >
                <option value="all">🌐 Global / All Regions</option>
                {SUPPORTED_COUNTRIES.map((c) => (
                  <option key={c.code} value={c.name}>
                    {c.flag ? `${c.flag} ` : ''}{c.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Trend Status */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                Trend Status
              </label>
              <div className="flex flex-wrap gap-1.5">
                {['all', 'Viral', 'Rising', 'Emerging', 'Stable', 'Declining'].map((st) => (
                  <button
                    key={st}
                    onClick={() => setSelectedStatus(st)}
                    className={`text-[11px] px-2.5 py-1 rounded-lg font-semibold transition-all border ${
                      selectedStatus === st
                        ? 'bg-purple-600 text-white border-purple-600 shadow-sm'
                        : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {st === 'all' ? 'All Statuses' : st}
                  </button>
                ))}
              </div>
            </div>

            {/* Content Format */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                Content Format
              </label>
              <select
                value={selectedFormat}
                onChange={(e) => setSelectedFormat(e.target.value)}
                className="w-full text-xs p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-medium outline-none cursor-pointer"
              >
                <option value="all">Any Format</option>
                <option value="Video">Video (YouTube / Longform)</option>
                <option value="Short">Short (Shorts / TikTok)</option>
                <option value="Reel">Reel (Instagram)</option>
                <option value="Post">Post (LinkedIn / X)</option>
                <option value="Discussion">Discussion (Reddit)</option>
                <option value="Image">Visual / Pin (Pinterest)</option>
                <option value="Article">Article / Newsletter</option>
              </select>
            </div>

            {/* Search Demand & Competition */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                  Demand
                </label>
                <select
                  value={selectedDemand}
                  onChange={(e) => setSelectedDemand(e.target.value)}
                  className="w-full text-xs p-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white outline-none"
                >
                  <option value="all">All</option>
                  <option value="Very High">Very High</option>
                  <option value="High">High</option>
                  <option value="Moderate">Moderate</option>
                  <option value="Niche">Niche</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                  Competition
                </label>
                <select
                  value={selectedCompetition}
                  onChange={(e) => setSelectedCompetition(e.target.value)}
                  className="w-full text-xs p-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white outline-none"
                >
                  <option value="all">All</option>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>
            </div>

            {/* Date Range Selection */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                Date Range
              </label>
              <div className="grid grid-cols-4 gap-1 text-[11px] text-center font-semibold">
                {['24h', '7d', '30d', '90d'].map((range) => (
                  <button
                    key={range}
                    onClick={() => setDateRange(range)}
                    className={`py-1.5 rounded-lg border transition-all ${
                      dateRange === range
                        ? 'bg-purple-600 text-white border-purple-600'
                        : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    {range}
                  </button>
                ))}
              </div>
            </div>

            {showMobileFilters && (
              <button
                onClick={() => setShowMobileFilters(false)}
                className="w-full py-3 rounded-xl bg-purple-600 text-white font-bold text-xs"
              >
                Apply Filters ({filteredTrends.length} Results)
              </button>
            )}
          </div>
        </aside>

        {/* Trends Cards Results Feed */}
        <main className="lg:col-span-3">
          {/* Quick Platform Category Carousel */}
          <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-4 scrollbar-none">
            <button
              onClick={() => setSelectedPlatform('all')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedPlatform === 'all'
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              All Platforms ({SEED_TRENDS.length})
            </button>
            {ALL_PLATFORMS.filter((p) => p.id !== 'custom').map((p) => {
              const count = SEED_TRENDS.filter((t) => t.platform === p.id).length;
              const isActive = selectedPlatform === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => setSelectedPlatform(p.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
                    isActive
                      ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 border-slate-900 dark:border-white shadow-sm'
                      : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-purple-300 dark:hover:border-purple-700'
                  }`}
                >
                  <PlatformLogo platform={p.id} size="xs" />
                  <span>{p.name}</span>
                  <span className="text-[10px] opacity-75 font-normal">({count})</span>
                </button>
              );
            })}
          </div>

          {/* Active Filter Chips */}
          {hasActiveFilters && (
            <div className="flex flex-wrap items-center gap-2 mb-4 p-3 rounded-2xl bg-purple-50/60 dark:bg-purple-950/30 border border-purple-100 dark:border-purple-900/50">
              <span className="text-xs font-bold text-purple-700 dark:text-purple-300">Active Filters:</span>

              {searchQuery && (
                <span className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-lg bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 shadow-sm">
                  &quot;{searchQuery}&quot;
                  <button onClick={() => setSearchQuery('')} className="hover:text-rose-500">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              {selectedPlatform !== 'all' && (
                <span className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-lg bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 shadow-sm capitalize">
                  <PlatformLogo platform={selectedPlatform} size="xs" />
                  <span>{selectedPlatform}</span>
                  <button onClick={() => setSelectedPlatform('all')} className="hover:text-rose-500">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              {selectedCategory !== 'all' && (
                <span className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-lg bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 shadow-sm">
                  <CategoryLogo category={selectedCategory} size="xs" showBackground={false} />
                  <span>{selectedCategory}</span>
                  <button onClick={() => setSelectedCategory('all')} className="hover:text-rose-500">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              {selectedStatus !== 'all' && (
                <span className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-lg bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 shadow-sm">
                  Status: {selectedStatus}
                  <button onClick={() => setSelectedStatus('all')} className="hover:text-rose-500">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              <button
                onClick={resetFilters}
                className="text-xs font-bold text-rose-600 dark:text-rose-400 hover:underline ml-auto"
              >
                Clear all
              </button>
            </div>
          )}

          {/* Result Count and Provenance Status */}
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-4 px-1">
            <span>
              Showing <strong className="text-slate-900 dark:text-white">{filteredTrends.length}</strong> discovered
              topics
            </span>
            <span className="text-[11px]">
              Provenance: <span className="text-emerald-500 font-bold">Measured</span> &{' '}
              <span className="text-amber-500 font-bold">Estimated</span>
            </span>
          </div>

          {/* Cards Grid */}
          {filteredTrends.length === 0 ? (
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-12 text-center">
              <div className="w-12 h-12 rounded-2xl bg-purple-100 dark:bg-purple-950/60 text-purple-600 flex items-center justify-center mx-auto mb-3">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white mb-1">
                No matching trends found
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto mb-4">
                Try loosening your filter criteria or searching for broader terms like &quot;AI&quot;, &quot;Cricket&quot;, or &quot;UI&quot;.
              </p>
              <button
                onClick={resetFilters}
                className="px-4 py-2 rounded-xl bg-purple-600 text-white text-xs font-bold"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredTrends.map((trend) => (
                <TrendCard key={trend.id} trend={trend} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
