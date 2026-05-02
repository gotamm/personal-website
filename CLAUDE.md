# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev       # Start dev server at localhost:4321
pnpm build     # Build to ./dist/
pnpm preview   # Preview production build
```

No linting, testing, or formatting commands are configured.

## Architecture

Personal portfolio site built with **Astro 5** (static output) and deployed on Vercel. Uses plain CSS — no Tailwind or CSS framework.

**Routing and pages** live in `src/pages/`. The homepage (`index.astro`) is the main entry point and aggregates all site sections. Blog posts are served via `src/pages/writings/[...slug].astro` using Astro's Content Collections.

**Content** lives in `src/content/blog/` as Markdown files. The collection schema (Zod) is defined in `src/content/config.ts` — key fields are `title`, `description`, `publishedAt` (nullable date), `tags`, and `language` (enum, currently only `"en"`). Posts with a null `publishedAt` are drafts and are filtered out in the blog listing.

**Data sources** are three:
1. Blog posts — via Astro Content Collections
2. GitHub contributions — fetched at build time from the GitHub Search API (`src/api/github.ts`), querying PRs by author `gotamm`, validated with Zod
3. Talks — hardcoded array exported from `src/api/talks.ts`

**Layouts:** `src/layouts/Layout.astro` is the base shell (meta, fonts, global styles). `src/layouts/BlogPostLayout.astro` wraps individual posts and includes JSON-LD structured data and prev/next navigation.

**Components** in `src/components/` are small and scoped — primarily social link icons. Icons use `astro-icon`.

**Styles:** `src/styles/preflight.css` (CSS reset) and `src/styles/global.css` are imported in the base layout.

**Config:** `astro.config.mjs` sets the production site URL and registers `@astrojs/sitemap`. `vercel.json` injects a `Link` response header for agent discoverability.
