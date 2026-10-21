import {
  Bookmark,
  CalendarItem,
  Collection,
  FollowedTopic,
  IntegrationConnector,
  NotificationItem,
  TrendItem,
  UserProfile,
} from '@/types';
import { SEED_TRENDS } from '@/data/seedTrends';

const STORAGE_KEYS = {
  BOOKMARKS: 'creator_trends_bookmarks',
  COLLECTIONS: 'creator_trends_collections',
  CALENDAR: 'creator_trends_calendar',
  FOLLOWED: 'creator_trends_followed_topics',
  NOTIFICATIONS: 'creator_trends_notifications',
  USER_PROFILE: 'creator_trends_profile',
  CUSTOM_CATEGORIES: 'creator_trends_custom_categories',
  INTEGRATIONS: 'creator_trends_integrations',
};

const DEFAULT_COLLECTIONS: Collection[] = [
  {
    id: 'col-ai-ideas',
    name: 'AI Content Ideas',
    description: 'Autonomous agents, prompt templates, and generative workflow tutorials.',
    color: '#7C3AED',
    itemCount: 2,
    createdAt: '2026-10-14T10:00:00Z',
  },
  {
    id: 'col-reels-shorts',
    name: 'Shorts & Reels Hooks',
    description: 'High-velocity short-form concepts for TikTok, Instagram Reels, and YouTube Shorts.',
    color: '#06B6D4',
    itemCount: 2,
    createdAt: '2026-10-14T11:00:00Z',
  },
  {
    id: 'col-cricket-sports',
    name: 'Cricket & Sports Campaigns',
    description: 'Mega auction analytics, viral moments, and sports breakdowns.',
    color: '#F43F5E',
    itemCount: 1,
    createdAt: '2026-10-15T09:00:00Z',
  },
  {
    id: 'col-weekly-calendar',
    name: 'Weekly Content Calendar',
    description: 'Topics ready to shoot and draft for this week.',
    color: '#16A34A',
    itemCount: 3,
    createdAt: '2026-10-15T12:00:00Z',
  },
];

const DEFAULT_BOOKMARKS: Bookmark[] = [
  {
    id: 'bm-1',
    trendId: 'trend-ai-agents-automation',
    trend: SEED_TRENDS[0],
    collectionId: 'col-ai-ideas',
    notes: 'Create a 15-minute tutorial showing how to build an agent using n8n and local models.',
    tags: ['Tutorial', 'High Priority', 'YouTube'],
    createdAt: '2026-10-15T10:00:00Z',
  },
  {
    id: 'bm-2',
    trendId: 'trend-glassmorphism-clean-aesthetic',
    trend: SEED_TRENDS[1],
    collectionId: 'col-reels-shorts',
    notes: 'Record a quick 45-second CSS screen recording with lo-fi background beat.',
    tags: ['CSS', 'Design', 'Instagram'],
    createdAt: '2026-10-15T11:30:00Z',
  },
  {
    id: 'bm-3',
    trendId: 'trend-cricket-ipl-retention-speculation',
    trend: SEED_TRENDS[2],
    collectionId: 'col-cricket-sports',
    notes: 'Build an interactive prediction graphic for Instagram Carousel & YouTube Community post.',
    tags: ['Cricket', 'Infographic'],
    createdAt: '2026-10-15T14:15:00Z',
  },
];

