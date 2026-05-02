# NurturetheSpectrum.com

## Overview

Full-stack directory website connecting families of children with autism and special needs to qualified nannies, caregivers, and agencies in the Philadelphia metro area.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **Frontend**: React + Vite (artifacts/nurture-the-spectrum)
- **API framework**: Express 5 (artifacts/api-server)
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)

## Architecture

### Frontend (artifacts/nurture-the-spectrum)
- React + Vite with Wouter routing
- TailwindCSS with deep teal (#1a6b72) + warm gold (#e8a838) color scheme
- Consumes @workspace/api-client-react generated hooks

### Backend (artifacts/api-server)
- Express 5 API server at /api
- Routes: /api/listings, /api/contact, /api/admin/*
- Cookie-based admin session authentication
- Drizzle ORM with PostgreSQL

### Database (lib/db)
- `listings` table with enums for type, county, tier, status
- Specializations and certifications stored as JSON arrays

## Pages
- `/` — Homepage with hero search, featured listings, How It Works
- `/directory` — Directory with filter sidebar, listing cards, pagination
- `/directory/:slug` — Individual listing profile page
- `/submit` — Public submit a listing form
- `/about` — About page
- `/contact` — Contact form
- `/admin` — Admin login (hidden from public nav)
- `/admin/dashboard` — Admin panel with listings management

## Environment Variables
- `DATABASE_URL` — PostgreSQL connection string (auto-set by Replit)
- `ADMIN_PASSWORD` — Admin panel password (default: NurtureAdmin2024!)
- `CONTACT_EMAIL` — Email for contact form submissions
- `STRIPE_SECRET_KEY` — Stripe secret key (placeholder)
- `STRIPE_PUBLISHABLE_KEY` — Stripe publishable key (placeholder)
- `NEXT_PUBLIC_SITE_URL` — Site URL for SEO

## Monetization Tiers
- **Free**: Basic listing, no badge, sorted last
- **Featured**: Gold badge, sorted second (Stripe placeholder: $75-150/mo)
- **Verified**: Teal badge, sorted first (Stripe placeholder: $150-250/mo)

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.
