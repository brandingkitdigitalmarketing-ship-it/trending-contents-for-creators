'use client';

import React, { useState } from 'react';
import { SEED_TRENDS, SUPPORTED_COUNTRIES } from '@/data/seedTrends';
import WorldMap from '@/components/WorldMap';
import TrendCard from '@/components/TrendCard';
import { Globe, ArrowRight, BarChart3, Sparkles, Filter, Layers } from 'lucide-react';

export default function GlobalExplorerPage() {
  const [selectedCountry, setSelectedCountry] = useState('United States');
  const [compareCountryA, setCompareCountryA] = useState('United States');
  const [compareCountryB, setCompareCountryB] = useState('India');
  const [compareCountryC, setCompareCountryC] = useState('United Kingdom');
  const [compareTopic, setCompareTopic] = useState('AI');

  const countryTrends = SEED_TRENDS.filter(
    (t) =>
      t.country.toLowerCase() === selectedCountry.toLowerCase() ||
      t.country === 'Global' ||
      t.regionalPopularity.some((r) => r.country.toLowerCase() === selectedCountry.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Page Title */}
      <div>
        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-950/40 px-3 py-1 rounded-full mb-2">
          <Globe className="w-3.5 h-3.5" /> Worldwide Trend Radar
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
          Explore Trends Worldwide
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
          Discover cross-border virality, regional search demand, and multi-country comparative topic velocity.
        </p>
      </div>

      {/* Interactive SVG World Map */}
      <WorldMap
        selectedCountry={selectedCountry}
        onSelectCountry={(country) => setSelectedCountry(country)}
        comparedCountries={[compareCountryA, compareCountryB, compareCountryC]}
      />

      {/* Country-to-Country Comparison Studio (Section 6 Requirement) */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 mb-6 border-b border-slate-100 dark:border-slate-800">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">
              Cross-Market Matrix
            </span>
            <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mt-1">
              Country-to-Country Trend Comparison
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Compare topic acceleration and platform dominance across up to 3 sovereign markets.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-500">Benchmark Topic:</span>
            <select
              value={compareTopic}
              onChange={(e) => setCompareTopic(e.target.value)}
              className="text-xs p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-bold outline-none"
            >
              <option value="AI">AI & Autonomous Tech</option>
              <option value="Sports">Sports & Cricket</option>
              <option value="Design">UI & Digital Marketing</option>
              <option value="Finance">Personal Wealth & Savings</option>
            </select>
          </div>
        </div>

        {/* 3 Country Comparison Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { country: compareCountryA, setCountry: setCompareCountryA, score: 98, leadPlatform: 'YouTube (42%)', topQuery: 'how to build autonomous agent' },
            { country: compareCountryB, setCountry: setCompareCountryB, score: 92, leadPlatform: 'Instagram & X (54%)', topQuery: 'no code local AI tools' },
            { country: compareCountryC, setCountry: setCompareCountryC, score: 78, leadPlatform: 'LinkedIn & Reddit (61%)', topQuery: 'enterprise agent security' },
          ].map((col, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80"
            >
              <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                Market {idx + 1}
              </label>
              <select
                value={col.country}
                onChange={(e) => col.setCountry(e.target.value)}
                className="w-full text-xs p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-bold mb-4 outline-none"
              >
                {SUPPORTED_COUNTRIES.map((c) => (
                  <option key={c.code} value={c.name}>
                    {c.flag ? `${c.flag} ` : ''}{c.name}
                  </option>
                ))}
              </select>

              <div className="space-y-3 text-xs">
                <div>
                  <span className="text-slate-400 block text-[11px]">Interest Velocity Index</span>
                  <div className="flex items-center gap-2 mt-0.5">
                    <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                      <div className="bg-purple-600 h-full rounded-full" style={{ width: `${col.score}%` }} />
                    </div>
                    <strong className="text-slate-900 dark:text-white font-bold">{col.score}/100</strong>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-200 dark:border-slate-700">
                  <span className="text-slate-400 text-[11px]">Dominant Content Format:</span>
                  <strong className="block text-slate-800 dark:text-slate-200 font-semibold">{col.leadPlatform}</strong>
                </div>

                <div>
                  <span className="text-slate-400 text-[11px]">Top Local Query:</span>
                  <strong className="block text-purple-600 dark:text-purple-400 font-medium">
                    &quot;{col.topQuery}&quot;
                  </strong>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Selected Country Trending Topics */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Currently Trending in {selectedCountry}
          </h2>
          <span className="text-xs text-slate-400">{countryTrends.length} topics detected</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {countryTrends.map((trend) => (
            <TrendCard key={trend.id} trend={trend} />
          ))}
        </div>
      </div>
    </div>
  );
}
