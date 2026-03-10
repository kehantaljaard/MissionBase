import { NextRequest, NextResponse } from 'next/server';
import { list, put } from '@vercel/blob';
import { readFile, writeFile, mkdir } from 'fs/promises';
import { join } from 'path';

export const dynamic = 'force-dynamic';

const BLOB_KEY = 'visits.json';
const LOCAL_FILE = join(process.cwd(), '.data', 'visits.json');

interface VisitData {
  allTime: number;
  recentVisits: number[]; // timestamps from last 32 days
}

const EMPTY_DATA: VisitData = { allTime: 0, recentVisits: [] };

async function readData(): Promise<VisitData> {
  try {
    if (process.env.BLOB_READ_WRITE_TOKEN) {
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
          const raw = await res.json();
          // Migrate from old format (array of {timestamp}) to new format
          if (Array.isArray(raw)) {
            return {
              allTime: raw.length,
              recentVisits: raw.map((v: { timestamp: number }) => v.timestamp),
            };
          }
          return raw;
        }
      }
    }
  } catch {
    // fall through to local
  }

  try {
    const raw = JSON.parse(await readFile(LOCAL_FILE, 'utf-8'));
    // Migrate from old format
    if (Array.isArray(raw)) {
      return {
        allTime: raw.length,
        recentVisits: raw.map((v: { timestamp: number }) => v.timestamp),
      };
    }
    return raw;
  } catch {
    return { ...EMPTY_DATA };
  }
}

async function writeData(data: VisitData) {
  const json = JSON.stringify(data);

  if (process.env.BLOB_READ_WRITE_TOKEN) {
    await put(BLOB_KEY, json, {
      access: 'public',
      token: process.env.BLOB_READ_WRITE_TOKEN,
      addRandomSuffix: false,
      allowOverwrite: true,
    });
  } else {
    await mkdir(join(process.cwd(), '.data'), { recursive: true });
    await writeFile(LOCAL_FILE, json, 'utf-8');
  }
}

// POST - record a visit (no auth needed)
export async function POST() {
  try {
    const data = await readData();
    const now = Date.now();
    const thirtyTwoDaysAgo = now - 32 * 24 * 60 * 60 * 1000;

    data.allTime += 1;
    data.recentVisits.push(now);
    // Trim visits older than 32 days
    data.recentVisits = data.recentVisits.filter((t) => t > thirtyTwoDaysAgo);

    await writeData(data);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to record visit:', error);
    return NextResponse.json({ error: 'Failed to record visit' }, { status: 500 });
  }
}

// GET - retrieve visit stats (auth required)
export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('Authorization');
  const password = authHeader?.replace('Bearer ', '');

  if (!password || password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const data = await readData();
    const now = Date.now();
    const oneDayAgo = now - 24 * 60 * 60 * 1000;
    const oneWeekAgo = now - 7 * 24 * 60 * 60 * 1000;
    const oneMonthAgo = now - 30 * 24 * 60 * 60 * 1000;

    return NextResponse.json({
      today: data.recentVisits.filter((t) => t > oneDayAgo).length,
      week: data.recentVisits.filter((t) => t > oneWeekAgo).length,
      month: data.recentVisits.filter((t) => t > oneMonthAgo).length,
      allTime: data.allTime,
    });
  } catch {
    return NextResponse.json({ today: 0, week: 0, month: 0, allTime: 0 });
  }
}
