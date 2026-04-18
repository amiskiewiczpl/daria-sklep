# Rosna Commerce MVP

## Struktura

- `apps/storefront` - publiczna aplikacja klienta. Pokazuje opublikowane produkty i opublikowane sekcje CMS.
- `apps/admin` - panel sprzedawcy. Wymaga Supabase Auth i wpisu użytkownika w `admin_profiles`.
- `packages/shared` - wspólne typy domenowe produktu, zdjęć, sekcji homepage i koszyka.
- `supabase/migrations` - schemat Postgresa, RLS, seed sekcji homepage i bucket `product-images`.

## Konfiguracja Supabase

1. Utwórz projekt Supabase.
2. Uruchom migrację `supabase/migrations/20260418123000_rosna_mvp.sql`.
3. W Supabase Auth utwórz użytkownika sprzedawcy.
4. Dodaj profil sprzedawcy:

```sql
insert into public.admin_profiles (id, email, role, full_name)
values ('AUTH_USER_UUID', 'seller@example.com', 'admin', 'Rosna Admin');
```

5. Skopiuj wartości `Project URL` i `anon public key` do `.env`:

```bash
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

## Uruchamianie

```bash
npm install
npm run dev:storefront
npm run dev:admin
```

Storefront działa domyślnie na porcie Vite `5173`, admin na `5174`.

## Build

```bash
npm run build
npm run build:storefront
npm run build:admin
```

## Deploy

Obecny deploy GitHub Pages publikuje storefront:

```bash
npm run deploy
```

Admin jest osobną aplikacją. Dla produkcji najprościej wdrożyć go jako osobny projekt Vercel/Netlify albo drugi target hostingu statycznego z tymi samymi zmiennymi `VITE_SUPABASE_*`.

## Zasady danych

- Storefront pobiera tylko `products.publish_status = 'published'`.
- Admin widzi wszystkie statusy: `draft`, `published`, `archived`, `hidden`.
- Zdjęcia trafiają do bucketu `product-images`.
- Kolejność zdjęć kontroluje `product_images.sort_order`.
- Zdjęcie główne kontroluje `product_images.is_primary`.
- Sekcje homepage są widoczne publicznie tylko przy `is_published = true`.
