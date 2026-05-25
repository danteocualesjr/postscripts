# Postscripts

A reader-first literary magazine for serial fiction told through letters, notes, and dispatches.

## Project location

`~/Documents/Projects/Projects_2026/postscripts`

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:4321](http://localhost:4321).

## How to publish a new installment

1. Create a Markdown file under `src/content/installments/<series-slug>/`, for example:

   `src/content/installments/notes-from-a-bachelor/02-an-evening-letter.md`

   The URL slug comes from the filename after the number prefix (`02-an-evening-letter.md` → `/serials/notes-from-a-bachelor/an-evening-letter`).

   Files named `00-*.md` (e.g. `00-drafts.md`) are scratch pads in the same folder — the site ignores them and they do not need frontmatter.

2. Add frontmatter:

```yaml
---
title: "An Evening Letter"
series: notes-from-a-bachelor
installment: 2
publishedAt: 2026-05-30
dateline: "Sunday night"
draft: false
---
```

3. Write the installment body in Markdown below the frontmatter.

4. Preview locally with `npm run dev`.

5. Commit and push to GitHub. If the repo is connected to Vercel or Netlify, the site redeploys automatically.

## Content structure

- **Series** live in `src/content/series/` — one file per serial
- **Installments** live in `src/content/installments/<series-slug>/` — one file per episode
- Set `draft: true` to hide an installment while you are still writing

## Deploy to Vercel

1. Push this repo to GitHub
2. Import the repo in [Vercel](https://vercel.com)
3. Use the default Astro settings (`npm run build`, output `dist`)
4. Every push to `main` publishes the latest installments

## Serials

| Series | Slug | Status |
|--------|------|--------|
| Notes From a Bachelor | `notes-from-a-bachelor` | ongoing |
| Letters From a Gentleman | `letters-from-a-gentleman` | ongoing |
# postscripts
