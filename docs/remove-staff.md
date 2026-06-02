# Spec: UI Changes — Staff Contacts, Add Event, Admin Name

## 1. Remove the Staff Contacts Page

Delete the page and every reference to it.

**Files to change:**

- `contact-page.tsx` — delete the file.
- `app/page.tsx` (line 56) — remove the `contact` case from the view-routing switch/conditional and remove the `ContactPage` import.
- `school-calendar.tsx` (line 345) — remove the "Staff Contacts" nav button and the `onNavigate` call that sets the view to `"contact"`.
- `announcements-page.tsx` (lines 199–214) — remove the "Staff Contacts" nav link from the announcements nav bar; keep the Calendar and Announcements links.

**Before deleting**, grep for all imports/references to `contact-page`, `ContactPage`, `staff-directory`, and `StaffDirectory` to confirm nothing else depends on them. Delete `lib/staff-directory.ts` and `components/staff-directory.tsx` only if no other files reference them.

---

## 2. Remove the "Add Event" Button from the Announcements Page

**File:** `announcements-page.tsx`

| What to remove | Location |
|---|---|
| "Add Event" `<Button>` element | lines 402–405 |
| Add Event modal JSX block | lines 319–384 |
| `showAddEvent` state | line 47 |
| `newEvent` form state (`title`, `description`, `date`, `category`) | lines 77–82 |
| `handleAddEvent()` function | lines 152–177 |
| Any imports that become unused (e.g. `Calendar` icon) | top of file |

After the change, confirm the announcements page renders without errors and the rest of the page is unaffected.

---

## 3. Show the Signed-In Staff Member's Name Instead of "Administrator"

**Root cause:** The header already renders `user.name || user.email` in both `school-calendar.tsx` (line 352) and `announcements-page.tsx` (line 219). No UI code is wrong. The problem is that the admin account was seeded with `name = "Administrator"` because `ADMIN_NAME` was not set when `scripts/seed-admin.ts` ran (line 16).

**Fix — two parts:**

**Part A: Update the database record**

Run a one-time SQL update to set the real name on the existing admin row:

```sql
UPDATE users SET name = '<actual staff name>' WHERE email = '<admin email>';
```

**Part B: Harden the seed script**

In `scripts/seed-admin.ts` (line 16), replace the silent fallback with a hard failure so this can never happen again:

```ts
// Before
const name = process.env.ADMIN_NAME ?? "Administrator"

// After
const name = process.env.ADMIN_NAME
if (!name) throw new Error("ADMIN_NAME env var is required — set it before running this script")
```

No changes to any UI component are needed.

---

## Implementation Order

1. **3B** — harden the seed script (low risk, no DB or UI impact)
2. **3A** — update the admin `name` in the database
3. **2** — remove the Add Event button and related code
4. **1** — remove the Staff Contacts page (largest surface area, most files touched)