const DEFAULT_CALENDAR_ITEMS: CalendarItem[] = [
  {
    id: 'cal-1',
    title: 'Autonomous AI Agents Tutorial - 0 to 1',
    trendId: 'trend-ai-agents-automation',
    trendTitle: 'Autonomous AI Agents for Small Business Workflows',
    platform: 'youtube',
    date: '2026-10-18',
    status: 'In Progress',
    notes: 'Record screen capture of n8n agent workflow setup.',
    format: 'Video',
    category: 'Technology & AI',
  },
  {
    id: 'cal-2',
    title: 'Glassmorphism CSS 30-Second Micro-Tip',
    trendId: 'trend-glassmorphism-clean-aesthetic',
    trendTitle: 'Minimalist Spatial & Glassmorphism UI Designs',
    platform: 'instagram',
    date: '2026-10-19',
    status: 'Planned',
    notes: 'Add download link for template in bio.',
    format: 'Reel',
    category: 'Digital Marketing',
  },
  {
    id: 'cal-3',
    title: 'IPL Squad Purse Breakdown Infographic',
    trendId: 'trend-cricket-ipl-retention-speculation',
    trendTitle: 'T20 & IPL Squad Retention Strategies & Trade Rumors',
    platform: 'x',
    date: '2026-10-20',
    status: 'Idea',
    notes: 'Tag official team fan clubs for early quote tweets.',
    format: 'Post',
    category: 'Sports & Cricket',
  },
  {
    id: 'cal-4',
    title: 'Zone 2 Cardio Treadmill Protocol',
    trendId: 'trend-zone-2-cardio-longevity-science',
    trendTitle: 'Zone 2 Cardio Training & Metabolic Longevity Protocols',
    platform: 'tiktok',
    date: '2026-10-22',
    status: 'Planned',
    notes: 'Show Apple watch workout heart rate screen.',
    format: 'Short',
    category: 'Health & Fitness',
  },
];

const DEFAULT_FOLLOWED_TOPICS: FollowedTopic[] = [
  {
    id: 'ft-1',
    keyword: 'Autonomous AI Agents',
    category: 'Technology & AI',
    currentPopularity: 94,
    changePct: 184,
    alertThreshold: 50,
    alertsEnabled: true,
    lastAlert: '2 hours ago',
  },
  {
    id: 'ft-2',
    keyword: 'IPL Retention Rules',
    category: 'Sports & Cricket',
    currentPopularity: 96,
    changePct: 230,
    alertThreshold: 40,
    alertsEnabled: true,
    lastAlert: '5 hours ago',
  },
  {
    id: 'ft-3',
    keyword: 'Generative Engine Optimization',
    category: 'Digital Marketing',
    currentPopularity: 92,
    changePct: 215,
    alertThreshold: 60,
    alertsEnabled: false,
    lastAlert: '1 day ago',
  },
];

const DEFAULT_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'Viral Surge Detected! 🔥',
    message: '"T20 & IPL Squad Retention Strategies" spiked by +230% in India today.',
    type: 'surge',
    read: false,
    timestamp: '15 minutes ago',
    link: '/trends/trend-cricket-ipl-retention-speculation',
  },
  {
    id: 'notif-2',
    title: 'Emerging High Opportunity Score ⚡',
    message: '"Generative Engine Optimization (GEO)" reached an Opportunity Score of 92 with low creator competition.',
    type: 'breakout',
    read: false,
    timestamp: '1 hour ago',
    link: '/trends/trend-ai-search-optimization-geoeo',
  },
  {
    id: 'notif-3',
    title: 'Weekly Content Idea Digest Ready 📝',
    message: '10 fresh content angles synthesized for your followed niche: Technology & AI.',
    type: 'milestone',
    read: true,
    timestamp: 'Yesterday',
    link: '/generator',
  },
];

const DEFAULT_USER_PROFILE: UserProfile = {
  name: 'Alex Rivera',
  email: 'alex.creator@example.com',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
  role: 'Full-Time Creator & YouTuber',
  plan: 'Creator Pro',
  preferredPlatforms: ['youtube', 'instagram', 'x', 'reddit'],
  preferredCategories: ['Technology & AI', 'Creator Economy', 'Digital Marketing', 'Sports & Cricket'],
  preferredRegions: ['United States', 'India', 'Global (Worldwide)'],
  preferredLanguages: ['English', 'Hindi'],
  usage: {
    searchesUsed: 38,
    searchesLimit: 500,
    bookmarksUsed: 14,
    bookmarksLimit: 100,
    aiIdeasGenerated: 42,
    aiLimit: 250,
  },
};

