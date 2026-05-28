## Problem

There are two identified toils in the client's workflow. First is the manual checking of the status of each assigned domain list. Second is manually computing the volume of the brief response.

## Solution

Create a unified dashboard that solves both client issues. First, a Domain Lookup tool that allows copy/paste or bulk upload of a domain list and checks each domain's HTTP response. Second, a Volume Calculator (migrated from an existing repo) displayed on the side panel.

## Features

### Domain Lookup

- Two input modes via tabs:
  - **Paste/Type** — textarea for pasting a domain list, triggered by a RUN button
  - **Upload** — drag and drop or click to upload an xlsx or csv file; triggered by an Export File button
- Detects and displays URL count from input
- Checks each domain server-side (to avoid CORS issues)
- Average expected list size: ~20 domains, maximum: 100 domains
- Results display live, one domain at a time, below the stat summary cards
- Each result row shows: domain URL + HTTP status response
- Four stat summary cards (color-coded):
  - 2XX OK (green)
  - 3XX Redirect (yellow/orange)
  - 4XX/5XX Error (red)
  - Network Error (orange)

### Volume Calculator (side panel)

- Migrated from existing repo: https://github.com/nicabuhat/volume-calculator
- Input: Banner volume
- Outputs: Video volume and Native volume (formula TBD — to be pulled from existing repo)
- Video and Native output values are clickable to copy to clipboard

### Auth

- Bare minimum: 2 hardcoded users via environment variables (no database)
- Credentials stored as env vars in Vercel

### Branding

- App name: Scootopia
- Mascot: Pikachu gif (intentional)
- Theme: Dark

## Design References

- `design1.png` — Paste/Type tab state
- `design2.png` — Upload tab state

## Tech Stack

- Next.js (App Router)
- Deployed on Vercel
- GitHub Actions CI/CD — automated workflow to catch dependency CVEs (especially React and Next.js)
- Automated testing
