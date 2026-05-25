# AK Calendar — Copilot Instructions

## Project Overview
A school events calendar and announcements platform for Ardrey Kell High School built with Next.js App Router. It is deployed on Vercel and backed by Neon serverless Postgres.

---

## Tech Stack

| Layer | Technology | What it does |
|---|---|---|
| Framework | Next.js 15 (App Router) | Full-stack React framework — handles routing, server rendering, and API routes in one project |
| Language | TypeScript 5 (strict) | JavaScript with type annotations; catches bugs at compile time before the code runs |
| Runtime | React 19 | Library for building interactive UIs from reusable components |
| Styling | Tailwind CSS 3 + `tailwindcss-animate` | Utility-first CSS — style elements with class names instead of writing CSS files |
| UI Components | shadcn/ui (Radix UI primitives) | Pre-built accessible components (buttons, modals, dropdowns) you copy into the project and own |
| Icons | Lucide React | SVG icon set available as React components |
| Database | Neon serverless Postgres (`@neondatabase/serverless`) | Cloud-hosted Postgres database that scales to zero when idle — no server to manage |
| Authentication | Auth.js v5 (`next-auth@beta`) with Credentials provider + bcryptjs | Handles login sessions and protects routes; bcryptjs hashes passwords so they are never stored in plain text |
| Forms | React Hook Form + Zod | React Hook Form manages form state and submission; Zod defines and validates the shape of the data |
| Package Manager | pnpm | Faster, disk-efficient alternative to npm for installing dependencies |
| Deployment | Vercel | Hosting platform purpose-built for Next.js — deploys on every git push |
| Analytics | Vercel Analytics | Lightweight page-view and performance tracking built into Vercel |

---

## Project Structure

```
app/                  # Next.js App Router pages and API routes
  api/                # Server-side API route handlers only
    auth/[...nextauth]/  # Auth.js handler — do not modify manually
    announcements/    # CRUD for announcements (POST/DELETE require auth)
    events/           # CRUD for events (POST/PUT/DELETE require auth)
  layout.tsx          # Root layout — wraps with SessionProvider
  page.tsx            # Entry point — derives auth state from useSession()
components/           # Reusable React components
  ui/                 # shadcn/ui generated components — do not hand-edit
data/                 # Static JSON fallback data
lib/                  # Shared utilities (API helpers, staff directory, etc.)
scripts/              # SQL migration scripts (run in order: 001, 002, ...)
auth.ts               # Auth.js v5 config — single source of auth truth
middleware.ts         # Edge middleware — protects mutation API routes
```

---

## Architecture Principles

### 1. Server Components by default
- Use React Server Components for all pages and layouts unless interactivity requires it.
- Add `"use client"` only when the component uses browser APIs, `useState`, `useEffect`, or event handlers.
- Never fetch data directly inside Client Components — use API routes or pass data as props from Server Components.

### 2. API routes are the only database boundary
- All Postgres queries must live inside `app/api/**` route handlers, never in Client Components.
- Use the `neon` tagged-template SQL client from `@neondatabase/serverless` — no raw string concatenation in queries (parameterised only).
- Never expose `DATABASE_URL` or any connection string to the client bundle.

### 3. Authentication via Auth.js v5
- `auth.ts` is the single source of truth for session config.
- Session state on the client comes exclusively from `useSession()` — never from `useState` or local storage.
- Admin credential checks happen inside the `authorize()` callback in `auth.ts` — never in a component or API handler.
- Credentials (username, password hash, AUTH_SECRET) live in `.env` only — never hardcoded in source.
- Passwords are stored and compared as bcrypt hashes — never plaintext.

### 4. API route protection — two layers
- **Layer 1 — Middleware (`middleware.ts`):** All `POST`, `PUT`, and `DELETE` requests to `/api/**` are intercepted at the edge. Requests without a valid session are rejected with `401` before the route handler runs.
- **Layer 2 — Route handler:** Each mutation handler calls `auth()` and re-checks the session as a defence-in-depth measure.
- `GET` routes are public (read-only data).

### 5. Environment variables
- All secrets go in `.env` (gitignored). Required vars:
  - `DATABASE_URL` — Neon Postgres connection string
  - `AUTH_SECRET` — random 32-byte secret for Auth.js JWT signing
  - `ADMIN_USERNAME` — admin login username
  - `ADMIN_PASSWORD_HASH` — bcrypt hash of the admin password
- Never log, expose, or interpolate env vars into client-side code.

### 6. Styling conventions
- Use Tailwind utility classes directly — no custom CSS files except `app/globals.css`.
- Use `cn()` from `@/lib/utils` (clsx + tailwind-merge) for conditional class logic.
- Use shadcn/ui components from `@/components/ui/` for all standard UI elements (Button, Card, Input, etc.). Do not duplicate them.
- Dark mode is handled by `next-themes` — use Tailwind `dark:` variants.

### 7. Forms and validation
- All user-facing forms use React Hook Form + Zod schema validation.
- Zod schemas are defined close to the form or in a shared `lib/schemas.ts`.
- Server-side API handlers perform their own independent validation — never trust client-side Zod as the only guard.

