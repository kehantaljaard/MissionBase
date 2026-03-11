import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getBlogPostsServer } from '@/lib/content';
import Link from 'next/link';

interface Props {
  params: Promise<{ slug: string }>;
}

async function getPost(slug: string) {
  const posts = await getBlogPostsServer();
  return posts.find((p) => p.slug === slug && p.published) || null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: 'Post Not Found' };
  return {
    title: `${post.title} | Mission Base Ministries`,
    description: post.body.replace(/\*\*(.*?)\*\*/g, '$1').slice(0, 160),
  };
}

function renderBody(body: string) {
  const parts = body.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    // Split on newlines to preserve line breaks
    const lines = part.split('\n');
    return lines.map((line, j) => (
      <span key={`${i}-${j}`}>
        {j > 0 && <br />}
        {line}
      </span>
    ));
  });
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('en-ZA', { year: 'numeric', month: 'long', day: 'numeric' });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  return (
    <div className="min-h-screen bg-brand-light">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        <Link
          href="/#blog"
          className="inline-flex items-center gap-1 text-sm text-brand-teal hover:text-teal-700 mb-6"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to home
        </Link>

        {post.coverImage && (
          <div className="rounded-xl overflow-hidden mb-6">
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full aspect-video object-cover"
            />
          </div>
        )}

        <p className="text-sm text-brand-teal font-medium mb-2">{formatDate(post.date)}</p>
        <h1 className="text-2xl sm:text-3xl font-bold text-brand-dark mb-6">{post.title}</h1>

        <div className="prose prose-gray max-w-none text-gray-700 leading-relaxed">
          <p>{renderBody(post.body)}</p>
        </div>
      </div>
    </div>
  );
}
