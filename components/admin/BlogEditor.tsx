'use client';

import { useState, useEffect } from 'react';
import { BlogPost } from '@/lib/types';
import { getBlogPosts, saveBlogPosts } from '@/lib/content';
import ImageUpload from './ImageUpload';

interface Props {
  password: string;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

const emptyPost = (): BlogPost => ({
  id: crypto.randomUUID(),
  title: '',
  slug: '',
  body: '',
  date: new Date().toISOString().split('T')[0],
  published: false,
});

export default function BlogEditor({ password }: Props) {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [editing, setEditing] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [slugManual, setSlugManual] = useState(false);
  const [slugError, setSlugError] = useState('');

  useEffect(() => {
    getBlogPosts().then((p) => {
      setPosts(p);
      setLoading(false);
    });
  }, []);

  const save = async (updated: BlogPost[]) => {
    setSaving(true);
    const success = await saveBlogPosts(updated, password);
    setSaving(false);
    if (!success) {
      alert('Failed to save. Please try again.');
    }
    return success;
  };

  const handleCreate = () => {
    setEditing(emptyPost());
    setSlugManual(false);
    setSlugError('');
  };

  const handleEdit = (post: BlogPost) => {
    setEditing({ ...post });
    setSlugManual(true);
    setSlugError('');
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this post?')) return;
    const updated = posts.filter((p) => p.id !== id);
    if (await save(updated)) {
      setPosts(updated);
    }
  };

  const handleSavePost = async () => {
    if (!editing) return;
    if (!editing.title.trim()) {
      alert('Title is required.');
      return;
    }
    if (!editing.slug.trim()) {
      alert('Slug is required.');
      return;
    }

    // Check slug uniqueness
    const duplicate = posts.find((p) => p.slug === editing.slug && p.id !== editing.id);
    if (duplicate) {
      setSlugError('This slug is already in use.');
      return;
    }

    const idx = posts.findIndex((p) => p.id === editing.id);
    const updated = idx >= 0 ? posts.map((p) => (p.id === editing.id ? editing : p)) : [editing, ...posts];

    if (await save(updated)) {
      setPosts(updated);
      setEditing(null);
    }
  };

  const updateField = <K extends keyof BlogPost>(key: K, value: BlogPost[K]) => {
    if (!editing) return;
    const next = { ...editing, [key]: value };
    if (key === 'title' && !slugManual) {
      next.slug = slugify(value as string);
    }
    setEditing(next);
    if (key === 'slug') setSlugError('');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <svg className="animate-spin w-6 h-6 text-brand-orange" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      </div>
    );
  }

  // Post editor view
  if (editing) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-brand-dark">
            {posts.find((p) => p.id === editing.id) ? 'Edit Post' : 'New Post'}
          </h3>
          <button onClick={() => setEditing(null)} className="text-sm text-gray-500 hover:text-gray-700">
            Cancel
          </button>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
          <input
            type="text"
            value={editing.title}
            onChange={(e) => updateField('title', e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-brand-teal focus:ring-1 focus:ring-brand-teal outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Slug</label>
          <input
            type="text"
            value={editing.slug}
            onChange={(e) => {
              setSlugManual(true);
              updateField('slug', slugify(e.target.value));
            }}
            className={`w-full rounded-lg border px-3 py-2 text-sm focus:ring-1 outline-none ${
              slugError
                ? 'border-red-400 focus:border-red-500 focus:ring-red-500'
                : 'border-gray-300 focus:border-brand-teal focus:ring-brand-teal'
            }`}
          />
          {slugError && <p className="text-red-500 text-xs mt-1">{slugError}</p>}
          <p className="text-xs text-gray-400 mt-1">URL: /blog/{editing.slug || '...'}</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
          <input
            type="date"
            value={editing.date}
            onChange={(e) => updateField('date', e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-brand-teal focus:ring-1 focus:ring-brand-teal outline-none"
          />
        </div>

        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-700">Published</label>
          <button
            onClick={() => updateField('published', !editing.published)}
            className={`relative w-10 h-5 rounded-full transition-colors ${
              editing.published ? 'bg-green-500' : 'bg-gray-300'
            }`}
          >
            <span
              className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform ${
                editing.published ? 'translate-x-5' : ''
              }`}
            />
          </button>
          <span className="text-xs text-gray-500">{editing.published ? 'Live' : 'Draft'}</span>
        </div>

        <ImageUpload
          currentImage={editing.coverImage}
          onUpload={(url) => updateField('coverImage', url)}
          onRemove={() => updateField('coverImage', undefined)}
          password={password}
          label="Cover Image"
          aspectRatio={16 / 9}
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Body <span className="text-xs text-gray-400">(use **text** for bold)</span>
          </label>
          <textarea
            value={editing.body}
            onChange={(e) => updateField('body', e.target.value)}
            rows={12}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-brand-teal focus:ring-1 focus:ring-brand-teal outline-none resize-y"
          />
        </div>

        <button
          onClick={handleSavePost}
          disabled={saving}
          className="w-full py-2 bg-brand-orange text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50"
        >
          {saving ? 'Saving...' : 'Save Post'}
        </button>
      </div>
    );
  }

  // Post list view
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-brand-dark">Blog Posts</h3>
        <button
          onClick={handleCreate}
          className="px-3 py-1.5 bg-brand-orange text-white text-sm font-medium rounded-lg hover:bg-orange-600 transition-colors"
        >
          + New Post
        </button>
      </div>

      {posts.length === 0 ? (
        <p className="text-gray-500 text-sm text-center py-8">No blog posts yet. Create your first one!</p>
      ) : (
        <div className="space-y-2">
          {posts
            .sort((a, b) => b.date.localeCompare(a.date))
            .map((post) => (
              <div
                key={post.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-brand-dark truncate">{post.title}</span>
                    <span
                      className={`text-xs px-1.5 py-0.5 rounded-full ${
                        post.published ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-500'
                      }`}
                    >
                      {post.published ? 'Published' : 'Draft'}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 mt-0.5">{post.date}</p>
                </div>
                <div className="flex gap-1 ml-2">
                  <button
                    onClick={() => handleEdit(post)}
                    className="p-1.5 text-gray-400 hover:text-brand-teal transition-colors"
                    title="Edit"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => handleDelete(post.id)}
                    className="p-1.5 text-gray-400 hover:text-red-500 transition-colors"
                    title="Delete"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
