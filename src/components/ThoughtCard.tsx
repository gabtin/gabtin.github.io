import Link from 'next/link';
import { Thought } from '@/lib/content';
import { formatDateShort } from '@/lib/utils';

interface ThoughtCardProps {
  thought: Thought;
}

export default function ThoughtCard({ thought }: ThoughtCardProps) {
  const hasSlug = !!thought.slug;
  const isExternal = !!thought.externalUrl;

  const content = isExternal ? (
    <div className="card card-hover">
      <div className="flex items-start justify-between gap-4 mb-2">
        <span className="label text-accent">{thought.source}</span>
        <span className="label">{formatDateShort(thought.date)}</span>
      </div>
      <h3 className="font-mono text-base font-medium text-foreground">{thought.title}</h3>
      {thought.description && (
        <p className="text-muted text-sm mt-2">{thought.description}</p>
      )}
      <p className="text-accent text-sm font-mono mt-3">Read on {thought.source || 'external site'} →</p>
    </div>
  ) : (
    <div className={`card ${hasSlug ? 'card-hover' : ''}`}>
      <div className="flex items-start justify-between gap-4 mb-2">
        {thought.title ? (
          <h3 className="font-mono text-base font-medium text-foreground">
            {thought.title}
          </h3>
        ) : null}
        <span className="label flex-shrink-0">{formatDateShort(thought.date)}</span>
      </div>

      {thought.description && (
        <p className="text-muted text-sm mb-3">{thought.description}</p>
      )}

      {!hasSlug && (
        <div className="prose-custom text-sm">
          <p>{thought.content}</p>
        </div>
      )}

      {thought.tags && thought.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-3">
          {thought.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 text-xs font-mono rounded"
              style={{ background: 'var(--accent-dim)', color: 'var(--accent)' }}
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {hasSlug && (
        <p className="text-accent text-sm font-mono mt-3">Read more →</p>
      )}
    </div>
  );

  if (isExternal) {
    return (
      <a href={thought.externalUrl} target="_blank" rel="noopener noreferrer" className="block no-underline">
        {content}
      </a>
    );
  }

  if (hasSlug) {
    return (
      <Link href={`/thoughts/${thought.slug}`} className="block no-underline">
        {content}
      </Link>
    );
  }

  return content;
}
