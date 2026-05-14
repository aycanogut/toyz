import { NextRequest, NextResponse } from 'next/server';
import { generateFeed } from '@/utils/generateFeed';

export async function GET(request: NextRequest, { params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  if (locale !== 'en' && locale !== 'tr') {
    return new NextResponse('Invalid locale', { status: 400 });
  }

  const feed = await generateFeed(locale as 'en' | 'tr');

  return new NextResponse(feed.json1(), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  });
}
