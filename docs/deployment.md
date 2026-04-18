# Rosna environments and deploy

Rosna is a monorepo with two independently deployable Vite apps:

- `apps/storefront` - public storefront
- `apps/admin` - private seller/admin panel

Each app reads environment variables from its own app directory. Do not rely on the root `.env` for Vite builds.

## Environment variables

### Storefront

Create `apps/storefront/.env` from `apps/storefront/.env.example`.

```bash
VITE_APP_ENV=local
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
VITE_STOREFRONT_SITE_URL=http://localhost:5173
VITE_STOREFRONT_BASE_PATH=/
```

Required:

- `VITE_SUPABASE_URL` - Supabase project URL.
- `VITE_SUPABASE_ANON_KEY` - Supabase anon/public key.

Optional but recommended:

- `VITE_APP_ENV` - `local`, `staging`, or `production`.
- `VITE_STOREFRONT_SITE_URL` - canonical storefront URL.
- `VITE_STOREFRONT_BASE_PATH` - Vite base path. Use `/` for Vercel/Netlify root deploys and `/daria-sklep/` for the current GitHub Pages deploy.

### Admin

Create `apps/admin/.env` from `apps/admin/.env.example`.

```bash
VITE_APP_ENV=local
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
VITE_ADMIN_SITE_URL=http://localhost:5174
VITE_ADMIN_BASE_PATH=/
```

Required:

- `VITE_SUPABASE_URL` - Supabase project URL.
- `VITE_SUPABASE_ANON_KEY` - Supabase anon/public key.

Optional but recommended:

- `VITE_APP_ENV` - `local`, `staging`, or `production`.
- `VITE_ADMIN_SITE_URL` - canonical admin URL.
- `VITE_ADMIN_BASE_PATH` - Vite base path. Use `/` for a dedicated Vercel/Netlify admin app.

## Vite env loading

Both apps set `envDir` to their own app directory:

- `apps/storefront/vite.config.ts`
- `apps/admin/vite.config.ts`

Runtime env access is centralized in:

- `apps/storefront/src/config/env.ts`
- `apps/admin/src/config/env.ts`

Supabase clients read from those config modules:

- `apps/storefront/src/lib/supabase.ts`
- `apps/admin/src/lib/supabase.ts`

## Local setup from zero

```bash
npm install
Copy-Item apps/storefront/.env.example apps/storefront/.env
Copy-Item apps/admin/.env.example apps/admin/.env
```

Fill both `.env` files with your Supabase project URL and anon key.

Run Supabase migrations and seed in your local/project database:

```bash
supabase db reset
```

Then start apps in separate terminals:

```bash
npm run dev:storefront
npm run dev:admin
```

Local URLs:

- Storefront: `http://localhost:5173`
- Admin: `http://localhost:5174`

## Scripts

```bash
npm run dev:storefront
npm run dev:admin
npm run build:storefront
npm run build:admin
npm run build
npm run preview:storefront
npm run preview:admin
npm run lint
```

Build outputs:

- Storefront: `apps/storefront/dist`
- Admin: `apps/admin/dist`

## Supabase Auth settings

In Supabase dashboard, set the following URLs.

For local development:

- Site URL: `http://localhost:5174`
- Redirect URLs: `http://localhost:5174/*`

For production admin:

- Site URL: value of `VITE_ADMIN_SITE_URL`
- Redirect URLs: `https://your-admin-domain.com/*`

Storefront does not require user login.

## Vercel deploy

Create two Vercel projects from the same repository.

Storefront project:

- Framework preset: Vite
- Root directory: `apps/storefront`
- Build command: `cd ../.. && npm ci && npm run build:storefront`
- Output directory: `apps/storefront/dist`
- Environment variables: storefront env variables listed above

Admin project:

- Framework preset: Vite
- Root directory: `apps/admin`
- Build command: `cd ../.. && npm ci && npm run build:admin`
- Output directory: `apps/admin/dist`
- Environment variables: admin env variables listed above

If Vercel runs commands from the repository root instead, use:

- Storefront build command: `npm run build:storefront`
- Storefront output directory: `apps/storefront/dist`
- Admin build command: `npm run build:admin`
- Admin output directory: `apps/admin/dist`

## Netlify deploy

Create two Netlify sites from the same repository.

Storefront:

- Base directory: repository root
- Build command: `npm run build:storefront`
- Publish directory: `apps/storefront/dist`
- Environment variables: storefront env variables listed above

Admin:

- Base directory: repository root
- Build command: `npm run build:admin`
- Publish directory: `apps/admin/dist`
- Environment variables: admin env variables listed above

For SPA routing, add a rewrite rule in Netlify:

```txt
/* /index.html 200
```

## Deployment checklist

1. Supabase migrations are applied.
2. `supabase/seed.sql` is applied for development or staging data.
3. Storage buckets `product-images` and `homepage-images` exist.
4. RLS policies are enabled and tested.
5. Admin user exists in Supabase Auth.
6. Admin user has a row in `admin_profiles` with role `admin` or `editor`.
7. Storefront env is set in the storefront hosting project.
8. Admin env is set in the admin hosting project.
9. Supabase Auth site URL and redirect URLs point to the admin domain.
10. `npm run build:storefront` and `npm run build:admin` pass locally.
11. Production storefront has `VITE_STOREFRONT_BASE_PATH=/` unless deployed under a subpath.
12. Production admin has `VITE_ADMIN_BASE_PATH=/` unless deployed under a subpath.
