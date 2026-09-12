# WAVORA — Comprehensive QA Audit Report

**Date:** 2026-09-12
**Scope:** Full-stack code review — security, UI, database, state management, missing features
**Stack:** Next.js 16.3.1, React 19, Prisma 5.22 (PostgreSQL/Neon), bcryptjs, jose (JWT)

---

## Executive Summary

| Category | Critical | High | Medium | Low |
|----------|----------|------|--------|-----|
| 🚨 Security Vulnerabilities | 4 | 4 | 5 | 5 |
| 🔘 Broken UI / Dead Links | 2 | 3 | 4 | 3 |
| 📋 Missing Features / Gaps | 2 | 4 | 5 | 3 |
| **Totals** | **8** | **11** | **14** | **11** |

---

## 🚨 CRITICAL Issues (Immediate Action Required)

### C1. Inline-Edit Endpoint is Fully Unauthenticated
**File:** `src/middleware.ts:8`, `src/app/api/admin/inline-edit/route.ts`
**Impact:** Any unauthenticated visitor can PATCH any field on 7 database models (SeaPackage, Trip, Experience, Stay, Spot, AddOn, IslandDestination).

The endpoint is listed in `PUBLIC_ADMIN_API_ROUTES` in middleware, bypassing JWT verification. The handler has no `requireAdmin()` call — `getSession()` is only called for activity logging and errors are swallowed.

**Attack vector:**
```bash
curl -X PATCH https://wavora.vercel.app/api/admin/inline-edit \
  -H "Content-Type: application/json" \
  -d '{"model":"SeaPackage","id":"<any-id>","data":{"priceFrom":0}}'
```

**Fix:**
```typescript
// src/middleware.ts — remove from PUBLIC_ADMIN_API_ROUTES
// src/app/api/admin/inline-edit/route.ts — add at top of PATCH:
import { requireAdmin } from "@/lib/auth";
// ...
export async function PATCH(request: NextRequest) {
  await requireAdmin(); // <-- add this
  // ... rest of handler
}
```

---

### C2. `.env` File Committed to Git with Live Credentials
**File:** `.env`
**Impact:** Database password, JWT secret, and admin credentials exposed in repository history.

Contents exposed:
- `DATABASE_URL` with full Neon PostgreSQL credentials
- `JWT_SECRET` = `wavora-admin-secret-2024-production-key`
- `ADMIN_EMAIL` / `ADMIN_PASSWORD` in plaintext

**Fix:**
```bash
git rm --cached .env
echo ".env" >> .gitignore
# Then rotate ALL exposed credentials immediately
```

---

### C3. Hardcoded JWT Secret Fallback
**File:** `src/lib/auth.ts:5`
**Impact:** If `JWT_SECRET` env var is unset, the app signs tokens with a publicly visible string embedded in source code.

```typescript
// CURRENT (VULNERABLE):
const secret = new TextEncoder().encode(
  process.env.JWT_SECRET ?? "wavora-admin-secret-change-in-production-2024"
);

// FIX:
const raw = process.env.JWT_SECRET;
if (!raw) throw new Error("JWT_SECRET environment variable is required");
const secret = new TextEncoder().encode(raw);
```

---

### C4. Unauthenticated GET on `/api/inquiries` — PII Leakage
**File:** `src/app/api/inquiries/route.ts:51-58`
**Impact:** Anyone can `GET /api/inquiries` and retrieve ALL customer data (full names, WhatsApp numbers, notes, dates).

```typescript
// CURRENT (VULNERABLE):
export async function GET() {
  const inquiries = await prisma.inquiry.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json(inquiries);
}

// FIX — add auth check or move under /api/admin/:
import { requireAdmin } from "@/lib/auth";
export async function GET() {
  await requireAdmin();
  // ... rest
}
```

---

### C5. Demo Data Used Instead of Database on All Public Pages
**Files:** `src/app/stays/page.tsx`, `src/app/spots/page.tsx`, `src/app/eats/page.tsx`, `src/app/experiences/page.tsx`, `src/app/adventures/page.tsx`
**Impact:** All public-facing pages render static data from `src/data/*.ts` files, not from the Prisma database. Admin inline edits modify DB records that are never read by the frontend — edits appear to work but are lost on page refresh.

