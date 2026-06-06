# Admin Dashboard Redesign

**Date:** 2026-06-01  
**Branch:** website-blog  
**Scope:** All pages under `/admin` except login

---

## Goal

Redesign the admin section into a sleek, modern, minimal dashboard with a persistent sidebar, consistent shadcn UI components, subtle micro-animations, and full mobile responsiveness.

---

## Architecture

Use a Next.js route group `(dashboard)` to separate the sidebar shell from the standalone login page. No URL changes.

```
app/admin/
├── login/page.tsx              (unchanged functionally, inputs upgraded to shadcn)
├── layout.tsx                  (minimal wrapper — bg-gray-50, no sidebar)
└── (dashboard)/
    ├── layout.tsx              (NEW — renders AdminShell + {children})
    ├── blog/
    │   ├── page.tsx
    │   ├── new/page.tsx
    │   └── [id]/edit/page.tsx
    └── users/
        └── page.tsx
```

New component files:
- `components/admin/AdminShell.tsx` — client component, owns sidebar open/close state
- `components/admin/ConfirmDialog.tsx` — reusable destructive-action confirmation modal

---

## Shadcn Components to Install

| Component | Usage |
|-----------|-------|
| `dialog` | ConfirmDialog for destructive actions |
| `dropdown-menu` | Per-row action menus, user menu in sidebar |
| `sheet` | Mobile sidebar overlay |
| `tooltip` | Icon-only nav item labels (if sidebar collapses to icons) |
| `input` | Replace raw `<input>` elements |
| `select` | Replace raw `<select>` in Add User form |

Already installed and used: `badge`, `button`, `card`, `separator`

---

## Sidebar & Shell Layout

### Desktop (≥768px)
- Fixed left sidebar, 240px wide
- Main content area: `ml-[240px]`, full height

**Sidebar structure (top to bottom):**
1. Logo mark (`L×T` in navy circle) + "Admin" text label
2. Nav links with Lucide icons:
   - **Blog Posts** — `FileText` icon — `/admin/blog`
   - **Users** — `Users` icon — `/admin/users` — visible to `admin` role only
3. Bottom section: user avatar (initial letter), truncated email, `DropdownMenu` with Sign Out

**Active nav state:** teal left border accent + light teal background pill  
**Inactive nav state:** gray text, teal highlight on hover, 150ms transition

### Mobile (<768px)
- Sidebar hidden off-screen by default
- Sticky top bar: hamburger (`Menu` icon) + current page title + optional primary action button (e.g. "+ New Post" on blog list)
- Tapping hamburger opens sidebar as a `Sheet` overlay from the left
- Tapping a nav link or backdrop closes the sheet

---

## Animations (Subtle / Professional)

- **Sidebar Sheet (mobile):** Framer Motion `x: -240 → 0`, duration 0.2s, ease easeOut
- **Nav link hover:** background color transition 150ms
- **Page content mount:** opacity fade `0 → 1`, duration 200ms
- **Card hover (blog/user rows):** subtle shadow lift, transition 150ms
- No staggered lists, no bouncy springs, no flashy entrance animations

---

## Page-by-Page Changes

### Login
- Keep existing layout and logic
- Upgrade `<input>` → shadcn `Input`
- Upgrade `<button>` → shadcn `Button`
- Add `opacity: 0 → 1` fade on mount (Framer Motion)

### Blog List (`/admin/blog`)
- Replace raw row divs with shadcn `Card`
- Status indicator: shadcn `Badge` — green outline (published), gray outline (draft)
- Per-row actions: move Publish/Unpublish + Edit + Delete into a `DropdownMenu` triggered by `MoreHorizontal` icon
- Delete → opens `ConfirmDialog` before executing `deletePostAction`
- Empty state: icon + "No posts yet" copy + "Write your first post" button
- "+ New Post" button in header (desktop) and sticky top bar (mobile)

### New Post (`/admin/blog/new`)
- Same `PostForm`, no logic changes
- Wrap in consistent page header (back link, title)
- Inputs inside PostForm upgraded to shadcn `Input` + `Textarea`

### Edit Post (`/admin/blog/[id]/edit`)
- Same as New Post wrapper
- Publish/Unpublish button stays in page header (primary action, not in dropdown)
- Uses shadcn `Button` with appropriate variant (green = publish, gray = unpublish)

### Users (`/admin/users`)
- User list rows: same `Card` pattern as blog list
- Role badge: shadcn `Badge` — navy tint for admin, gray for editor
- Per-row actions: Promote/Demote + Remove in a `DropdownMenu`
- Remove → `ConfirmDialog` ("Remove this user? They will lose all access.")
- Demote (admin → editor) → `ConfirmDialog` ("Demote to editor? They will lose admin access.")
- Add User form: inputs upgraded to shadcn `Input` + shadcn `Select` for role
- "You" badge on current user row; no action menu shown for own account

---

## ConfirmDialog Component

Reusable `Dialog` with:
- `title: string` — e.g. "Delete post?"
- `description: string` — e.g. "This cannot be undone."
- `onConfirm: () => void` — the server action to run
- `confirmLabel?: string` — default "Delete" (red destructive Button)
- `cancelLabel?: string` — default "Cancel" (ghost Button)

Client component that holds its own open state. Trigger is passed as `children`.

---

## What Does NOT Change

- All server actions (`publishPostAction`, `deletePostAction`, `createUserAction`, etc.)
- Auth flow and session logic
- `PostForm` internals and `TiptapEditor`
- Database queries
- URLs / routing
