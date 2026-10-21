'use client';

import React, { useState } from 'react';
import { OpportunityScoreBreakdown } from '@/types';
import { Sparkles, Info } from 'lucide-react';

interface ScoreBadgeProps {
  score: number;
  breakdown?: OpportunityScoreBreakdown;
  size?: 'sm' | 'md' | 'lg';
  showTooltip?: boolean;
}

export default function OpportunityScoreBadge({
  score,
  breakdown,
  size = 'md',
  showTooltip = true,
}: ScoreBadgeProps) {
  const [open, setOpen] = useState(false);

  let colorClasses = 'bg-emerald-50 text-emerald-700 border-emerald-300 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800';
  let meterColor = '#16A34A';

  if (score >= 90) {
    colorClasses = 'bg-purple-50 text-purple-700 border-purple-300 dark:bg-purple-950/40 dark:text-purple-300 dark:border-purple-800';
    meterColor = '#7C3AED';
  } else if (score >= 80) {
    colorClasses = 'bg-blue-50 text-blue-700 border-blue-300 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-800';
    meterColor = '#2563EB';
  } else if (score < 60) {
    colorClasses = 'bg-amber-50 text-amber-700 border-amber-300 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800';
    meterColor = '#D97706';
  }

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5 gap-1',
    md: 'text-sm px-2.5 py-1 gap-1.5',
    lg: 'text-base px-3.5 py-1.5 gap-2 font-bold',
  }[size];

  return (
    <div className="relative inline-block">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        className={`inline-flex items-center rounded-full font-semibold border transition-all ${colorClasses} ${sizeClasses} shadow-sm hover:scale-105`}
        title="Opportunity Score (0-100)"
      >
        <Sparkles className="w-3.5 h-3.5" style={{ color: meterColor }} />
        <span>{score}/100</span>
        {showTooltip && <Info className="w-3 h-3 opacity-60 ml-0.5" />}
      </button>

      {/* Popover Breakdown */}
      {open && showTooltip && breakdown && (
        <div className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 w-72 p-3.5 rounded-2xl bg-white dark:bg-slate-900 shadow-xl border border-slate-200 dark:border-slate-800 text-xs text-slate-800 dark:text-slate-200 pointer-events-none animate-in fade-in zoom-in-95 duration-150">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100 dark:border-slate-800">
            <span className="font-bold flex items-center gap-1.5 text-purple-600 dark:text-purple-400">
              <Sparkles className="w-3.5 h-3.5" /> Opportunity Score
            </span>
            <span className="font-extrabold text-sm px-2 py-0.5 rounded-md bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300">
              {score} / 100
            </span>
          </div>

          <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-2.5">
            Transparent algorithmic rating estimating early creator breakout advantage. Not a guarantee of virality.
          </p>

          <div className="space-y-1.5">
            <div>
              <div className="flex justify-between text-[11px] font-medium mb-0.5">
                <span>Growth Velocity (25%)</span>
                <span>{breakdown.growthRate}%</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div className="bg-purple-600 h-full rounded-full" style={{ width: `${breakdown.growthRate}%` }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-[11px] font-medium mb-0.5">
                <span>Search Demand (20%)</span>
                <span>{breakdown.searchDemand}%</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div className="bg-blue-600 h-full rounded-full" style={{ width: `${breakdown.searchDemand}%` }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-[11px] font-medium mb-0.5">
                <span>Baseline Interest (20%)</span>
                <span>{breakdown.currentInterest}%</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div className="bg-cyan-500 h-full rounded-full" style={{ width: `${breakdown.currentInterest}%` }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-[11px] font-medium mb-0.5">
                <span>Trend Freshness (15%)</span>
                <span>{breakdown.freshness}%</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${breakdown.freshness}%` }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-[11px] font-medium mb-0.5">
                <span>Low Competition Advantage (10%)</span>
                <span>{breakdown.competitionScore}%</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div className="bg-pink-500 h-full rounded-full" style={{ width: `${breakdown.competitionScore}%` }} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