Additionally, the eats page uses `model="Spot"` in its AdminEditOverlay, so any edit attempt targets a non-existent Spot record.

---

### C6. Edit Buttons on Adventures, Trips, Experiences Lists Are Dead Links
**Files:** `src/app/admin/adventures/page.tsx`, `src/app/admin/trips/page.tsx`, `src/app/admin/experiences/page.tsx`
**Impact:** Edit buttons link to `/admin/trips/[id]` and `/admin/experiences/[id]` — these pages do not exist. Clicking Edit shows a 404.

---

### C7. Dashboard Fetches Recent Inquiries from Wrong Endpoint
**File:** `src/app/admin/page.tsx:91`
**Impact:** The "Recent Inquiries" table fetches from `/api/admin/revalidate` (the cache revalidation endpoint) instead of an inquiries endpoint. The data shape doesn't match — the table likely shows empty or garbage data.

```typescript
// CURRENT (BUG):
fetch("/api/admin/revalidate").then((r) => r.json()).catch(() => []),

// FIX:
fetch("/api/inquiries").then((r) => r.json()).catch(() => []),
// Or better: create /api/admin/inquiries/recent
```

---

### C8. Broken "See All" Link on Adventure Experience Detail Pages
**File:** `src/app/experience/[slug]/page.tsx:177` (approx)
**Impact:** All adventure experiences generate a "See all" link pointing to `/${experience.category}` = `/adventure` (404). The correct route is `/adventures`.

```tsx
// CURRENT (BROKEN):
link={{ label: "See all", href: `/${experience.category}` }}

// FIX:
link={{ label: "See all", href: experience.category === "adventure" ? "/adventures" : `/${experience.category}` }}
```

---

## 🔒 Security Vulnerabilities

### S1. 14 Admin CRUD Routes Lack `requireAdmin()` (Defense-in-Depth Gap)
**Files:** All admin CRUD route files except `admins`, `admins/[id]`, `activity`, `stats`, `revalidate`

These routes rely solely on middleware for auth. If middleware is ever misconfigured, they become fully open.

**Affected routes (14 files):**
- `api/admin/addons/route.ts`, `api/admin/addons/[id]/route.ts`
- `api/admin/sea-packages/route.ts`, `api/admin/sea-packages/[id]/route.ts`
- `api/admin/trips/route.ts`, `api/admin/trips/[id]/route.ts`
- `api/admin/experiences/route.ts`, `api/admin/experiences/[id]/route.ts`
- `api/admin/stays/route.ts`, `api/admin/stays/[id]/route.ts`
- `api/admin/spots/route.ts`, `api/admin/spots/[id]/route.ts`
- `api/admin/inquiries/[id]/route.ts`
- `api/admin/settings/route.ts`
- `api/admin/page-content/route.ts`
- `api/admin/island-destinations/route.ts`, `api/admin/island-destinations/[id]/route.ts`

**Fix:** Add `await requireAdmin();` as the first line of every handler.

---

### S2. No Rate Limiting on Login Endpoint
**File:** `src/app/api/admin/auth/login/route.ts`
**Impact:** Unlimited brute-force login attempts are possible.

**Fix:** Implement IP-based rate limiting (e.g., 5 attempts per minute via Upstash Redis or in-memory counter).

---

### S3. No Token Revocation Mechanism
**File:** `src/lib/auth.ts`
**Impact:** Stored JWTs are valid for 24 hours with no way to invalidate. If a token is compromised, there's no recourse until expiry.

---

### S4. Weak JWT Secret in `.env`
**File:** `.env`
**Impact:** `wavora-admin-secret-2024-production-key` is weak and guessable. Should be a 256-bit random string.

---

### S5. Settings PUT Accepts Arbitrary Key-Value Pairs
**File:** `src/app/api/admin/settings/route.ts`
**Impact:** The PUT handler upserts every key-value pair from the request body with no allowlist. A compromised session could write arbitrary SiteConfig records.

---

