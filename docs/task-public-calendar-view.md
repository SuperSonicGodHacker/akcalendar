# Task: Make Calendar Publicly Viewable, Admin Login for Edit Only

## Goal

Remove the authentication requirement to **view** the calendar. The public (students, parents, staff) should be able to see the calendar without signing in. The `/login` admin page should remain, but only to unlock **edit** capabilities (add/edit/delete events).

## Current Behavior

- `middleware.ts` blocks all routes without a session cookie and redirects to `/login`
- `/app/page.tsx` fetches the current user and redirects to `/login` if unauthenticated
- Viewing the calendar at `/` requires a valid admin session

## Desired Behavior

- `/` (calendar) is publicly accessible — no login required
- Admin controls (add event, edit event, delete event) are only shown when an admin is signed in
- `/login` remains as the admin sign-in entry point
- After signing in, the admin is redirected back to `/` where edit controls become visible
- Signing out returns the user to the public view of the calendar (not the login page)

---

## Implementation Steps

### 1. Update `middleware.ts`
- Add `/` (and any other public-facing pages like `/announcements`, `/contact`) to `PUBLIC_PATHS`
- Remove the blanket redirect for unauthenticated users on public routes
- Keep protecting any admin-only API routes (e.g., POST/PUT/DELETE `/api/events`, `/api/announcements`)

### 2. Update `/app/page.tsx`
- Remove the hard redirect to `/login` when there is no session
- Replace with an optional auth check: attempt to fetch `/api/auth/me` and set `user` if the session exists, leave `user` as `null` if it doesn't
- Render the calendar regardless of auth state — pass `user` (or `null`) down to child components

### 3. Update `school-calendar.tsx` (and `AnnouncementsPage`, `ContactPage`)
- Make `user` prop optional (`user: User | null`)
- Conditionally render admin controls (Add Event button, Edit/Delete buttons on events) only when `user` is not `null`
- The "Sign In" link/button should be visible to unauthenticated users in the navbar so admins can navigate to `/login`
- Replace the Logout button with a Sign In link when `user` is `null`

### 4. Update `/app/login/page.tsx`
- After successful OTP verification, redirect to `/` (already the case — verify this stays correct)
- No changes needed unless the redirect destination changes

### 5. Update API route protection
- `GET /api/events` and `GET /api/announcements` — allow unauthenticated access (public read)
- `POST`, `PUT`, `DELETE` on `/api/events` and `/api/announcements` — require a valid session (return 401 if not signed in)

---

## Files to Change

| File | Change |
|------|--------|
| `middleware.ts` | Add public routes; only protect mutating API endpoints |
| `app/page.tsx` | Make auth optional; don't redirect unauthenticated visitors |
| `school-calendar.tsx` | Make `user` optional; gate edit UI on `user !== null` |
| `announcements-page.tsx` | Same as above |
| `contact-page.tsx` | Same as above (if it has admin controls) |
| `app/api/events/route.ts` | Allow GET without session; protect POST |
| `app/api/events/[id]/route.ts` | Allow GET without session; protect PUT/DELETE |
| `app/api/announcements/route.ts` | Allow GET without session; protect POST |
| `app/api/announcements/[id]/route.ts` | Allow GET without session; protect PUT/DELETE |

---

## Out of Scope

- No changes to the OTP/login flow itself
- No changes to user roles or the database schema
- No new pages — the public view is the existing calendar, just without the auth gate