const DEFAULT_INTEGRATIONS: IntegrationConnector[] = [
  {
    id: 'youtube',
    name: 'YouTube Data API v3',
    iconName: 'Youtube',
    status: 'connected',
    lastSync: '10 minutes ago',
    apiVersion: 'v3.2',
    rateLimitRemaining: 9400,
    requiresKey: true,
    notes: 'Provides trending video charts, Shorts velocity, and search volume estimates.',
    apiKeySet: true,
  },
  {
    id: 'instagram',
    name: 'Meta Graph API (Instagram)',
    iconName: 'Instagram',
    status: 'demo_mode',
    lastSync: '25 minutes ago',
    apiVersion: 'v19.0',
    rateLimitRemaining: 480,
    requiresKey: true,
    notes: 'Reels audio velocity and hashtag counters. Running with simulated fallback until live token configured.',
    apiKeySet: false,
  },
  {
    id: 'reddit',
    name: 'Reddit Data API',
    iconName: 'MessageSquare',
    status: 'connected',
    lastSync: '15 minutes ago',
    apiVersion: 'OAuth2 v1',
    rateLimitRemaining: 850,
    requiresKey: true,
    notes: 'Subreddit sentiment, rising threads, and comment acceleration.',
    apiKeySet: true,
  },
  {
    id: 'x',
    name: 'X (Twitter) API v2',
    iconName: 'Twitter',
    status: 'demo_mode',
    lastSync: '40 minutes ago',
    apiVersion: 'v2',
    rateLimitRemaining: 300,
    requiresKey: true,
    notes: 'Trending hashtag queries and thread analytics. Demo dataset active.',
    apiKeySet: false,
  },
  {
    id: 'pinterest',
    name: 'Pinterest Trends API',
    iconName: 'Pin',
    status: 'demo_mode',
    lastSync: '1 hour ago',
    apiVersion: 'v5',
    rateLimitRemaining: 600,
    requiresKey: true,
    notes: 'Visual search intent and aesthetic board saves.',
    apiKeySet: false,
  },
  {
    id: 'google-trends',
    name: 'Google Trends Data Connector',
    iconName: 'TrendingUp',
    status: 'connected',
    lastSync: '5 minutes ago',
    apiVersion: 'Aggregated v1',
    rateLimitRemaining: 1500,
    requiresKey: false,
    notes: 'Public search interest indices and rising query clusters.',
    apiKeySet: true,
  },
  {
    id: 'tiktok',
    name: 'TikTok Research API',
    iconName: 'Music2',
    status: 'demo_mode',
    lastSync: '2 hours ago',
    apiVersion: 'v2',
    rateLimitRemaining: 200,
    requiresKey: true,
    notes: 'Viral sounds, challenges and creator video views where authorized.',
    apiKeySet: false,
  },
  {
    id: 'linkedin',
    name: 'LinkedIn Community API',
    iconName: 'Linkedin',
    status: 'demo_mode',
    lastSync: '3 hours ago',
    apiVersion: 'v2',
    rateLimitRemaining: 150,
    requiresKey: true,
    notes: 'B2B discussions and professional topic momentum.',
    apiKeySet: false,
  },
  {
    id: 'custom',
    name: 'Modular Custom Webhook Feed',
    iconName: 'Layers',
    status: 'connected',
    lastSync: 'Just now',
    apiVersion: 'Custom v1',
    rateLimitRemaining: 5000,
    requiresKey: false,
    notes: 'Permits creators and agencies to ingest custom RSS feeds, brand telemetry, or scrapers.',
    apiKeySet: true,
  },
];

function notifyChange() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('creator_trends_storage_updated'));
  }
}

