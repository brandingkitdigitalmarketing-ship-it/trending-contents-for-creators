'use client';

import React, { useState } from 'react';
import { SEED_TRENDS, ALL_CATEGORIES } from '@/data/seedTrends';
import {
  Shield,
  Users,
  Activity,
  Layers,
  DollarSign,
  Database,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Search,
} from 'lucide-react';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'ingestion' | 'users' | 'categories'>('overview');
  const [ingestionRunning, setIngestionRunning] = useState(false);
  const [logs, setLogs] = useState([
    '[21:40:12] Ingested 420 trending queries from Google Trends Aggregator. Latency: 120ms.',
    '[21:42:05] Synced YouTube Data API v3 trending charts (US, IN, GB). 18 new breakout videos identified.',
    '[21:44:18] Reddit crawler parsed r/LocalLLaMA & r/space threads. Sentiment: +84% positive.',
    '[21:46:55] Opportunity scoring pipeline executed for 50 records. 4 items elevated to Viral status.',
    '[21:50:00] Rate limit usage: 12% of daily allocation consumed.',
  ]);

  const handleRunIngestion = () => {
    setIngestionRunning(true);
    setTimeout(() => {
      setIngestionRunning(false);
      setLogs((prev) => [
        `[${new Date().toLocaleTimeString()}] Manual ingestion job completed successfully. 12 fresh signals updated.`,
        ...prev,
      ]);
    }, 1200);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Admin Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 px-3 py-1 rounded-full mb-2">
            <Shield className="w-3.5 h-3.5" /> Server-Authorized Superadmin
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
            Creator Trends Administration
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Monitor background ingestion workers, revenue metrics, subscriptions, and platform APIs.
          </p>
        </div>

        <button
          onClick={handleRunIngestion}
          disabled={ingestionRunning}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-sm"
        >
          <RefreshCw className={`w-4 h-4 ${ingestionRunning ? 'animate-spin' : ''}`} />
          <span>{ingestionRunning ? 'Ingesting Feeds...' : 'Trigger Manual Ingestion Job'}</span>
        </button>
      </div>

      {/* Admin KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-xs text-slate-400 font-bold uppercase">Total Subscribed MRR</span>
          <div className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">$48,250</div>
          <span className="text-xs text-emerald-600 font-semibold mt-1 block">+18.4% this month</span>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-xs text-slate-400 font-bold uppercase">Active Paid Users</span>
          <div className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">2,410</div>
          <span className="text-xs text-slate-500 mt-1 block">94.2% retention rate</span>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-xs text-slate-400 font-bold uppercase">Active Trend Ingests</span>
          <div className="text-2xl font-extrabold text-purple-600 mt-1">50 Topics</div>
          <span className="text-xs text-emerald-600 font-semibold mt-1 block">100% healthy feeds</span>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-xs text-slate-400 font-bold uppercase">Average Ingestion Latency</span>
          <div className="text-2xl font-extrabold text-cyan-500 mt-1">142 ms</div>
          <span className="text-xs text-slate-500 mt-1 block">SLA Target &lt; 300ms</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'overview'
              ? 'bg-purple-600 text-white'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          📊 Trend Ingestion Logs
        </button>
        <button
          onClick={() => setActiveTab('users')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'users'
              ? 'bg-purple-600 text-white'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          👥 User & Plan Management
        </button>
        <button
          onClick={() => setActiveTab('categories')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'categories'
              ? 'bg-purple-600 text-white'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          🏷️ Categories Control
        </button>
      </div>

      {/* Log Console */}
      {activeTab === 'overview' && (
        <div className="p-6 rounded-3xl bg-slate-950 text-slate-200 font-mono text-xs border border-slate-800 shadow-2xl space-y-2">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-slate-400 font-sans">
            <span className="flex items-center gap-2 text-emerald-400 font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Live Telemetry Stream
            </span>
            <span>Worker Node: us-east-worker-01</span>
          </div>
          <div className="space-y-1.5 pt-2">
            {logs.map((log, i) => (
              <p key={i} className="text-emerald-400/90 leading-relaxed">
                {log}
              </p>
            ))}
          </div>
        </div>
      )}

      {/* Users Tab */}
      {activeTab === 'users' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400">
                <th className="pb-3">User</th>
                <th className="pb-3">Email</th>
                <th className="pb-3">Plan</th>
                <th className="pb-3">Searches Used</th>
                <th className="pb-3">Joined Date</th>
                <th className="pb-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              <tr>
                <td className="py-3 font-bold text-slate-900 dark:text-white">Alex Rivera</td>
                <td className="py-3 text-slate-500">alex.creator@example.com</td>
                <td className="py-3">
                  <span className="px-2 py-0.5 rounded bg-purple-100 text-purple-700 font-bold">Creator Pro</span>
                </td>
                <td className="py-3 text-slate-700 dark:text-slate-300">38 / 500</td>
                <td className="py-3 text-slate-400">Oct 12, 2026</td>
                <td className="py-3 text-emerald-600 font-bold">Active</td>
              </tr>
              <tr>
                <td className="py-3 font-bold text-slate-900 dark:text-white">Elena Rostova</td>
                <td className="py-3 text-slate-500">elena@techstudio.io</td>
                <td className="py-3">
                  <span className="px-2 py-0.5 rounded bg-cyan-100 text-cyan-800 font-bold">Agency</span>
                </td>
                <td className="py-3 text-slate-700 dark:text-slate-300">894 / Unlimited</td>
                <td className="py-3 text-slate-400">Sep 28, 2026</td>
                <td className="py-3 text-emerald-600 font-bold">Active</td>
              </tr>
              <tr>
                <td className="py-3 font-bold text-slate-900 dark:text-white">Marcus Vance</td>
                <td className="py-3 text-slate-500">marcus@vancegaming.gg</td>
                <td className="py-3">
                  <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-bold">Free</span>
                </td>
                <td className="py-3 text-slate-700 dark:text-slate-300">49 / 50</td>
                <td className="py-3 text-slate-400">Oct 15, 2026</td>
                <td className="py-3 text-amber-600 font-bold">Near Limit</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {/* Categories Tab */}
      {activeTab === 'categories' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
          <h3 className="font-bold text-sm text-slate-900 dark:text-white mb-4">
            System Supported Categories ({ALL_CATEGORIES.length})
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 text-xs">
            {ALL_CATEGORIES.map((cat) => (
              <div
                key={cat}
                className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center justify-between"
              >
                <span className="font-bold text-slate-800 dark:text-slate-200">{cat}</span>
                <span className="text-[10px] text-emerald-600 font-semibold">Enabled</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
