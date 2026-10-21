import { CompetitionLevel, DemandLevel, OpportunityScoreBreakdown, TrendStatus } from '@/types';

export interface ScoreInputs {
  growthPercentage: number;
  searchVolume: number;
  status: TrendStatus;
  competitionLevel: CompetitionLevel;
  demandLevel: DemandLevel;
  daysSinceDetected: number;
}

/**
 * Calculates a transparent Content Opportunity Score (0-100) based on weighted factors:
 * - Growth Rate (25%): Velocity of rising attention.
 * - Search Demand (20%): Absolute or relative search/query interest.
 * - Current Interest (20%): Baseline engagement & volume stability.
 * - Trend Freshness (15%): Recency bonus (early stage = higher opportunity before market saturation).
 * - Low Competition Advantage (10%): Lower competition increases ranking ease.
 * - Audience Relevance & Persistence (10%): Consistency across platforms.
 */
export function calculateOpportunityScore(inputs: ScoreInputs): {
  score: number;
  breakdown: OpportunityScoreBreakdown;
  summary: string;
} {
  // 1. Growth rate component (0-100 scaled)
  let growthScore = Math.min(100, Math.max(0, (inputs.growthPercentage / 150) * 100));

  // 2. Search demand component
  let demandScore = 50;
  switch (inputs.demandLevel) {
    case 'Very High':
      demandScore = 95;
      break;
    case 'High':
      demandScore = 80;
      break;
    case 'Moderate':
      demandScore = 60;
      break;
    case 'Niche':
      demandScore = 40;
      break;
  }

  // 3. Current interest component (based on volume & status)
  let interestScore = 65;
  if (inputs.status === 'Viral') interestScore = 98;
  else if (inputs.status === 'Rising') interestScore = 85;
  else if (inputs.status === 'Emerging') interestScore = 75;
  else if (inputs.status === 'Stable') interestScore = 60;
  else if (inputs.status === 'Declining') interestScore = 30;

  // 4. Trend freshness (fresher topics have higher creator first-mover advantage)
  let freshnessScore = 90;
  if (inputs.daysSinceDetected <= 1) freshnessScore = 98;
  else if (inputs.daysSinceDetected <= 3) freshnessScore = 90;
  else if (inputs.daysSinceDetected <= 7) freshnessScore = 80;
  else if (inputs.daysSinceDetected <= 14) freshnessScore = 65;
  else freshnessScore = 50;

  // 5. Competition advantage (Low competition gives a 90+ score advantage)
  let competitionScore = 50;
  if (inputs.competitionLevel === 'Low') competitionScore = 90;
  else if (inputs.competitionLevel === 'Medium') competitionScore = 65;
  else if (inputs.competitionLevel === 'High') competitionScore = 35;

  // 6. Audience relevance / format adaptability
  let audienceRelevance = Math.round((interestScore + demandScore) / 2);

  const weightedTotal =
    growthScore * 0.25 +
    demandScore * 0.20 +
    interestScore * 0.20 +
    freshnessScore * 0.15 +
    competitionScore * 0.10 +
    audienceRelevance * 0.10;

  const finalScore = Math.round(Math.min(100, Math.max(10, weightedTotal)));

  let summary = 'High breakout potential with manageable competition.';
  if (finalScore >= 85) {
    summary = 'Exceptional early-mover window. High search acceleration with favorable creator opportunity.';
  } else if (finalScore >= 70) {
    summary = 'Strong positive momentum. Recommended for immediate content calendar planning.';
  } else if (finalScore >= 50) {
    summary = 'Steady evergreen interest. Solid for comprehensive guides, niche deep-dives, or tutorials.';
  } else {
    summary = 'Saturating or declining curve. Recommended only for unique contrarian angles.';
  }

  return {
    score: finalScore,
    breakdown: {
      growthRate: Math.round(growthScore),
      currentInterest: Math.round(interestScore),
      freshness: Math.round(freshnessScore),
      searchDemand: Math.round(demandScore),
      competitionScore: Math.round(competitionScore),
      audienceRelevance: Math.round(audienceRelevance),
    },
    summary,
  };
}