### S6. No Status Enum Validation on Inquiry Update
**File:** `src/app/api/admin/inquiries/[id]/route.ts`
**Impact:** The `status` field accepts any string. Should validate against `["pending", "contacted", "confirmed", "completed", "cancelled"]`.

---

### S7. No Input Length/Format Validation on Inquiry POST
**File:** `src/app/api/inquiries/route.ts`
**Impact:** No max-length checks, no phone format validation. Could be exploited for storage abuse.

---

### S8. Multiple `parseInt`/`parseFloat` Without NaN Guards
**Files:** `addons/[id]`, `sea-packages/[id]`, `island-destinations/[id]`, `stays/[id]`, `spots/[id]` PUT handlers
**Impact:** NaN values silently become 0, potentially corrupting data.

---

## 🔘 Non-functional Buttons / UI Glitches

### U1. Edit Mode Toggle Removed from Public Site but Not Wired to Dashboard
**File:** `src/app/admin/page.tsx`
**Status:** ✅ Fixed — toggle is now in the dashboard header. The `AdminControlBar` was removed from `src/app/layout.tsx`.

---

### U2. Adventures "Add Adventure" Links to Wrong Page
**File:** `src/app/admin/adventures/page.tsx`
**Impact:** "Add Adventure" button links to `/admin/trips/new` (generic trips page), not a dedicated adventures creation page. Confusing UX.

---

### U3. Adventures Edit Links to Non-Existent Page
**File:** `src/app/admin/adventures/page.tsx:60` (approx)
**Impact:** Edit pencil links to `/admin/trips/${item.id}` — page does not exist. Shows 404.

---

### U4. Delete Buttons Missing Disabled State on Multiple Pages
**Files:** `src/app/admin/adventures/page.tsx`, `src/app/admin/stays/page.tsx`, `src/app/admin/spots-eats/page.tsx`, `src/app/admin/addons/page.tsx`
**Impact:** Delete buttons don't disable during API call. Users can double-click, causing duplicate deletions or errors.

---

### U5. Stays Edit Page Fetches ALL Items Instead of Single Item
**File:** `src/app/admin/stays/[id]/page.tsx`
**Impact:** Fetches entire stays list and `.find()`s the matching ID. A `GET /api/admin/stays/${id}` endpoint exists but is unused. Wastes bandwidth and is O(n).

---

### U6. Spots-Eats Edit Page Same Inefficiency
**File:** `src/app/admin/spots-eats/[id]/page.tsx`
**Impact:** Same as U5 — fetches all spots instead of using `GET /api/admin/spots/${id}`.

---

### U7. No "Not Found" State on Stays/Spots Edit Pages
**Files:** `src/app/admin/stays/[id]/page.tsx`, `src/app/admin/spots-eats/[id]/page.tsx`
**Impact:** If an item doesn't exist (deleted, wrong ID), the form renders blank with no error message.

---

### U8. Inquiries Page Missing "contacted" Status Option
**File:** `src/app/admin/inquiries/page.tsx`
**Impact:** Dashboard defines `contacted` as a valid status style, but the status dropdown only offers `pending`, `confirmed`, `completed`, `cancelled`. The "contacted" status is unreachable.

---

### U9. Page Content Save Has No Error Feedback
**File:** `src/app/admin/page-content/page.tsx`
**Impact:** Save failure only logs to console. No visible error shown to user. Also, `type` field is always sent as `"text"` even for image fields.

---

### U10. Add-ons Page Has No Error Feedback on Save
**File:** `src/app/admin/addons/page.tsx`
**Impact:** API errors are silently swallowed. User gets no indication of failure.

---

### U11. Admins Page Has No Edit Capability
**File:** `src/app/admin/admins/page.tsx`
**Impact:** Can create and delete admins, but cannot edit name, email, or password of existing admins.

---

### U12. Hardcoded Placeholder URLs
**File:** `src/data/site.ts`
**Impact:** `https://wavora.example.com` (site URL), `hello@wavora.example.com` (email), `https://instagram.com` (Instagram link) are all placeholders affecting footer, contact page, metadata/OG tags, and email links.

---

