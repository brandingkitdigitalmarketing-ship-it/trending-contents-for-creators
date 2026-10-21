import React from 'react';

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-6 text-slate-700 dark:text-slate-300 text-xs leading-relaxed">
      <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">Privacy Policy</h1>
      <p className="text-slate-400">Effective Date: October 16, 2026</p>

      <section className="space-y-2">
        <h2 className="text-base font-bold text-slate-900 dark:text-white">1. Information We Collect</h2>
        <p>
          Creator Trends collects user profile credentials, saved bookmarks, collection definitions, and calendar items to provide a personalized trend research workflow. We do not sell user data to third parties.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-base font-bold text-slate-900 dark:text-white">2. Third-Party API Data & Provenance</h2>
        <p>
          Our platform accesses public API endpoints provided by YouTube, Google Trends, Reddit, and authorized social partners according to their respective Developer Terms of Service. Trend data is stored ephemerally with strict caching compliance.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-base font-bold text-slate-900 dark:text-white">3. Security & Storage</h2>
        <p>
          All communications are secured over TLS 1.3 encryption. API tokens configured by users in the Integrations portal are stored encrypted in secure server-side storage.
        </p>
      </section>
    </div>
  );
}
