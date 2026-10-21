import { GeneratedContentPack, ContentFormat } from '@/types';

export interface GenerateIdeasParams {
  trendTitle: string;
  category?: string;
  platform?: string;
  audience?: string;
  tone?: string;
  language?: string;
  preferredFormat?: ContentFormat;
}

export function generateCreatorContentPack(params: GenerateIdeasParams): GeneratedContentPack {
  const {
    trendTitle,
    category = 'General',
    platform = 'All Platforms',
    audience = 'Entrepreneurs & Digital Creators',
    tone = 'Actionable & High Energy',
    language = 'English',
  } = params;

  // Extract clean keyword phrase
  const cleanTitle = trendTitle.replace(/[^\w\s-]/g, '').trim();

  const viralHooks = [
    `90% of people are approaching ${cleanTitle} completely backwards. Here is what actually works:`,
    `I spent 30 days analyzing ${cleanTitle} so you don't have to waste 100 hours.`,
    `If you're not paying attention to ${cleanTitle} right now, you are leaving massive leverage on the table.`,
    `The secret reason why everyone is suddenly obsessed with ${cleanTitle} (and the breakdown no one mentions):`,
    `Stop scrolling. If you care about ${category}, this one shift in ${cleanTitle} will change your entire roadmap.`,
  ];

  const contentIdeas = [
    {
      id: 1,
      title: `The Beginner-to-Pro Blueprint for ${cleanTitle}`,
      hook: `How to master ${cleanTitle} in 15 minutes a day even if you have zero background.`,
      description: `Step-by-step breakdown starting from fundamental principles, moving into 3 actionable frameworks with real-world case studies.`,
      targetFormat: 'Video' as ContentFormat,
      angle: 'Comprehensive Masterclass',
    },
    {
      id: 2,
      title: `3 Common Traps Everyone Falls Into With ${cleanTitle}`,
      hook: `Avoid these 3 expensive mistakes before you invest another hour into ${cleanTitle}.`,
      description: `Highlighting the most frequent misconceptions and how top creators/businesses sidestep them effortlessly.`,
      targetFormat: 'Reel' as ContentFormat,
      angle: 'Mistake Avoidance & Cautionary Insight',
    },
    {
      id: 3,
      title: `Behind The Scenes: Real Numbers Behind ${cleanTitle}`,
      hook: `We tested ${cleanTitle} for 14 days straight. Here is the raw data and uncensored metrics.`,
      description: `Data-driven experiment sharing transparent stats, conversion rates, and unexpected takeaways.`,
      targetFormat: 'Post' as ContentFormat,
      angle: 'Transparent Case Study',
    },
    {
      id: 4,
      title: `The 5-Minute Daily Routine for ${cleanTitle}`,
      hook: `Steal this 5-minute template that eliminates 80% of manual friction with ${cleanTitle}.`,
      description: `Bite-sized productivity checklist that fits into busy creator calendars.`,
      targetFormat: 'Short' as ContentFormat,
      angle: 'Actionable Speed Template',
    },
    {
      id: 5,
      title: `Contrarian View: Why Most Advice on ${cleanTitle} is Dead Wrong`,
      hook: `Everyone says to do X with ${cleanTitle}. We did the exact opposite, and results skyrocketed.`,
      description: `Challenging popular consensus with sound logic and alternative methodologies.`,
      targetFormat: 'Discussion' as ContentFormat,
      angle: 'Contrarian Debate Starter',
    },
    {
      id: 6,
      title: `Tool Stack Breakdown: Top 5 Utilities Powering ${cleanTitle}`,
      hook: `The essential software stack you need to execute ${cleanTitle} like a funded agency.`,
      description: `Curated tool reviews comparing free vs premium options with pros and cons.`,
      targetFormat: 'Article' as ContentFormat,
      angle: 'Curated Resource Guide',
    },
    {
      id: 7,
      title: `How ${cleanTitle} Will Evolve Over The Next 12 Months`,
      hook: `3 future predictions for ${cleanTitle} that early adopters are preparing for right now.`,
      description: `Forward-looking trend forecasting highlighting emerging opportunities and defensive moats.`,
      targetFormat: 'Video' as ContentFormat,
      angle: 'Futurism & Strategic Planning',
    },
    {
      id: 8,
      title: `The 60-Second Crash Course on ${cleanTitle}`,
      hook: `Understand ${cleanTitle} faster than a coffee break. Save this for later.`,
      description: `Ultra-high-energy visual breakdown designed for maximum retention and repeat saves.`,
      targetFormat: 'Reel' as ContentFormat,
      angle: 'Rapid Education & High Save Rate',
    },
    {
      id: 9,
      title: `How I Automated 70% of ${cleanTitle} Workflows`,
      hook: `Turn ${cleanTitle} from an exhausting chore into a background engine.`,
      description: `Detailed workflow walkthrough combining automated triggers, templates, and scheduling.`,
      targetFormat: 'Post' as ContentFormat,
      angle: 'Leverage & Systemization',
    },
    {
      id: 10,
      title: `Q&A Breakdown: Answering The 10 Most Googled Questions About ${cleanTitle}`,
      hook: `You asked, we answered: The truth about ${cleanTitle} without any fluff.`,
      description: `Addressing top community FAQs, search queries, and pain points in rapid succession.`,
      targetFormat: 'Discussion' as ContentFormat,
      angle: 'Direct Audience Q&A',
    },
  ];

  const reelScript = {
    openingHook: `If you want to capitalize on ${cleanTitle} before everyone else saturates it, do this right now.`,
    bodyPoints: [
      `Point 1: Stop overcomplicating the setup. Focus exclusively on your primary leverage point.`,
      `Point 2: Use templates and pre-built structures instead of starting from a blank page every single time.`,
      `Point 3: Measure velocity, not vanity metrics. Look for save rates and direct message inquiries.`,
    ],
    callToAction: `Comment "TREND" below and I'll send you my complete free cheat sheet on ${cleanTitle}.`,
    bRollIdeas: [
      `Quick pan across dual monitor setup showing live trend charts and dashboard.`,
      `Fast typing on keyboard with glowing RGB or warm desk lighting.`,
      `Close-up pointing to phone screen displaying viral metric spike.`,
      `Split screen comparison showing standard vs optimized approach.`,
    ],
  };

  const youtubeConcepts = {
    videoTitle: `How I Mastered ${cleanTitle} (Full Step-by-Step Guide for Creators)`,
    thumbnailConcept: `Split face with extreme emotion on left; vibrant glowing graph pointing up 300% on right with text: "BEFORE IT EXPLODES"`,
    shortsConcept: `30-second rapid-fire cut showing 3 tools you can test in 60 seconds with ${cleanTitle}.`,
  };

  const xThread = [
    `1/7: ${cleanTitle} is quietly becoming the biggest creator opportunity of this quarter.\n\nMost people will ignore it until it's too late.\n\nHere is your full breakdown: 🧵👇`,
    `2/7: Why is it surging?\n\nSearch volume and community discussions have spiked over 100% in the last 14 days.\n\nAudiences are actively hunting for actionable answers, not high-level theory.`,
    `3/7: The 3 Core Pillars:\n\n• Pillar 1: High-signal curation\n• Pillar 2: Systematized workflow\n• Pillar 3: Fast feedback loops`,
    `4/7: The Biggest Mistake:\n\nTrying to do everything manually. The top 1% use automated scrapers, prompt templates, and calendar pipelines.`,
    `5/7: Action Step for Today:\n\nPick ONE angle from the list above. Draft a 60-second video or 5-slide carousel and publish within 24 hours.`,
    `6/7: Bookmark this thread so you can reference the framework when planning your content calendar.`,
    `7/7: Follow @CreatorTrends for real-time viral breakout alerts across Instagram, YouTube, Reddit & X.`,
  ];

  const socialPosts = {
    linkedIn: `The creator economy is shifting faster than ever.\n\nOver the last 14 days, interest in "${cleanTitle}" has surged across multiple platforms.\n\nHere is what executives, founders, and content leaders need to understand about this shift:\n\n1. It represents a move toward high-utility, actionable content.\n2. Audiences value transparent benchmarks over curated perfection.\n3. First-movers are capturing outsized organic reach.\n\nWhat is your perspective on this trend? Let's discuss in the comments below.\n\n#ContentStrategy #Innovation #CreatorEconomy #${cleanTitle.replace(/\s+/g, '')}`,
    xThread,
    pinterestPinTitle: `The Ultimate Guide to ${cleanTitle} for Modern Creators | Free Checklist`,
    facebookPost: `Are you noticing how much everyone is talking about ${cleanTitle} lately? We put together a clear, zero-jargon breakdown to help you get ahead of the curve. Check out the link below and let us know your thoughts! 👇`,
    redditPrompt: `[Discussion] What are your honest thoughts on the sudden rise of ${cleanTitle}? Are you actually using it or is it mostly hype? Here's my experience after 2 weeks of testing...`,
  };

  const recommendedHashtags = [
    `#${cleanTitle.replace(/\s+/g, '')}`,
    `#${category.replace(/[^a-zA-Z]/g, '')}`,
    '#CreatorEconomy',
    '#ContentCreator',
    '#TrendingNow',
    '#ViralTrends',
    '#DigitalStrategy',
  ];

  const recommendedKeywords = [
    `${cleanTitle} tutorial`,
    `${cleanTitle} tools`,
    `how to use ${cleanTitle}`,
    `best ${cleanTitle} tips`,
    `${cleanTitle} 2026`,
  ];

  return {
    trendTitle,
    platform,
    audience,
    tone,
    contentIdeas,
    viralHooks,
    reelScript,
    youtubeConcepts,
    socialPosts,
    recommendedHashtags,
    recommendedKeywords,
    callToAction: `Ready to turn ${cleanTitle} into high-performing content? Add these concepts to your Creator Trends Content Calendar now!`,
  };
}
