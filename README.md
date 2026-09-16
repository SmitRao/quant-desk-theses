# Quant Desk Theses Dashboard

**DRAFT — NOT LIVE — noindex enabled**

A dark, terminal-style trading dashboard displaying daily quant theses for an agentic trading book. Desktop-first, Bloomberg-inspired UI.

## Features

- **Desk Status Strip**: Shows FLAT or IN RISK status, date, NAV/cash placeholders
- **Ranked Book**: Today's ticket ladder with max loss per position
- **Thesis Cards**: Per-quant-seat theses with:
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

## Deploy to Render (Free Tier)

1. Push this repo to GitHub

2. Go to [render.com](https://render.com) and sign up/log in

3. Click **New** → **Web Service**

4. Connect your GitHub repo

5. Configure:
   - **Name**: `quant-desk-theses` (or your preference)
   - **Runtime**: Node
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm run start`
   - **Instance Type**: Free

6. Click **Deploy Web Service**

The app will build and deploy. Free tier services spin down after 15 minutes of inactivity (first request after idle takes ~30s to wake).

### Environment Variables (Optional)

No environment variables are required for basic operation.

## Privacy & Compliance

- **robots.txt**: noindex, nofollow (draft mode)
- **No real names**: Only seat/role names (e.g., "Forward Thesis Quant")
- **No PII**: No personal email, phone, or addresses in UI or data
- **Disclaimer**: Visible disclaimer that this is not investment advice

## Tech Stack

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS v4
- Static site generation

## Project Structure

```
/content/           # Daily JSON files (YYYY-MM-DD.json)
/src/
  /app/             # Next.js App Router pages
  /components/      # React components
  /lib/             # Data loading utilities
```

---

**DISCLAIMER**: This dashboard is for internal agentic desk context only. Not investment advice.
