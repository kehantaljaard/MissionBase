import { NextRequest, NextResponse } from 'next/server';
import { list, put } from '@vercel/blob';
import { readFile, writeFile, mkdir } from 'fs/promises';
import { join } from 'path';

export const dynamic = 'force-dynamic';

const BLOB_KEY = 'blog-posts.json';
const LOCAL_FILE = join(process.cwd(), '.data', 'blog-posts.json');

async function readLocalFile() {
  try {
    const raw = await readFile(LOCAL_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

async function writeLocalFile(content: unknown) {
  await mkdir(join(process.cwd(), '.data'), { recursive: true });
  await writeFile(LOCAL_FILE, JSON.stringify(content, null, 2), 'utf-8');
}

export async function GET() {
  try {
    if (process.env.BLOB_READ_WRITE_TOKEN) {
      try {
        const { blobs } = await list({
          prefix: BLOB_KEY,
          limit: 1,
          token: process.env.BLOB_READ_WRITE_TOKEN,
        });

        if (blobs.length > 0) {
          const url = new URL(blobs[0].url);
          url.searchParams.set('_t', Date.now().toString());
          const res = await fetch(url.toString(), { cache: 'no-store' });
          if (res.ok) {
            const posts = await res.json();
            return NextResponse.json(posts);
          }
        }
      } catch {
        // Blob doesn't exist yet, fall through
      }
    }

    const local = await readLocalFile();
    if (local) {
      return NextResponse.json(local);
    }

    return NextResponse.json([]);
  } catch {
    return NextResponse.json([]);
  }
}

export async function PUT(request: NextRequest) {
  const authHeader = request.headers.get('Authorization');
  const password = authHeader?.replace('Bearer ', '');

  if (!password || password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const posts = await request.json();

    if (process.env.BLOB_READ_WRITE_TOKEN) {
      await put(BLOB_KEY, JSON.stringify(posts, null, 2), {
        access: 'public',
        token: process.env.BLOB_READ_WRITE_TOKEN,
        addRandomSuffix: false,
        allowOverwrite: true,
      });
    } else {
      await writeLocalFile(posts);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to save blog posts:', error);
    return NextResponse.json({ error: 'Failed to save' }, { status: 500 });
  }
}
