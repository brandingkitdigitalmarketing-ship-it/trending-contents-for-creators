'use client';

import React from 'react';

interface WorldMapProps {
  selectedCountry: string;
  onSelectCountry: (countryName: string, countryCode: string) => void;
  comparedCountries?: string[];
}

interface CountryHotspot {
  name: string;
  code: string;
  cx: number;
  cy: number;
  topTrend: string;
  momentumScore: number;
  activeCreators: string;
}

const HOTSPOTS: CountryHotspot[] = [
  { name: 'United States', code: 'US', cx: 200, cy: 155, topTrend: 'Autonomous AI Agents', momentumScore: 98, activeCreators: '4.8M' },
  { name: 'Canada', code: 'CA', cx: 210, cy: 110, topTrend: 'Artisan Fermentation', momentumScore: 84, activeCreators: '820K' },
  { name: 'India', code: 'IN', cx: 645, cy: 220, topTrend: 'T20 & IPL Retention Rules', momentumScore: 99, activeCreators: '7.2M' },
  { name: 'United Kingdom', code: 'GB', cx: 450, cy: 130, topTrend: 'Micro-Studio Creator Hubs', momentumScore: 91, activeCreators: '1.4M' },
  { name: 'Germany', code: 'DE', cx: 480, cy: 140, topTrend: 'Solid State Batteries & EV Range', momentumScore: 86, activeCreators: '1.1M' },
  { name: 'Japan', code: 'JP', cx: 775, cy: 175, topTrend: 'Open-Weight Reasoning LLMs', momentumScore: 89, activeCreators: '2.1M' },
  { name: 'Australia', code: 'AU', cx: 755, cy: 330, topTrend: 'Japan Slow Rail Pass Itineraries', momentumScore: 88, activeCreators: '650K' },
  { name: 'Brazil', code: 'BR', cx: 310, cy: 280, topTrend: 'Minimalist Spatial UI Designs', momentumScore: 87, activeCreators: '3.1M' },
];

