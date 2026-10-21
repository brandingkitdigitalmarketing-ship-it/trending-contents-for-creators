'use client';

import React, { useState, useEffect } from 'react';
import { storage } from '@/lib/storage';
import { CalendarItem, CalendarStatus, PlatformId, ContentFormat } from '@/types';
import { ALL_PLATFORMS } from '@/data/seedTrends';
import { PlatformIconBadge } from '@/components/TrendCard';
import {
  Calendar as CalendarIcon,
  Plus,
  Trash2,
  CheckCircle2,
  Clock,
  Filter,
  ChevronLeft,
  ChevronRight,
  Video,
  FileText,
  MessageSquare,
} from 'lucide-react';

export default function CalendarPage() {
  const [items, setItems] = useState<CalendarItem[]>([]);
  const [viewMode, setViewMode] = useState<'month' | 'week' | 'list'>('month');
  const [filterPlatform, setFilterPlatform] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [showAddModal, setShowAddModal] = useState(false);

  // New item form state
  const [newTitle, setNewTitle] = useState('');
  const [newPlatform, setNewPlatform] = useState<PlatformId>('youtube');
  const [newDate, setNewDate] = useState('2026-10-22');
  const [newStatus, setNewStatus] = useState<CalendarStatus>('Planned');
  const [newFormat, setNewFormat] = useState<ContentFormat>('Video');
  const [newNotes, setNewNotes] = useState('');

  useEffect(() => {
    const load = () => setItems(storage.getCalendar());
    load();
    window.addEventListener('creator_trends_storage_updated', load);
    return () => window.removeEventListener('creator_trends_storage_updated', load);
  }, []);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTitle.trim()) {
      storage.addCalendarItem({
        title: newTitle.trim(),
        platform: newPlatform,
        date: newDate,
        status: newStatus,
        format: newFormat,
        notes: newNotes.trim(),
      });
      setNewTitle('');
      setNewNotes('');
      setShowAddModal(false);
    }
  };

  const handleStatusChange = (id: string, status: CalendarStatus) => {
    storage.updateCalendarItem(id, { status });
  };

  const handleDelete = (id: string) => {
    storage.deleteCalendarItem(id);
  };

  const filteredItems = items.filter((it) => {
    if (filterPlatform !== 'all' && it.platform !== filterPlatform) return false;
    if (filterStatus !== 'all' && it.status !== filterStatus) return false;
    return true;
  });

  // Calendar dates mock generator for October 2026
  const daysInOctober = Array.from({ length: 31 }, (_, i) => {
    const day = i + 1;
    const dateStr = `2026-10-${day.toString().padStart(2, '0')}`;
    const dayItems = filteredItems.filter((it) => it.date === dateStr);
    return { day, dateStr, dayItems };
  });

  const getStatusColor = (st: CalendarStatus) => {
    switch (st) {
      case 'Published':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400';
      case 'Ready':
        return 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/40 dark:text-blue-400';
      case 'In Progress':
        return 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-400';
      case 'Planned':
        return 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/40 dark:text-purple-400';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-400';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/40 px-3 py-1 rounded-full mb-2">
            <CalendarIcon className="w-3.5 h-3.5" /> Content Planning Schedule
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
            Content Production Calendar
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Organize upcoming video drops, Reels, carousels, and threads with drag-and-drop ease.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* View Mode Toggle */}
          <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs font-bold">
            {(['month', 'week', 'list'] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className={`px-3 py-1.5 rounded-lg capitalize transition-all ${
                  viewMode === mode
                    ? 'bg-purple-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                {mode}
              </button>
            ))}
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Schedule Idea</span>
          </button>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs">
        <div className="flex items-center gap-3">
          <span className="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5 text-purple-600" /> Filter:
          </span>

          <select
            value={filterPlatform}
            onChange={(e) => setFilterPlatform(e.target.value)}
            className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-medium"
          >
            <option value="all">All Platforms</option>
            {ALL_PLATFORMS.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-medium"
          >
            <option value="all">All Statuses</option>
            <option value="Idea">Idea</option>
            <option value="Planned">Planned</option>
            <option value="In Progress">In Progress</option>
            <option value="Ready">Ready</option>
            <option value="Published">Published</option>
          </select>
        </div>

        <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white">
          <span>October 2026</span>
        </div>
      </div>

      {/* MONTH VIEW GRID */}
      {viewMode === 'month' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm overflow-x-auto">
          {/* Day of Week Headers */}
          <div className="grid grid-cols-7 gap-2 text-center text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
            <div>Sun</div>
            <div>Mon</div>
            <div>Tue</div>
            <div>Wed</div>
            <div>Thu</div>
            <div>Fri</div>
            <div>Sat</div>
          </div>

          {/* Calendar Day Cells */}
          <div className="grid grid-cols-7 gap-2">
            {/* First 3 empty slots to align Oct 1, 2026 (Thursday) */}
            <div className="min-h-[100px] rounded-2xl bg-slate-50/40 dark:bg-slate-800/20 border border-transparent p-2 opacity-30" />
            <div className="min-h-[100px] rounded-2xl bg-slate-50/40 dark:bg-slate-800/20 border border-transparent p-2 opacity-30" />
            <div className="min-h-[100px] rounded-2xl bg-slate-50/40 dark:bg-slate-800/20 border border-transparent p-2 opacity-30" />
            <div className="min-h-[100px] rounded-2xl bg-slate-50/40 dark:bg-slate-800/20 border border-transparent p-2 opacity-30" />

            {daysInOctober.map((d) => (
              <div
                key={d.day}
                className={`min-h-[110px] rounded-2xl border p-2 flex flex-col justify-between transition-colors ${
                  d.day === 16
                    ? 'bg-purple-50/50 dark:bg-purple-950/20 border-purple-300 dark:border-purple-800'
                    : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200/80 dark:border-slate-700/80'
                }`}
              >
                <div className="flex items-center justify-between text-xs mb-1">
                  <span
                    className={`w-6 h-6 rounded-full flex items-center justify-center font-bold ${
                      d.day === 16
                        ? 'bg-purple-600 text-white'
                        : 'text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    {d.day}
                  </span>
                  {d.dayItems.length > 0 && (
                    <span className="text-[10px] font-bold text-purple-600">
                      {d.dayItems.length} items
                    </span>
                  )}
                </div>

                {/* Day Items Badges */}
                <div className="space-y-1">
                  {d.dayItems.map((item) => (
                    <div
                      key={item.id}
                      className="p-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-xs text-[10px]"
                    >
                      <div className="flex items-center justify-between gap-1">
                        <span className="font-bold text-slate-900 dark:text-white line-clamp-1">
                          {item.title}
                        </span>
                        <PlatformIconBadge platform={item.platform} />
                      </div>
                      <div className="flex items-center justify-between mt-1 text-[9px]">
                        <span className={`px-1.5 py-0.2 rounded font-semibold border ${getStatusColor(item.status)}`}>
                          {item.status}
                        </span>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="text-slate-400 hover:text-rose-500"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* LIST VIEW */}
      {(viewMode === 'list' || viewMode === 'week') && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-3">
          {filteredItems.length === 0 ? (
            <p className="text-center text-xs text-slate-400 py-12">No scheduled content matching filters.</p>
          ) : (
            filteredItems.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="inline-flex items-center gap-1 text-xs px-2.5 py-0.5 rounded-md bg-white dark:bg-slate-900 font-bold border border-slate-200 dark:border-slate-700 capitalize">
                      <PlatformIconBadge platform={item.platform} />
                      {item.platform}
                    </span>
                    <span className="text-xs text-purple-600 font-semibold">{item.format}</span>
                    <span className="text-xs text-slate-400">📅 {item.date}</span>
                  </div>
                  <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">{item.title}</h3>
                  {item.notes && <p className="text-xs text-slate-500 mt-0.5">{item.notes}</p>}
                </div>

                <div className="flex items-center gap-3">
                  <select
                    value={item.status}
                    onChange={(e) => handleStatusChange(item.id, e.target.value as CalendarStatus)}
                    className={`text-xs px-2.5 py-1 rounded-lg border font-bold ${getStatusColor(item.status)}`}
                  >
                    <option value="Idea">Idea</option>
                    <option value="Planned">Planned</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Ready">Ready</option>
                    <option value="Published">Published</option>
                  </select>

                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500"
                    title="Delete event"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Add Item Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 max-w-md w-full shadow-2xl">
            <h3 className="font-bold text-base text-slate-900 dark:text-white mb-3">Schedule Content Item</h3>
            <form onSubmit={handleCreate} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1">
                  Content Title / Headline
                </label>
                <input
                  type="text"
                  placeholder="e.g. 5 Autonomous AI Agent Pitfalls Breakdown"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full text-xs p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none"
                  autoFocus
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1">Platform</label>
                  <select
                    value={newPlatform}
                    onChange={(e) => setNewPlatform(e.target.value as PlatformId)}
                    className="w-full text-xs p-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                  >
                    {ALL_PLATFORMS.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1">Format</label>
                  <select
                    value={newFormat}
                    onChange={(e) => setNewFormat(e.target.value as ContentFormat)}
                    className="w-full text-xs p-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                  >
                    <option value="Video">Video</option>
                    <option value="Short">Short</option>
                    <option value="Reel">Reel</option>
                    <option value="Post">Post</option>
                    <option value="Article">Article</option>
                    <option value="Discussion">Discussion</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1">Publish Date</label>
                  <input
                    type="date"
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    className="w-full text-xs p-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                  >
                  </input>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1">Status</label>
                  <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value as CalendarStatus)}
                    className="w-full text-xs p-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                  >
                    <option value="Idea">Idea</option>
                    <option value="Planned">Planned</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Ready">Ready</option>
                    <option value="Published">Published</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1">Notes & Links</label>
                <textarea
                  placeholder="Script outlines, asset links..."
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                  rows={2}
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 text-xs rounded-xl bg-purple-600 text-white font-bold"
                >
                  Schedule Item
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
