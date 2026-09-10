# WAVORA — Technical Documentation

> Travel & lifestyle platform for Hurghada, Red Sea, Egypt.
> Sea trips, desert adventures, curated stays, hidden spots, and local eats — managed through a full admin CMS.

---

## Table of Contents

1. [High-Level Architecture](#1-high-level-architecture)
2. [Tech Stack](#2-tech-stack)
3. [Project Structure](#3-project-structure)
4. [Database Schema](#4-database-schema)
5. [Authentication & Security](#5-authentication--security)
6. [Environment Variables](#6-environment-variables)
7. [Deployment (Vercel + Neon)](#7-deployment-vercel--neon)
8. [Routes & Pages](#8-routes--pages)
9. [API Endpoints](#9-api-endpoints)
10. [Admin Dashboard](#10-admin-dashboard)
11. [Seed Script](#11-seed-script)
12. [Development Guide](#12-development-guide)

---

## 1. High-Level Architecture

```
┌─────────────────────────────────────────────────────────┐
│                      VERCEL                             │
│  ┌───────────────────────────────────────────────────┐  │
│  │  Next.js 16 (App Router + Turbopack)              │  │
│  │                                                   │  │
│  │  ┌──────────┐  ┌──────────────┐  ┌────────────┐  │  │
│  │  │ Frontend │  │  API Routes  │  │ Middleware  │  │  │
│  │  │ (SSR/SSG)│  │  (serverless)│  │  (JWT auth)│  │  │
│  │  └──────────┘  └──────┬───────┘  └────────────┘  │  │
│  │                       │                           │  │
│  └───────────────────────┼───────────────────────────┘  │
│                          │                              │
└──────────────────────────┼──────────────────────────────┘
                           │
                   ┌───────▼───────┐
                   │   Prisma ORM  │
                   └───────┬───────┘
                           │
                   ┌───────▼───────┐
                   │  Neon         │
                   │  PostgreSQL   │
                   │  (serverless) │
                   └───────────────┘
```

**Request flow:**
1. User hits a page or API endpoint
2. Next.js middleware checks for `admin-token` cookie on `/admin/*` and `/api/admin/*` routes
3. Public pages are served as SSG/SSR without authentication
4. Admin pages require valid JWT; invalid/missing token redirects to `/admin/login`
5. API routes query Neon PostgreSQL through Prisma Client

---

## 2. Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | Next.js (App Router, Turbopack) | 16.3.1 |
| React | React | 19.2.8 |
| Language | TypeScript | 5.x |
| Styling | Tailwind CSS | 4.x |
| Animation | Framer Motion (`motion`) | 13.1.0 |
| Database | Neon PostgreSQL | Serverless |
| ORM | Prisma | 5.22.0 |
| Auth | `jose` (JWT) + `bcryptjs` | 6.2.10 / 3.0.3 |
| Icons | Lucide React | 1.31.0 |
| Utilities | `clsx`, `tailwind-merge`, `lenis` | — |
| Hosting | Vercel | — |
| Repository | GitHub (`Alabsy1/wavora`) | — |

---

## 3. Project Structure

```
wavora/
├── prisma/
│   ├── schema.prisma          # Database schema (11 models)
│   └── seed.ts                # Seed script (admin, flags, packages, stays, spots, add-ons)
├── src/
│   ├── app/
│   │   ├── layout.tsx         # Root layout (navbar, footer, theme)
│   │   ├── page.tsx           # Homepage
│   │   ├── globals.css        # Global styles, typography scale, CSS custom properties
│   │   ├── about/             # About page
│   │   ├── contact/           # Contact page
│   │   ├── plan/              # Trip planning form
│   │   ├── explore/           # All experiences grid
│   │   ├── sea/               # Sea page (server + client components)
│   │   ├── adventures/        # Adventures listing
│   │   ├── stays/             # Stays listing
│   │   ├── stay/[id]          # Stay detail
│   │   ├── spots/             # Spots listing
│   │   ├── spot/[id]          # Spot detail
│   │   ├── eats/              # Eats listing
│   │   ├── eat/[id]           # Eat detail
│   │   ├── experiences/       # Experiences listing
│   │   ├── experience/[slug]  # Experience detail
│   │   ├── ocean-experience/  # Ocean experience page
│   │   ├── admin/             # Admin dashboard (protected)
│   │   │   ├── login/         # Login page (public)
│   │   │   ├── page.tsx       # Dashboard overview
│   │   │   ├── sea-packages/  # Sea packages CRUD
│   │   │   ├── adventures/    # Adventures listing
│   │   │   ├── stays/         # Stays CRUD
│   │   │   ├── spots-eats/    # Spots & Eats CRUD
│   │   │   ├── trips/         # Trips CRUD
│   │   │   ├── experiences/   # Experiences CRUD
│   │   │   ├── inquiries/     # Inquiry management
│   │   │   ├── addons/        # Add-ons CRUD
│   │   │   ├── page-content/  # CMS content builder
│   │   │   └── settings/      # Global settings (feature flags)
│   │   └── api/
│   │       ├── admin/         # Protected admin API routes
│   │       │   ├── auth/      # Login, check, logout
│   │       │   ├── sea-packages/
│   │       │   ├── stays/
│   │       │   ├── spots/
│   │       │   ├── trips/
│   │       │   ├── experiences/
│   │       │   ├── addons/
│   │       │   ├── inquiries/
│   │       │   ├── island-destinations/
│   │       │   ├── page-content/
│   │       │   └── settings/
│   │       ├── inquiries/     # Public inquiry submission
│   │       ├── sea-packages/  # Public sea packages
│   │       ├── island-destinations/ # Public island destinations
│   │       └── site-flags     # Public feature flags
│   ├── components/
│   │   ├── admin/             # Admin shell, sidebar, header, theme
│   │   ├── home/              # Homepage sections
│   │   ├── sea/               # Sea page components
│   │   ├── ocean/             # Ocean experience components
│   │   ├── navbar/            # Public navigation
│   │   └── [shared]/          # Button, hero, footer, modal, cards, etc.
│   ├── data/                  # Static data (site config, sea content, editorial)
│   ├── hooks/                 # Custom hooks (use-site-flags)
│   ├── lib/
│   │   ├── auth.ts            # JWT sign/verify, session helpers
│   │   ├── prisma.ts          # Prisma client singleton
│   │   ├── cn.ts              # clsx + tailwind-merge utility
│   │   └── site-data.ts       # Server-side data fetching helpers
│   └── types/                 # Shared TypeScript types
├── public/                    # Static assets (images, icons)
├── .env                       # Local environment variables (gitignored)
├── .env.example               # Environment variable template
├── vercel.json                # Vercel build configuration
├── package.json               # Dependencies and scripts
└── tsconfig.json              # TypeScript configuration
```

---

## 4. Database Schema

**Provider:** PostgreSQL (Neon serverless)

### Models

| Model | Purpose | Key Fields |
|-------|---------|------------|
| `Admin` | Admin user credentials | `email` (unique), `password` (bcrypt hash), `name` |
| `SiteConfig` | Feature flags & settings | `key` (unique), `value` |
| `Trip` | Trip/adventure listings | `slug`, `tripType`, `inclusions`, `itinerary`, `gallery` |
| `Experience` | Experience listings | `slug`, `category`, `tags`, `gallery` |
| `SeaPackage` | Sea trip packages | `slug`, `boatType`, `inclusions`, `exclusions`, `timeline`, `specs`, `addOns`, `gallery` |
| `IslandDestination` | Island destinations | `slug`, `image`, `isPopular` |
| `Inquiry` | Customer inquiries | `fullName`, `whatsapp`, `status`, `tripType`, `tripId` |
| `PageContent` | CMS content fields | `page`, `section`, `key`, `value`, `type` |
| `AddOn` | Bookable add-ons | `slug`, `price`, `category` |
| `Stay` | Accommodation listings | `slug`, `category`, `amenities`, `tags` |
| `Spot` | Spot/eat listings | `slug`, `category` (spot/eat), `tags` |

### JSON Fields

Several models store JSON as `String` columns (serialized with `JSON.stringify`/`JSON.parse` in application code):

- `Trip`: `gallery`, `tags`, `inclusions`, `itinerary`
- `Experience`: `gallery`, `tags`
- `SeaPackage`: `inclusions`, `exclusions`, `timeline`, `specs`, `addOns`, `gallery`
- `Stay`: `gallery`, `amenities`, `tags`
- `Spot`: `gallery`, `tags`

### Unique Constraints

- `PageContent`: `@@unique([page, section, key])` — composite unique on page+section+key
- All models with `slug` field: `@unique`

---

## 5. Authentication & Security

### Login Flow

```
POST /api/admin/auth/login
  │
  ├─ Validate input (email, password required)
  │
  ├─ prisma.admin.findUnique({ where: { email } })
  │   └─ Returns 401 "Invalid email or password" if not found
  │
  ├─ bcrypt.compare(password, admin.password)
  │   └─ Returns 401 "Invalid email or password" if invalid
  │
  ├─ signToken({ id, email, name }) via jose
  │   └─ HS256, 24h expiry, signed with JWT_SECRET
  │
  └─ Set HttpOnly cookie: admin-token
      ├─ httpOnly: true (not accessible via JavaScript)
      ├─ secure: true in production (HTTPS only)
      ├─ sameSite: lax
      ├─ path: /
      └─ maxAge: 86400 (24 hours)
```

### Auth Library (`src/lib/auth.ts`)

| Function | Purpose |
|----------|---------|
| `signToken(payload)` | Creates a signed JWT with 24h expiry |
| `verifyToken(token)` | Verifies JWT, returns `AdminPayload` or `null` |
| `getSession()` | Reads `admin-token` cookie, verifies it |
| `requireAdmin()` | Like `getSession()` but throws on unauthorized |

### Middleware Protection (`src/middleware.ts`)

The middleware intercepts all `/admin/*` and `/api/admin/*` routes:

| Route Pattern | Behavior |
|---------------|----------|
| `/admin/login` | Public — no token required |
| `/api/admin/auth/login` | Public — no token required |
| `/api/admin/auth/check` | Public — no token required |
| `/api/site-flags` | Public — no token required |
| `/admin/*` (all others) | Requires valid `admin-token` cookie; redirects to `/admin/login` if invalid |
| `/api/admin/*` (all others) | Requires valid `admin-token` cookie; returns 401 JSON if invalid |

### Cookie Security

| Property | Value | Reason |
|----------|-------|--------|
| `httpOnly` | `true` | Prevents XSS access to the token |
| `secure` | `true` (prod) | Enforces HTTPS transmission |
| `sameSite` | `lax` | CSRF protection while allowing navigation |
| `maxAge` | `86400` | 24-hour session expiry |
| `path` | `/` | Token valid across all routes |

---

## 6. Environment Variables

### Required Variables

| Variable | Purpose | Example |
|----------|---------|---------|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:pass@host/db?sslmode=require` |
| `JWT_SECRET` | Secret key for signing JWTs | Any random string (min 32 chars) |
| `ADMIN_EMAIL` | Seed script admin email | `alabsyabdelrhman@gmail.com` |
| `ADMIN_PASSWORD` | Seed script admin password | `abdo.elwa@yahoo.com` |
| `ADMIN_NAME` | Seed script admin display name | `Absy Abdelrhman` |

### Where They're Used

| Variable | Used By |
|----------|---------|
| `DATABASE_URL` | `prisma/schema.prisma`, `prisma/seed.ts` |
| `JWT_SECRET` | `src/lib/auth.ts` (signing/verifying tokens) |
| `ADMIN_EMAIL` | `prisma/seed.ts` (fallback default) |
| `ADMIN_PASSWORD` | `prisma/seed.ts` (fallback default) |
| `ADMIN_NAME` | `prisma/seed.ts` (fallback default) |

### Security Notes

- `.env` is **gitignored** (`.env*` in `.gitignore`) — never committed to the repository
- `.env.example` is committed as a template without real values
- On Vercel, these are set in **Settings → Environment Variables** (Dashboard, not code)
- `JWT_SECRET` should be a cryptographically random string in production
- The seed script `ADMIN_PASSWORD` is only used as a fallback if the env var is missing

---

## 7. Deployment (Vercel + Neon)

### Prerequisites

1. GitHub repository: `Alabsy1/wavora`
2. Vercel account linked to GitHub
3. Neon database created with PostgreSQL

### Build Pipeline

```json
// vercel.json
{
  "buildCommand": "npx prisma generate && next build",
  "installCommand": "npm install",
  "framework": "nextjs"
}
```

**Build sequence on Vercel:**
1. `npm install` — installs dependencies, triggers `postinstall` which runs `npx prisma generate`
2. `npx prisma generate` — generates Prisma Client from schema (runs again to ensure fresh client)
3. `next build` — compiles Next.js application (TypeScript, static pages, API routes)

### Why `prisma generate` Runs Twice

| Hook | When | Why |
|------|------|-----|
| `postinstall` | After `npm install` | Ensures Prisma Client exists for any post-install scripts |
| `buildCommand` | Before `next build` | Guarantees fresh client matching current schema |

This prevents the common Vercel error: `@prisma/client did not initialize yet`.

### Vercel Setup Checklist

```
1. Import repository: Alabsy1/wavora
2. Framework: Next.js (auto-detected)
3. Build command: npx prisma generate && next build (from vercel.json)
4. Output directory: .next (default)
5. Add environment variables (all 5) in Settings → Environment Variables
6. Deploy
```

### Neon Database Setup

```
1. Create account at https://neon.tech
2. Create a PostgreSQL project
3. Copy connection string (format: postgresql://user:pass@host/db?sslmode=require)
4. Set as DATABASE_URL in Vercel dashboard
5. Run locally to seed:
   DATABASE_URL="<your-neon-url>" npx prisma db push
   DATABASE_URL="<your-neon-url>" npx tsx prisma/seed.ts
```

### Redeployment

After any push to `master`, Vercel auto-deploys. To manually trigger:
- Vercel Dashboard → Deployments → Latest → **⋯** → Redeploy

---

## 8. Routes & Pages

### Public Routes (No Auth)

| Route | Description |
|-------|-------------|
| `/` | Homepage with hero, mood grid, section teasers |
| `/explore` | All experiences grid |
| `/sea` | Sea page (ways, packages, islands, customizer) |
| `/adventures` | Desert adventures listing |
| `/stays` | Accommodations listing |
| `/stay/[id]` | Stay detail page |
| `/spots` | Spots listing |
| `/spot/[id]` | Spot detail page |
| `/eats` | Eats listing |
| `/eat/[id]` | Eat detail page |
| `/experiences` | All experiences listing |
| `/experience/[slug]` | Experience detail page |
| `/ocean-experience` | Ocean experience page |
| `/about` | About WAVORA |
| `/contact` | Contact page |
| `/plan` | Trip planning form |

### Protected Admin Routes (Auth Required)

| Route | Description |
|-------|-------------|
| `/admin/login` | Login page (**public**) |
| `/admin` | Dashboard overview with stats |
| `/admin/sea-packages` | Sea packages list |
| `/admin/sea-packages/new` | Create sea package |
| `/admin/sea-packages/[id]` | Edit sea package |
| `/admin/adventures` | Adventures list |
| `/admin/stays` | Stays list |
| `/admin/stays/new` | Create stay |
| `/admin/stays/[id]` | Edit stay |
| `/admin/spots-eats` | Spots & Eats list |
| `/admin/spots-eats/new` | Create spot/eat |
| `/admin/spots-eats/[id]` | Edit spot/eat |
| `/admin/trips` | Trips list |
| `/admin/trips/new` | Create trip |
| `/admin/trips/[id]` | Edit trip |
| `/admin/experiences` | Experiences list |
| `/admin/experiences/new` | Create experience |
| `/admin/experiences/[id]` | Edit experience |
| `/admin/inquiries` | Inquiry management |
| `/admin/addons` | Add-ons management |
| `/admin/page-content` | CMS content builder |
| `/admin/settings` | Global settings (feature flags) |

### Feature Flags

Feature flags are stored in the `SiteConfig` table and control visibility of navigation items and homepage sections:

| Flag Key | Controls |
|----------|----------|
| `nav-sea` | Sea navigation item |
| `nav-adventure` | Adventure navigation item |
| `nav-stays` | Stays navigation item |
| `nav-spots` | Spots navigation item |
| `nav-eats` | Eats navigation item |
| `nav-experiences` | Experiences navigation item |
| `section_hero` | Homepage hero section |
| `section_mood_grid` | Homepage mood grid |
| `section_featured_sea` | Homepage featured sea section |
| `section_adventure` | Homepage adventure section |
| `section_stays` | Homepage stays section |
| `section_spots_eats` | Homepage spots & eats section |
| `section_day_planner` | Homepage day planner section |

---

## 9. API Endpoints

### Public API

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/site-flags` | Returns all feature flags |
| `GET` | `/api/sea-packages` | Returns visible sea packages |
| `GET` | `/api/island-destinations` | Returns island destinations |
| `POST` | `/api/inquiries` | Submit a new inquiry |

### Admin Auth API (Public)

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/admin/auth/login` | Authenticate admin, set cookie |
| `GET` | `/api/admin/auth/check` | Check if current session is valid |
| `POST` | `/api/admin/auth/logout` | Clear admin cookie |
| `GET` | `/api/admin/auth/logout` | Check auth status (alias) |

### Admin CRUD API (Protected)

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET/POST` | `/api/admin/sea-packages` | List / Create sea packages |
| `GET/PUT/DELETE` | `/api/admin/sea-packages/[id]` | Read / Update / Delete sea package |
| `GET/POST` | `/api/admin/trips` | List / Create trips |
| `GET/PUT/DELETE` | `/api/admin/trips/[id]` | Read / Update / Delete trip |
| `GET/POST` | `/api/admin/experiences` | List / Create experiences |
| `GET/PUT/DELETE` | `/api/admin/experiences/[id]` | Read / Update / Delete experience |
| `GET/POST` | `/api/admin/stays` | List / Create stays |
| `GET/PUT/DELETE` | `/api/admin/stays/[id]` | Read / Update / Delete stay |
| `GET/POST` | `/api/admin/spots` | List / Create spots |
| `GET/PUT/DELETE` | `/api/admin/spots/[id]` | Read / Update / Delete spot |
| `GET/POST` | `/api/admin/addons` | List / Create add-ons |
| `GET/PUT/DELETE` | `/api/admin/addons/[id]` | Read / Update / Delete add-on |
| `GET` | `/api/admin/inquiries` | List all inquiries |
| `PUT/DELETE` | `/api/admin/inquiries/[id]` | Update status / Delete inquiry |
| `GET/PUT` | `/api/admin/page-content` | Read / Bulk update page content |
| `GET/POST` | `/api/admin/island-destinations` | List / Create island destinations |
| `GET/PUT/DELETE` | `/api/admin/island-destinations/[id]` | Read / Update / Delete island |
| `GET/PUT` | `/api/admin/settings` | Read / Update site config flags |

---

## 10. Admin Dashboard

### Layout Architecture

```
AdminShell (src/components/admin/admin-shell.tsx)
├── AdminThemeProvider     — Dark/light mode context
├── AdminSidebar          — Collapsible nav (desktop) / overlay drawer (mobile)
├── AdminHeader           — Sticky header with theme toggle, logout, mobile menu button
└── {children}            — Page content (p-4 sm:p-6 lg:p-8)
```

### Sidebar Sections

| Section | Items |
|---------|-------|
| **Overview** | Dashboard |
| **Content Modules** | Sea Packages, Adventures, Stays & Resorts, Spots & Eats, Trips, Experiences |
| **Operations** | Inquiries |
| **Configuration** | Page Content, Add-ons, Global Settings |

### Mobile Responsive

- **Desktop (lg+):** Fixed sidebar, 256px wide (or 68px collapsed)
- **Tablet:** Collapsed sidebar with icon-only nav
- **Mobile (<lg):** Hidden sidebar, hamburger toggle in header, overlay drawer with backdrop

---

## 11. Seed Script

**File:** `prisma/seed.ts`

### What Gets Seeded

| Data | Count | Notes |
|------|-------|-------|
| Admin user | 1 | bcrypt-hashed password |
| Feature flags | 13 | Nav items + homepage sections |
| Sea packages | 6 | Full data (inclusions, exclusions, timeline, specs, add-ons, gallery) |
| Island destinations | 6 | 4 popular, 2 others |
| Stays | 6 | Hotels, resorts, apartments, villas |
| Spots | 6 | 3 spots, 3 eats |
| Add-ons | 6 | GoPro, photographer, seafood lunch, etc. |

### Running the Seed

```bash
# Against local database (SQLite — no longer used)
npx tsx prisma/seed.ts

# Against Neon PostgreSQL
DATABASE_URL="postgresql://..." npx tsx prisma/seed.ts
```

### How the Seed Works

1. Reads `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `ADMIN_NAME` from env vars (falls back to defaults)
2. Hashes the password with `bcrypt.hash(password, 12)`
3. Upserts the admin record (creates if missing, updates if exists)
4. Upserts all feature flags
5. Upserts all sea packages (JSON fields serialized with `JSON.stringify`)
6. Upserts all island destinations
7. Upserts all stays, spots, and add-ons

---

## 12. Development Guide

### Local Setup

```bash
# Clone repository
git clone https://github.com/Alabsy1/wavora.git
cd wavora

# Install dependencies
npm install

# Set up environment
cp .env.example .env
# Edit .env with your Neon DATABASE_URL and JWT_SECRET

# Push schema to database
npx prisma db push

# Seed database
npx tsx prisma/seed.ts

# Start development server
npm run dev
```

### Available Scripts

| Script | Command | Description |
|--------|---------|-------------|
| `dev` | `next dev` | Start dev server with Turbopack |
| `build` | `npx prisma generate && next build` | Production build |
| `start` | `next start` | Start production server |
| `lint` | `eslint` | Run ESLint |

### Key Conventions

| Convention | Details |
|------------|---------|
| **Styling** | Tailwind CSS 4 with CSS custom properties for theming |
| **Typography** | CSS `clamp()` for responsive display sizes (`.display-xl` through `.display-sm`) |
| **Components** | `"use client"` directive for interactive components; server components for static content |
| **Data fetching** | Server components fetch data directly; client components use `fetch()` to API routes |
| **Theming** | Light/Dark/Night modes via `ThemeSwitcher` + CSS custom properties |
| **IDs** | All models use `@default(cuid())` for collision-free IDs |
| **JSON fields** | Stored as `String` in PostgreSQL, serialized/deserialized in application code |
| **Slugs** | Auto-generated from title: `title.toLowerCase().replace(/[^a-z0-9]+/g, "-")` |

### Prisma Client Singleton

```typescript
// src/lib/prisma.ts
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };
export const prisma = globalForPrisma.prisma ?? new PrismaClient();
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
```

This prevents Prisma Client from creating multiple instances during hot-reload in development.

---

## Appendix: Git History

| Commit | Message |
|--------|---------|
| `8d21d1d` | Initial commit from Create Next App |
| `76c3a71` | feat: complete admin dashboard, dynamic homepage flags, trip inquiry flow |
| `3d4452c` | feat: complete admin CMS with sea, stays, spots, adventures, add-ons, and page content management |
| `f0b78a0` | feat: comprehensive mobile-first responsiveness audit and fixes |
| `8f03c87` | chore: switch database provider from SQLite to PostgreSQL for Vercel deployment |
| `4bdc666` | chore: configure Vercel build pipeline with prisma generate |
| `b04be34` | fix: admin login now validates credentials against Neon PostgreSQL database |
