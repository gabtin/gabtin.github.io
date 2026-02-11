import { NextResponse } from 'next/server';
import { getThoughts } from '@/lib/content';

export async function GET() {
  // Only allow in development
  if (process.env.NODE_ENV !== 'development') {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  const thoughts = getThoughts()
    .filter((t) => t.slug)
    .map((t) => ({
      slug: t.slug,
      title: t.title,
      date: t.date,
      description: t.description,
      image: t.image,
    }));

  return NextResponse.json(thoughts);
}
