'use client';

import React, { useState, useEffect } from 'react';
import { storage } from '@/lib/storage';
import { UserProfile, PlatformId } from '@/types';
import { ALL_PLATFORMS, ALL_CATEGORIES, SUPPORTED_COUNTRIES } from '@/data/seedTrends';
import { User, Settings, Shield, Bell, Check, Save } from 'lucide-react';

export default function SettingsPage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    const p = storage.getUserProfile();
    setProfile(p);
    setName(p.name);
    setEmail(p.email);
    setRole(p.role);
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (profile) {
      storage.updateUserProfile({
        name,
        email,
        role,
      });
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 2500);
    }
  };

  const togglePlatform = (pId: PlatformId) => {
    if (!profile) return;
    const exists = profile.preferredPlatforms.includes(pId);
    const updated = exists
      ? profile.preferredPlatforms.filter((id) => id !== pId)
      : [...profile.preferredPlatforms, pId];
    storage.updateUserProfile({ preferredPlatforms: updated });
    setProfile(storage.getUserProfile());
  };

  const toggleCategory = (cat: string) => {
    if (!profile) return;
    const exists = profile.preferredCategories.includes(cat);
    const updated = exists
      ? profile.preferredCategories.filter((c) => c !== cat)
      : [...profile.preferredCategories, cat];
    storage.updateUserProfile({ preferredCategories: updated });
    setProfile(storage.getUserProfile());
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
          Account & Preferences
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Customize your discovery feed, default niche focus, notification rules, and subscription.
        </p>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 font-bold text-xs flex items-center gap-2">
          <Check className="w-4 h-4" /> Changes successfully saved to your profile!
        </div>
      )}

      {/* Profile Form */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <h3 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
          <User className="w-4 h-4 text-purple-600" /> Creator Profile
        </h3>

        <form onSubmit={handleSave} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-medium"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-medium"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Creator Role / Niche</label>
            <input
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-medium"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold flex items-center gap-1.5 shadow-sm"
            >
              <Save className="w-4 h-4" /> Save Profile
            </button>
          </div>
        </form>
      </div>

      {/* Preferred Platforms */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <h3 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
          <Settings className="w-4 h-4 text-purple-600" /> Preferred Platforms
        </h3>
        <p className="text-xs text-slate-500">
          Select which social media feeds should take priority across your homepage radar and dashboard.
        </p>

        <div className="flex flex-wrap gap-2">
          {ALL_PLATFORMS.map((plat) => {
            const isSelected = profile?.preferredPlatforms.includes(plat.id as any);
            return (
              <button
                key={plat.id}
                onClick={() => togglePlatform(plat.id as any)}
                className={`text-xs px-3.5 py-2 rounded-xl font-bold transition-all border ${
                  isSelected
                    ? 'bg-purple-600 text-white border-purple-600 shadow-sm'
                    : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700'
                }`}
              >
                {plat.name} {isSelected ? '✓' : '+'}
              </button>
            );
          })}
        </div>
      </div>

      {/* Focus Categories */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <h3 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
          <Bell className="w-4 h-4 text-purple-600" /> Focus Categories & Niches
        </h3>

        <div className="flex flex-wrap gap-2">
          {ALL_CATEGORIES.map((cat) => {
            const isSelected = profile?.preferredCategories.includes(cat);
            return (
              <button
                key={cat}
                onClick={() => toggleCategory(cat)}
                className={`text-xs px-3 py-1.5 rounded-xl font-bold transition-all border ${
                  isSelected
                    ? 'bg-gradient-to-r from-purple-600 to-cyan-500 text-white border-transparent shadow-sm'
                    : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700'
                }`}
              >
                {cat} {isSelected ? '✓' : '+'}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
