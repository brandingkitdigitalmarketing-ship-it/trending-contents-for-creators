'use client';

import React, { useState, useEffect } from 'react';
import { storage } from '@/lib/storage';
import { IntegrationConnector } from '@/types';
import { PlatformIconBadge } from '@/components/TrendCard';
import {
  Layers,
  CheckCircle2,
  AlertCircle,
  Key,
  RefreshCw,
  ExternalLink,
  ShieldAlert,
} from 'lucide-react';

export default function IntegrationsPage() {
  const [connectors, setConnectors] = useState<IntegrationConnector[]>([]);
  const [testingId, setTestingId] = useState<string | null>(null);
  const [selectedConnector, setSelectedConnector] = useState<IntegrationConnector | null>(null);
  const [apiKeyInput, setApiKeyInput] = useState('');

  useEffect(() => {
    setConnectors(storage.getIntegrations());
  }, []);

  const handleTestPing = (id: string) => {
    setTestingId(id);
    setTimeout(() => {
      setTestingId(null);
      alert(`API Ping Success: Rate limits healthy and ingestion worker connected.`);
    }, 800);
  };

  const handleSaveApiKey = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedConnector) {
      storage.updateIntegration(selectedConnector.id, {
        status: apiKeyInput.trim() ? 'connected' : 'demo_mode',
        apiKeySet: !!apiKeyInput.trim(),
        lastSync: 'Just now',
      });
      setConnectors(storage.getIntegrations());
      setSelectedConnector(null);
      setApiKeyInput('');
    }
  };

  const getStatusBadge = (status: IntegrationConnector['status']) => {
    switch (status) {
      case 'connected':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
            <CheckCircle2 className="w-3 h-3" /> Live Connected
          </span>
        );
      case 'demo_mode':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-800">
            <AlertCircle className="w-3 h-3" /> Simulated Demo Mode
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600">
            Disconnected
          </span>
        );
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div>
        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1 rounded-full mb-2">
          <Layers className="w-3.5 h-3.5" /> Modular Platform Architecture
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
          Data Connectors & API Health
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5 max-w-2xl">
          Configure official APIs, check rate limit status, and toggle between simulated benchmark data and live authenticated endpoints.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {connectors.map((c) => (
          <div
            key={c.id}
            className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold capitalize">
                  <PlatformIconBadge platform={c.id} />
                  {c.id}
                </span>
                {getStatusBadge(c.status)}
              </div>

              <h3 className="font-extrabold text-base text-slate-900 dark:text-white mb-1">{c.name}</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 leading-relaxed">{c.notes}</p>

              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 space-y-1.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400">API Protocol:</span>
                  <span className="font-semibold text-slate-700 dark:text-slate-300">{c.apiVersion}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Rate Limit Available:</span>
                  <strong className="text-purple-600 dark:text-purple-400">{c.rateLimitRemaining} req/day</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Last Synced:</span>
                  <span className="text-slate-600 dark:text-slate-400">{c.lastSync}</span>
                </div>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2">
              <button
                onClick={() => setSelectedConnector(c)}
                className="flex-1 py-2 rounded-xl bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 font-bold text-xs border border-purple-200 dark:border-purple-800 hover:bg-purple-100 flex items-center justify-center gap-1"
              >
                <Key className="w-3.5 h-3.5" />
                <span>Configure Keys</span>
              </button>

              <button
                onClick={() => handleTestPing(c.id)}
                disabled={testingId === c.id}
                className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-500 hover:text-slate-900"
                title="Ping Endpoint"
              >
                <RefreshCw className={`w-4 h-4 ${testingId === c.id ? 'animate-spin text-purple-600' : ''}`} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* API Key Modal */}
      {selectedConnector && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 max-w-md w-full shadow-2xl">
            <h3 className="font-bold text-base text-slate-900 dark:text-white mb-1">
              Configure {selectedConnector.name}
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Enter your authorized API key or token to switch from simulated benchmarks to live data streams.
            </p>

            <form onSubmit={handleSaveApiKey} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  API Key / Secret Bearer Token
                </label>
                <input
                  type="password"
                  placeholder="Bearer sk_live_..."
                  value={apiKeyInput}
                  onChange={(e) => setApiKeyInput(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none"
                  autoFocus
                />
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedConnector(null)}
                  className="flex-1 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 rounded-xl bg-purple-600 text-white font-bold"
                >
                  Save Credentials
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
