import React from 'react';
import Link from 'next/link';
import { ALL_PLATFORMS, SEED_TRENDS } from '@/data/seedTrends';
import { PlatformLogo } from '@/components/BrandIcons';
import { ArrowRight, Flame, TrendingUp } from 'lucide-react';

export default function PlatformsIndexPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div>
        <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 font-bold text-xs uppercase tracking-wider mb-2">
          <Flame className="w-4 h-4 text-rose-500" /> Multi-Platform Coverage
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
          Social Media Platforms Directory
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Explore native trends, video formats, audio virality, and creator topics across all connected networks.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ALL_PLATFORMS.filter((p) => p.id !== 'custom').map((platform) => {
          const platformTrends = SEED_TRENDS.filter((t) => t.platform === platform.id);
          const count = platformTrends.length;

          return (
            <div
              key={platform.id}
              className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-purple-300 dark:hover:border-purple-700 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <PlatformLogo platform={platform.id} size="lg" showBackground />
                  <span className="text-xs font-bold text-purple-700 dark:text-purple-300 bg-purple-100 dark:bg-purple-950/60 px-3 py-1 rounded-full">
                    {count} Live Trends
                  </span>
                </div>

                <Link href={`/platforms/${platform.id}`}>
                  <h3 className="text-xl font-extrabold text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                    {platform.name}
                  </h3>
                </Link>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                  {platform.tag}
                </p>

                {/* Trending Topics preview list under this category */}
                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                    Top Trending Now
                  </span>
                  {platformTrends.slice(0, 2).map((t) => (
                    <Link
                      key={t.id}
                      href={`/trends/${t.id}`}
                      className="flex items-center justify-between text-xs p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-purple-50 dark:hover:bg-purple-950/40 text-slate-800 dark:text-slate-200 transition-colors"
                    >
                      <span className="font-semibold truncate mr-2">{t.title}</span>
                      <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 whitespace-nowrap flex items-center gap-0.5">
                        <TrendingUp className="w-2.5 h-2.5" />
                        +{t.growthPercentage}%
                      </span>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-purple-600 dark:text-purple-400">
                <Link href={`/platforms/${platform.id}`} className="hover:underline flex items-center gap-1.5">
                  <span>Explore {platform.name} Feed</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href={`/categories?platform=${platform.id}`}
                  className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-[11px]"
                >
                  All Topics
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
