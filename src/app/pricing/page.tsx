'use client';

import React, { useState, useEffect } from 'react';
import { storage } from '@/lib/storage';
import { UserProfile } from '@/types';
import {
  Check,
  Sparkles,
  Zap,
  Shield,
  HelpCircle,
  TrendingUp,
} from 'lucide-react';

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [upgradedPlan, setUpgradedPlan] = useState<string | null>(null);

  useEffect(() => {
    setProfile(storage.getUserProfile());
  }, []);

  const handleSelectPlan = (planName: 'Free' | 'Creator Pro' | 'Agency') => {
    storage.updateUserProfile({ plan: planName });
    setProfile(storage.getUserProfile());
    setUpgradedPlan(planName);
    setTimeout(() => setUpgradedPlan(null), 3000);
  };

  const plans = [
    {
      name: 'Free',
      tagline: 'Essential discovery for aspiring and part-time creators.',
      priceMonthly: 0,
      priceAnnual: 0,
      features: [
        '50 trend searches / month',
        'Top 10 daily trending topics',
        'Basic platform filters (YouTube & Instagram)',
        'Up to 15 saved bookmarks',
        'Standard search demand ratings',
        'Community Help Center access',
      ],
      notIncluded: [
        'AI Content Idea Generator',
        'Regional country comparisons',
        'Custom collection folders',
        'CSV raw data exports',
        'Keyword surge SMS/Email alerts',
      ],
      cta: 'Current Plan',
      popular: false,
    },
    {
      name: 'Creator Pro',
      tagline: 'High-octane intelligence engine for full-time content creators.',
      priceMonthly: 29,
      priceAnnual: 23,
      features: [
        '500 trend searches / month',
        'Full 9+ platform real-time stream',
        '100 saved bookmarks & unlimited collections',
        'AI Content Idea Studio (250 pack runs/mo)',
        'Content Opportunity Score breakdown',
        'Interactive Global Trend Radar (10+ markets)',
        'Drag-and-drop Content Calendar',
        'CSV & JSON data exports',
        'Priority email & chat support',
      ],
      notIncluded: [
        'Multi-user seats & team permissions',
        'Client-specific partitioned workspaces',
        'Custom webhook feed ingestion',
      ],
      cta: 'Upgrade to Creator Pro',
      popular: true,
    },
    {
      name: 'Agency',
      tagline: 'For production studios, talent managers, and marketing agencies.',
      priceMonthly: 99,
      priceAnnual: 79,
      features: [
        'Unlimited monthly searches',
        'Unlimited bookmarks & team folders',
        'Unlimited AI Content Idea Generations',
        'Multi-client segregated workspaces (up to 15)',
        '5 Team member seats included',
        'Modular custom platform webhook connector',
        'White-label trend report exports (PDF / CSV)',
        'Dedicated account strategist',
        'SLA 99.9% uptime guarantee',
      ],
      notIncluded: [],
      cta: 'Switch to Agency',
      popular: false,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/40 px-3 py-1 rounded-full mb-3">
          <Sparkles className="w-3.5 h-3.5" /> Transparent SaaS Pricing
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white">
          Predictable Plans For Every Stage of Growth
        </h1>
        <p className="text-base text-slate-500 dark:text-slate-400 mt-3 leading-relaxed">
          Unlock unfair creative advantage. Spot rising trends weeks before your competitors and convert demand into views.
        </p>

        {/* Monthly / Annual Toggle */}
        <div className="mt-8 inline-flex items-center gap-3 p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
          <button
            onClick={() => setBillingCycle('monthly')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              billingCycle === 'monthly'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Monthly Billing
          </button>
          <button
            onClick={() => setBillingCycle('annual')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              billingCycle === 'annual'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <span>Annual Billing</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-cyan-400 text-slate-900 font-extrabold">
              Save 20%
            </span>
          </button>
        </div>
      </div>

      {/* Upgrade Toast Feedback */}
      {upgradedPlan && (
        <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 text-center font-bold text-sm animate-in fade-in zoom-in-95">
          🎉 Successfully updated plan to {upgradedPlan}! Your account limits and permissions have been refreshed.
        </div>
      )}

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
        {plans.map((p) => {
          const isCurrentPlan = profile?.plan === p.name;
          const displayPrice = billingCycle === 'annual' ? p.priceAnnual : p.priceMonthly;

          return (
            <div
              key={p.name}
              className={`relative flex flex-col justify-between rounded-3xl p-8 transition-all duration-300 ${
                p.popular
                  ? 'bg-white dark:bg-slate-900 border-2 border-purple-500 shadow-2xl shadow-purple-500/10 scale-105 z-10'
                  : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md'
              }`}
            >
              {p.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-purple-600 to-cyan-500 text-white text-[11px] font-extrabold uppercase tracking-wider shadow-md">
                  Most Popular for Creators
                </div>
              )}

              <div>
                <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">{p.name}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 min-h-[32px]">{p.tagline}</p>

                <div className="mt-6 flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-slate-900 dark:text-white">
                    ${displayPrice}
                  </span>
                  <span className="text-xs text-slate-400">/ month</span>
                </div>
                {billingCycle === 'annual' && p.priceAnnual > 0 && (
                  <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold mt-1 block">
                    Billed annually (${p.priceAnnual * 12}/yr)
                  </span>
                )}

                {/* Features list */}
                <div className="mt-8 space-y-3 text-xs">
                  <span className="font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider text-[11px] block">
                    What&apos;s Included:
                  </span>
                  {p.features.map((feat) => (
                    <div key={feat} className="flex items-start gap-2.5">
                      <div className="p-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 mt-0.5 flex-shrink-0">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-slate-700 dark:text-slate-300">{feat}</span>
                    </div>
                  ))}

                  {p.notIncluded.map((nfeat) => (
                    <div key={nfeat} className="flex items-start gap-2.5 opacity-40">
                      <span className="text-slate-400 text-xs mt-0.5">•</span>
                      <span className="text-slate-400 line-through">{nfeat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
                <button
                  onClick={() => handleSelectPlan(p.name as any)}
                  disabled={isCurrentPlan}
                  className={`w-full py-3.5 rounded-xl font-bold text-xs transition-all ${
                    isCurrentPlan
                      ? 'bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-default'
                      : p.popular
                      ? 'bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500 hover:opacity-95 text-white shadow-md shadow-purple-600/25'
                      : 'bg-slate-900 hover:bg-slate-800 text-white dark:bg-slate-800 dark:hover:bg-slate-700'
                  }`}
                >
                  {isCurrentPlan ? '✓ Active Plan' : p.cta}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Account Usage Indicator (Section 13 requirement) */}
      <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/80 max-w-3xl mx-auto">
        <h3 className="font-bold text-sm text-slate-900 dark:text-white mb-3 flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-purple-600" /> Current Plan Usage Meters
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div>
            <div className="flex justify-between mb-1 text-slate-600 dark:text-slate-300">
              <span>Monthly Searches</span>
              <strong>{profile?.usage.searchesUsed} / {profile?.usage.searchesLimit}</strong>
            </div>
            <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
              <div
                className="bg-purple-600 h-full rounded-full"
                style={{ width: `${((profile?.usage.searchesUsed || 0) / (profile?.usage.searchesLimit || 1)) * 100}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-1 text-slate-600 dark:text-slate-300">
              <span>Saved Bookmarks</span>
              <strong>{profile?.usage.bookmarksUsed} / {profile?.usage.bookmarksLimit}</strong>
            </div>
            <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
              <div
                className="bg-cyan-500 h-full rounded-full"
                style={{ width: `${((profile?.usage.bookmarksUsed || 0) / (profile?.usage.bookmarksLimit || 1)) * 100}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-1 text-slate-600 dark:text-slate-300">
              <span>AI Idea Runs</span>
              <strong>{profile?.usage.aiIdeasGenerated} / {profile?.usage.aiLimit}</strong>
            </div>
            <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
              <div
                className="bg-pink-500 h-full rounded-full"
                style={{ width: `${((profile?.usage.aiIdeasGenerated || 0) / (profile?.usage.aiLimit || 1)) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
