import { PodcastEpisode } from '@/lib/rss';
import { formatDateShort, truncate } from '@/lib/utils';

interface PodcastCardProps {
  episode: PodcastEpisode;
}

export default function PodcastCard({ episode }: PodcastCardProps) {
  return (
    <a
      href={episode.link}
      target="_blank"
      rel="noopener noreferrer"
      className="block card card-hover no-underline"
    >
      <div className="flex items-start justify-between gap-4 mb-2">
        <span className="label text-accent">Podcast</span>
        <div className="flex items-center gap-3">
          {episode.duration && (
            <span className="label">{episode.duration}</span>
          )}
          <span className="label">{formatDateShort(episode.pubDate)}</span>
        </div>
      </div>
      <h3 className="font-mono text-base font-medium text-foreground">{episode.title}</h3>
      {episode.description && (
        <p className="text-muted text-sm mt-2">
          {truncate(episode.description, 200)}
        </p>
      )}
      <p className="text-accent text-sm font-mono mt-3">Listen on Spotify →</p>
    </a>
  );
}
