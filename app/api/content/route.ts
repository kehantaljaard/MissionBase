import { NextRequest, NextResponse } from 'next/server';
import { list, put } from '@vercel/blob';
import { defaultContent } from '@/data/defaultContent';

const BLOB_KEY = 'content.json';

export async function GET() {
  try {
    if (process.env.BLOB_READ_WRITE_TOKEN) {
      try {
        // Use list() to find the blob by prefix
        const { blobs } = await list({
          prefix: BLOB_KEY,
          limit: 1,
          token: process.env.BLOB_READ_WRITE_TOKEN,
        });

        if (blobs.length > 0) {
          // Public blob - fetch directly by its URL
          const res = await fetch(blobs[0].url);
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
        allowOverwrite: true,
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to save content:', error);
    return NextResponse.json({ error: 'Failed to save' }, { status: 500 });
  }
}
