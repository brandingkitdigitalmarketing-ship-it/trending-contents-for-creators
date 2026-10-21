import React from 'react';
import Link from 'next/link';
import { TrendingUp, ShieldCheck, Heart, Sparkles, Layers } from 'lucide-react';
import { ALL_PLATFORMS } from '@/data/seedTrends';

export default function Footer() {
  return (
    <footer className="w-full bg-slate-900 text-slate-400 border-t border-slate-800 pt-16 pb-24 md:pb-16 text-xs transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 via-blue-600 to-cyan-400 flex items-center justify-center text-white shadow-lg shadow-purple-500/20">
                <TrendingUp className="w-5 h-5 stroke-[2.5]" />
              </div>
              <span className="font-extrabold text-xl tracking-tight text-white">
                Creator<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">Trends</span>
              </span>
            </Link>

            <p className="text-slate-400 text-sm max-w-sm leading-relaxed">
              Discover What&apos;s Trending. Create What&apos;s Next.
              <br />
              The all-in-one multi-platform trend intelligence and AI content ideation engine built for high-output creators, influencers, and agencies.
            </p>

            <div className="flex items-center gap-2 pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800/90 text-slate-300 border border-slate-700 text-xs">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                Live Multi-Platform Data Ingestion
              </span>
            </div>
          </div>

          {/* Platforms column */}
          <div>
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px] mb-3">
              Supported Platforms
            </h4>
            <ul className="space-y-2">
              {ALL_PLATFORMS.slice(0, 6).map((platform) => (
                <li key={platform.id}>
                  <Link
                    href={`/platforms/${platform.id}`}
                    className="hover:text-purple-400 transition-colors flex items-center gap-1.5"
                  >
                    <span>{platform.name}</span>
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/platforms" className="text-purple-400 font-semibold hover:underline">
                  View All Platforms →
                </Link>
              </li>
            </ul>
          </div>

          {/* Tools & Workspaces */}
          <div>
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px] mb-3">
              Creator Suite
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/dashboard" className="hover:text-white transition-colors">
                  Creator Dashboard
                </Link>
              </li>
              <li>
                <Link href="/trends" className="hover:text-white transition-colors">
                  Explore All Trends
                </Link>
              </li>
              <li>
                <Link href="/global" className="hover:text-white transition-colors">
                  Global Trend Radar
                </Link>
              </li>
              <li>
                <Link href="/generator" className="hover:text-white transition-colors flex items-center gap-1">
                  <span>AI Content Generator</span>
                  <span className="text-[9px] px-1 bg-purple-600 text-white rounded">NEW</span>
                </Link>
              </li>
              <li>
                <Link href="/calendar" className="hover:text-white transition-colors">
                  Content Calendar
                </Link>
              </li>
              <li>
                <Link href="/bookmarks" className="hover:text-white transition-colors">
                  My Bookmarks & Collections
                </Link>
              </li>
              <li>
                <Link href="/monitoring" className="hover:text-white transition-colors">
                  Keyword Monitoring
                </Link>
              </li>
            </ul>
          </div>

          {/* Enterprise & Legal */}
          <div>
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px] mb-3">
              Platform & Legal
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/pricing" className="hover:text-white transition-colors">
                  Pricing Plans
                </Link>
              </li>
              <li>
                <Link href="/integrations" className="hover:text-white transition-colors">
                  API Connectors Status
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-white transition-colors text-purple-400 font-medium">
                  Admin Dashboard
                </Link>
              </li>
              <li>
                <Link href="/help" className="hover:text-white transition-colors">
                  Help Center & FAQs
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright and disclaimer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
          <p>© {new Date().getFullYear()} Creator Trends. Built for the modern creator economy.</p>
          <p className="text-center sm:text-right max-w-lg">
            Trend velocity, opportunity scores, and AI idea outlines are generated for research, strategy, and ideation.
            All demo items are transparently tagged.
          </p>
        </div>
      </div>
    </footer>
  );
}
