'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { storage } from '@/lib/storage';
import { Bookmark, Collection } from '@/types';
import TrendCard from '@/components/TrendCard';
import {
  Bookmark as BookmarkIcon,
  Search,
  Download,
  FolderPlus,
  Trash2,
  Tag,
  Edit3,
  Check,
  Share2,
  ExternalLink,
} from 'lucide-react';

export default function BookmarksPage() {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [collections, setCollections] = useState<Collection[]>([]);
  const [selectedCollection, setSelectedCollection] = useState<string>('all');
  const [searchFilter, setSearchFilter] = useState('');
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [tempNote, setTempNote] = useState('');

  useEffect(() => {
    const load = () => {
      setBookmarks(storage.getBookmarks());
      setCollections(storage.getCollections());
    };
    load();
    window.addEventListener('creator_trends_storage_updated', load);
    return () => window.removeEventListener('creator_trends_storage_updated', load);
  }, []);

  const handleRemove = (id: string) => {
    storage.removeBookmark(id);
  };

  const handleSaveNote = (id: string) => {
    storage.updateBookmark(id, { notes: tempNote });
    setEditingNoteId(null);
  };

  const handleExportCsv = () => {
    const headers = ['Title', 'Platform', 'Category', 'Country', 'Search_Volume', 'Growth_Pct', 'Opportunity_Score', 'Personal_Notes'];
    const rows = bookmarks.map(
      (b) =>
        `"${b.trend.title.replace(/"/g, '""')}","${b.trend.platform}","${b.trend.category}","${b.trend.country}","${
          b.trend.searchVolumeFormatted
        }","${b.trend.growthPercentage}%","${b.trend.opportunityScore}","${(b.notes || '').replace(/"/g, '""')}"`
    );
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows].join('\n');
    const encoded = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encoded);
    link.setAttribute('download', 'creator_trends_bookmarks.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredBookmarks = bookmarks.filter((b) => {
    if (selectedCollection !== 'all' && b.collectionId !== selectedCollection) return false;
    if (searchFilter.trim()) {
      const q = searchFilter.toLowerCase();
      const matchTitle = b.trend.title.toLowerCase().includes(q);
      const matchCat = b.trend.category.toLowerCase().includes(q);
      const matchNotes = (b.notes || '').toLowerCase().includes(q);
      const matchTags = b.tags.some((t) => t.toLowerCase().includes(q));
      if (!matchTitle && !matchCat && !matchNotes && !matchTags) return false;
    }
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 px-3 py-1 rounded-full mb-2">
            <BookmarkIcon className="w-3.5 h-3.5 fill-amber-500" /> My Saved Research
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
            Bookmarks & Collections
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Organize high-signal trends into production folders, attach creator notes, and export CSVs.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/collections"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800 text-xs font-bold hover:bg-purple-100"
          >
            <FolderPlus className="w-4 h-4" />
            <span>Manage Collections</span>
          </Link>

          <button
            onClick={handleExportCsv}
            disabled={bookmarks.length === 0}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white text-xs font-bold shadow-sm"
          >
            <Download className="w-4 h-4" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Filter and Collections Selector Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
        {/* Collections filter pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
          <button
            onClick={() => setSelectedCollection('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
              selectedCollection === 'all'
                ? 'bg-purple-600 text-white border-purple-600'
                : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
            }`}
          >
            All Bookmarks ({bookmarks.length})
          </button>

          {collections.map((col) => (
            <button
              key={col.id}
              onClick={() => setSelectedCollection(col.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
                selectedCollection === col.id
                  ? 'bg-purple-600 text-white border-purple-600'
                  : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
              }`}
            >
              {col.name}
            </button>
          ))}
        </div>

        {/* Search within bookmarks */}
        <div className="relative min-w-[240px]">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search saved topics, notes, tags..."
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            className="w-full text-xs pl-8 pr-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 outline-none"
          />
        </div>
      </div>

      {/* Bookmarks List */}
      {filteredBookmarks.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-12 text-center">
          <BookmarkIcon className="w-12 h-12 text-slate-300 dark:text-slate-700 mx-auto mb-3" />
          <h3 className="font-bold text-base text-slate-900 dark:text-white mb-1">
            No bookmarks in this folder
          </h3>
          <p className="text-xs text-slate-500 mb-4 max-w-sm mx-auto">
            Discover topics on the Trends engine and click the bookmark icon to save them here.
          </p>
          <Link href="/trends" className="px-4 py-2 rounded-xl bg-purple-600 text-white text-xs font-bold">
            Explore Trending Topics
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBookmarks.map((b) => (
            <div key={b.id} className="relative flex flex-col justify-between">
              <TrendCard trend={b.trend} />

              {/* Personal Notes Box Attached to Card */}
              <div className="mt-2 p-3 rounded-2xl bg-slate-100/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 text-xs">
                <div className="flex items-center justify-between mb-1 text-[11px] font-bold text-slate-500 dark:text-slate-400">
                  <span className="flex items-center gap-1">
                    <Edit3 className="w-3 h-3" /> Creator Notes:
                  </span>
                  <button
                    onClick={() => {
                      if (editingNoteId === b.id) {
                        handleSaveNote(b.id);
                      } else {
                        setEditingNoteId(b.id);
                        setTempNote(b.notes || '');
                      }
                    }}
                    className="text-purple-600 hover:underline"
                  >
                    {editingNoteId === b.id ? 'Save' : 'Edit'}
                  </button>
                </div>

                {editingNoteId === b.id ? (
                  <textarea
                    value={tempNote}
                    onChange={(e) => setTempNote(e.target.value)}
                    className="w-full text-xs p-2 rounded-lg bg-white dark:bg-slate-900 border border-purple-500 text-slate-900 dark:text-white outline-none"
                    rows={2}
                    autoFocus
                  />
                ) : (
                  <p className="text-slate-700 dark:text-slate-300 italic">
                    {b.notes || 'No custom notes added yet. Click edit to add production notes.'}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
