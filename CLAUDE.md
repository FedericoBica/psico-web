# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev           # Development server
npm run dev:turbo     # Development server with Turbo (faster)
npm run build         # Production build (runs prisma generate first)
npm run lint          # ESLint
npm run seed          # Seed the database
```

Database (local dev via Docker):
```bash
docker compose up -d  # Start PostgreSQL on port 5432
npx prisma migrate dev
npx prisma studio     # GUI for the database
```

## Architecture

E-commerce platform for a psychopedagogy professional selling digital (PDF) and physical educational products, with an integrated blog. Built with Next.js 14 App Router, Prisma + PostgreSQL, and two payment gateways (MercadoPago and PayPal).

### Key directories

- `src/app/(shop)/` — All public-facing routes under a shared shop layout: `admin/`, `blog/`, `cart/`, `checkout/`, `orders/`, `product/[slug]/`, `tienda/`, `search/`
- `src/actions/` — Server actions (primary data layer). All database reads/writes go here, no traditional REST API.
- `src/components/` — Reusable components. Client components use `'use client'`; everything else is a Server Component by default.
- `src/store/` — Zustand stores for client state: cart (persisted to localStorage), UI sidebar toggle, shipping address.
- `src/lib/` — Prisma client singleton and MercadoPago config.
- `prisma/` — Schema (`schema.prisma`) and migrations.

### Data model highlights

- **Product** — has `format` (digital/physical), slug, category, images (Cloudinary URLs), price, tags.
- **Order / OrderItem** — tracks format, quantity, price at purchase time, and payment transaction IDs.
- **Coupon** — discount codes with expiry date.
- **Post** — blog articles.
- **StoreConfig** — JSON-based key/value store for dynamic site configuration.

### Data fetching pattern

Server Actions (`'use server'`) are the sole data layer. Direct Prisma calls inside these actions; no API routes for data (only `/api/auth/[...nextauth]` and `/api/webhook/mercadopago`).

### Auth

NextAuth 5 beta with Credentials provider. Passwords hashed with bcryptjs. Session extended with `id` and `role` (admin/user). Middleware in `src/middleware.ts` protects authenticated routes.

### Image handling

Cloudinary for product images. Configured in `next.config.js` with `remotePatterns`. Next.js build ignores TypeScript and ESLint errors intentionally (Vercel deploy target).

### Payments

- MercadoPago: webhook at `/api/webhook/mercadopago`, redirect at `/api/payments/success`
- PayPal: client-side SDK loaded via Provider

### Path alias

`@/*` maps to `./src/*` — use this throughout.
