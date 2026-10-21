'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { SEED_TRENDS } from '@/data/seedTrends';
import TrendCard from '@/components/TrendCard';
import { Search, ArrowLeft, Filter } from 'lucide-react';
import Link from 'next/link';

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="max-w-7xl mx-auto p-12 text-center text-xs text-slate-400">Loading Search Results...</div>}>
      <SearchResultsPage />
    </Suspense>
  );
}

function SearchResultsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const q = searchParams.get('q') || '';
  const [searchInput, setSearchInput] = useState(q);

  const results = SEED_TRENDS.filter((t) => {
    if (!q.trim()) return true;
    const query = q.toLowerCase();
    return (
      t.title.toLowerCase().includes(query) ||
      t.description.toLowerCase().includes(query) ||
      t.category.toLowerCase().includes(query) ||
      t.relatedKeywords.some((k) => k.toLowerCase().includes(query)) ||
      t.relatedHashtags.some((h) => h.toLowerCase().includes(query))
    );
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchInput.trim())}`);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div>
        <Link
          href="/trends"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white mb-4"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Trends Feed
        </Link>

        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
          Search Results: &quot;{q}&quot;
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Found <strong>{results.length}</strong> matching trends, discussions, and topics.
        </p>

        <form onSubmit={handleSearch} className="mt-4 max-w-md flex items-center gap-2">
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search keywords, hashtags..."
            className="flex-1 p-3 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button
            type="submit"
            className="px-4 py-3 bg-purple-600 text-white font-bold text-xs rounded-xl shadow-sm hover:bg-purple-700"
          >
            Search
          </button>
        </form>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {results.length === 0 ? (
          <div className="col-span-full py-16 text-center text-slate-400 text-xs">
            No matching topics found for &quot;{q}&quot;. Try broader terms or check the AI Generator.
          </div>
        ) : (
          results.map((t) => <TrendCard key={t.id} trend={t} />)
        )}
      </div>
    </div>
  );
}
