'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { TrendItem, PlatformId } from '@/types';
import { storage } from '@/lib/storage';
import SparklineChart from './SparklineChart';
import OpportunityScoreBadge from './OpportunityScoreBadge';
import {
  Bookmark,
  Share2,
  Sparkles,
  TrendingUp,
  ArrowUpRight,
  ExternalLink,
  Calendar,
  Check,
  Instagram,
  Youtube,
  Twitter,
  Pin,
  MessageSquare,
  Linkedin,
  Layers,
  Music2,
  Clock,
  Globe,
} from 'lucide-react';

import { PlatformLogo } from './BrandIcons';
import { getCountryFlag } from '@/data/seedTrends';

interface TrendCardProps {
  trend: TrendItem;
  onBookmarkToggle?: (trendId: string, isSaved: boolean) => void;
  showAiShortcut?: boolean;
}

export function PlatformIconBadge({ platform, className }: { platform: PlatformId; className?: string }) {
  return <PlatformLogo platform={platform} size="sm" className={className} />;
}

export default function TrendCard({ trend, onBookmarkToggle, showAiShortcut = true }: TrendCardProps) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showAddToCalModal, setShowAddToCalModal] = useState(false);
  const [scheduledDate, setScheduledDate] = useState('2026-10-20');
  const [calAdded, setCalAdded] = useState(false);

  useEffect(() => {
    setIsBookmarked(storage.isBookmarked(trend.id));
  }, [trend.id]);

  const handleBookmarkToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isBookmarked) {
      storage.removeBookmark(trend.id);
      setIsBookmarked(false);
      onBookmarkToggle?.(trend.id, false);
    } else {
      storage.addBookmark(trend);
      setIsBookmarked(true);
      onBookmarkToggle?.(trend.id, true);
    }
  };

  const handleShare = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const shareUrl = `${window.location.origin}/trends/${trend.id}`;
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleAddToCalendar = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    storage.addCalendarItem({
      title: `${trend.title} - Content Draft`,
      trendId: trend.id,
      trendTitle: trend.title,
      platform: trend.platform,
      date: scheduledDate,
      status: 'Planned',
      format: trend.formats[0] || 'Video',
      category: trend.category,
      notes: `Generated from Creator Trends. Search demand: ${trend.searchVolumeFormatted}`,
    });
    setCalAdded(true);
    setTimeout(() => {
      setCalAdded(false);
      setShowAddToCalModal(false);
    }, 1200);
  };

  // Status badge style
  const getStatusBadge = () => {
    switch (trend.status) {
      case 'Viral':
        return 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/40 dark:text-rose-400 dark:border-rose-900';
      case 'Rising':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-900';
      case 'Emerging':
        return 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/40 dark:text-purple-400 dark:border-purple-900';
      case 'Stable':
        return 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/40 dark:text-blue-400 dark:border-blue-900';
      case 'Declining':
        return 'bg-slate-100 text-slate-600 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  // Provenance label
  const getProvenanceBadge = () => {
    switch (trend.searchVolumeProvenance) {
      case 'measured':
        return <span className="text-[10px] uppercase font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/50 px-1.5 py-0.5 rounded">Measured</span>;
      case 'estimated':
        return <span className="text-[10px] uppercase font-bold text-amber-600 bg-amber-50 dark:bg-amber-950/50 px-1.5 py-0.5 rounded">Estimated</span>;
      case 'derived':
        return <span className="text-[10px] uppercase font-bold text-indigo-600 bg-indigo-50 dark:bg-indigo-950/50 px-1.5 py-0.5 rounded">Derived</span>;
      default:
        return <span className="text-[10px] uppercase font-bold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">Unavailable</span>;
    }
  };

  return (
    <div className="group relative flex flex-col justify-between bg-white dark:bg-slate-900/90 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm hover:shadow-xl hover:border-purple-300 dark:hover:border-purple-800/80 transition-all duration-300">
      <div>
        {/* Header row: Platform, Category, Country & Actions */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center flex-wrap gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 capitalize">
              <PlatformIconBadge platform={trend.platform} />
              {trend.platform.replace('-', ' ')}
            </span>

            <span className="text-xs px-2.5 py-1 rounded-lg bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 font-medium">
              {trend.category}
            </span>

            <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/80 px-2 py-0.5 rounded-lg border border-slate-200/80 dark:border-slate-700/80">
              <span className="text-xs">{getCountryFlag(trend.countryCode || trend.country)}</span>
              <span>{trend.country}</span>
            </span>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={handleBookmarkToggle}
              aria-label={isBookmarked ? 'Remove Bookmark' : 'Bookmark Trend'}
              className={`p-1.5 rounded-lg border transition-all ${
                isBookmarked
                  ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-300 text-amber-500'
                  : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
              }`}
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-amber-500 text-amber-500' : ''}`} />
            </button>

            <button
              onClick={handleShare}
              aria-label="Share Trend"
              className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Share2 className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Title & Description */}
        <Link href={`/trends/${trend.id}`} className="block group-hover:text-purple-600 transition-colors">
          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 line-clamp-2 leading-snug mb-1.5">
            {trend.title}
          </h3>
        </Link>

        <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed mb-4">
          {trend.description}
        </p>

        {/* Trend Metrics Row with Sparkline */}
        <div className="flex items-center justify-between gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 mb-3.5">
          <div>
            <div className="flex items-center gap-1.5 mb-0.5">
              <span className="text-sm font-extrabold text-slate-900 dark:text-white">
                {trend.searchVolumeFormatted}
              </span>
              {getProvenanceBadge()}
            </div>
            <div className="flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>+{trend.growthPercentage}% growth</span>
            </div>
          </div>

          <div className="text-right flex flex-col items-end">
            <SparklineChart
              data={trend.history}
              color={trend.growthPercentage > 100 ? '#7C3AED' : '#2563EB'}
              height={36}
              width={100}
            />
            <span className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5">30-day velocity</span>
          </div>
        </div>

        {/* Tags / Hashtags snippet */}
        <div className="flex flex-wrap items-center gap-1.5 mb-3">
          <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border ${getStatusBadge()}`}>
            {trend.status}
          </span>
          <OpportunityScoreBadge score={trend.opportunityScore} breakdown={trend.opportunityBreakdown} size="sm" />
          {trend.relatedHashtags.slice(0, 2).map((tag) => (
            <span key={tag} className="text-[11px] text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Card Footer: Metadata and Action Buttons */}
      <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
        <div className="flex items-center justify-between text-[11px] text-slate-400 dark:text-slate-500 mb-3">
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            Detected {new Date(trend.detectedAt).toLocaleDateString()}
          </span>
          {trend.isDemoData && (
            <span className="text-[10px] font-semibold px-1.5 py-0.2 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
              Demo Data
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <Link
            href={`/trends/${trend.id}`}
            className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold shadow-sm transition-all hover:shadow-purple-500/25"
          >
            <span>View Analytics</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>

          {showAiShortcut && (
            <Link
              href={`/generator?trend=${encodeURIComponent(trend.title)}&category=${encodeURIComponent(trend.category)}&platform=${trend.platform}`}
              title="Generate AI Content Pack"
              className="p-2 rounded-xl border border-purple-200 dark:border-purple-800/80 bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 hover:bg-purple-100 dark:hover:bg-purple-900/50 transition-colors"
            >
              <Sparkles className="w-4 h-4" />
            </Link>
          )}

          <button
            onClick={() => setShowAddToCalModal(true)}
            title="Add to Content Calendar"
            className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
          >
            <Calendar className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Add to Calendar Mini Modal */}
      {showAddToCalModal && (
        <div className="absolute inset-0 z-20 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm rounded-2xl p-4 flex flex-col justify-between animate-in fade-in zoom-in-95 duration-150">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-xs text-purple-600 dark:text-purple-400 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" /> Schedule in Calendar
              </span>
              <button
                onClick={() => setShowAddToCalModal(false)}
                className="text-xs text-slate-400 hover:text-slate-700 dark:hover:text-white"
              >
                ✕
              </button>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-1 font-semibold mb-3">
              {trend.title}
            </p>
            <label className="block text-[11px] font-medium text-slate-500 mb-1">Select Publishing Date:</label>
            <input
              type="date"
              value={scheduledDate}
              onChange={(e) => setScheduledDate(e.target.value)}
              className="w-full text-xs p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white mb-2"
            />
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setShowAddToCalModal(false)}
              className="flex-1 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300"
            >
              Cancel
            </button>
            <button
              onClick={handleAddToCalendar}
              className="flex-1 py-1.5 text-xs rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-semibold flex items-center justify-center gap-1"
            >
              {calAdded ? <Check className="w-3.5 h-3.5" /> : 'Confirm'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
