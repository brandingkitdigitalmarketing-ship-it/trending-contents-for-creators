import React from 'react';

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-6 text-slate-700 dark:text-slate-300 text-xs leading-relaxed">
      <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">Terms of Service</h1>
      <p className="text-slate-400">Effective Date: October 16, 2026</p>

      <section className="space-y-2">
        <h2 className="text-base font-bold text-slate-900 dark:text-white">1. Acceptance of Terms</h2>
        <p>
          By accessing or using Creator Trends, you agree to be bound by these Terms of Service. If you disagree with any part of these terms, you may not access the service.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-base font-bold text-slate-900 dark:text-white">2. Content & AI Ideation Disclaimers</h2>
        <p>
          Trend velocity estimations, search demand ratings, Opportunity Scores, and AI-generated script ideas are provided solely for research, planning, and inspirational purposes. Creator Trends does not guarantee virality, view milestones, or ad revenue outcomes.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-base font-bold text-slate-900 dark:text-white">3. Fair Use & Rate Limiting</h2>
        <p>
          Subscribers agree to adhere to monthly search quotas and refrain from abusive automated scraping of the discovery dashboard.
        </p>
      </section>
    </div>
  );
}
