# Zaram Luxury Fragrance — Website

A production-quality luxury perfume e-commerce website for Nigerian customers. Four pages, full cart/wishlist system, order-request workflow (no live payment), and automated GitHub Pages deployment.

---

## Quick Start

```bash
npm install
cp .env.example .env    # add Supabase credentials
npm run dev             # http://localhost:5173
```

---

## Project Structure

```
src/
  config/site.js          ← ALL brand settings (edit this first)
  data/products.js        ← Demo products (replace with Supabase)
  pages/                  ← Home, Shop, ProductDetail, Story, Checkout, Admin
  components/
    layout/               ← Navbar, Footer, AnnouncementBar
    home/                 ← All home page sections
    product/              ← ProductCard
    cart/                 ← CartDrawer, WishlistDrawer
    ui/                   ← Search, WhatsApp float, PageLoader
    three/                ← 3D bottle (React Three Fiber)
  store/useStore.js       ← Zustand state (cart, wishlist, UI)
  lib/utils.js            ← Helpers (formatPrice, WhatsApp URLs, etc.)
  lib/supabase.js         ← Supabase client
```

---

## Configuration

All brand settings are in **`src/config/site.js`**. Edit this file to update:

- Brand name, tagline, phone, WhatsApp, email, address
- Social links (Instagram, TikTok)
- Business hours, delivery zones and fees
- Free delivery threshold
- Announcement bar messages
- Payment feature flags (`paymentsEnabled: false`)

---

## GitHub Pages Deployment

### 1. Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit: Zaram Luxury Fragrance"
git remote add origin https://github.com/YOUR-USERNAME/zaram-luxury.git
git push -u origin main
```

### 2. Enable GitHub Pages

Repository → **Settings → Pages** → Source: **GitHub Actions**

### 3. Add Repository Secrets

**Settings → Secrets and variables → Actions → New repository secret**

| Secret | Value |
|--------|-------|
| `VITE_SUPABASE_URL` | Your Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | Your Supabase anon key |
| `VITE_WHATSAPP_NUMBER` | WhatsApp number (digits only, e.g. `2348012345678`) |
| `VITE_SITE_URL` | `https://YOUR-USERNAME.github.io/zaram-luxury` |
| `VITE_BASE_PATH` | `/zaram-luxury/` |

### 4. Deploy

Push to `main` — GitHub Actions builds and deploys automatically.

---

## Custom Domain (When Ready)

1. Buy domain (e.g. `zaramluxury.com`)
2. GitHub Pages settings → enter custom domain
3. At your DNS provider, add:
   ```
   CNAME www → YOUR-USERNAME.github.io
   A @ → 185.199.108.153
   A @ → 185.199.109.153
   A @ → 185.199.110.153
   A @ → 185.199.111.153
   ```
4. GitHub provisions HTTPS automatically
5. Update `src/config/site.js`:
   ```js
   customDomain: 'https://www.zaramluxury.com',
   githubBasePath: '/',
   ```
6. Update `VITE_BASE_PATH` secret to `/`
7. Update `VITE_SITE_URL` secret to `https://www.zaramluxury.com`
8. Update Supabase → Authentication → URL Configuration with new domain

---

## Supabase Database Setup

### Create Project

Go to [supabase.com](https://supabase.com) → New Project

### Run Schema (SQL Editor)

```sql
-- Products
create table products (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  brand text,
  collection text,
  description text,
  emotional_description text,
  price integer not null,
  sale_price integer,
  images jsonb default '[]',
  gender text check (gender in ('feminine','masculine','unisex')),
  scent_family text,
  top_notes jsonb default '[]',
  heart_notes jsonb default '[]',
  base_notes jsonb default '[]',
  concentration text,
  longevity text,
  projection text,
  occasions jsonb default '[]',
  rating numeric(3,2) default 0,
  review_count integer default 0,
  is_bestseller boolean default false,
  is_new_arrival boolean default false,
  gift_available boolean default true,
  sku text,
  is_published boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Product sizes
create table product_variants (
  id uuid primary key default gen_random_uuid(),
  product_id uuid references products(id) on delete cascade,
  size_ml integer not null,
  price integer not null,
  stock integer default 0,
  reserved_stock integer default 0,
  sku text
);

-- Orders
create table orders (
  id uuid primary key default gen_random_uuid(),
  reference text unique not null,
  customer_name text not null,
  customer_email text,
  customer_phone text not null,
  customer_whatsapp text,
  state text,
  city text,
  address text,
  landmark text,
  delivery_instructions text,
  order_items jsonb not null,
  subtotal integer not null,
  delivery_fee integer default 0,
  total integer not null,
  order_status text default 'pending_confirmation',
  payment_status text default 'not_requested',
  notes text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Newsletter
create table newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  whatsapp_opt_in boolean default false,
  created_at timestamptz default now()
);

-- Contact enquiries
create table contact_enquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  subject text,
  order_ref text,
  message text not null,
  created_at timestamptz default now()
);

-- Row Level Security
alter table products enable row level security;
alter table product_variants enable row level security;
alter table orders enable row level security;
alter table newsletter_subscribers enable row level security;
alter table contact_enquiries enable row level security;

-- Policies
create policy "Public read products" on products for select using (is_published = true);
create policy "Public read variants" on product_variants for select using (true);
create policy "Insert orders" on orders for insert with check (true);
create policy "Insert subscribers" on newsletter_subscribers for insert with check (true);
create policy "Insert enquiries" on contact_enquiries for insert with check (true);
```

### Get Credentials

**Settings → API** → copy Project URL and anon/public key into `.env`.

**Never use the service role key in the frontend.**

---

## Paystack Integration (Future)

When ready for online payments:

1. In `src/config/site.js`:
   ```js
   paymentsEnabled: true,
   paymentProvider: 'paystack',
   ```

2. Create Supabase Edge Functions (never expose secret key to frontend):
   - `create-payment` — initialises transaction server-side
   - `verify-payment` — verifies with Paystack API and updates order status

3. Add to `.env`:
   ```
   VITE_PAYSTACK_PUBLIC_KEY=pk_live_xxxxxxxxx
   ```
   Secret key goes in **Supabase Secrets only**.

The current order-request workflow remains intact. `paymentsEnabled: false` shows "Submit Order Request" with manual confirmation. `true` activates the payment flow.

---

## Order Status Reference

| Status | Meaning |
|--------|---------|
| `pending_confirmation` | Order submitted, awaiting team review |
| `confirmed` | Team has confirmed availability |
| `awaiting_payment` | Payment instructions sent to customer |
| `payment_received` | Payment confirmed |
| `processing` | Being prepared |
| `dispatched` | Shipped to customer |
| `delivered` | Order complete |
| `cancelled` | Order cancelled |

---

## Demo Content

All demo products and testimonials are marked `_demo: true` in `src/data/products.js`.

To replace with real products: add to Supabase and update the data fetch in each component.

---

## Tech Stack

| Tool | Purpose |
|------|---------|
| React 18 + Vite | Frontend framework |
| Tailwind CSS 3 | Styling |
| Framer Motion | Animations |
| React Three Fiber + Drei | 3D hero bottle |
| React Router (HashRouter) | Routing (GitHub Pages compatible) |
| Zustand | State management (cart, wishlist) |
| React Hook Form | Form handling |
| Supabase | Database, auth, storage |
| Lucide React | Icons |
| GitHub Actions + Pages | CI/CD and hosting |
