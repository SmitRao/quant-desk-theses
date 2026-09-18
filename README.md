# Quant Desk Theses Dashboard

**DRAFT — NOT LIVE — noindex enabled**

A dark, terminal-style trading dashboard displaying daily quant theses for an agentic trading book. Reads as a trading desk, composed as a product: numbered sections, one surface primitive, restrained motion.

## Sections

The dashboard reads top to bottom in a fixed order, and every section opens the same way — an indexed mono label for the desk, a plain-English title for the reader, numbers on the right.

1. **01 Desk status** — FLAT or IN RISK, date, NAV/cash placeholders, plus open ticket count and total max loss at risk derived from the ranked book
2. **02 Ranked book** — today's ticket ladder; a table on desktop, stacked rows on mobile
3. **03 Theses** — one card per seat; a single-thesis day gets the wide layout instead of a stranded column
4. **04 Tip jar** — a disabled placeholder until a Stripe Payment Link is supplied (see below)

## Features

- **Desk Status Strip**: Shows FLAT or IN RISK status, date, NAV/cash placeholders
- **Ranked Book**: Today's ticket ladder with max loss per position
- **Thesis Cards**: Per-seat theses with:
  - Author seat name (e.g., "Forward Thesis Quant", "Edge Lab Quant")
  - Title and thesis summary
  - Support statements explaining the reasoning
  - Entry/invalidation levels and targets
  - Max loss tracking

## Adding a New Day

1. Create a JSON file in `/content/` named `YYYY-MM-DD.json`
2. Follow this schema:

```json
{
  "date": "YYYY-MM-DD",
  "desk_status": "FLAT|IN_RISK",
  "nav": null,
  "cash": null,
  "ranked_book": [
    {
      "rank": 1,
      "ticket": "AAPL",
      "max_loss": "$200",
      "note": "Brief description"
    }
  ],
  "theses": [
    {
      "author": "Forward Thesis Quant",
      "title": "Thesis Title",
      "thesis": "Main thesis explanation...",
      "support_statements": [
        "Plain English reason #1",
        "What would make us wrong..."
      ],
      "levels": {
        "entry": "$150.00",
        "invalidation": "$145.00",
        "targets": ["$160.00", "$165.00"]
      },
      "ranked_ticket": "AAPL",
      "max_loss": "$200"
    }
  ]
}
```

3. For FLAT days:
   - Set `desk_status` to `"FLAT"`
   - Leave `ranked_book` as empty array `[]`
   - Set `ranked_ticket` to `"NONE"` and `max_loss` to `"N/A"` for each thesis

4. Rebuild and deploy

## Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Deploy to GitHub Pages (Free)

**Live URL**: https://smitrao.github.io/quant-desk-theses/

### Automatic Deployment

On every push to `main`, GitHub Actions will:
1. Build the static export (`npm run build` → `out/` directory)
2. Deploy to GitHub Pages

### First-Time Setup

1. Go to repo **Settings** → **Pages**
2. Under "Build and deployment", select **Source: GitHub Actions**
3. Push to main (or manually trigger the workflow)

### Private Repo Note

GitHub Pages for **private repos requires GitHub Pro/Team/Enterprise**. If Pages won't publish:
- The repo must be made **public** (dashboard is PUBLIC greenlit)
- Or upgrade to GitHub Pro

### Alternative: Render (if needed)

If you need server-side features later:
- **Build Command**: `npm install && npm run build`
- **Start Command**: `npm run start`
- Remove `output: 'export'` from next.config.js and revert to `output: 'standalone'`

### Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_TIP_URL` | No | Stripe Payment Link URL for tip jar. If empty or missing, shows disabled "Tip jar coming soon" placeholder. |

**For GitHub Pages**: Set as a repository secret, then reference in the workflow (requires workflow update).  
**For Render**: Dashboard → Your Service → Environment → Add Environment Variable

