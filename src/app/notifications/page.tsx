'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { storage } from '@/lib/storage';
import { NotificationItem } from '@/types';
import { Bell, Check, Flame, Zap, Award, Sparkles } from 'lucide-react';

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);

  useEffect(() => {
    const load = () => setNotifications(storage.getNotifications());
    load();
    window.addEventListener('creator_trends_storage_updated', load);
    return () => window.removeEventListener('creator_trends_storage_updated', load);
  }, []);

  const handleMarkAll = () => {
    storage.markAllNotificationsRead();
  };

  const getIcon = (type: NotificationItem['type']) => {
    switch (type) {
      case 'surge':
        return <Flame className="w-4 h-4 text-rose-500" />;
      case 'breakout':
        return <Zap className="w-4 h-4 text-cyan-500" />;
      case 'milestone':
        return <Award className="w-4 h-4 text-purple-500" />;
      default:
        return <Bell className="w-4 h-4 text-slate-400" />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">
            Notifications & Trend Alerts
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time surge notifications, early breakout alerts, and digest updates.
          </p>
        </div>

        <button
          onClick={handleMarkAll}
          className="text-xs font-bold text-purple-600 hover:underline flex items-center gap-1"
        >
          <Check className="w-3.5 h-3.5" /> Mark all as read
        </button>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm divide-y divide-slate-100 dark:divide-slate-800 overflow-hidden">
        {notifications.map((n) => (
          <Link
            key={n.id}
            href={n.link || '/trends'}
            className={`p-5 flex items-start gap-4 transition-colors block ${
              n.read
                ? 'bg-transparent hover:bg-slate-50 dark:hover:bg-slate-800/40 text-slate-600 dark:text-slate-400'
                : 'bg-purple-50/40 dark:bg-purple-950/20 hover:bg-purple-100/40 text-slate-900 dark:text-white font-medium'
            }`}
          >
            <div className="p-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 flex-shrink-0">
              {getIcon(n.type)}
            </div>

            <div className="flex-1">
              <div className="flex items-center justify-between gap-2 mb-1">
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">{n.title}</h3>
                <span className="text-[11px] text-slate-400">{n.timestamp}</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{n.message}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
