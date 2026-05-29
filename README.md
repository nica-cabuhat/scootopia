# Scootopia

Internal tooling for programmatic advertisers. Two features: a domain health checker for CPM bid guidance and a volume calculator for estimating impression delivery across ad formats.

---

## Features

### Domain Checker

Checks whether a list of domains is healthy before including them in a CPM campaign. Accepts a pasted URL list or an uploaded `.xlsx`/`.csv` file (URLs read from the first column).

Each domain is fetched with realistic browser headers and classified into one of four categories:

| Category | Meaning |
|---|---|
| `ok` | Domain responds 2xx and stays on the same host |
| `redirect` | Domain redirects to a different host (cross-domain redirect) |
| `error` | Domain responds 4xx or 5xx |
| `network-error` | Domain is unreachable (DNS failure, timeout, etc.) |

Results are streamed back as they complete (NDJSON), displayed newest-first in a paginated table (20/50/100 rows per page), and persisted in `localStorage` for 30 days. Re-checking a URL updates its row rather than duplicating it. A "Clear History" button wipes all stored results.

Results can be exported as a `.csv` file.

### Volume Calculator

Estimates impression volume across formats given a banner budget.

| Format | Formula |
|---|---|
| Video | `banner × 0.58` |
| Native | `banner × 0.6 × 0.26` |

Video and Native fields are read-only and update automatically when the Banner value changes. Click any field to copy the value to clipboard.

---

## Tech Stack

- **Next.js 16** — App Router, streaming API routes, `proxy.ts` for auth middleware
- **next-auth v5** — Credentials provider, JWT session via `AUTH_SECRET`
- **Zustand v5** — Client state with `persist` middleware and custom expiring localStorage adapter
- **Tailwind v4** — CSS-based config, oklch color tokens, dark mode only
- **shadcn/ui** — Radix primitives with Tailwind variants
- **Zod v4** — URL validation and form schema
- **p-limit** — Concurrent fetch cap (5 at a time) for domain checks
- **Sonner** — Toast notifications
- **vitest + @testing-library/react** — Unit and component tests (34 tests)

---

## Project Structure

```
app/
  (auth)/login/        Login page
  api/
    auth/              next-auth handler
    check-domains/     Domain check endpoint — streams NDJSON results
  page.tsx             Dashboard (Domain Checker + Volume Calculator)

components/
  domain-checker/      All domain checker UI components
  volume-calculator/   Volume panel
  layout/              Header and dashboard shell
  ui/                  shadcn primitives (button, input, table, etc.)

lib/
  domain-classifier.ts  Classifies HTTP status + redirect logic
  domain-parser.ts      Zod URL validation, deduplication, https:// prepend
  volume-formula.ts     Banner → Video/Native conversion formulas

store/
  domain-checker.ts     Zustand store with 30-day persisted localStorage

hooks/
  use-domain-checker.ts  Orchestrates fetch, NDJSON streaming, toast, store update
  use-clipboard.ts       Click-to-copy helper

__tests__/             Mirrors src structure — lib, components, api
proxy.ts               Auth guard (Next.js 16 replacement for middleware.ts)
auth.ts                next-auth config
```

---

## Environment Variables

| Variable | Description |
|---|---|
| `AUTH_SECRET` | Secret for signing JWT session cookies |
| `AUTH_USERNAME` | Login username |
| `AUTH_PASSWORD` | Login password |

Set these in `.env.local` for local development and in the Vercel project settings for production.

---

## Development

```bash
npm install
npm run dev        # http://localhost:3000
npm run test       # vitest (watch mode)
npm run lint       # eslint
```

---

## CI/CD

GitHub Actions runs on every push and pull request to `main`:

1. `npm audit --audit-level=high` — fails on high/critical vulnerabilities
2. `eslint` — linting
3. `vitest --run` — full test suite

Dependabot checks for dependency updates daily and opens PRs automatically. Patch and minor updates are auto-merged when CI passes. Major updates require manual review.

Deployments are handled by Vercel via git integration — merging to `main` triggers a production deploy.
