# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio website built with Next.js 14 (App Router), TypeScript, and Tailwind CSS. Deploys as a static site to GitHub Pages.

## Commands

```bash
npm run dev      # Start development server at localhost:3000
npm run build    # Build static site (outputs to /out)
npm run lint     # Run ESLint
```

Deployment is automated via GitHub Actions on push to main.

## Architecture

### Content System

All content lives in `/content` as Markdown files with YAML frontmatter (editable via Obsidian):
- `content/*.md` - Page content (home, about, reading, etc.)
- `content/books/` - Book entries
- `content/thoughts/` - Blog posts (supports `draft: true` to hide)
- `content/investments/` - Investment theses
- `content/listening/` - Listening items
- `content/records/` - Music records

Content is parsed at build time by `src/lib/content.ts` using `gray-matter`. Each content type has a TypeScript interface (Book, Thought, Investment, etc.).

### RSS Integration

`src/lib/rss.ts` fetches external content:
- Substack posts from `gabrieletinelli.substack.com/feed`
- Podcast episodes from `bricks-bytes.com/feed/podcast/bitbuilders/`

Uses proxy fallback for CORS issues.

### Key Patterns

- **Static export**: Configured via `output: 'export'` in next.config.mjs (no SSR)
- **Dynamic routes**: `/thoughts/[slug]` uses `generateStaticParams` for static generation
- **Components**: Card components for each content type (BookCard, ThoughtCard, etc.)
- **Styling**: Tailwind + custom CSS layers in `globals.css` (retro/pixel aesthetic with VT323 font)

### Directory Structure

```
src/
  app/           # Next.js pages (App Router)
  components/    # React components
  lib/           # Content parsing (content.ts) and RSS fetching (rss.ts)
content/         # Markdown content files
public/images/   # Static assets
```
