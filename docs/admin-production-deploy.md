# Rosna admin production deploy

Production target:

```txt
https://admin-rosna.vercel.app
```

The admin app is deployed as a separate Vercel project from the same monorepo.

## Files

Vercel reads the root config:

```txt
vercel.json
```

The config builds only the admin app:

```json
{
  "installCommand": "npm ci",
  "buildCommand": "npm run build:admin",
  "outputDirectory": "apps/admin/dist",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

The rewrite is required because admin uses `BrowserRouter` and routes like `/admin/products` must work after refresh and direct entry.

## Vercel setup

1. Go to Vercel.
2. Create a new project from:

```txt
amiskiewiczpl/daria-sklep
```

3. Keep project root as repository root.
4. Use the detected settings from `vercel.json`.
5. Set project name:

```txt
admin-rosna
```

6. Set production domain:

```txt
https://admin-rosna.vercel.app
```

7. Add environment variables in Vercel Project Settings -> Environment Variables:

```env
VITE_APP_ENV=production
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
VITE_ADMIN_SITE_URL=https://admin-rosna.vercel.app
VITE_ADMIN_BASE_PATH=/
```

8. Deploy.

## Supabase Auth setup

In Supabase Dashboard -> Authentication -> URL Configuration set:

```txt
Site URL:
https://admin-rosna.vercel.app
```

Add Redirect URLs:

```txt
https://admin-rosna.vercel.app/*
http://localhost:5174/*
```

Keep localhost for local development.

## Admin user

Create the user in Supabase Dashboard -> Authentication -> Users.

Then run this SQL in Supabase SQL Editor, replacing the email:

```sql
insert into public.admin_profiles (
  id,
  email,
  role,
  full_name,
  is_active
)
select
  id,
  email,
  'admin',
  'Rosna Admin',
  true
from auth.users
where email = 'admin@rosna.pl'
on conflict (id) do update set
  role = 'admin',
  is_active = true,
  updated_at = now();
```

## Production smoke tests

Use:

```txt
https://admin-rosna.vercel.app
```

Checklist:

- `/login` loads without asset 404.
- Login with the Supabase admin user succeeds.
- `/admin` loads dashboard after login.
- Refresh on `/admin` keeps session.
- Direct entry to `/admin/products` works.
- Logout redirects access away from protected admin routes.
- Anonymous visit to `/admin` redirects to `/login`.
- Dashboard stats load.
- Product list loads.
- Homepage editor loads.
- Media manager loads.
- Browser console has no asset path 404.
- Browser console has no router fallback 404.
- Supabase requests go to the configured `VITE_SUPABASE_URL`.
