'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ALL_PLATFORMS, SEED_TRENDS } from '@/data/seedTrends';
import TrendCard, { PlatformIconBadge } from '@/components/TrendCard';
import { PlatformLogo } from '@/components/BrandIcons';
import { ArrowLeft } from 'lucide-react';

export default function PlatformClient() {
  const params = useParams();
  const platformId = params?.platform as string;
  const platformInfo = ALL_PLATFORMS.find((p) => p.id === platformId) || {
    id: platformId,
    name: platformId?.toUpperCase() || 'Platform',
    tag: 'Platform Specific Discovery',
  };

  const trends = SEED_TRENDS.filter((t) => t.platform === platformId);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div>
        <Link
          href="/platforms"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white mb-4"
        >
          <ArrowLeft className="w-4 h-4" /> All Platforms
        </Link>

        <div className="flex items-center gap-4">
          <PlatformLogo platform={platformId} size="xl" showBackground />
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white capitalize">
              {platformInfo.name} Trends & Analytics
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">{platformInfo.tag}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {trends.length === 0 ? (
          <div className="col-span-full py-12 text-center text-slate-400 text-xs">
            No specific trends tagged for this platform in the active demo seed. Check all trends on the main feed.
          </div>
        ) : (
          trends.map((t) => <TrendCard key={t.id} trend={t} />)
        )}
      </div>
    </div>
  );
}
