'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { SEED_TRENDS } from '@/data/seedTrends';
import { TrendItem } from '@/types';
import { storage } from '@/lib/storage';
import OpportunityScoreBadge from '@/components/OpportunityScoreBadge';
import { PlatformIconBadge } from '@/components/TrendCard';
import { CategoryLogo } from '@/components/BrandIcons';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import {
  ArrowLeft,
  Sparkles,
  TrendingUp,
  Bookmark,
  Calendar,
  Share2,
  Download,
  Check,
  ExternalLink,
  ShieldCheck,
  Info,
  Clock,
  Layers,
  Video,
  FileText,
  MessageSquare,
} from 'lucide-react';

export default function TrendDetailsClient() {
  const params = useParams();
  const router = useRouter();
  const trendId = params?.id as string;

  const [trend, setTrend] = useState<TrendItem | null>(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [userNote, setUserNote] = useState('');
  const [copied, setCopied] = useState(false);
  const [activeRange, setActiveRange] = useState<'7d' | '14d' | '30d'>('30d');
  const [showCalendarModal, setShowCalendarModal] = useState(false);
  const [calDate, setCalDate] = useState('2026-10-21');
  const [calSuccess, setCalSuccess] = useState(false);

  useEffect(() => {
    const found = SEED_TRENDS.find((t) => t.id === trendId);
    if (found) {
      setTrend(found);
      setIsBookmarked(storage.isBookmarked(found.id));
      const b = storage.getBookmarks().find((bm) => bm.trendId === found.id);
      if (b?.notes) setUserNote(b.notes);
    }
  }, [trendId]);

  if (!trend) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Trend Not Found</h2>
        <p className="text-xs text-slate-500 mb-4">The topic you requested does not exist or was archived.</p>
        <Link href="/trends" className="px-4 py-2 rounded-xl bg-purple-600 text-white text-xs font-bold">
          ← Back to Trends Feed
        </Link>
      </div>
    );
  }

  const handleBookmarkToggle = () => {
    if (isBookmarked) {
      storage.removeBookmark(trend.id);
      setIsBookmarked(false);
    } else {
      storage.addBookmark(trend, userNote);
      setIsBookmarked(true);
    }
  };

  const handleSaveNote = () => {
    const bookmarks = storage.getBookmarks();
    const existing = bookmarks.find((b) => b.trendId === trend.id);
    if (existing) {
      storage.updateBookmark(existing.id, { notes: userNote });
    } else {
      storage.addBookmark(trend, userNote);
      setIsBookmarked(true);
    }
    alert('Note saved to bookmarks!');
  };

  const handleShare = async () => {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleExportCsv = () => {
    const headers = ['Date', 'Search_Interest_Index'];
    const rows = trend.history.map((h) => `${h.date},${h.value}`);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `${trend.slug}-analytics.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleAddCalendar = () => {
    storage.addCalendarItem({
      title: `${trend.title} - Video Draft`,
      trendId: trend.id,
      trendTitle: trend.title,
      platform: trend.platform,
      date: calDate,
      status: 'Planned',
      format: trend.formats[0] || 'Video',
      category: trend.category,
      notes: `Target search volume: ${trend.searchVolumeFormatted}`,
    });
    setCalSuccess(true);
    setTimeout(() => {
      setCalSuccess(false);
      setShowCalendarModal(false);
    }, 1200);
  };

  // Slice history data based on active range
  const chartData =
    activeRange === '7d'
      ? trend.history.slice(-7)
      : activeRange === '14d'
      ? trend.history.slice(-14)
      : trend.history;

  const PIE_COLORS = ['#7C3AED', '#2563EB', '#06B6D4', '#F43F5E', '#10B981'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back button and quick actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Trends
        </button>

        <div className="flex flex-wrap items-center gap-2">
          <Link
            href={`/generator?trend=${encodeURIComponent(trend.title)}&category=${encodeURIComponent(
              trend.category
            )}&platform=${trend.platform}`}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-bold text-xs shadow-md shadow-purple-600/20 hover:opacity-95"
          >
            <Sparkles className="w-4 h-4" />
            <span>Generate AI Content Pack</span>
          </Link>

          <button
            onClick={() => setShowCalendarModal(true)}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 text-xs font-bold hover:bg-slate-200"
          >
            <Calendar className="w-4 h-4 text-purple-600" />
            <span>Schedule</span>
          </button>

          <button
            onClick={handleBookmarkToggle}
            className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border text-xs font-bold transition-all ${
              isBookmarked
                ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-300 text-amber-600'
                : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200'
            }`}
          >
            <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-amber-500 text-amber-500' : ''}`} />
            <span>{isBookmarked ? 'Saved' : 'Bookmark'}</span>
          </button>

          <button
            onClick={handleShare}
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300"
            title="Share Link"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Share2 className="w-4 h-4" />}
          </button>

          <button
            onClick={handleExportCsv}
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300"
            title="Export CSV"
          >
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Header Card */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm mb-8">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 capitalize">
            <PlatformIconBadge platform={trend.platform} />
            {trend.platform.replace('-', ' ')}
          </span>

          <span className="inline-flex items-center gap-1.5 text-xs px-3 py-1 rounded-xl bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 font-bold">
            <CategoryLogo category={trend.category} size="xs" showBackground={false} />
            <span>{trend.category}</span>
          </span>

          <span className="text-xs px-3 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-medium">
            📍 {trend.country}
          </span>

          <span className="text-xs px-3 py-1 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 font-bold">
            Status: {trend.status}
          </span>

          <OpportunityScoreBadge score={trend.opportunityScore} breakdown={trend.opportunityBreakdown} size="md" />
        </div>

        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white leading-tight mb-3">
          {trend.title}
        </h1>

        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-4xl leading-relaxed mb-6">
          {trend.description}
        </p>

        {/* Provenance and Data Source Banner */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>
              Source: <strong className="text-slate-700 dark:text-slate-200">{trend.sourceName}</strong>
            </span>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> Updated: {new Date(trend.lastUpdatedAt).toLocaleString()}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] px-2 py-0.5 rounded font-bold uppercase tracking-wider bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
              Metric Provenance: {trend.searchVolumeProvenance}
            </span>
          </div>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Search Demand</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-extrabold text-slate-900 dark:text-white">
              {trend.searchVolumeFormatted}
            </span>
            <span className="text-[10px] text-amber-500 font-semibold">{trend.searchVolumeProvenance}</span>
          </div>
          <span className="text-xs text-slate-500 mt-1 block">Level: {trend.demandLevel}</span>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">30-Day Growth</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400">
              +{trend.growthPercentage}%
            </span>
          </div>
          <span className="text-xs text-slate-500 mt-1 block">Velocity surge</span>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Week-Over-Week</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-extrabold text-purple-600 dark:text-purple-400">
              +{trend.weekOverWeekGrowth}%
            </span>
          </div>
          <span className="text-xs text-slate-500 mt-1 block">7-day acceleration</span>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Competition Level</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-extrabold text-slate-900 dark:text-white">
              {trend.competitionLevel}
            </span>
          </div>
          <span className="text-xs text-slate-500 mt-1 block">Favorable creator ratio</span>
        </div>
      </div>

      {/* Main Charts & Analytics Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Interactive Interest Over Time Line Chart */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-4 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-purple-600" /> Search Interest Velocity
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Normalized index (0-100) reflecting daily search and social mentions.
              </p>
            </div>

            <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs font-bold">
              {(['7d', '14d', '30d'] as const).map((r) => (
                <button
                  key={r}
                  onClick={() => setActiveRange(r)}
                  className={`px-3 py-1 rounded-lg transition-colors ${
                    activeRange === r
                      ? 'bg-purple-600 text-white shadow-sm'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.15} />
                <XAxis dataKey="date" stroke="#94A3B8" fontSize={11} tickLine={false} />
                <YAxis domain={[0, 100]} stroke="#94A3B8" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0F172A',
                    borderColor: '#334155',
                    borderRadius: '12px',
                    color: '#fff',
                    fontSize: '12px',
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#7C3AED"
                  strokeWidth={3}
                  dot={{ fill: '#7C3AED', r: 3 }}
                  activeDot={{ r: 6, fill: '#06B6D4' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Opportunity Score Factor Radar / Breakdown */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-purple-600" /> Opportunity Breakdown
              </h3>
              <span className="font-extrabold text-sm px-2.5 py-1 rounded-xl bg-purple-100 dark:bg-purple-900/60 text-purple-700 dark:text-purple-300">
                {trend.opportunityScore}/100
              </span>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
              {trend.statusReason}
            </p>

            <div className="space-y-2.5 text-xs">
              <div>
                <div className="flex justify-between font-medium mb-1">
                  <span>Growth Velocity (25%)</span>
                  <strong>{trend.opportunityBreakdown.growthRate}%</strong>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-purple-600 h-full rounded-full" style={{ width: `${trend.opportunityBreakdown.growthRate}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between font-medium mb-1">
                  <span>Search Demand (20%)</span>
                  <strong>{trend.opportunityBreakdown.searchDemand}%</strong>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-blue-600 h-full rounded-full" style={{ width: `${trend.opportunityBreakdown.searchDemand}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between font-medium mb-1">
                  <span>Baseline Interest (20%)</span>
                  <strong>{trend.opportunityBreakdown.currentInterest}%</strong>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-cyan-500 h-full rounded-full" style={{ width: `${trend.opportunityBreakdown.currentInterest}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between font-medium mb-1">
                  <span>Trend Freshness (15%)</span>
                  <strong>{trend.opportunityBreakdown.freshness}%</strong>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${trend.opportunityBreakdown.freshness}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between font-medium mb-1">
                  <span>Low Competition Advantage (10%)</span>
                  <strong>{trend.opportunityBreakdown.competitionScore}%</strong>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-pink-500 h-full rounded-full" style={{ width: `${trend.opportunityBreakdown.competitionScore}%` }} />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
            <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-2">
              Recommended Formats
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {trend.formats.map((f) => (
                <span
                  key={f}
                  className="text-xs px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold flex items-center gap-1"
                >
                  {f === 'Video' && <Video className="w-3.5 h-3.5 text-red-500" />}
                  {f === 'Article' && <FileText className="w-3.5 h-3.5 text-blue-500" />}
                  {f === 'Discussion' && <MessageSquare className="w-3.5 h-3.5 text-orange-500" />}
                  <span>{f}</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Cross-Market & Platform Breakdown Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* Regional Popularity */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
          <h3 className="font-bold text-base text-slate-900 dark:text-white mb-2">
            Regional Popularity Distribution
          </h3>
          <p className="text-xs text-slate-400 mb-4">
            Search interest index (0-100) across primary creator countries.
          </p>

          <div className="space-y-3">
            {trend.regionalPopularity.map((reg) => (
              <div key={reg.code}>
                <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  <span>{reg.country}</span>
                  <strong className="text-purple-600 dark:text-purple-400">{reg.score}/100</strong>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-gradient-to-r from-purple-600 to-cyan-500 h-full rounded-full" style={{ width: `${reg.score}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Platform Share Breakdown */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
          <h3 className="font-bold text-base text-slate-900 dark:text-white mb-2">
            Social Platform Conversation Share
          </h3>
          <p className="text-xs text-slate-400 mb-4">
            Estimated distribution of conversations, posts, and engagement.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="w-40 h-40 flex-shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={trend.platformBreakdown}
                    dataKey="share"
                    nameKey="platform"
                    cx="50%"
                    cy="50%"
                    outerRadius={65}
                    innerRadius={35}
                  >
                    {trend.platformBreakdown.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="flex-1 space-y-2 w-full text-xs">
              {trend.platformBreakdown.map((item, idx) => (
                <div key={item.platform} className="flex items-center justify-between">
                  <span className="flex items-center gap-2 capitalize text-slate-700 dark:text-slate-300">
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: PIE_COLORS[idx % PIE_COLORS.length] }}
                    />
                    {item.platform}
                  </span>
                  <span className="font-bold text-slate-900 dark:text-white">{item.share}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Related Queries, Keywords, & Top Content Examples */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Related Queries */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
          <h3 className="font-bold text-base text-slate-900 dark:text-white mb-3">
            Rising Search Queries
          </h3>
          <div className="space-y-2.5">
            {trend.relatedQueries.map((rq, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-xs"
              >
                <span className="text-slate-700 dark:text-slate-300 font-medium">{rq.query}</span>
                <span className="font-extrabold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded">
                  {rq.growth}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
            <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-2">
              Related Hashtags
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {trend.relatedHashtags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2.5 py-1 rounded-lg bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 font-semibold"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Top Content Examples */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
          <h3 className="font-bold text-base text-slate-900 dark:text-white mb-3">
            Top Performing Content Benchmark
          </h3>
          <div className="space-y-3">
            {trend.topContentExamples && trend.topContentExamples.length > 0 ? (
              trend.topContentExamples.map((ex, i) => (
                <div
                  key={i}
                  className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/80 flex items-start justify-between gap-4"
                >
                  <div>
                    <span className="text-[10px] uppercase font-bold text-purple-600 dark:text-purple-400 bg-purple-100 dark:bg-purple-950/60 px-2 py-0.5 rounded">
                      {ex.format}
                    </span>
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white mt-1.5 leading-snug">
                      {ex.title}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      By {ex.author} • <strong className="text-emerald-600 dark:text-emerald-400">{ex.engagement}</strong>
                    </p>
                  </div>
                  <a
                    href={ex.url}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-xl bg-white dark:bg-slate-800 text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-700"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              ))
            ) : (
              <p className="text-xs text-slate-400 py-4">No top content records connected for this platform yet.</p>
            )}
          </div>

          {/* Personal Creator Notes Box */}
          <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              My Creator Notes for This Topic:
            </label>
            <textarea
              value={userNote}
              onChange={(e) => setUserNote(e.target.value)}
              placeholder="e.g. Angle: focus on the 3 tool pitfalls. Target audience: freelance developers..."
              className="w-full text-xs p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-purple-500 outline-none"
              rows={2}
            />
            <button
              onClick={handleSaveNote}
              className="mt-2 px-3 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs"
            >
              Save Note to Bookmarks
            </button>
          </div>
        </div>
      </div>

      {/* Schedule Modal */}
      {showCalendarModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 max-w-md w-full shadow-2xl">
            <h3 className="font-bold text-base text-slate-900 dark:text-white mb-2">Schedule to Calendar</h3>
            <p className="text-xs text-slate-500 mb-4">{trend.title}</p>
            <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">Target Date:</label>
            <input
              type="date"
              value={calDate}
              onChange={(e) => setCalDate(e.target.value)}
              className="w-full text-xs p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white mb-4"
            />
            <div className="flex gap-2">
              <button
                onClick={() => setShowCalendarModal(false)}
                className="flex-1 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300"
              >
                Cancel
              </button>
              <button
                onClick={handleAddCalendar}
                className="flex-1 py-2 text-xs rounded-xl bg-purple-600 text-white font-bold"
              >
                {calSuccess ? 'Scheduled!' : 'Confirm Schedule'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
