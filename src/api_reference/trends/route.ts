import { NextRequest, NextResponse } from 'next/server';
import { SEED_TRENDS } from '@/data/seedTrends';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get('q')?.toLowerCase() || '';
  const platform = searchParams.get('platform') || 'all';
  const category = searchParams.get('category') || 'all';
  const country = searchParams.get('country') || 'all';
  const status = searchParams.get('status') || 'all';
  const format = searchParams.get('format') || 'all';
  const demand = searchParams.get('demand') || 'all';
  const sort = searchParams.get('sort') || 'opportunity'; // 'opportunity' | 'growth' | 'volume' | 'recent'

  let filtered = [...SEED_TRENDS];

  if (q) {
    filtered = filtered.filter(
      (t) =>
        t.title.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q) ||
        t.relatedKeywords.some((k) => k.toLowerCase().includes(q)) ||
        t.relatedHashtags.some((h) => h.toLowerCase().includes(q))
    );
  }

  if (platform !== 'all') {
    filtered = filtered.filter((t) => t.platform === platform);
  }

  if (category !== 'all') {
    filtered = filtered.filter((t) => t.category.toLowerCase() === category.toLowerCase());
  }

  if (country !== 'all') {
    filtered = filtered.filter(
      (t) => t.country.toLowerCase() === country.toLowerCase() || t.countryCode.toLowerCase() === country.toLowerCase()
    );
  }

  if (status !== 'all') {
    filtered = filtered.filter((t) => t.status.toLowerCase() === status.toLowerCase());
  }

  if (format !== 'all') {
    filtered = filtered.filter((t) => t.formats.some((f) => f.toLowerCase() === format.toLowerCase()));
  }

  if (demand !== 'all') {
    filtered = filtered.filter((t) => t.demandLevel.toLowerCase() === demand.toLowerCase());
  }

  // Sort
  if (sort === 'opportunity') {
    filtered.sort((a, b) => b.opportunityScore - a.opportunityScore);
  } else if (sort === 'growth') {
    filtered.sort((a, b) => b.growthPercentage - a.growthPercentage);
  } else if (sort === 'volume') {
    filtered.sort((a, b) => b.searchVolume - a.searchVolume);
  } else if (sort === 'recent') {
    filtered.sort((a, b) => new Date(b.detectedAt).getTime() - new Date(a.detectedAt).getTime());
  }

  return NextResponse.json({
    total: filtered.length,
    data: filtered,
  });
}
