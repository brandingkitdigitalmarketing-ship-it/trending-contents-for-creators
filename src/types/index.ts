export type PlatformId =
  | 'instagram'
  | 'youtube'
  | 'facebook'
  | 'x'
  | 'pinterest'
  | 'reddit'
  | 'linkedin'
  | 'tiktok'
  | 'google-trends'
  | 'custom';

export type TrendStatus = 'Emerging' | 'Rising' | 'Viral' | 'Stable' | 'Declining';

export type ContentFormat =
  | 'Video'
  | 'Short'
  | 'Reel'
  | 'Post'
  | 'Article'
  | 'Discussion'
  | 'Image'
  | 'Hashtag';

export type DemandLevel = 'Very High' | 'High' | 'Moderate' | 'Niche';
export type CompetitionLevel = 'Low' | 'Medium' | 'High';
export type MetricProvenance = 'measured' | 'estimated' | 'derived' | 'unavailable';

export interface OpportunityScoreBreakdown {
  growthRate: number; // 0-100 score contribution
  currentInterest: number;
  freshness: number;
  searchDemand: number;
  competitionScore: number;
  audienceRelevance: number;
}

export interface TrendHistoryPoint {
  date: string;
  value: number; // 0-100 relative index or estimated daily volume
}

export interface RegionalPopularityItem {
  country: string;
  code: string;
  score: number;
}

export interface PlatformPopularityItem {
  platform: PlatformId;
  share: number;
}

export interface TopContentExample {
  title: string;
  engagement: string;
  url: string;
  author: string;
  format: ContentFormat;
}

export interface TrendItem {
  id: string;
  title: string;
  slug: string;
  description: string;
  platform: PlatformId;
  category: string;
  subcategory?: string;
  country: string;
  countryCode: string;
  region?: string;
  city?: string;
  language: string;
  status: TrendStatus;
  statusReason: string;
  searchVolume: number;
  searchVolumeFormatted: string;
  searchVolumeProvenance: MetricProvenance;
  growthPercentage: number;
  opportunityScore: number;
  opportunityBreakdown: OpportunityScoreBreakdown;
  history: TrendHistoryPoint[];
  weekOverWeekGrowth: number;
  monthOverMonthGrowth: number;
  formats: ContentFormat[];
  relatedKeywords: string[];
  relatedHashtags: string[];
  relatedQueries: { query: string; growth: string }[];
  sourceUrl?: string;
  sourceName: string;
  detectedAt: string;
  lastUpdatedAt: string;
  isDemoData: boolean;
  regionalPopularity: RegionalPopularityItem[];
  platformBreakdown: PlatformPopularityItem[];
  topContentExamples?: TopContentExample[];
  competitionLevel: CompetitionLevel;
  demandLevel: DemandLevel;
}

export interface Bookmark {
  id: string;
  trendId: string;
  trend: TrendItem;
  collectionId?: string;
  notes?: string;
  tags: string[];
  createdAt: string;
}

export interface Collection {
  id: string;
  name: string;
  description?: string;
  color: string;
  icon?: string;
  itemCount: number;
  createdAt: string;
}

export type CalendarStatus = 'Idea' | 'Planned' | 'In Progress' | 'Ready' | 'Published';

export interface CalendarItem {
  id: string;
  title: string;
  trendId?: string;
  trendTitle?: string;
  platform: PlatformId;
  date: string; // YYYY-MM-DD
  status: CalendarStatus;
  notes?: string;
  format: ContentFormat;
  category?: string;
}

export interface FollowedTopic {
  id: string;
  keyword: string;
  category: string;
  currentPopularity: number;
  changePct: number;
  alertThreshold: number;
  alertsEnabled: boolean;
  lastAlert: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'surge' | 'breakout' | 'milestone' | 'system';
  read: boolean;
  timestamp: string;
  link?: string;
}

export interface UserProfile {
  name: string;
  email: string;
  avatar: string;
  role: string;
  plan: 'Free' | 'Creator Pro' | 'Agency';
  preferredPlatforms: PlatformId[];
  preferredCategories: string[];
  preferredRegions: string[];
  preferredLanguages: string[];
  usage: {
    searchesUsed: number;
    searchesLimit: number;
    bookmarksUsed: number;
    bookmarksLimit: number;
    aiIdeasGenerated: number;
    aiLimit: number;
  };
}

export interface IntegrationConnector {
  id: PlatformId;
  name: string;
  iconName: string;
  status: 'connected' | 'demo_mode' | 'disconnected' | 'error';
  lastSync: string;
  apiVersion: string;
  rateLimitRemaining: number;
  requiresKey: boolean;
  notes: string;
  apiKeySet: boolean;
}

export interface GeneratedContentPack {
  trendTitle: string;
  platform: string;
  audience: string;
  tone: string;
  contentIdeas: {
    id: number;
    title: string;
    hook: string;
    description: string;
    targetFormat: ContentFormat;
    angle: string;
  }[];
  viralHooks: string[];
  reelScript: {
    openingHook: string;
    bodyPoints: string[];
    callToAction: string;
    bRollIdeas: string[];
  };
  youtubeConcepts: {
    videoTitle: string;
    thumbnailConcept: string;
    shortsConcept: string;
  };
  socialPosts: {
    linkedIn: string;
    xThread: string[];
    pinterestPinTitle: string;
    facebookPost: string;
    redditPrompt: string;
  };
  recommendedHashtags: string[];
  recommendedKeywords: string[];
  callToAction: string;
}
