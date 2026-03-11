'use client';

import { BlogPost } from '@/lib/types';
import Link from 'next/link';

interface Props {
  posts: BlogPost[];
}

function renderExcerpt(body: string, maxLen = 150): string {
  const plain = body.replace(/\*\*(.*?)\*\*/g, '$1');
  if (plain.length <= maxLen) return plain;
  return plain.slice(0, maxLen).trimEnd() + '...';
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('en-ZA', { year: 'numeric', month: 'long', day: 'numeric' });
}

export default function BlogSection({ posts }: Props) {
  const published = posts
    .filter((p) => p.published)
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 12);

  if (published.length === 0) {
    return (
      <div className="py-12 px-4 text-center text-gray-500">
        <p>No news posts yet. Check back soon!</p>
      </div>
    );
  }

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 bg-brand-light">
      <div className="max-w-6xl mx-auto grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {published.map((post) => (
          <Link
            key={post.id}
            href={`/blog/${post.slug}`}
            className="group block bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100"
          >
            {post.coverImage && (
              <div className="aspect-video overflow-hidden">
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            )}
            <div className="p-4">
              <p className="text-xs text-brand-teal font-medium mb-1">{formatDate(post.date)}</p>
              <h3 className="text-base font-bold text-brand-dark group-hover:text-brand-orange transition-colors mb-2">
                {post.title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">{renderExcerpt(post.body)}</p>
              <span className="inline-block mt-3 text-sm font-medium text-brand-orange group-hover:underline">
                Read more
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
