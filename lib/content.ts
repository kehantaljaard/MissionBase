import { SiteContent } from './types';
import { defaultContent } from '@/data/defaultContent';

export async function getContent(): Promise<SiteContent> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/content`, {
      cache: 'no-store',
    });
    if (res.ok) {
      return await res.json();
    }
  } catch {
    // Fall back to defaults
  }
  return defaultContent;
}

export async function getContentClient(): Promise<SiteContent> {
  try {
    const res = await fetch('/api/content', { cache: 'no-store' });
    if (res.ok) {
      return await res.json();
    }
  } catch {
    // Fall back to defaults
  }
  return defaultContent;
}

export async function saveContent(
  content: SiteContent,
  password: string
): Promise<boolean> {
  try {
    const res = await fetch('/api/content', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${password}`,
      },
      body: JSON.stringify(content),
    });
    return res.ok;
  } catch {
    return false;
  }
}

export async function uploadImage(file: File, password: string): Promise<string | null> {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const res = await fetch('/api/upload', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${password}`,
      },
      body: formData,
    });

    if (res.ok) {
      const data = await res.json();
      return data.url;
    }
  } catch {
    // Upload failed
  }
  return null;
}

export async function validatePassword(password: string): Promise<boolean> {
  try {
    const res = await fetch('/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });
    return res.ok;
  } catch {
    return false;
  }
}