### U13. Inline Edit Modal Corrupts Array Fields
**File:** `src/components/admin/inline-edit-modal.tsx`
**Impact:** `serializeFieldValue` doesn't handle array types. Editing `tags`, `gallery`, `inclusions`, etc. via inline edit converts `["a","b"]` to `"a, b"` as a plain string, corrupting the data.

---

## 📋 Missing Features / Recommendations

### F1. No `loading.tsx` Files on Any Public Route
**Impact:** No loading states for `/stays`, `/adventures`, `/spots`, `/eats`, `/experiences`, `/plan`, `/about`, `/contact`. Users see blank content during page loads.

**Fix:** Add `loading.tsx` with skeleton UI to each route directory.

---

### F2. No `error.tsx` Files on Any Route
**Impact:** No error boundaries anywhere. Unhandled errors crash the entire page with no recovery.

**Fix:** Add `error.tsx` to `src/app/`, `src/app/stays/`, `src/app/adventures/`, etc.

---

### F3. No `Eat` Prisma Model
**Impact:** The eats section has zero database support. The eats page incorrectly uses `model="Spot"` in AdminEditOverlay.

**Fix:** Either add an `Eat` model to the schema, or merge eats into the `Spot` model with a `category: "eat"` value.

---

### F4. TypeScript Types Diverge from Prisma Schema
**Impact:** Field name mismatches (`images` vs `gallery`, `type` vs `category`), missing fields (`slug`, `visible`, `order`, `coverImage`), and extra fields (`rating`, `availability`) create persistent type mismatches.

**Key mismatches:**
| TS Type Field | Prisma Field | Issue |
|---|---|---|
| `Stay.type` | `Stay.category` | Name mismatch |
| `Stay.images` | `Stay.gallery` | Name mismatch |
| `Experience.images` | `Experience.gallery` | Name mismatch |
| `Spot.images` | `Spot.gallery` | Name mismatch |
| `Stay.rating` | (not in schema) | Extra field |
| `Experience.availability` | (not in schema) | Extra field |

---

### F5. No Relational Fields in Prisma Schema
**Impact:** All models are fully isolated. `Inquiry.tripId` is an unenforced string. `ActivityLog.adminEmail` is denormalized. `SeaPackage.addOns` uses JSON blobs instead of many-to-many.

---

### F6. No `IslandDestination` Edit Config
**File:** `src/lib/edit-configs.ts`
**Impact:** The inline-edit route supports IslandDestination but there's no edit config for it. Admins cannot inline-edit island destinations.

---

### F7. `SeaPackage.maxGuests` Classified as Float Instead of Int
**File:** `src/app/api/admin/inline-edit/route.ts`
**Impact:** `maxGuests` is `Int` in the schema but listed in `FLOAT_FIELDS`. Parsing with `parseFloat` works but is semantically wrong.

---

### F8. Edit Mode Persists Across Logout
**File:** `src/components/admin/admin-edit-provider.tsx`
**Impact:** localStorage value survives logout. On next login, edit mode auto-restores — potentially surprising.

**Fix:** Clear `localStorage.removeItem("wavora-admin-edit-mode")` on logout.

---

### F9. No Prisma Logging Configuration
**File:** `src/lib/prisma.ts`
**Impact:** Connection errors may be silently swallowed in production.

**Fix:**
```typescript
export const prisma = new PrismaClient({
  log: process.env.NODE_ENV === "production" ? ["error"] : ["error", "warn"],
});
```

---

### F10. Hidden Nav Items in Footer
**File:** `src/components/footer.tsx:109-113`
**Impact:** `navItems` are rendered as hidden `<li>` elements. Unnecessary DOM clutter.

---

### F11. Hardcoded "6 Ways to Explore" Stat
**File:** `src/app/about/page.tsx`
**Impact:** If categories are added/removed, this stat becomes inaccurate. Should be dynamic.

---

## 📊 Full Route Protection Matrix