### 8. Data fetching
- Client Components fetch data through `/api/**` route handlers using the native `fetch` API.
- Include proper error handling (`try/catch`) and surface errors to the user via `sonner` toasts — not `alert()`.

---

## Security Rules (non-negotiable)

- **No hardcoded credentials.** Any username, password, token, or secret in source code is a blocker.
- **No plaintext passwords.** Passwords must be bcrypt-hashed before storage and comparison.
- **No client-side auth gates as the only protection.** Every mutation must be protected server-side.
- **No raw SQL string interpolation.** Use parameterised queries exclusively to prevent SQL injection.
- **No `alert()` for security flows.** Use proper UI components (toasts, modals) for all user feedback.
- **Validate all inputs at the API boundary.** Do not rely solely on client-side form validation.

---

## Conventions

- Component files: `kebab-case.tsx`
- Exported component names: `PascalCase`
- Utility functions: `camelCase`
- API route files: always named `route.ts`
- SQL migration scripts: numbered sequentially `NNN_description.sql`
- Do not edit files under `components/ui/` manually — regenerate via shadcn CLI if needed.
- Keep `next.config.mjs` minimal; do not disable TypeScript or ESLint checks in production builds.

---

## Approved Dependencies

These are the only dependencies approved for this project. Do not introduce any library outside this list without explicit user approval.

### Production

| Package | Version | Purpose |
|---|---|---|
| `next` | 15.5.x | Framework — routing, server rendering, API routes |
| `react` / `react-dom` | 19.x | Core UI library and its browser renderer |
| `next-auth` | beta (v5) | Session-based authentication — login, logout, and route protection |
| `@neondatabase/serverless` | 1.0.x | Connects to the Neon Postgres database from server-side code |
| `bcryptjs` | latest | Hashes passwords before storing them so plaintext is never saved |
| `zod` | 3.x | Defines data schemas and validates that incoming data matches the expected shape |
| `react-hook-form` | 7.x | Manages form input state, dirty tracking, and submission without re-rendering the whole page |
| `@hookform/resolvers` | 3.x | Bridges React Hook Form and Zod so form validation uses the Zod schema |
| `tailwind-merge` | 3.x | Merges Tailwind class strings and resolves conflicts (e.g. two conflicting text colours) |
| `clsx` | 2.x | Builds conditional class name strings cleanly |
| `class-variance-authority` | 0.7.x | Defines component variants (e.g. button sizes/colours) in a type-safe way |
| `lucide-react` | 0.454.x | SVG icons as React components |
| `next-themes` | 0.4.x | Manages dark/light mode and syncs with the OS preference |
| `sonner` | 1.x | Renders toast notifications (non-blocking pop-up messages) |
| `date-fns` | 4.x | Utility functions for formatting, comparing, and manipulating dates |
| `react-day-picker` | 9.x | Accessible calendar/date-picker UI component |
| `recharts` | 2.x | Chart library (bar, line, pie, etc.) built on top of React and SVG |
| `embla-carousel-react` | 8.x | Touch-friendly carousel/slider component |
| `cmdk` | 1.x | Command palette — searchable keyboard-driven action menu |
| `input-otp` | 1.x | Segmented OTP / PIN input field component |
| `react-resizable-panels` | 2.x | Split-pane layouts where the user can drag a divider to resize panels |
| `vaul` | 1.x | Slide-up drawer component (mobile-friendly overlay) |
| `@vercel/analytics` | 1.x | Sends page view and web vitals data to Vercel Analytics |
| All `@radix-ui/react-*` | as in `package.json` | Unstyled, accessible headless UI primitives that shadcn/ui builds on top of |

### Dev

| Package | Version | Purpose |
|---|---|---|
| `typescript` | 5.x | Compiles TypeScript to JavaScript and type-checks the codebase |
| `tailwindcss` | 3.x | Generates the utility CSS classes used throughout the project |
| `tailwindcss-animate` | 1.x | Adds Tailwind-compatible keyframe animation utilities |
| `postcss` / `autoprefixer` | 8.x / 10.x | Transforms CSS during the build — autoprefixer adds vendor prefixes for browser compatibility |
| `@types/node` | 22.x | Type definitions for Node.js built-ins (e.g. `process.env`) |
| `@types/react` / `@types/react-dom` | 19.x | Type definitions for React and ReactDOM APIs |
| `@types/bcryptjs` | latest | Type definitions for bcryptjs (the package ships without its own types) |

---

## Dependency Gap Policy

When a task requires a capability not covered by the approved list above:

1. **Do not silently add a new package.** Never import or suggest installing a library that is not in the approved list without first flagging it.
2. **Present options.** Identify 2–3 candidate libraries that fit the need, and for each one provide:
   - Package name and current stable version
   - Why it fits this project's stack
   - Any trade-offs or caveats
3. **Wait for explicit approval** before writing any code that depends on the new package.
4. **Prefer the standard library or already-approved packages first.** If the need can be met with `date-fns`, `zod`, native `fetch`, or any other already-approved dependency, use that instead of adding something new.
