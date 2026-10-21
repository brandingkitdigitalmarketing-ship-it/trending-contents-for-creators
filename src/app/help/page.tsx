'use client';

import React, { useState } from 'react';
import { HelpCircle, Search, Mail, MessageSquare, ChevronDown } from 'lucide-react';

export default function HelpPage() {
  const [search, setSearch] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [contactSubmitted, setContactSubmitted] = useState(false);

  const faqs = [
    {
      q: 'How does the Content Opportunity Score work?',
      a: 'The Opportunity Score (0-100) evaluates 6 factors: Growth Velocity (25%), Search Demand (20%), Current Interest (20%), Freshness (15%), Low Competition Advantage (10%), and Format Relevance (10%). It estimates early-mover breakout windows rather than predicting guaranteed virality.',
    },
    {
      q: 'What is the difference between Measured, Estimated, and Derived metrics?',
      a: 'Measured data is retrieved directly from official platform counters (such as YouTube API views). Estimated data applies algorithmic sampling models when exact counters are private. Derived data combines cross-platform signals. Unavailable states are displayed when no legitimate source exists.',
    },
    {
      q: 'Can I export my saved trends and generated ideas?',
      a: 'Yes! Creator Pro and Agency plans can export all saved bookmarks, trend telemetry, and generated script packets to standard CSV and JSON formats with a single click.',
    },
    {
      q: 'Does Creator Trends publish directly to my social media accounts?',
      a: 'The Content Calendar is a strategic planning, drafting, and reminder tool. Direct publishing integrations will activate once platform-specific publishing API scopes are configured by workspace admins.',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <div className="text-center max-w-xl mx-auto">
        <div className="w-10 h-10 rounded-2xl bg-purple-100 dark:bg-purple-950/60 text-purple-600 flex items-center justify-center mx-auto mb-3">
          <HelpCircle className="w-5 h-5" />
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
          Help Center & Creator Support
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Frequently asked questions, methodology guides, and customer care.
        </p>
      </div>

      {/* FAQ Accordion */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-3">
        <h3 className="font-extrabold text-sm text-slate-900 dark:text-white mb-2">
          Frequently Asked Questions
        </h3>
        {faqs.map((f, i) => (
          <div key={i} className="border border-slate-100 dark:border-slate-800 rounded-2xl overflow-hidden">
            <button
              onClick={() => setOpenFaq(openFaq === i ? null : i)}
              className="w-full p-4 text-left font-bold text-xs text-slate-900 dark:text-white flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/40"
            >
              <span>{f.q}</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
            </button>
            {openFaq === i && (
              <div className="p-4 pt-0 text-xs text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800/60">
                {f.a}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Contact Form */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm">
        <h3 className="font-extrabold text-base text-slate-900 dark:text-white mb-1">Contact Support Team</h3>
        <p className="text-xs text-slate-500 mb-4">Have questions about API connectors, agency setups, or billing?</p>

        {contactSubmitted ? (
          <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 text-xs font-bold text-center">
            ✓ Message received! Our support team will reply within 4 business hours.
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setContactSubmitted(true);
            }}
            className="space-y-3 text-xs"
          >
            <div className="grid grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="Your Name"
                required
                className="p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none"
              />
              <input
                type="email"
                placeholder="Your Email"
                required
                className="p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none"
              />
            </div>
            <textarea
              placeholder="How can we assist your creator workflow?"
              rows={3}
              required
              className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none"
            />
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs"
            >
              Send Message
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
