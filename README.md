# Rosna Commerce

Monorepo dla marki modowej Rosna: publiczny storefront, panel sprzedawcy oraz wspólne modele danych.

## Struktura

```txt
apps/
  storefront/      publiczna aplikacja klienta React + Vite
  admin/           panel sprzedawcy React + Vite + Supabase Auth
packages/
  shared/          wspólne typy produktów, zdjęć, koszyka i sekcji homepage
supabase/
  migrations/      schemat Postgres, RLS, Storage i seed homepage
docs/
  implementation-plan.md
```

## Stack

- React + Vite + TypeScript
- Tailwind CSS
- Supabase Auth
- Supabase Postgres
- Supabase Storage

## Komendy

```bash
npm install
npm run dev:storefront
npm run dev:admin
npm run lint
npm run build
```

Storefront działa domyślnie na `5173`, admin na `5174`.

## Supabase

1. Utwórz projekt Supabase.
2. Uruchom migrację z `supabase/migrations/20260418123000_rosna_mvp.sql`.
3. Utwórz użytkownika w Supabase Auth.
4. Dodaj go do `admin_profiles`.
5. Ustaw zmienne środowiskowe:

```bash
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

Szczegółowy plan wdrożenia jest w `docs/implementation-plan.md`.

## Zasady publikacji

- Storefront pobiera tylko produkty z `publish_status = published`.
- Admin widzi i edytuje statusy `draft`, `published`, `archived`, `hidden`.
- Zdjęcia produktów są trzymane w bucketcie Supabase Storage `product-images`.
- Sekcje homepage są publiczne tylko przy `is_published = true`.

## Deploy

Obecny deploy GitHub Pages publikuje storefront:

```bash
npm run deploy
```

Panel admina jest osobną aplikacją i powinien być wdrożony jako osobny statyczny projekt z tymi samymi zmiennymi `VITE_SUPABASE_*`.
