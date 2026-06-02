# Spec: Remove "Back to Calendar" Button from Announcements Page

## What

Remove the "Back to Calendar" button that appears in the top-left of the announcements page content area.

## Where

**File:** `announcements-page.tsx`

The button is rendered in the main content header around line 390:

```tsx
<Button variant="outline" onClick={() => onNavigate("calendar")}>
  <ArrowLeft className="h-4 w-4 mr-2" />
  Back to Calendar
</Button>
```

## Changes

1. **Delete the `<Button>` element** for "Back to Calendar" (the `<ArrowLeft>` icon button that calls `onNavigate("calendar")`).

2. **Remove the wrapping `<div className="flex items-center space-x-4">`** that groups it with the "Announcements" heading — replace it so the heading stands alone, e.g.:
   ```tsx
   <h2 className="text-3xl font-bold text-gray-900">Announcements</h2>
   ```

3. **Remove the `ArrowLeft` import** from `lucide-react` if it is no longer used anywhere in the file after step 1.

## Out of scope

- The "Calendar" link in the nav bar at the top of the page is a separate element and should remain.
- No other pages are affected.
