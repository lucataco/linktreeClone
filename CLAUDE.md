# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev    # Start development server at http://localhost:3000
npm run build  # Production build
npm run lint   # Run ESLint
```

## Architecture

This is a Linktree-style personal links page built with Next.js 14 (App Router), TypeScript, and Tailwind CSS.

### Data-Driven Design

All content is defined in `data.json` at the project root:
- `name`, `desc`, `avatar`: Profile information
- `links[]`: Array of link cards with `title`, `href`, `image`, and optional `discontinued`/`acquired` flags
- `socials[]`: Social media links (icons are selected by URL pattern in `app/page.tsx`)

To add/modify links, edit `data.json` only. The UI renders dynamically from this file.

### Key Files

- `app/page.tsx`: Main page component with inline SVG social icons (Twitter, GitHub, LinkedIn, HuggingFace, Weights & Biases). Social icons are selected by matching URL substrings.
- `components/LinkCard.tsx`: Client component for link cards with touch-optimized interactions and status badges
- `app/layout.tsx`: Root layout with SEO metadata, image preloading, and analytics script
- `styles/globals.css`: Gradient background (dark blue to purple) and Tailwind component styles for touch feedback

### Image Handling

Images are stored in `/public/` and referenced by filename in `data.json`. The Next.js Image component handles optimization. External domains must be allowlisted in `next.config.js`.
