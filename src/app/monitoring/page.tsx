'use client';

import React, { useState, useEffect } from 'react';
import { storage } from '@/lib/storage';
import { FollowedTopic } from '@/types';
import { Bell, Plus, Trash2, TrendingUp, Sliders, Check } from 'lucide-react';

export default function MonitoringPage() {
  const [topics, setTopics] = useState<FollowedTopic[]>([]);
  const [newKeyword, setNewKeyword] = useState('');
  const [newCategory, setNewCategory] = useState('Technology & AI');
  const [threshold, setThreshold] = useState(50);
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    const load = () => setTopics(storage.getFollowedTopics());
    load();
    window.addEventListener('creator_trends_storage_updated', load);
    return () => window.removeEventListener('creator_trends_storage_updated', load);
  }, []);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (newKeyword.trim()) {
      storage.addFollowedTopic(newKeyword.trim(), newCategory, threshold);
      setNewKeyword('');
      setShowAddModal(false);
    }
  };

  const handleRemove = (id: string) => {
    storage.removeFollowedTopic(id);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/40 px-3 py-1 rounded-full mb-2">
            <Bell className="w-3.5 h-3.5" /> Niche Watchdog
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
            Keyword & Topic Monitoring
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Follow critical hashtags, technologies, and creator topics with custom surge alerts.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Follow New Keyword</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {topics.map((t) => (
          <div
            key={t.id}
            className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 font-bold">
                  {t.category}
                </span>
                <button
                  onClick={() => handleRemove(t.id)}
                  className="text-slate-400 hover:text-rose-500 p-1 rounded-lg"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <h3 className="text-lg font-extrabold text-slate-900 dark:text-white mt-1">{t.keyword}</h3>
              <p className="text-xs text-slate-400 mt-0.5">Last alert triggered: {t.lastAlert}</p>

              <div className="mt-4 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500">Popularity Velocity:</span>
                  <strong className="text-emerald-600 dark:text-emerald-400">+{t.changePct}% (Surge)</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Alert Trigger Threshold:</span>
                  <strong className="text-purple-600">+{t.alertThreshold}% shift</strong>
                </div>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
              <span className="inline-flex items-center gap-1.5 text-emerald-600 font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Active Ingestion
              </span>
              <span className="text-slate-400">In-app & Email alerts ON</span>
            </div>
          </div>
        ))}
      </div>

      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 max-w-md w-full shadow-2xl">
            <h3 className="font-bold text-base text-slate-900 dark:text-white mb-3">Monitor New Keyword</h3>
            <form onSubmit={handleAdd} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-600 dark:text-slate-400 mb-1">Keyword or Topic</label>
                <input
                  type="text"
                  placeholder="e.g. Electric Supercars, LangGraph, Old Money Fashion"
                  value={newKeyword}
                  onChange={(e) => setNewKeyword(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none"
                  autoFocus
                />
              </div>

              <div>
                <label className="block font-bold text-slate-600 dark:text-slate-400 mb-1">Category</label>
                <input
                  type="text"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-600 dark:text-slate-400 mb-1">
                  Surge Threshold: +{threshold}%
                </label>
                <input
                  type="range"
                  min="20"
                  max="150"
                  step="5"
                  value={threshold}
                  onChange={(e) => setThreshold(Number(e.target.value))}
                  className="w-full"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 rounded-xl bg-purple-600 text-white font-bold"
                >
                  Start Monitoring
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
