'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { SEED_TRENDS } from '@/data/seedTrends';
import { storage } from '@/lib/storage';
import { Bookmark, CalendarItem, FollowedTopic, UserProfile, TrendItem } from '@/types';
import TrendCard from '@/components/TrendCard';
import OpportunityScoreBadge from '@/components/OpportunityScoreBadge';
import {
  Compass,
  Sparkles,
  TrendingUp,
  Bookmark as BookmarkIcon,
  Calendar,
  Bell,
  ArrowRight,
  Flame,
  Plus,
  Eye,
  CheckCircle2,
  Clock,
} from 'lucide-react';

export default function DashboardPage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [calendarItems, setCalendarItems] = useState<CalendarItem[]>([]);
  const [followed, setFollowed] = useState<FollowedTopic[]>([]);

  useEffect(() => {
    const loadData = () => {
      setProfile(storage.getUserProfile());
      setBookmarks(storage.getBookmarks());
      setCalendarItems(storage.getCalendar());
      setFollowed(storage.getFollowedTopics());
    };
    loadData();
    window.addEventListener('creator_trends_storage_updated', loadData);
    return () => window.removeEventListener('creator_trends_storage_updated', loadData);
  }, []);

  const highOpportunityTrends = SEED_TRENDS.filter((t) => t.opportunityScore >= 88).slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 text-white p-6 sm:p-8 shadow-xl mb-8 border border-purple-800/40">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-bold text-cyan-300 border border-white/15 mb-3">
              <Sparkles className="w-3.5 h-3.5" /> Personalized Intelligence Digest
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight">
              Welcome back, {profile?.name?.split(' ')[0] || 'Alex'}! 👋
            </h1>
            <p className="text-sm text-slate-300 max-w-xl mt-1.5 leading-relaxed">
              Here is your daily creative radar based on your preferred platforms (YouTube, Instagram, X) and focus categories.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Link
              href="/generator"
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-cyan-400 hover:opacity-95 text-white font-bold text-xs shadow-lg shadow-purple-600/30 flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Generate Ideas</span>
            </Link>
            <Link
              href="/calendar"
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-xs flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Open Calendar</span>
            </Link>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8 pt-6 border-t border-white/10">
          <div>
            <span className="text-xs text-slate-400">Monthly Searches</span>
            <div className="text-xl font-bold mt-0.5">
              {profile?.usage.searchesUsed} / {profile?.usage.searchesLimit}
            </div>
          </div>
          <div>
            <span className="text-xs text-slate-400">Saved Bookmarks</span>
            <div className="text-xl font-bold mt-0.5">{bookmarks.length} topics</div>
          </div>
          <div>
            <span className="text-xs text-slate-400">Followed Topics</span>
            <div className="text-xl font-bold mt-0.5">{followed.length} keywords</div>
          </div>
          <div>
            <span className="text-xs text-slate-400">Scheduled Content</span>
            <div className="text-xl font-bold mt-0.5">{calendarItems.length} planned</div>
          </div>
        </div>
      </div>

      {/* Main Grid: Recommended Trends + Followed / Calendar Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: High Opportunity Feed */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Flame className="w-5 h-5 text-rose-500" />
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Top Opportunity Recommendations
              </h2>
            </div>
            <Link
              href="/trends"
              className="text-xs font-bold text-purple-600 dark:text-purple-400 hover:underline flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {highOpportunityTrends.map((trend) => (
              <TrendCard key={trend.id} trend={trend} />
            ))}
          </div>

          {/* Quick AI Generator Launchpad Banner */}
          <div className="p-6 rounded-3xl bg-gradient-to-r from-purple-50 via-indigo-50 to-cyan-50 dark:from-purple-950/30 dark:via-indigo-950/30 dark:to-cyan-950/30 border border-purple-200 dark:border-purple-800/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-purple-700 dark:text-purple-300 bg-purple-200/60 dark:bg-purple-900/60 px-2 py-0.5 rounded">
                AI Studio
              </span>
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white mt-1">
                Have a customized topic in mind?
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                Generate 10 ideas, 5 viral hooks, and ready scripts in seconds.
              </p>
            </div>
            <Link
              href="/generator"
              className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-sm flex items-center gap-1.5 flex-shrink-0"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Launch Studio</span>
            </Link>
          </div>
        </div>

        {/* Right Col: Followed Topics & Calendar Preview */}
        <div className="space-y-6">
          {/* Followed Keywords Watchlist */}
          <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 mb-3">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-purple-600" /> Monitored Topics
              </h3>
              <Link href="/monitoring" className="text-xs text-purple-600 hover:underline">
                Manage
              </Link>
            </div>

            <div className="space-y-3">
              {followed.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-xs"
                >
                  <div>
                    <span className="font-bold text-slate-900 dark:text-white block">{item.keyword}</span>
                    <span className="text-[10px] text-slate-400">{item.category}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-extrabold text-emerald-600 dark:text-emerald-400 block">
                      +{item.changePct}%
                    </span>
                    <span className="text-[10px] text-slate-400">{item.lastAlert}</span>
                  </div>
                </div>
              ))}
            </div>

            <Link
              href="/monitoring"
              className="mt-3 block text-center py-2 rounded-xl border border-dashed border-slate-200 dark:border-slate-700 text-xs text-purple-600 dark:text-purple-400 font-semibold hover:bg-purple-50 dark:hover:bg-purple-950/30"
            >
              + Follow New Keyword
            </Link>
          </div>

          {/* Upcoming Content Calendar Schedule */}
          <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 mb-3">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <Calendar className="w-4 h-4 text-purple-600" /> Upcoming Content
              </h3>
              <Link href="/calendar" className="text-xs text-purple-600 hover:underline">
                Full Calendar
              </Link>
            </div>

            <div className="space-y-3">
              {calendarItems.slice(0, 3).map((cal) => (
                <div
                  key={cal.id}
                  className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-xs"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] uppercase font-bold text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/60 px-2 py-0.2 rounded">
                      {cal.platform}
                    </span>
                    <span className="text-[10px] font-semibold text-slate-500">📅 {cal.date}</span>
                  </div>
                  <h4 className="font-bold text-slate-900 dark:text-white line-clamp-1">{cal.title}</h4>
                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-200/50 dark:border-slate-700/50 text-[10px]">
                    <span className="text-slate-400">Status: {cal.status}</span>
                    <span className="text-purple-600 font-medium">{cal.format}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