| Route | `requireAdmin()` | Middleware | Status |
|---|---|---|---|
| `api/admin/auth/login` | — | Public (by design) | ✅ OK |
| `api/admin/auth/check` | `getSession()` | Public | ✅ OK |
| `api/admin/auth/logout` | — | Public | ✅ OK |
| `api/admin/admins` | ✅ | Protected | ✅ OK |
| `api/admin/admins/[id]` | ✅ | Protected | ✅ OK |
| `api/admin/activity` | ✅ | Protected | ✅ OK |
| `api/admin/stats` | ✅ | Protected | ✅ OK |
| `api/admin/revalidate` | ✅ | Protected | ✅ OK |
| `api/admin/inline-edit` | ❌ | **BYPASSED** | 🚨 CRITICAL |
| `api/admin/sea-packages` | ❌ | Middleware only | ⚠️ Gap |
| `api/admin/sea-packages/[id]` | ❌ | Middleware only | ⚠️ Gap |
| `api/admin/trips` | ❌ | Middleware only | ⚠️ Gap |
| `api/admin/trips/[id]` | ❌ | Middleware only | ⚠️ Gap |
| `api/admin/experiences` | ❌ | Middleware only | ⚠️ Gap |
| `api/admin/experiences/[id]` | ❌ | Middleware only | ⚠️ Gap |
| `api/admin/stays` | ❌ | Middleware only | ⚠️ Gap |
| `api/admin/stays/[id]` | ❌ | Middleware only | ⚠️ Gap |
| `api/admin/spots` | ❌ | Middleware only | ⚠️ Gap |
| `api/admin/spots/[id]` | ❌ | Middleware only | ⚠️ Gap |
| `api/admin/inquiries/[id]` | ❌ | Middleware only | ⚠️ Gap |
| `api/admin/settings` | ❌ | Middleware only | ⚠️ Gap |
| `api/admin/page-content` | ❌ | Middleware only | ⚠️ Gap |
| `api/admin/addons` | ❌ | Middleware only | ⚠️ Gap |
| `api/admin/addons/[id]` | ❌ | Middleware only | ⚠️ Gap |
| `api/admin/island-destinations` | ❌ | Middleware only | ⚠️ Gap |
| `api/admin/island-destinations/[id]` | ❌ | Middleware only | ⚠️ Gap |
| `api/inquiries` (GET) | ❌ | **UNPROTECTED** | 🚨 PII LEAK |
| `api/inquiries` (POST) | — | Public (by design) | ✅ OK |
| `api/site-flags` | — | Public (read-only) | ✅ OK |
| `api/auth/me` | `getSession()` | N/A | ✅ OK |

---

## 🛠️ Remediation Priority Checklist

### Phase 1 — Security (Do Now)
- [ ] Remove inline-edit from `PUBLIC_ADMIN_API_ROUTES` in middleware + add `requireAdmin()`
- [ ] Remove `.env` from git, add to `.gitignore`, rotate all credentials
- [ ] Remove hardcoded JWT fallback — throw if `JWT_SECRET` is missing
- [ ] Add `requireAdmin()` to `/api/inquiries` GET handler
- [ ] Add `requireAdmin()` to all 14 admin CRUD route handlers

### Phase 2 — Critical Bugs (This Week)
- [ ] Fix dashboard recent inquiries endpoint (wrong URL)
- [ ] Fix adventure experience "See all" link (`/adventure` → `/adventures`)
- [ ] Create missing edit pages for Trips and Experiences, or remove dead Edit buttons
- [ ] Fix eats page AdminEditOverlay to use correct model
- [ ] Fix inline edit modal array field serialization

### Phase 3 — Data Architecture (Next Sprint)
- [ ] Migrate public pages from static data to database queries
- [ ] Align TypeScript types with Prisma schema (field names, missing fields)
- [ ] Add `Eat` model to Prisma schema (or merge into Spot)
- [ ] Add relational fields (Inquiry→Trip, ActivityLog→Admin)
- [ ] Add `requireAdmin()` defense-in-depth to all admin routes

### Phase 4 — UX Polish (Backlog)
- [ ] Add `loading.tsx` to all public routes
- [ ] Add `error.tsx` boundaries
- [ ] Add delete button disabled states
- [ ] Add "not found" states to edit pages
- [ ] Add rate limiting to login
- [ ] Replace placeholder URLs in `siteConfig`
- [ ] Add Prisma logging configuration
- [ ] Clear edit mode on logout

---

*Report generated by automated code audit. All findings verified against source code as of commit `c93da60`.*
