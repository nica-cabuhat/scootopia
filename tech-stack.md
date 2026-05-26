## Tech Stack

### Framework & Language

| Package | Version | Purpose |
|---|---|---|
| next | 16.2.6 | App framework (App Router, RSC) |
| react | 19.2.4 | UI library |
| react-dom | 19.2.4 | DOM renderer |
| typescript | ^5 | Type safety |

### UI & Styling

| Package | Version | Purpose |
|---|---|---|
| tailwindcss | ^4 | Utility-first CSS |
| shadcn | 4.7.0 | Component library |
| radix-ui | 1.4.3 | Headless UI primitives |
| lucide-react | 1.16.0 | Icon library |
| class-variance-authority | 0.7.1 | Component variant styling |
| clsx | 2.1.1 | Conditional class names |
| tailwind-merge | 3.6.0 | Merge Tailwind classes safely |
| tw-animate-css | 1.4.0 | Tailwind animation utilities |

### State & Validation

| Package | Version | Purpose |
|---|---|---|
| zustand | 5.0.13 | Client-side state (domain check results, live updates) |
| zod | 4.4.3 | Input validation (domain list, volume fields) |

### File Handling

| Package | Version | Purpose |
|---|---|---|
| xlsx | 0.18.5 | Parse xlsx/csv uploads and export results as CSV |

> **Note:** `xlsx` 0.18.5 has known prototype pollution vulnerabilities. Risk is contained since it is used only for parsing, not executing macros. Consider migrating to `exceljs` if this becomes a security concern.

### Auth

| Package | Purpose |
|---|---|
| next-auth v5 (Auth.js) | Credentials provider with 2 hardcoded users via env vars — no database required |

### Utilities

| Package | Purpose |
|---|---|
| p-limit | Throttle concurrent server-side domain fetch requests (prevents hammering up to 100 domains simultaneously) |

### Testing

| Package | Purpose |
|---|---|
| vitest | Unit and integration test runner |
| @testing-library/react | Component testing |

### DevOps & Tooling

| Tool | Purpose |
|---|---|
| ESLint 9 + eslint-config-next | Linting |
| GitHub Actions | CI/CD — runs tests, `npm audit` for CVEs, Vercel preview deploy on PR |
| Vercel | Hosting and deployment |

### Environment Variables

| Variable | Purpose |
|---|---|
| `AUTH_USER_1` | Username for first user |
| `AUTH_PASS_1` | Password for first user |
| `AUTH_USER_2` | Username for second user |
| `AUTH_PASS_2` | Password for second user |
| `AUTH_SECRET` | next-auth secret key |
