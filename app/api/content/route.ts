import { NextRequest, NextResponse } from 'next/server';
import { head, put } from '@vercel/blob';
import { defaultContent } from '@/data/defaultContent';

const BLOB_KEY = 'content.json';

export async function GET() {
  try {
    // Try to read from Vercel Blob
    if (process.env.BLOB_READ_WRITE_TOKEN) {
      try {
        const blobUrl = `${process.env.BLOB_STORE_URL || 'https://blob.vercel-storage.com'}/${BLOB_KEY}`;
        const metadata = await head(blobUrl, {
          token: process.env.BLOB_READ_WRITE_TOKEN,
        });
        if (metadata) {
          const res = await fetch(metadata.url);
          if (res.ok) {
            const content = await res.json();
            return NextResponse.json(content);
          }
        }
      } catch {
        // Blob doesn't exist yet, fall through to defaults
      }
    }

    return NextResponse.json(defaultContent);
  } catch {
    return NextResponse.json(defaultContent);
  }
}

export async function PUT(request: NextRequest) {
  const authHeader = request.headers.get('Authorization');
  const password = authHeader?.replace('Bearer ', '');

  if (!password || password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const content = await request.json();

    if (process.env.BLOB_READ_WRITE_TOKEN) {
      await put(BLOB_KEY, JSON.stringify(content, null, 2), {
        access: 'public',
        token: process.env.BLOB_READ_WRITE_TOKEN,
        addRandomSuffix: false,
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to save content:', error);
    return NextResponse.json({ error: 'Failed to save' }, { status: 500 });
  }
}
