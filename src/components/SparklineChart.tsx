'use client';

import React from 'react';
import { TrendHistoryPoint } from '@/types';

interface SparklineProps {
  data: TrendHistoryPoint[];
  color?: string;
  height?: number;
  width?: number;
  showFill?: boolean;
}

export default function SparklineChart({
  data,
  color = '#7C3AED',
  height = 42,
  width = 140,
  showFill = true,
}: SparklineProps) {
  if (!data || data.length < 2) {
    return <div className="h-10 w-28 bg-slate-100 dark:bg-slate-800 rounded animate-pulse" />;
  }

  const values = data.map((d) => d.value);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;

  const points = data
    .map((d, index) => {
      const x = (index / (data.length - 1)) * (width - 4) + 2;
      const y = height - 4 - ((d.value - min) / range) * (height - 8);
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(' ');

  const areaPoints = `${points} ${width - 2},${height} 2,${height}`;
  const gradientId = `spark-grad-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className="relative inline-block overflow-hidden" style={{ width, height }}>
      <svg width={width} height={height} className="overflow-visible">
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={0.35} />
            <stop offset="100%" stopColor={color} stopOpacity={0.0} />
          </linearGradient>
        </defs>

        {showFill && <polygon points={areaPoints} fill={`url(#${gradientId})`} />}

        <polyline
          fill="none"
          stroke={color}
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          points={points}
        />
      </svg>
    </div>
  );
}
