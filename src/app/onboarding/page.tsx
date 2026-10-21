'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { storage } from '@/lib/storage';
import { ALL_PLATFORMS, ALL_CATEGORIES, SUPPORTED_COUNTRIES } from '@/data/seedTrends';
import { PlatformId } from '@/types';
import { Sparkles, ArrowRight, Check, Compass } from 'lucide-react';

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [role, setRole] = useState('Full-Time YouTuber / Creator');
  const [selectedPlatforms, setSelectedPlatforms] = useState<PlatformId[]>(['youtube', 'instagram']);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([
    'Technology & AI',
    'Creator Economy',
  ]);
  const [selectedRegions, setSelectedRegions] = useState<string[]>(['United States', 'Global (Worldwide)']);

  const togglePlatform = (p: PlatformId) => {
    setSelectedPlatforms((prev) =>
      prev.includes(p) ? prev.filter((item) => item !== p) : [...prev, p]
    );
  };

  const toggleCategory = (cat: string) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((item) => item !== cat) : [...prev, cat]
    );
  };

  const handleFinish = () => {
    storage.updateUserProfile({
      role,
      preferredPlatforms: selectedPlatforms,
      preferredCategories: selectedCategories,
      preferredRegions: selectedRegions,
    });
    router.push('/dashboard');
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-xl w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-2xl space-y-6">
        {/* Progress Bar */}
        <div className="flex items-center justify-between text-xs font-bold text-slate-400">
          <span>Step {step} of 3</span>
          <span>{step === 1 ? 'Role & Niche' : step === 2 ? 'Platforms' : 'Categories & Markets'}</span>
        </div>
        <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
          <div
            className="bg-purple-600 h-full rounded-full transition-all duration-300"
            style={{ width: `${(step / 3) * 100}%` }}
          />
        </div>

        {/* STEP 1: Role */}
        {step === 1 && (
          <div className="space-y-4">
            <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
              What best describes your primary role?
            </h2>
            <p className="text-xs text-slate-500">
              We customize your default dashboards and AI generation templates based on your workflow.
            </p>

            <div className="space-y-2 text-xs">
              {[
                'Full-Time YouTuber / Creator',
                'Short-form Specialist (TikTok / Reels)',
                'Digital Marketer & Agency Lead',
                'Solo Entrepreneur / Indie Hacker',
                'Corporate Brand Manager',
              ].map((r) => (
                <button
                  key={r}
                  onClick={() => setRole(r)}
                  className={`w-full p-3.5 rounded-2xl text-left font-bold transition-all border ${
                    role === r
                      ? 'bg-purple-50 dark:bg-purple-950/40 border-purple-500 text-purple-700 dark:text-purple-300'
                      : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>

            <button
              onClick={() => setStep(2)}
              className="w-full py-3 mt-4 rounded-xl bg-purple-600 text-white font-bold text-xs flex items-center justify-center gap-1.5"
            >
              <span>Continue</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* STEP 2: Platforms */}
        {step === 2 && (
          <div className="space-y-4">
            <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
              Which platforms do you publish on?
            </h2>
            <p className="text-xs text-slate-500">Select all that apply.</p>

            <div className="grid grid-cols-2 gap-2 text-xs">
              {ALL_PLATFORMS.map((p) => {
                const active = selectedPlatforms.includes(p.id as any);
                return (
                  <button
                    key={p.id}
                    onClick={() => togglePlatform(p.id as any)}
                    className={`p-3 rounded-2xl font-bold text-left transition-all border flex items-center justify-between ${
                      active
                        ? 'bg-purple-50 dark:bg-purple-950/40 border-purple-500 text-purple-700 dark:text-purple-300'
                        : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <span>{p.name}</span>
                    {active && <Check className="w-4 h-4 text-purple-600" />}
                  </button>
                );
              })}
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setStep(1)}
                className="flex-1 py-3 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-600"
              >
                Back
              </button>
              <button
                onClick={() => setStep(3)}
                className="flex-1 py-3 rounded-xl bg-purple-600 text-white font-bold text-xs flex items-center justify-center gap-1"
              >
                <span>Next Step</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Categories & Markets */}
        {step === 3 && (
          <div className="space-y-4">
            <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
              Select your priority niches
            </h2>
            <p className="text-xs text-slate-500">Pick up to 5 categories to populate your discovery feed.</p>

            <div className="flex flex-wrap gap-2 text-xs">
              {ALL_CATEGORIES.map((cat) => {
                const active = selectedCategories.includes(cat);
                return (
                  <button
                    key={cat}
                    onClick={() => toggleCategory(cat)}
                    className={`px-3 py-1.5 rounded-xl font-bold transition-all border ${
                      active
                        ? 'bg-purple-600 text-white border-purple-600 shadow-sm'
                        : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    {cat} {active ? '✓' : ''}
                  </button>
                );
              })}
            </div>

            <div className="flex gap-2 pt-4">
              <button
                onClick={() => setStep(2)}
                className="flex-1 py-3 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-600"
              >
                Back
              </button>
              <button
                onClick={handleFinish}
                className="flex-1 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-purple-600/25"
              >
                <Compass className="w-4 h-4" />
                <span>Launch My Dashboard</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
