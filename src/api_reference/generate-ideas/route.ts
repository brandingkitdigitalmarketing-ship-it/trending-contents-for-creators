import { NextRequest, NextResponse } from 'next/server';
import { generateCreatorContentPack } from '@/lib/aiGenerator';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { trendTitle, category, platform, audience, tone, language, preferredFormat } = body;

    if (!trendTitle) {
      return NextResponse.json({ error: 'Trend title is required' }, { status: 400 });
    }

    // Call the generator engine
    const contentPack = generateCreatorContentPack({
      trendTitle,
      category,
      platform,
      audience,
      tone,
      language,
      preferredFormat,
    });

    return NextResponse.json({ success: true, data: contentPack });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to generate ideas' }, { status: 500 });
  }
}