// Storage helpers
export const storage = {
  getBookmarks(): Bookmark[] {
    if (typeof window === 'undefined') return DEFAULT_BOOKMARKS;
    const raw = localStorage.getItem(STORAGE_KEYS.BOOKMARKS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(DEFAULT_BOOKMARKS));
      return DEFAULT_BOOKMARKS;
    }
    try {
      return JSON.parse(raw);
    } catch {
      return DEFAULT_BOOKMARKS;
    }
  },

  addBookmark(trend: TrendItem, notes?: string, tags: string[] = [], collectionId?: string): Bookmark {
    const bookmarks = this.getBookmarks();
    const existing = bookmarks.find((b) => b.trendId === trend.id);
    if (existing) return existing;

    const newBookmark: Bookmark = {
      id: `bm-${Date.now()}`,
      trendId: trend.id,
      trend,
      collectionId: collectionId || 'col-ai-ideas',
      notes: notes || '',
      tags: tags.length ? tags : ['Saved Trend', trend.platform],
      createdAt: new Date().toISOString(),
    };

    bookmarks.unshift(newBookmark);
    localStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(bookmarks));
    notifyChange();
    return newBookmark;
  },

  removeBookmark(idOrTrendId: string) {
    let bookmarks = this.getBookmarks();
    bookmarks = bookmarks.filter((b) => b.id !== idOrTrendId && b.trendId !== idOrTrendId);
    localStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(bookmarks));
    notifyChange();
  },

  updateBookmark(id: string, updates: Partial<Bookmark>) {
    const bookmarks = this.getBookmarks();
    const index = bookmarks.findIndex((b) => b.id === id);
    if (index !== -1) {
      bookmarks[index] = { ...bookmarks[index], ...updates };
      localStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(bookmarks));
      notifyChange();
    }
  },

  isBookmarked(trendId: string): boolean {
    const bookmarks = this.getBookmarks();
    return bookmarks.some((b) => b.trendId === trendId);
  },

  getCollections(): Collection[] {
    if (typeof window === 'undefined') return DEFAULT_COLLECTIONS;
    const raw = localStorage.getItem(STORAGE_KEYS.COLLECTIONS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.COLLECTIONS, JSON.stringify(DEFAULT_COLLECTIONS));
      return DEFAULT_COLLECTIONS;
    }
    try {
      return JSON.parse(raw);
    } catch {
      return DEFAULT_COLLECTIONS;
    }
  },

  createCollection(name: string, description?: string, color: string = '#7C3AED'): Collection {
    const collections = this.getCollections();
    const newCollection: Collection = {
      id: `col-${Date.now()}`,
      name,
      description,
      color,
      itemCount: 0,
      createdAt: new Date().toISOString(),
    };
    collections.push(newCollection);
    localStorage.setItem(STORAGE_KEYS.COLLECTIONS, JSON.stringify(collections));
    notifyChange();
    return newCollection;
  },

  deleteCollection(id: string) {
    let collections = this.getCollections();
    collections = collections.filter((c) => c.id !== id);
    localStorage.setItem(STORAGE_KEYS.COLLECTIONS, JSON.stringify(collections));
    notifyChange();
  },

  getCalendar(): CalendarItem[] {
    if (typeof window === 'undefined') return DEFAULT_CALENDAR_ITEMS;
    const raw = localStorage.getItem(STORAGE_KEYS.CALENDAR);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.CALENDAR, JSON.stringify(DEFAULT_CALENDAR_ITEMS));
      return DEFAULT_CALENDAR_ITEMS;
    }
    try {
      return JSON.parse(raw);
    } catch {
      return DEFAULT_CALENDAR_ITEMS;
    }
  },

  addCalendarItem(item: Omit<CalendarItem, 'id'>): CalendarItem {
    const calendar = this.getCalendar();
    const newItem: CalendarItem = {
      ...item,
      id: `cal-${Date.now()}`,
    };
    calendar.push(newItem);
    localStorage.setItem(STORAGE_KEYS.CALENDAR, JSON.stringify(calendar));
    notifyChange();
    return newItem;
  },

  updateCalendarItem(id: string, updates: Partial<CalendarItem>) {
    const calendar = this.getCalendar();
    const index = calendar.findIndex((c) => c.id === id);
    if (index !== -1) {
      calendar[index] = { ...calendar[index], ...updates };
      localStorage.setItem(STORAGE_KEYS.CALENDAR, JSON.stringify(calendar));
      notifyChange();
    }
  },

  deleteCalendarItem(id: string) {
    let calendar = this.getCalendar();
    calendar = calendar.filter((c) => c.id !== id);
    localStorage.setItem(STORAGE_KEYS.CALENDAR, JSON.stringify(calendar));
    notifyChange();
  },

  getFollowedTopics(): FollowedTopic[] {
    if (typeof window === 'undefined') return DEFAULT_FOLLOWED_TOPICS;
    const raw = localStorage.getItem(STORAGE_KEYS.FOLLOWED);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.FOLLOWED, JSON.stringify(DEFAULT_FOLLOWED_TOPICS));
      return DEFAULT_FOLLOWED_TOPICS;
    }
    try {
      return JSON.parse(raw);
    } catch {
      return DEFAULT_FOLLOWED_TOPICS;
    }
  },

  addFollowedTopic(keyword: string, category: string = 'General', alertThreshold: number = 50): FollowedTopic {
    const topics = this.getFollowedTopics();
    const existing = topics.find((t) => t.keyword.toLowerCase() === keyword.toLowerCase());
    if (existing) return existing;

    const newTopic: FollowedTopic = {
      id: `ft-${Date.now()}`,
      keyword,
      category,
      currentPopularity: 85,
      changePct: 45,
      alertThreshold,
      alertsEnabled: true,
      lastAlert: 'Just now',
    };
    topics.push(newTopic);
    localStorage.setItem(STORAGE_KEYS.FOLLOWED, JSON.stringify(topics));
    notifyChange();
    return newTopic;
  },

  removeFollowedTopic(id: string) {
    let topics = this.getFollowedTopics();
    topics = topics.filter((t) => t.id !== id);
    localStorage.setItem(STORAGE_KEYS.FOLLOWED, JSON.stringify(topics));
    notifyChange();
  },

  getNotifications(): NotificationItem[] {
    if (typeof window === 'undefined') return DEFAULT_NOTIFICATIONS;
    const raw = localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(DEFAULT_NOTIFICATIONS));
      return DEFAULT_NOTIFICATIONS;
    }
    try {
      return JSON.parse(raw);
    } catch {
      return DEFAULT_NOTIFICATIONS;
    }
  },

  markNotificationAsRead(id: string) {
    const list = this.getNotifications();
    const index = list.findIndex((n) => n.id === id);
    if (index !== -1) {
      list[index].read = true;
      localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(list));
      notifyChange();
    }
  },

  markAllNotificationsRead() {
    const list = this.getNotifications().map((n) => ({ ...n, read: true }));
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(list));
    notifyChange();
  },

  getUserProfile(): UserProfile {
    if (typeof window === 'undefined') return DEFAULT_USER_PROFILE;
    const raw = localStorage.getItem(STORAGE_KEYS.USER_PROFILE);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(DEFAULT_USER_PROFILE));
      return DEFAULT_USER_PROFILE;
    }
    try {
      return JSON.parse(raw);
    } catch {
      return DEFAULT_USER_PROFILE;
    }
  },

  updateUserProfile(updates: Partial<UserProfile>): UserProfile {
    const current = this.getUserProfile();
    const updated = { ...current, ...updates };
    localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(updated));
    notifyChange();
    return updated;
  },

  getIntegrations(): IntegrationConnector[] {
    if (typeof window === 'undefined') return DEFAULT_INTEGRATIONS;
    const raw = localStorage.getItem(STORAGE_KEYS.INTEGRATIONS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.INTEGRATIONS, JSON.stringify(DEFAULT_INTEGRATIONS));
      return DEFAULT_INTEGRATIONS;
    }
    try {
      return JSON.parse(raw);
    } catch {
      return DEFAULT_INTEGRATIONS;
    }
  },

  updateIntegration(id: string, updates: Partial<IntegrationConnector>) {
    const list = this.getIntegrations();
    const index = list.findIndex((i) => i.id === id);
    if (index !== -1) {
      list[index] = { ...list[index], ...updates };
      localStorage.setItem(STORAGE_KEYS.INTEGRATIONS, JSON.stringify(list));
      notifyChange();
    }
  },
};