export default function WorldMap({ selectedCountry, onSelectCountry, comparedCountries = [] }: WorldMapProps) {
  return (
    <div className="relative w-full overflow-hidden rounded-3xl bg-slate-900 border border-slate-800 p-6 text-white shadow-2xl">
      {/* Background glow effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-600/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
        <div>
          <span className="text-xs uppercase tracking-wider font-extrabold text-cyan-400 bg-cyan-950/60 border border-cyan-800/80 px-2.5 py-1 rounded-full">
            Real-Time Geographic Radar
          </span>
          <h3 className="text-xl font-extrabold text-white mt-2">
            Global Trend Ingestion Map
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Select countries to inspect regional velocity, trending categories, and cross-market comparisons.
          </p>
        </div>

        {/* Selected / Compared Countries Badges */}
        <div className="flex flex-wrap items-center gap-2">
          {HOTSPOTS.map((spot) => {
            const isSelected = selectedCountry === spot.name;
            const isCompared = comparedCountries.includes(spot.name);
            return (
              <button
                key={spot.code}
                onClick={() => onSelectCountry(spot.name, spot.code)}
                className={`text-xs px-3 py-1.5 rounded-xl font-semibold transition-all border ${
                  isSelected
                    ? 'bg-purple-600 border-purple-400 text-white shadow-lg shadow-purple-600/30'
                    : isCompared
                    ? 'bg-cyan-600/30 border-cyan-400 text-cyan-200'
                    : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-700 hover:text-white'
                }`}
              >
                {spot.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* SVG Map Canvas */}
      <div className="relative w-full aspect-[2.1/1] bg-slate-950/70 rounded-2xl border border-slate-800/90 overflow-hidden flex items-center justify-center">
        <svg viewBox="0 0 900 440" className="w-full h-full">
          {/* Subtle grid lines */}
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="900" height="440" fill="url(#grid)" />

          {/* Continents outlines stylized */}
          {/* North America */}
          <path
            d="M 120 70 Q 200 60 270 80 Q 290 140 240 180 Q 180 200 130 160 Z"
            fill="#1E293B"
            stroke="#334155"
            strokeWidth="1.5"
            className="transition-colors hover:fill-slate-700/60"
          />
          {/* South America */}
          <path
            d="M 260 210 Q 340 240 330 310 Q 290 380 260 370 Q 240 280 260 210 Z"
            fill="#1E293B"
            stroke="#334155"
            strokeWidth="1.5"
            className="transition-colors hover:fill-slate-700/60"
          />
          {/* Europe */}
          <path
            d="M 420 90 Q 520 80 540 130 Q 480 170 430 150 Z"
            fill="#1E293B"
            stroke="#334155"
            strokeWidth="1.5"
            className="transition-colors hover:fill-slate-700/60"
          />
          {/* Africa */}
          <path
            d="M 430 170 Q 530 180 520 280 Q 460 320 420 240 Z"
            fill="#1E293B"
            stroke="#334155"
            strokeWidth="1.5"
            className="transition-colors hover:fill-slate-700/60"
          />
          {/* Asia */}
          <path
            d="M 540 90 Q 750 70 810 160 Q 700 240 580 200 Q 550 140 540 90 Z"
            fill="#1E293B"
            stroke="#334155"
            strokeWidth="1.5"
            className="transition-colors hover:fill-slate-700/60"
          />
          {/* Australia */}
          <path
            d="M 720 290 Q 800 280 810 340 Q 750 370 710 330 Z"
            fill="#1E293B"
            stroke="#334155"
            strokeWidth="1.5"
            className="transition-colors hover:fill-slate-700/60"
          />

          {/* Interactive hotspot markers */}
          {HOTSPOTS.map((spot) => {
            const isSelected = selectedCountry === spot.name;
            const isCompared = comparedCountries.includes(spot.name);
            const radius = isSelected ? 10 : isCompared ? 8 : 6;
            const pingRadius = radius * 2.4;

            return (
              <g
                key={spot.code}
                onClick={() => onSelectCountry(spot.name, spot.code)}
                className="cursor-pointer group"
              >
                {/* Pulsing ring */}
                <circle
                  cx={spot.cx}
                  cy={spot.cy}
                  r={pingRadius}
                  fill={isSelected ? '#7C3AED' : isCompared ? '#06B6D4' : '#38BDF8'}
                  opacity={isSelected ? '0.4' : '0.2'}
                  className="animate-ping"
                  style={{ transformOrigin: `${spot.cx}px ${spot.cy}px` }}
                />

                {/* Outer halo */}
                <circle
                  cx={spot.cx}
                  cy={spot.cy}
                  r={radius + 3}
                  fill="none"
                  stroke={isSelected ? '#A855F7' : isCompared ? '#22D3EE' : '#60A5FA'}
                  strokeWidth="2"
                />

                {/* Core dot */}
                <circle
                  cx={spot.cx}
                  cy={spot.cy}
                  r={radius}
                  fill={isSelected ? '#7C3AED' : isCompared ? '#06B6D4' : '#38BDF8'}
                />

                {/* Label text */}
                <text
                  x={spot.cx}
                  y={spot.cy - 12}
                  textAnchor="middle"
                  fill={isSelected ? '#FFFFFF' : '#94A3B8'}
                  fontSize={isSelected ? '12' : '10'}
                  fontWeight={isSelected ? 'bold' : 'normal'}
                  className="pointer-events-none drop-shadow"
                >
                  {spot.name}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Selected Country HUD overlay */}
        {selectedCountry && (
          <div className="absolute bottom-3 left-3 bg-slate-900/90 backdrop-blur-md border border-slate-700/80 rounded-xl p-3 text-xs shadow-xl max-w-xs">
            <div className="flex items-center justify-between gap-2 mb-1">
              <span className="font-bold text-white text-sm">{selectedCountry}</span>
              <span className="px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300 font-bold text-[10px]">
                ACTIVE REGION
              </span>
            </div>
            {HOTSPOTS.find((h) => h.name === selectedCountry) && (
              <>
                <p className="text-slate-300 text-[11px] mb-1">
                  Top Trending: <span className="text-cyan-300 font-semibold">{HOTSPOTS.find((h) => h.name === selectedCountry)?.topTrend}</span>
                </p>
                <div className="flex items-center gap-3 text-slate-400 text-[10px]">
                  <span>Momentum: <strong className="text-emerald-400">{HOTSPOTS.find((h) => h.name === selectedCountry)?.momentumScore}/100</strong></span>
                  <span>Active Creators: <strong className="text-white">{HOTSPOTS.find((h) => h.name === selectedCountry)?.activeCreators}</strong></span>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
