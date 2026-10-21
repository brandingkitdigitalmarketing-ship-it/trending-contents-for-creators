'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { storage } from '@/lib/storage';
import { Collection, Bookmark } from '@/types';
import {
  Folder,
  Plus,
  Trash2,
  Share2,
  Layers,
  Check,
  ExternalLink,
  Bookmark as BookmarkIcon,
} from 'lucide-react';

export default function CollectionsPage() {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [newColName, setNewColName] = useState('');
  const [newColDesc, setNewColDesc] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [shareSuccess, setShareSuccess] = useState<string | null>(null);

  useEffect(() => {
    const load = () => {
      setCollections(storage.getCollections());
      setBookmarks(storage.getBookmarks());
    };
    load();
    window.addEventListener('creator_trends_storage_updated', load);
    return () => window.removeEventListener('creator_trends_storage_updated', load);
  }, []);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (newColName.trim()) {
      storage.createCollection(newColName.trim(), newColDesc.trim());
      setNewColName('');
      setNewColDesc('');
      setShowAddModal(false);
    }
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete this collection? (Bookmarks will remain preserved)')) {
      storage.deleteCollection(id);
    }
  };

  const handleShare = async (id: string) => {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(`${window.location.origin}/collections?shared=${id}`);
      setShareSuccess(id);
      setTimeout(() => setShareSuccess(null), 2000);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/40 px-3 py-1 rounded-full mb-2">
            <Layers className="w-3.5 h-3.5" /> Workspace Folders
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
            My Collections & Research Folders
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Group your saved trends by client campaign, video series, or publishing schedule.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>New Collection Folder</span>
        </button>
      </div>

      {/* Collections Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {collections.map((col) => {
          const count = bookmarks.filter((b) => b.collectionId === col.id).length;
          return (
            <div
              key={col.id}
              className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between hover:border-purple-300 dark:hover:border-purple-800 transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div
                    className="w-10 h-10 rounded-2xl flex items-center justify-center text-white font-bold"
                    style={{ backgroundColor: col.color || '#7C3AED' }}
                  >
                    <Folder className="w-5 h-5" />
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleShare(col.id)}
                      className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                      title="Share Collection Link"
                    >
                      {shareSuccess === col.id ? <Check className="w-4 h-4 text-emerald-500" /> : <Share2 className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={() => handleDelete(col.id)}
                      className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-400 hover:text-rose-500"
                      title="Delete Collection"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <h3 className="font-extrabold text-base text-slate-900 dark:text-white mb-1">{col.name}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mb-4 leading-relaxed">
                  {col.description || 'Custom research folder for ideas and scripts.'}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-600 dark:text-slate-300 flex items-center gap-1">
                  <BookmarkIcon className="w-3.5 h-3.5 text-purple-600" />
                  {count} saved topics
                </span>
                <Link
                  href="/bookmarks"
                  className="text-xs font-bold text-purple-600 dark:text-purple-400 hover:underline flex items-center gap-1"
                >
                  <span>Open Folder</span>
                  <ExternalLink className="w-3 h-3" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 max-w-md w-full shadow-2xl">
            <h3 className="font-bold text-base text-slate-900 dark:text-white mb-2">Create New Collection</h3>
            <form onSubmit={handleCreate} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1">
                  Collection Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Client X Campaign Ideas"
                  value={newColName}
                  onChange={(e) => setNewColName(e.target.value)}
                  className="w-full text-xs p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-purple-500"
                  autoFocus
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1">
                  Description
                </label>
                <textarea
                  placeholder="Brief summary of topics stored here..."
                  value={newColDesc}
                  onChange={(e) => setNewColDesc(e.target.value)}
                  className="w-full text-xs p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none"
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
                  Create Folder
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
