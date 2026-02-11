'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';

interface Thought {
  slug?: string;
  title?: string;
  date: string;
  description?: string;
  image?: string;
}

const DEFAULT_OG_IMAGE = '/images/og-image.png';

function LinkedInMock({ thought }: { thought: Thought }) {
  const image = thought.image || DEFAULT_OG_IMAGE;

  return (
    <div style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
      <div style={{
        backgroundColor: '#1b1f23',
        borderRadius: '8px',
        overflow: 'hidden',
        maxWidth: '552px',
        border: '1px solid #38434f'
      }}>
        {/* Post header */}
        <div style={{ padding: '12px 16px', display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            backgroundColor: '#38434f',
            flexShrink: 0
          }} />
          <div>
            <div style={{ color: '#fff', fontWeight: 600, fontSize: '14px' }}>Gabriele Tinelli</div>
            <div style={{ color: '#ffffffb3', fontSize: '12px' }}>Building at Foundamental</div>
            <div style={{ color: '#ffffffb3', fontSize: '12px' }}>1h • 🌐</div>
          </div>
        </div>

        {/* Post text */}
        <div style={{ padding: '0 16px 12px', color: '#fff', fontSize: '14px', lineHeight: '1.4' }}>
          New post on my website 👇
        </div>

        {/* Link preview card */}
        <div style={{ backgroundColor: '#38434f', margin: '0' }}>
          <img
            src={image}
            alt="Preview"
            style={{ width: '100%', height: 'auto', display: 'block' }}
          />
          <div style={{ padding: '12px' }}>
            <div style={{ color: '#ffffffb3', fontSize: '12px', marginBottom: '4px' }}>
              gabrieletinelli.com
            </div>
            <div style={{ color: '#fff', fontSize: '14px', fontWeight: 600, lineHeight: '1.3' }}>
              {thought.title || 'Untitled'}
            </div>
          </div>
        </div>

        {/* Engagement bar */}
        <div style={{ padding: '8px 16px', display: 'flex', gap: '4px', color: '#ffffffb3', fontSize: '12px' }}>
          <span>👍</span>
          <span>12</span>
        </div>
        <div style={{
          padding: '4px 16px 12px',
          display: 'flex',
          justifyContent: 'space-around',
          borderTop: '1px solid #38434f',
          color: '#ffffffb3',
          fontSize: '14px'
        }}>
          <span>👍 Like</span>
          <span>💬 Comment</span>
          <span>🔄 Repost</span>
          <span>📤 Send</span>
        </div>
      </div>
    </div>
  );
}

