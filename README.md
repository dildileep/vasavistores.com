# VasaviStores — AI-First Commerce Operating System

> **D2C eCommerce platform built for modern Indian businesses.**
> One intelligent system to manage your store, automate marketing, collect reviews, and grow revenue.

**Live:** https://vasavistores.com
&nbsp;| &nbsp;**Admin:** https://vasavistores.com/admin
&nbsp;| &nbsp;**Stack:** React 19 · Vite 8 · TypeScript · Tailwind CSS v4 · Supabase · Razorpay · Shiprocket

---

## Table of Contents

- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)
- [Running Locally](#running-locally)
- [Deployment (Hostinger + GitHub)](#deployment-hostinger--github)
- [Supabase Setup](#supabase-setup)
- [Database Schema](#database-schema)
- [Status — What's Done](#status--whats-done)
- [Status — In Progress / Partial](#status--in-progress--partial)
- [Status — Pending / To Do](#status--pending--to-do)
- [Future Enhancements](#future-enhancements)
- [Admin Credentials](#admin-credentials)
- [Known Issues & Fixes](#known-issues--fixes)

---

## Project Overview

VasaviStores is an AI-first SaaS eCommerce platform built for D2C brands in India. Starting with the **TapReview AI NFC Card** (₹499), the platform is designed to grow into a full Commerce Operating System with AI employees handling products, marketing, support, sales, and analytics automatically.

---

## Tech Stack

| Layer | Technology | Version |
|---|---|---|
| UI Framework | React | 19.2.0 |
| Build Tool | Vite | 8.0.16 |
| Language | TypeScript | 5.8.3 |
| Styling | Tailwind CSS | 4.2.1 |
| Components | shadcn/ui + Radix UI | Latest |
| Icons | Lucide React | 0.575.0 |
| Animations | Motion (Framer) | 12.x |
| Routing | React Router DOM | 7.18.1 |
| Data Fetching | TanStack Query | 5.101.1 |
| Backend / DB | Supabase | 2.110.7 |
| Charts | Recharts | 2.15.4 |
| SEO | react-helmet-async | 3.0.0 |
| Payments | Razorpay | Client SDK |
| Shipping | Shiprocket | API (pending) |
| Hosting | Hostinger (auto-deploy from GitHub) | — |

---

## Project Structure

```
vasavistores/
├── public/                   # Static assets
│   ├── .htaccess             # Apache SPA fallback + gzip + cache headers
│   ├── favicon.ico / .svg    # VS brand favicon
│   ├── robots.txt            # SEO crawl rules
│   └── sitemap.xml           # Sitemap for vasavistores.com
│
├── src/
│   ├── routes/
│   │   └── index.tsx         # Landing page (/)
│   │
│   ├── pages/
│   │   ├── Login.tsx         # Auth page (email + Google OAuth)
│   │   ├── shop/
│   │   │   ├── Shop.tsx          # Product listing (/shop)
│   │   │   ├── ProductDetails.tsx # Product page (/products/:slug)
│   │   │   ├── Cart.tsx          # Cart (/cart)
│   │   │   ├── Checkout.tsx      # Checkout + Razorpay (/checkout)
│   │   │   └── OrderSuccess.tsx  # Confirmation (/order/success/:id)
│   │   ├── account/
│   │   │   ├── Account.tsx       # Profile (/account)
│   │   │   ├── Orders.tsx        # Order history (/account/orders)
│   │   │   ├── Addresses.tsx     # Saved addresses (/account/addresses)
│   │   │   └── Wishlist.tsx      # Wishlist (/account/wishlist)
│   │   └── admin/
│   │       ├── AdminLayout.tsx   # Sidebar + auth guard (/admin)
│   │       ├── AdminDashboard.tsx    # 12 KPI cards + charts
│   │       ├── AdminProducts.tsx     # Products CRUD
│   │       ├── AdminOrders.tsx       # Orders management
│   │       ├── AdminCustomers.tsx    # Customer profiles
│   │       ├── AdminCoupons.tsx      # Discount codes
│   │       ├── AdminMessages.tsx     # Contact form submissions
│   │       ├── AdminAnalytics.tsx    # Advanced analytics + funnel
│   │       ├── AdminHeatmap.tsx      # Click / scroll heatmaps
│   │       ├── AdminAICenter.tsx     # AI command center (chat)
│   │       ├── AdminMarketing.tsx    # Campaigns + coupons + referral
│   │       ├── AdminPayments.tsx     # Razorpay transactions
│   │       ├── AdminShipping.tsx     # Shiprocket shipments
│   │       ├── AdminContent.tsx      # Blog + pages + FAQs
│   │       ├── AdminSecurity.tsx     # Audit logs + roles
│   │       └── AdminSettings.tsx     # Store / payment / shipping / AI config
│   │
│   ├── components/
│   │   ├── shop/
│   │   │   ├── Header.tsx        # Sticky nav (icons, cart badge, user menu)
│   │   │   ├── Footer.tsx        # Store footer
│   │   │   ├── ProductCard.tsx   # Reusable product card
│   │   │   ├── ShopLayout.tsx    # Header + Footer wrapper
│   │   │   └── Seo.tsx           # Helmet-based per-route meta tags
│   │   └── ui/                   # shadcn/ui primitives
│   │
│   ├── context/
│   │   └── CartContext.tsx       # Persistent cart (localStorage)
│   │
│   ├── hooks/
│   │   └── useAuth.ts            # Supabase auth hook + checkIsAdmin()
│   │
│   ├── integrations/
│   │   ├── supabase/
│   │   │   ├── client.ts         # Supabase client (publishable key)
│   │   │   ├── types.ts          # Auto-generated DB types
│   │   │   └── auth-middleware.ts
│   │   └── lovable/              # Lovable Cloud integration shim
│   │
│   └── lib/
│       └── format.ts             # formatINR() and other helpers
│
├── supabase/
│   └── migrations/               # All database migrations (run in order)
│       ├── 20260719075250_...    # Roles, has_role() function, user_roles table
│       ├── 20260719075314_...    # Revoke has_role from anon
│       ├── 20260720154926_...    # All tables + seed product
│       ├── 20260720154956_...    # Security hardening
│       ├── 20260721162857_...    # Additional security revokes
│       ├── 20260721163046_...    # has_role SECURITY INVOKER
│       └── 20260723000000_...    # ⚡ RLS fix — anon can read active products
│
├── .env                          # Supabase keys (committed — publishable only)
├── vite.config.ts                # Port 5000, host 0.0.0.0, base "./"
├── package.json
├── DEPLOY_HOSTINGER.md           # Manual upload guide
└── README.md                     # This file
```

---

## Environment Variables

```env
# Supabase — committed to repo (publishable/anon key, safe to expose)
VITE_SUPABASE_URL=https://your-ref.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=eyJ...

# Razorpay — add this to enable live payments
VITE_RAZORPAY_KEY_ID=rzp_live_xxxxxxxxxxxx
```

> **Supabase service role key and Razorpay secret** must never go in `.env`.
> Those belong in Supabase Edge Function secrets only.

---

## Running Locally

```bash
# Install dependencies
npm install

# Start dev server (http://localhost:5000)
npm run dev

# Production build → dist/
npm run build

# Preview production build
npm run preview
```

---

## Deployment (Hostinger + GitHub)

This project auto-deploys to Hostinger when you push to the `main` branch.

**Hostinger build settings:**

| Setting | Value |
|---|---|
| Branch | `main` |
| Build command | `npm run build` |
| Output directory | `dist` |
| Node version | `20` |

The `public/.htaccess` handles:
- SPA fallback (all routes serve `index.html`)
- HTTP → HTTPS redirect
- Gzip compression
- Long-term asset caching

**After every push to `main`:** Hostinger rebuilds and deploys automatically. No manual upload needed.

---

## Supabase Setup

### First-time setup (new project)

1. Create project at [supabase.com](https://supabase.com) — choose **Mumbai (ap-south-1)** region
2. Go to **SQL Editor** and run each migration file from `supabase/migrations/` **in filename order**
3. Run the RLS fix migration last (`20260723000000_fix_anon_rls_policies.sql`)
4. Configure Auth (see below)

### Auth configuration

**Authentication → URL Configuration:**

| Field | Value |
|---|---|
| Site URL | `https://vasavistores.com` |
| Redirect URLs | `https://vasavistores.com/**` |
| | `https://www.vasavistores.com/**` |

### Make yourself admin

After your first login on the live site, run this in the SQL editor:

```sql
INSERT INTO public.user_roles (user_id, role)
SELECT id, 'admin'
FROM auth.users
WHERE email = 'dildileep.01@gmail.com'
ON CONFLICT DO NOTHING;
```

### Critical RLS fix (run this if shop shows no products)

```sql
DROP POLICY IF EXISTS "public read active products" ON public.products;
CREATE POLICY "anon read active products" ON public.products
  FOR SELECT TO anon USING (is_active = true);
CREATE POLICY "auth read products" ON public.products
  FOR SELECT TO authenticated
  USING (is_active OR public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "public read reviews" ON public.reviews;
CREATE POLICY "anon read reviews" ON public.reviews
  FOR SELECT TO anon USING (is_published = true);
CREATE POLICY "auth read reviews" ON public.reviews
  FOR SELECT TO authenticated
  USING (is_published OR public.has_role(auth.uid(), 'admin'));
```

---

## Database Schema

| Table | Purpose |
|---|---|
| `profiles` | Customer profile (name, phone, email) |
| `user_roles` | Role assignments (`admin`, `store_owner`, etc.) |
| `categories` | Product categories |
| `products` | Product catalog with images, specs, features, FAQs |
| `reviews` | Customer reviews with moderation flag |
| `wishlists` | User saved products |
| `addresses` | Shipping / billing addresses |
| `coupons` | Discount codes (percent or flat) |
| `orders` | Order records with status lifecycle |
| `order_items` | Line items per order |
| `payments` | Razorpay payment records |
| `shipments` | Shiprocket shipment records |
| `contact_submissions` | Contact form entries |

---

## Status — What's Done

### Foundation
- ✅ Landing page — Hero, Features, Workflow, Comparison, Testimonials, Pricing, CTA
- ✅ Dark premium theme — glassmorphism, blue + purple gradients
- ✅ Framer Motion animations throughout
- ✅ Custom `VS` favicon (SVG + ICO)
- ✅ Responsive across desktop, tablet, mobile
- ✅ `robots.txt` + `sitemap.xml` (pointing to `vasavistores.com`)
- ✅ Hostinger `.htaccess` — SPA fallback, HTTPS redirect, gzip, caching

### Navigation
- ✅ Sticky header with icons (Shop, TapReview, Contact)
- ✅ Active route highlighting
- ✅ Cart badge with item count
- ✅ User dropdown (profile, orders, admin link, sign out)
- ✅ Mobile hamburger menu with icon nav links

### Authentication
- ✅ Email + password login / signup
- ✅ Google OAuth
- ✅ Persistent sessions (localStorage)
- ✅ Role-based admin guard (`user_roles` table)
- ✅ Auto-profile creation on signup

### E-commerce Store
- ✅ Shop listing page — search, category filter, sort (popular / newest / price)
- ✅ Product detail page — image gallery, specs, features, FAQ, sticky buy button
- ✅ Cart — persistent via `localStorage`, quantity controls
- ✅ Multi-step checkout — address, GST, coupon, order summary
- ✅ Razorpay client integration (test mode)
- ✅ COD fallback payment option
- ✅ Order success / confirmation page
- ✅ Seeded product: **TapReview AI NFC Card** (₹499, 500 stock)

### Customer Account
- ✅ Profile page — name, phone, email update
- ✅ Order history
- ✅ Address book (add, edit, set default)
- ✅ Wishlist

### Admin Suite (`/admin`)
- ✅ Secure admin layout with role check
- ✅ Collapsible sidebar — 5 groups, 15 modules
- ✅ Mobile sidebar overlay
- ✅ **Dashboard** — 12 KPI cards (revenue, orders, pending, delivered, customers, returning, conversion, AOV, cart abandonment, products, low inventory, AI tasks) + revenue area chart + orders bar chart + recent orders table
- ✅ **Products** — full CRUD (name, images, price, features, stock)
- ✅ **Orders** — list, status update, order items detail
- ✅ **Customers** — registered customer profiles
- ✅ **Coupons** — create percent / flat discount codes
- ✅ **Messages** — contact form inbox
- ✅ **Analytics** — revenue trend, traffic sources pie chart, conversion funnel, top products, AI alerts
- ✅ **Heatmap** — click / scroll / rage click visualization with color overlays (desktop + mobile)
- ✅ **AI Command Center** — chat interface with quick commands (product SEO, campaigns, sales summaries)
- ✅ **Marketing** — campaigns table, coupon manager, referral stub
- ✅ **Payments** — Razorpay transaction list, refund status
- ✅ **Shipping** — shipment list, Shiprocket status, track links
- ✅ **Content** — blog posts, pages stub, FAQ manager
- ✅ **Security** — audit log, role definitions, login history
- ✅ **Settings** — 9 config sections (store, payment, shipping, SEO, email, WhatsApp, AI, API keys, users)

### SEO
- ✅ Per-route meta tags via `react-helmet-async`
- ✅ Organization + WebSite + OnlineStore JSON-LD (sitewide)
- ✅ Product + Breadcrumb JSON-LD on product pages
- ✅ Open Graph + Twitter card tags
- ✅ Geo tags (India), local/brand keywords
- ✅ Clean URLs (`/products/tapreview-ai-nfc-card`)

---

## Status — In Progress / Partial

| Feature | What's Done | What's Missing |
|---|---|---|
| **Razorpay payments** | Client SDK + checkout UI integrated | Live `VITE_RAZORPAY_KEY_ID` env var + Supabase Edge Function for server-side signature verification |
| **Shiprocket shipping** | DB schema + admin UI with status display | Edge Function to auto-create shipment when order is paid; tracking webhook |
| **Review moderation** | Schema + product page display | Admin approve/reject UI; RLS enforcement for unpublished reviews |
| **AI Command Center** | Chat UI + simulated responses | Real OpenAI API integration behind the responses |
| **Heatmap analytics** | Visual UI with color overlays | Real click/scroll data collection (needs a JS tracker writing to Supabase) |
| **Advanced analytics** | Charts + funnel UI with sample data | Real data queries replacing mock values |

---

## Status — Pending / To Do

### Payments
- ⏳ Add `VITE_RAZORPAY_KEY_ID` to environment (Hostinger build vars or `.env`)
- ⏳ Supabase Edge Function — verify Razorpay signature before marking order paid
- ⏳ UPI direct integration
- ⏳ Invoice PDF generation on order success

### Shipping
- ⏳ Supabase Edge Function — call Shiprocket API when order status → `paid`
- ⏳ Courier auto-selection at checkout
- ⏳ Tracking webhook → update `shipments` table in real time
- ⏳ Shiprocket API credentials in Supabase secrets

### Database / Auth
- ⏳ Run RLS fix SQL in Supabase (products not showing to logged-out users)
- ⏳ Add `vasavistores.com` to Supabase Auth redirect URLs
- ⏳ Run admin role SQL after first login

### Admin
- ⏳ Product variants (size, color, quantity options)
- ⏳ Bulk product upload (CSV import)
- ⏳ Print invoice / shipping label from order detail
- ⏳ Review moderation — approve/reject in admin
- ⏳ Real data in analytics (replace mock chart values)
- ⏳ Real heatmap data collection

### Marketing
- ⏳ WhatsApp campaign integration (Meta Cloud API)
- ⏳ Email campaign integration (SMTP / SendGrid)
- ⏳ Push notifications
- ⏳ Referral program (referral code generation + tracking)
- ⏳ Abandoned cart recovery (WhatsApp / email trigger)

### Store Features
- ⏳ Customer loyalty / points program
- ⏳ Google Reviews sync + AI reply suggestions
- ⏳ Product image background removal (AI)
- ⏳ Custom `og:image` per page (social preview images)

### SEO
- ⏳ Submit `sitemap.xml` to Google Search Console
- ⏳ Google Business Profile setup
- ⏳ Blog module for content SEO (schema exists, UI is stub)

---

## Future Enhancements

### Phase 2 — AI Employees

| Employee | Capability |
|---|---|
| **AI Product Employee** | Auto-generate titles, descriptions, SEO from a photo upload |
| **AI Marketing Employee** | LinkedIn, Instagram, Facebook posts; email campaigns; ad copy |
| **AI Customer Support** | FAQ auto-reply, refund assistant, order status bot |
| **AI Sales Employee** | Upsell suggestions, cross-sell, bundle recommendations, cart recovery |
| **AI Analytics Employee** | Daily/weekly summaries, revenue forecasts, demand forecasting, growth suggestions |

### Phase 2 — Store Features
- Product variants (color, size, custom options)
- Bulk CSV product upload
- Loyalty / referral program with points
- Multi-image upload with AI background removal
- Custom `og:image` generator per product

### Phase 2 — Integrations
- **Razorpay** — live keys + server-side signature verification Edge Function
- **Shiprocket** — auto shipment creation on paid orders + tracking webhook
- **WhatsApp Business API** — cart recovery, order updates, campaigns
- **SendGrid / SMTP** — transactional emails (order confirmation, shipping update)
- **Google Analytics 4** — real traffic and conversion data
- **Meta Pixel** — Facebook / Instagram ad tracking

### Phase 3 — Platform (Multi-tenant SaaS)
- Multi-store support — each merchant gets their own subdomain
- Custom domain per store (`store.merchant.com`)
- White-label admin panel
- Merchant billing / subscription plans
- AI-powered onboarding wizard

### Phase 3 — Advanced Commerce
- Subscription / recurring order products
- Digital product delivery (files, links)
- Affiliate marketing module
- Flash sale / time-limited deals engine
- B2B wholesale pricing tiers

---

## Admin Credentials

Access the admin panel at `/admin`. You must be signed in with an account that has the `admin` role in the `user_roles` table.

**To grant admin access:**
```sql
INSERT INTO public.user_roles (user_id, role)
SELECT id, 'admin'
FROM auth.users
WHERE email = 'your@email.com'
ON CONFLICT DO NOTHING;
```

**Admin roles defined:**

| Role | Access |
|---|---|
| `super_admin` | Full access to everything |
| `store_owner` | Products, Orders, Customers, Reports |
| `store_manager` | Products, Orders, Inventory |
| `marketing_manager` | Marketing, Coupons, Content |
| `support_agent` | Orders (read), Customers, Messages |

> Role enforcement in the UI is currently layout-level only. Per-role field/action restrictions are a Phase 2 item.

---

## Known Issues & Fixes

### Shop shows "No products" for logged-out visitors

**Cause:** The Supabase RLS policy on `products` calls `has_role()` for anonymous users, but `anon` role has no `EXECUTE` permission on that function.

**Fix:** Run the following SQL in the [Supabase SQL Editor](https://supabase.com/dashboard/project/hohfsfrqkvzxpsbacnzm/sql/new):

```sql
DROP POLICY IF EXISTS "public read active products" ON public.products;
CREATE POLICY "anon read active products" ON public.products
  FOR SELECT TO anon USING (is_active = true);
CREATE POLICY "auth read products" ON public.products
  FOR SELECT TO authenticated
  USING (is_active OR public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "public read reviews" ON public.reviews;
CREATE POLICY "anon read reviews" ON public.reviews
  FOR SELECT TO anon USING (is_published = true);
CREATE POLICY "auth read reviews" ON public.reviews
  FOR SELECT TO authenticated
  USING (is_published OR public.has_role(auth.uid(), 'admin'));
```

### Login / Google OAuth fails on the live domain

**Cause:** Supabase only allows redirects to whitelisted URLs.

**Fix:** Add `https://vasavistores.com/**` and `https://www.vasavistores.com/**` to **Supabase → Authentication → URL Configuration → Redirect URLs**. Set Site URL to `https://vasavistores.com`.

### Razorpay payment completes but order stays "pending"

**Cause:** There is no server-side webhook or Edge Function to verify the Razorpay signature and update the order status.

**Fix (Phase 2):** Create a Supabase Edge Function that receives the Razorpay `payment.captured` webhook, verifies the HMAC signature using `RAZORPAY_KEY_SECRET`, and updates `orders.status → paid`.

---

*Built with ❤️ for Indian D2C brands · VasaviStores © 2026*
