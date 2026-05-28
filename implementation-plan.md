## Implementation Plan

### Phase 0 — Project Setup

- [x] Install missing dependencies: `next-auth`, `p-limit`, `vitest`, `@testing-library/react`
- [x] Configure `vitest` with jsdom and path aliases
- [x] Set up `.env.local` with auth env var placeholders
- [x] Define folder structure: `app/`, `components/`, `lib/`, `hooks/`, `store/`
- [x] Add `__tests__/` directory convention

---

### Folder Structure

```
app/
├── (auth)/
│   └── login/
│       └── page.tsx          # login page
├── api/
│   └── check-domains/
│       └── route.ts          # POST handler
├── globals.css
├── layout.tsx
└── page.tsx                  # main dashboard

components/
├── ui/                       # shadcn primitives (already exists)
├── layout/
│   ├── header.tsx            # Scootopia logo + nav
│   └── dashboard-shell.tsx   # two-panel wrapper (main + sidebar)
├── domain-checker/
│   ├── input-tabs.tsx        # Paste/Type | Upload tab switcher
│   ├── paste-input.tsx       # textarea + URL counter + RUN button
│   ├── file-upload-zone.tsx  # drag-and-drop xlsx/csv zone
│   ├── stat-cards.tsx        # four color-coded summary cards
│   └── results-table.tsx     # domain + status rows
└── volume-calculator/
    └── volume-panel.tsx      # Banner input → Video/Native outputs

lib/
├── utils.ts                  # cn() — already exists
├── domain-parser.ts          # URL extraction, dedup, zod validation
├── domain-classifier.ts      # 2XX/3XX/4XX-5XX/Network categorisation
└── volume-formula.ts         # pure Banner → Video/Native function

hooks/
├── use-domain-checker.ts     # orchestrates store + API call + SSE/polling
└── use-clipboard.ts          # copy-to-clipboard with transient "copied" state

store/
└── domain-checker.ts         # Zustand slice: results, progress, counts

__tests__/
├── lib/
│   ├── domain-parser.test.ts
│   ├── domain-classifier.test.ts
│   └── volume-formula.test.ts
└── components/
    ├── input-tabs.test.tsx
    ├── stat-cards.test.tsx
    └── results-table.test.tsx
```

---

### Phase 1 — App Shell & Layout

- [x] Build main layout: Scootopia header/logo
- [x] Build two-panel layout: CPM Bid Guidance (left/main) + Volume Calculator (right/sidebar)
- [x] Add Pikachu gif to the sidebar below the volume calculator panel
- [x] Apply dark theme via Tailwind/shadcn CSS variables

---

### Phase 2 — CPM Bid Guidance: Input

- [x] Build tab switcher component (Paste/Type | Upload)
- [ ] **Paste/Type tab:** textarea input with live URL detection counter and RUN button
- [ ] **Upload tab:** drag-and-drop zone accepting xlsx and csv; parse domains from first sheet/column using `xlsx`; show detected URL count; Export File button (disabled until results exist)
- [ ] Shared input validation via zod (strip empty lines, validate URL format, deduplicate)

---

### Phase 3 — CPM Bid Guidance: Domain Checker

- [ ] Create server-side API route `POST /api/check-domains` using `p-limit` to throttle concurrent requests
- [ ] Classify responses into four categories: 2XX OK, 3XX Redirect, 4XX/5XX Error, Network Error
- [ ] Build Zustand store for domain check state (results, progress, counts per category)
- [ ] Stream results back one domain at a time (Server-Sent Events or sequential fetch with state updates)
- [x] Build four stat summary cards (color-coded: green / yellow / red / orange)
- [ ] Build results list below stat cards: domain URL + status response per row
- [ ] CSV export for Upload tab: domain + status columns

---

### Phase 4 — Volume Calculator

> **Blocker:** formula (Banner → Video, Native) must be confirmed before building.

- [ ] Pull and document the formula from the existing repo
- [ ] Build volume calculator panel: Banner input, Video output, Native output
- [ ] Wire up formula logic (pure function in `lib/`)
- [ ] Make Video and Native outputs copy-to-clipboard on click

---

### Phase 5 — Auth

- [ ] Configure next-auth v5 credentials provider using env var credentials
- [ ] Create login page UI (`/login`)
- [ ] Add Next.js middleware to protect all routes, redirect unauthenticated users to `/login`
- [ ] Add sign out action

---

### Phase 6 — Testing

- [ ] Unit tests: volume formula (`lib/`)
- [ ] Unit tests: domain URL parsing and deduplication (`lib/`)
- [ ] Unit tests: response classification logic (`lib/`)
- [ ] Component tests: tab switcher, stat cards, results table
- [ ] Integration test: API route `/api/check-domains` with mocked fetch

---

### Phase 7 — CI/CD

- [ ] GitHub Actions workflow on push/PR:
  - Run `npm audit` — fail on high/critical CVEs
  - Run lint (`eslint`)
  - Run test suite (`vitest`)
- [ ] Vercel preview deploy on pull request
- [ ] Vercel production deploy on merge to `main`