function TwitterMock({ thought }: { thought: Thought }) {
  const image = thought.image || DEFAULT_OG_IMAGE;

  return (
    <div style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
      <div style={{
        backgroundColor: '#000',
        borderRadius: '16px',
        overflow: 'hidden',
        maxWidth: '550px',
        border: '1px solid #2f3336'
      }}>
        {/* Post header */}
        <div style={{ padding: '12px 16px', display: 'flex', gap: '12px' }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            backgroundColor: '#2f3336',
            flexShrink: 0
          }} />
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
              <span style={{ color: '#e7e9ea', fontWeight: 700, fontSize: '15px' }}>Gabriele Tinelli</span>
              <span style={{ color: '#71767b', fontSize: '15px' }}>@gtinelli · 1h</span>
            </div>

            {/* Tweet text */}
            <div style={{ color: '#e7e9ea', fontSize: '15px', lineHeight: '1.4', marginTop: '4px', marginBottom: '12px' }}>
              New post 👇
            </div>

            {/* Link preview card */}
            <div style={{
              border: '1px solid #2f3336',
              borderRadius: '16px',
              overflow: 'hidden',
              backgroundColor: '#000'
            }}>
              <img
                src={image}
                alt="Preview"
                style={{ width: '100%', height: 'auto', display: 'block' }}
              />
              <div style={{ padding: '12px' }}>
                <div style={{ color: '#71767b', fontSize: '13px', marginBottom: '2px' }}>
                  gabrieletinelli.com
                </div>
                <div style={{ color: '#e7e9ea', fontSize: '15px', lineHeight: '1.3' }}>
                  {thought.title || 'Untitled'}
                </div>
                {thought.description && (
                  <div style={{ color: '#71767b', fontSize: '13px', marginTop: '4px', lineHeight: '1.3' }}>
                    {thought.description.slice(0, 100)}{thought.description.length > 100 ? '...' : ''}
                  </div>
                )}
              </div>
            </div>

            {/* Engagement bar */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '12px 0 4px',
              color: '#71767b',
              fontSize: '13px',
              maxWidth: '400px'
            }}>
              <span>💬 3</span>
              <span>🔄 5</span>
              <span>❤️ 24</span>
              <span>📊 1.2K</span>
              <span>📤</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PreviewContent() {
  const searchParams = useSearchParams();
  const slug = searchParams.get('slug');
  const [thoughts, setThoughts] = useState<Thought[]>([]);
  const [selectedThought, setSelectedThought] = useState<Thought | null>(null);

  useEffect(() => {
    fetch('/api/dev/thoughts/')
      .then((res) => res.json())
      .then((data) => {
        setThoughts(data);
        if (slug) {
          const found = data.find((t: Thought) => t.slug === slug);
          setSelectedThought(found || null);
        }
      })
      .catch(() => {});
  }, [slug]);

  // List view
  if (!slug) {
    return (
      <main className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="mb-2">Social Preview</h1>
        <p className="text-[--muted] mb-8">
          Select a thought to preview how it will look when shared on LinkedIn and X
        </p>

        {thoughts.length === 0 ? (
          <div className="card">Loading thoughts...</div>
        ) : (
          <div className="space-y-4">
            {thoughts.map((thought) => (
              <a
                key={thought.slug}
                href={`/dev/preview?slug=${thought.slug}`}
                className="card block hover:bg-[--screen-bg] transition-colors"
              >
                <div className="flex gap-4 items-start">
                  <img
                    src={thought.image || DEFAULT_OG_IMAGE}
                    alt=""
                    className="w-20 h-20 object-cover border border-[--foreground]"
                  />
                  <div>
                    <div className="font-mono text-sm text-[--muted] mb-1">{thought.slug}</div>
                    <div className="text-xl">{thought.title || 'Untitled'}</div>
                    {!thought.image && (
                      <div className="text-[--muted] text-sm mt-1">Using default OG image</div>
                    )}
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}
      </main>
    );
  }

  // Detail view
  if (!selectedThought) {
    return (
      <main className="max-w-4xl mx-auto px-4 py-12">
        <a href="/dev/preview" className="text-[--muted] hover:text-[--foreground]">
          &larr; Back to list
        </a>
        <div className="card mt-8">Thought not found: {slug}</div>
      </main>
    );
  }

  return (
    <main className="max-w-6xl mx-auto px-4 py-12">
      <div className="flex items-center gap-4 mb-8">
        <a href="/dev/preview" className="text-[--muted] hover:text-[--foreground]">
          &larr; Back to list
        </a>
        <span className="text-[--muted]">/</span>
        <span className="font-mono text-sm">{slug}</span>
      </div>

      {!selectedThought.image && (
        <div className="card bg-[--screen-bg] mb-8">
          Using default OG image. Add an <code>image</code> field to frontmatter for a custom preview.
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-8">
        {/* LinkedIn Preview */}
        <section>
          <h2 className="mb-4">LinkedIn</h2>
          <LinkedInMock thought={selectedThought} />
        </section>

        {/* Twitter/X Preview */}
        <section>
          <h2 className="mb-4">X (Twitter)</h2>
          <TwitterMock thought={selectedThought} />
        </section>
      </div>

      {/* Metadata */}
      <section className="mt-12">
        <h2 className="mb-4">Frontmatter</h2>
        <div className="card font-mono text-sm space-y-1 max-w-md">
          <div><span className="text-[--muted]">title:</span> {selectedThought.title}</div>
          <div><span className="text-[--muted]">slug:</span> {selectedThought.slug}</div>
          <div><span className="text-[--muted]">description:</span> {selectedThought.description || '(none)'}</div>
          <div><span className="text-[--muted]">image:</span> {selectedThought.image || `(default: ${DEFAULT_OG_IMAGE})`}</div>
        </div>
      </section>

      {/* Raw image preview */}
      <section className="mt-12">
        <h2 className="mb-4">Raw Image (1200x630 recommended)</h2>
        <div className="border-2 border-[--foreground] inline-block">
          <img
            src={`${selectedThought.image || DEFAULT_OG_IMAGE}?t=${Date.now()}`}
            alt="OG Image"
            style={{ maxWidth: '600px', height: 'auto' }}
          />
        </div>
      </section>
    </main>
  );
}

export default function PreviewPage() {
  if (typeof window !== 'undefined' && !window.location.hostname.includes('localhost')) {
    window.location.href = '/';
    return null;
  }

  return (
    <Suspense fallback={<div className="max-w-4xl mx-auto px-4 py-12">Loading...</div>}>
      <PreviewContent />
    </Suspense>
  );
}
