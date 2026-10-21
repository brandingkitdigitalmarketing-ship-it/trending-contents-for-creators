'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { generateCreatorContentPack } from '@/lib/aiGenerator';
import { GeneratedContentPack, ContentFormat } from '@/types';
import { storage } from '@/lib/storage';
import {
  Sparkles,
  Copy,
  Check,
  RotateCcw,
  Calendar,
  Share2,
  Video,
  FileText,
  MessageSquare,
  Bookmark,
  ChevronRight,
  Lightbulb,
  Zap,
} from 'lucide-react';

export default function GeneratorPage() {
  return (
    <Suspense fallback={<div className="max-w-7xl mx-auto p-12 text-center text-xs text-slate-400">Loading AI Content Studio...</div>}>
      <GeneratorContent />
    </Suspense>
  );
}

function GeneratorContent() {
  const searchParams = useSearchParams();
  const initialTrend = searchParams.get('trend') || 'Autonomous AI Agents for Small Business Workflows';
  const initialCategory = searchParams.get('category') || 'Technology & AI';
  const initialPlatform = searchParams.get('platform') || 'All Platforms';

  const [topic, setTopic] = useState(initialTrend);
  const [category, setCategory] = useState(initialCategory);
  const [platform, setPlatform] = useState(initialPlatform);
  const [audience, setAudience] = useState('Digital Creators & Solopreneurs');
  const [tone, setTone] = useState('Actionable & High Energy');
  const [language, setLanguage] = useState('English');
  const [loading, setLoading] = useState(false);
  const [contentPack, setContentPack] = useState<GeneratedContentPack | null>(null);
  const [copiedItem, setCopiedItem] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'ideas' | 'hooks' | 'scripts' | 'social'>('ideas');
  const [calSuccess, setCalSuccess] = useState<number | null>(null);

  // Generate on mount or when triggered
  useEffect(() => {
    handleGenerate();
  }, []);

  const handleGenerate = () => {
    setLoading(true);
    setTimeout(() => {
      const pack = generateCreatorContentPack({
        trendTitle: topic,
        category,
        platform,
        audience,
        tone,
        language,
      });
      setContentPack(pack);
      setLoading(false);
    }, 400);
  };

  const copyToClipboard = async (text: string, identifier: string) => {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(text);
      setCopiedItem(identifier);
      setTimeout(() => setCopiedItem(null), 2000);
    }
  };

  const handleAddToCalendar = (title: string, format: ContentFormat, index: number) => {
    storage.addCalendarItem({
      title,
      trendTitle: topic,
      platform: 'youtube',
      date: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
      status: 'Planned',
      format,
      category,
      notes: `Generated via AI Content Studio with tone: ${tone}`,
    });
    setCalSuccess(index);
    setTimeout(() => setCalSuccess(null), 1500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/40 px-3 py-1 rounded-full mb-2">
          <Sparkles className="w-3.5 h-3.5" /> AI Content Research & Ideation Studio
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
          Turn Any Trend Into 10+ Viral Formats
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
          Synthesize high-converting hooks, video scripts, YouTube thumbnails, X threads, and LinkedIn posts tailored to your exact tone and audience.
        </p>
      </div>

      {/* Main Grid: Control Parameters + Generated Content Pack */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Generator Controls */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-5 lg:sticky lg:top-24 h-fit">
          <h3 className="font-bold text-sm text-slate-900 dark:text-white uppercase tracking-wider">
            Generation Parameters
          </h3>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              Topic or Seed Trend
            </label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g. Autonomous AI Agents for Small Business"
              className="w-full text-xs p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-purple-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              Primary Platform Target
            </label>
            <select
              value={platform}
              onChange={(e) => setPlatform(e.target.value)}
              className="w-full text-xs p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-medium outline-none"
            >
              <option value="All Platforms">All Platforms (Cross-Media Pack)</option>
              <option value="youtube">YouTube (Longform & Shorts)</option>
              <option value="instagram">Instagram (Reels & Carousels)</option>
              <option value="tiktok">TikTok (Short-form Video)</option>
              <option value="linkedin">LinkedIn (B2B Authority)</option>
              <option value="x">X / Twitter (Threads & Posts)</option>
              <option value="pinterest">Pinterest (Visual Pins)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              Target Audience
            </label>
            <select
              value={audience}
              onChange={(e) => setAudience(e.target.value)}
              className="w-full text-xs p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-medium outline-none"
            >
              <option value="Digital Creators & Solopreneurs">Digital Creators & Solopreneurs</option>
              <option value="Tech Enthusiasts & Engineers">Tech Enthusiasts & Engineers</option>
              <option value="Small Business Owners & Founders">Small Business Owners & Founders</option>
              <option value="Students & Academics">Students & Academics</option>
              <option value="Health & Fitness Seekers">Health & Fitness Seekers</option>
              <option value="General Mainstream Audience">General Mainstream Audience</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              Preferred Tone
            </label>
            <select
              value={tone}
              onChange={(e) => setTone(e.target.value)}
              className="w-full text-xs p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-medium outline-none"
            >
              <option value="Actionable & High Energy">Actionable & High Energy</option>
              <option value="Educational & In-Depth Masterclass">Educational & In-Depth Masterclass</option>
              <option value="Contrarian & Myth-Busting">Contrarian & Myth-Busting</option>
              <option value="Transparent Storytelling">Transparent Storytelling</option>
              <option value="Professional & Analytical B2B">Professional & Analytical B2B</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              Content Language
            </label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full text-xs p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-medium outline-none"
            >
              <option value="English">English</option>
              <option value="Spanish">Spanish</option>
              <option value="Hindi">Hindi</option>
              <option value="German">German</option>
              <option value="French">French</option>
              <option value="Portuguese">Portuguese</option>
            </select>
          </div>

          <button
            onClick={handleGenerate}
            disabled={loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500 hover:opacity-95 text-white font-bold text-xs shadow-md shadow-purple-600/25 flex items-center justify-center gap-2"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Synthesizing Ideas...
              </span>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Generate Content Ideas</span>
              </>
            )}
          </button>

          <p className="text-[11px] text-slate-400 dark:text-slate-500 text-center">
            AI suggestions are strategic creative blueprints, not guarantees of virality.
          </p>
        </div>

        {/* Right Column: Generated Output Workspace */}
        <div className="lg:col-span-2 space-y-6">
          {contentPack && (
            <>
              {/* Output Navigation Tabs */}
              <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2 overflow-x-auto">
                <button
                  onClick={() => setActiveTab('ideas')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                    activeTab === 'ideas'
                      ? 'bg-purple-600 text-white shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  💡 10 Content Ideas
                </button>
                <button
                  onClick={() => setActiveTab('hooks')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                    activeTab === 'hooks'
                      ? 'bg-purple-600 text-white shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  ⚡ 5 Viral Hooks
                </button>
                <button
                  onClick={() => setActiveTab('scripts')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                    activeTab === 'scripts'
                      ? 'bg-purple-600 text-white shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  🎬 Reel & Video Scripts
                </button>
                <button
                  onClick={() => setActiveTab('social')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                    activeTab === 'social'
                      ? 'bg-purple-600 text-white shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  📱 Multi-Platform Posts
                </button>
              </div>

              {/* TAB 1: 10 CONTENT IDEAS */}
              {activeTab === 'ideas' && (
                <div className="space-y-4">
                  {contentPack.contentIdeas.map((idea, idx) => (
                    <div
                      key={idea.id}
                      className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-purple-300 dark:hover:border-purple-700/80 transition-all"
                    >
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-lg bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 font-extrabold text-xs flex items-center justify-center">
                            #{idea.id}
                          </span>
                          <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                            {idea.targetFormat}
                          </span>
                          <span className="text-xs text-purple-600 dark:text-purple-400 font-medium">
                            {idea.angle}
                          </span>
                        </div>

                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => copyToClipboard(idea.title + '\n' + idea.hook, `idea-${idx}`)}
                            className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-500 hover:text-slate-900"
                            title="Copy idea"
                          >
                            {copiedItem === `idea-${idx}` ? (
                              <Check className="w-3.5 h-3.5 text-emerald-500" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </button>

                          <button
                            onClick={() => handleAddToCalendar(idea.title, idea.targetFormat, idx)}
                            className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-500 hover:text-purple-600"
                            title="Add to Calendar"
                          >
                            {calSuccess === idx ? (
                              <Check className="w-3.5 h-3.5 text-purple-600 font-bold" />
                            ) : (
                              <Calendar className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </div>
                      </div>

                      <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-1.5">
                        {idea.title}
                      </h4>
                      <p className="text-xs text-purple-600 dark:text-purple-400 font-medium mb-1">
                        Hook: &quot;{idea.hook}&quot;
                      </p>
                      <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                        {idea.description}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* TAB 2: 5 VIRAL HOOKS */}
              {activeTab === 'hooks' && (
                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800/80 text-xs text-purple-900 dark:text-purple-200">
                    ⚡ <strong>Proven Attention Formulas:</strong> Test these first 3-second openers to boost viewer retention and stop the scroll.
                  </div>

                  {contentPack.viralHooks.map((hook, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-start justify-between gap-4"
                    >
                      <div className="flex items-start gap-3">
                        <span className="w-6 h-6 rounded-lg bg-pink-100 dark:bg-pink-950/60 text-pink-600 font-extrabold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <p className="text-sm font-bold text-slate-900 dark:text-white leading-snug">
                          &quot;{hook}&quot;
                        </p>
                      </div>

                      <button
                        onClick={() => copyToClipboard(hook, `hook-${idx}`)}
                        className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-slate-900 flex-shrink-0"
                      >
                        {copiedItem === `hook-${idx}` ? (
                          <Check className="w-4 h-4 text-emerald-500" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* TAB 3: REEL & VIDEO SCRIPTS */}
              {activeTab === 'scripts' && (
                <div className="space-y-6">
                  {/* Instagram / TikTok Reel Script */}
                  <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                      <span className="font-extrabold text-sm text-pink-600 flex items-center gap-2">
                        <Video className="w-4 h-4" /> 60-Second Short / Reel Script
                      </span>
                      <button
                        onClick={() =>
                          copyToClipboard(
                            `OPENING:\n${contentPack.reelScript.openingHook}\n\nBODY:\n${contentPack.reelScript.bodyPoints.join(
                              '\n'
                            )}\n\nCTA:\n${contentPack.reelScript.callToAction}`,
                            'reel-script'
                          )
                        }
                        className="flex items-center gap-1 text-xs font-bold text-purple-600 hover:underline"
                      >
                        {copiedItem === 'reel-script' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>Copy Script</span>
                      </button>
                    </div>

                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                        0:00 - 0:05 (Hook)
                      </span>
                      <p className="text-xs font-bold text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-800 p-3 rounded-xl border border-slate-200 dark:border-slate-700">
                        {contentPack.reelScript.openingHook}
                      </p>
                    </div>

                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                        0:05 - 0:45 (Core Body Breakdown)
                      </span>
                      <ul className="space-y-2">
                        {contentPack.reelScript.bodyPoints.map((pt, i) => (
                          <li
                            key={i}
                            className="text-xs text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800 p-2.5 rounded-xl border border-slate-200 dark:border-slate-700"
                          >
                            {pt}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                        0:45 - 0:60 (Call to Action)
                      </span>
                      <p className="text-xs font-bold text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/40 p-3 rounded-xl border border-purple-200 dark:border-purple-800">
                        {contentPack.reelScript.callToAction}
                      </p>
                    </div>

                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                        B-Roll & Visual Directions
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-500">
                        {contentPack.reelScript.bRollIdeas.map((b, i) => (
                          <div key={i} className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800/60">
                            • {b}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* YouTube Longform & Shorts Concepts */}
                  <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
                    <span className="font-extrabold text-sm text-red-600 flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
                      <Video className="w-4 h-4" /> YouTube Video Blueprint
                    </span>

                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                        Recommended Video Title
                      </span>
                      <p className="text-sm font-extrabold text-slate-900 dark:text-white">
                        {contentPack.youtubeConcepts.videoTitle}
                      </p>
                    </div>

                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                        CTR-Optimized Thumbnail Concept
                      </span>
                      <p className="text-xs text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800 p-3 rounded-xl border border-slate-200 dark:border-slate-700">
                        {contentPack.youtubeConcepts.thumbnailConcept}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 4: MULTI-PLATFORM POSTS */}
              {activeTab === 'social' && (
                <div className="space-y-6">
                  {/* LinkedIn Post */}
                  <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-blue-600 uppercase tracking-wider">
                        LinkedIn Thought Leadership Post
                      </span>
                      <button
                        onClick={() => copyToClipboard(contentPack.socialPosts.linkedIn, 'li-post')}
                        className="text-xs font-bold text-purple-600 flex items-center gap-1"
                      >
                        {copiedItem === 'li-post' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>Copy Post</span>
                      </button>
                    </div>
                    <pre className="text-xs font-sans whitespace-pre-line text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 leading-relaxed">
                      {contentPack.socialPosts.linkedIn}
                    </pre>
                  </div>

                  {/* X (Twitter) Thread */}
                  <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-sky-500 uppercase tracking-wider">
                        X (Twitter) 7-Tweet Thread
                      </span>
                      <button
                        onClick={() => copyToClipboard(contentPack.socialPosts.xThread.join('\n\n---\n\n'), 'x-thread')}
                        className="text-xs font-bold text-purple-600 flex items-center gap-1"
                      >
                        {copiedItem === 'x-thread' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>Copy All Tweets</span>
                      </button>
                    </div>
                    <div className="space-y-2">
                      {contentPack.socialPosts.xThread.map((tweet, i) => (
                        <div
                          key={i}
                          className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-800 dark:text-slate-200 whitespace-pre-line"
                        >
                          {tweet}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Recommended Hashtags & Keywords */}
                  <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
                    <span className="font-bold text-xs text-slate-400 uppercase tracking-wider block">
                      Recommended Hashtags & Search Keywords
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {contentPack.recommendedHashtags.map((h) => (
                        <span key={h} className="text-xs px-2.5 py-1 rounded-lg bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 font-semibold">
                          {h}
                        </span>
                      ))}
                      {contentPack.recommendedKeywords.map((k) => (
                        <span key={k} className="text-xs px-2.5 py-1 rounded-lg bg-cyan-50 dark:bg-cyan-950/40 text-cyan-700 dark:text-cyan-300 font-semibold">
                          🔍 {k}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