**IMPORTANT — Tip Jar (Stripe Payment Link)**:
- Platform: **Stripe Payment Link only** (not Buy Me a Coffee or other platforms)
- The real Stripe Payment Link URL + public brand name must come from Smit/Bossman
- Must be reviewed in PR Editor FINAL before go-live
- Do NOT invent or hardcode any buy.stripe.com or payment link URLs

## Privacy & Compliance

- **robots.txt**: noindex, nofollow (draft mode)
- **No real names**: Only seat/role names (e.g., "Forward Thesis Quant")
- **No PII**: No personal email, phone, or addresses in UI or data
- **Disclaimer**: Visible disclaimer that this is not investment advice
- **Tip jar**: Soft desk-branded CTA only; no personal identity; URL from env var only

## Go-Live Checklist

Before removing DRAFT/noindex status:

- [ ] Real Stripe Payment Link URL provided by Smit/Bossman
- [ ] Public brand name for tip jar confirmed by Smit/Bossman
- [ ] PR Editor FINAL review completed
- [ ] Set `NEXT_PUBLIC_TIP_URL` at build time (Pages: repo secret wired into `.github/workflows/pages.yml`; Render: service environment)
- [ ] Remove `robots: noindex, nofollow` from layout.tsx metadata
- [ ] Update robots.txt to allow indexing
- [ ] Remove DRAFT banner or change to production mode

## Design System

Colours, type, radii and the shared easing curve live in the `@theme` block of
`src/app/globals.css`. Tailwind v4 reads its theme from CSS, so that file is the
single source of truth — there is deliberately no `tailwind.config.ts` (the old
one was a v3-style config whose palette never reached the stylesheet).

Two type families do all the work: a system sans stack for prose, and JetBrains
Mono for anything the desk would read as data — labels, tickers, levels, totals.
Fonts are loaded through a `<link>` rather than `next/font`, so a Pages build
never depends on reaching a font CDN.

There is one surface primitive, `Panel`. `SectionHeader`, `Metric` and
`StatusPill` build on it, and nothing else invents its own border or radius.

## Motion

The motion layer lives in `src/components/motion/` and is built on
[`motion`](https://motion.dev) + Tailwind, adapting the patterns from
[Motion Primitives](https://motion-primitives.com):

| Primitive | Used for |
|-----------|----------|
| `TextEffect` | Staggered word/character reveal on the masthead and section titles |
| `TextShimmer` | Slow highlight sweep on the masthead subtitle |
| `InView` | Scroll-triggered reveal for sections and thesis cards |
| `Spotlight` | Pointer-tracking glow on desktop panels |

### Reduced motion

Honouring `prefers-reduced-motion` is layered, because a hook alone is not
enough — Motion writes its `initial` state as an inline style during server
rendering, so a JS check only lands after hydration:

1. **CSS first.** `[data-desk-reveal]` is forced to `opacity: 1`, no transform
   and no filter inside the `prefers-reduced-motion` block, which outranks the
   inline style and takes effect on the very first paint.
2. **Looping effects are CSS, not JS.** The shimmer sweep and the status pulse
   are keyframe animations precisely so the same media query can stop them
   before the first frame.
3. **`MotionConfig reducedMotion="user"`** makes Motion resolve transform
   animations instantly rather than tweening them.
4. **`Spotlight`** only attaches its listeners behind `(pointer: fine)` and a
   reduced-motion check, so it never runs on touch devices.

A `<noscript>` override and a `@media print` rule apply the same reveal-complete
state, so content is never invisible without JavaScript or on a printed page.

## Tech Stack

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS v4 (CSS-first theme)
- `motion` v13 for the animation primitives
- Static site generation

## Project Structure

```
/content/           # Daily JSON files (YYYY-MM-DD.json)
/src/
  /app/             # Next.js App Router pages + globals.css design tokens
  /components/
    /motion/        # Owned Motion Primitives (TextEffect, TextShimmer, InView, Spotlight)
    /ui/            # Panel, SectionHeader, Metric, StatusPill
  /lib/             # Data loading, formatting, class helper
```

---

**DISCLAIMER**: This dashboard is for internal agentic desk context only. Not investment advice.
