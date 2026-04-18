create extension if not exists "pgcrypto";

create type public.admin_role as enum ('admin', 'seller');
create type public.product_publish_status as enum ('draft', 'published', 'archived', 'hidden');
create type public.product_availability as enum ('in-stock', 'made-to-order');
create type public.homepage_section_key as enum (
  'hero',
  'new_collection',
  'materials',
  'made_to_order',
  'story',
  'lookbook',
  'newsletter'
);

create table public.admin_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null unique,
  role public.admin_role not null default 'seller',
  full_name text,
  created_at timestamptz not null default now()
);

create table public.products (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  description text not null,
  price numeric(10, 2) not null check (price >= 0),
  category text not null,
  category_label text not null,
  availability public.product_availability not null default 'in-stock',
  publish_status public.product_publish_status not null default 'draft',
  sizes text[] not null default '{}',
  colors text[] not null default '{}',
  materials text[] not null default '{}',
  tags text[] not null default '{}',
  collection text,
  collection_label text,
  is_new boolean not null default false,
  is_bestseller boolean not null default false,
  is_featured boolean not null default false,
  is_made_to_order boolean not null default false,
  created_by uuid references auth.users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.product_images (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  path text not null,
  url text not null,
  alt text not null default '',
  sort_order integer not null default 0,
  is_primary boolean not null default false,
  created_at timestamptz not null default now()
);

create table public.homepage_sections (
  id uuid primary key default gen_random_uuid(),
  section_key public.homepage_section_key not null unique,
  title text not null,
  eyebrow text not null default '',
  body text not null default '',
  cta_label text,
  cta_href text,
  image_url text,
  sort_order integer not null default 0,
  is_published boolean not null default false,
  updated_at timestamptz not null default now()
);

create index products_publish_status_idx on public.products (publish_status);
create index product_images_product_sort_idx on public.product_images (product_id, sort_order);
create index homepage_sections_published_sort_idx on public.homepage_sections (is_published, sort_order);

alter table public.admin_profiles enable row level security;
alter table public.products enable row level security;
alter table public.product_images enable row level security;
alter table public.homepage_sections enable row level security;

create or replace function public.is_admin_user()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.admin_profiles
    where id = auth.uid()
      and role in ('admin', 'seller')
  );
$$;

create policy "Admins can read admin profiles"
on public.admin_profiles
for select
using (public.is_admin_user());

create policy "Published products are public"
on public.products
for select
using (publish_status = 'published');

create policy "Admins manage products"
on public.products
for all
using (public.is_admin_user())
with check (public.is_admin_user());

create policy "Published product images are public"
on public.product_images
for select
using (
  exists (
    select 1
    from public.products
    where products.id = product_images.product_id
      and products.publish_status = 'published'
  )
);

create policy "Admins manage product images"
on public.product_images
for all
using (public.is_admin_user())
with check (public.is_admin_user());

create policy "Published homepage sections are public"
on public.homepage_sections
for select
using (is_published = true);

create policy "Admins manage homepage sections"
on public.homepage_sections
for all
using (public.is_admin_user())
with check (public.is_admin_user());

insert into public.homepage_sections (section_key, title, eyebrow, body, cta_label, cta_href, sort_order, is_published)
values
  ('hero', 'Naturalne tkaniny, spokojna forma, precyzyjne dopasowanie.', 'Rosna premium', 'Kolekcje Rosna powstają z myślą o garderobie, która zostaje na dłużej.', 'Zobacz kolekcję', '/sklep', 10, true),
  ('new_collection', 'Cztery spokojne filary sezonu', 'Nowa kolekcja', 'Każdy element ma własną fakturę, ale wszystkie pracują w jednej garderobie.', 'Przeglądaj', '/sklep', 20, true),
  ('materials', 'Filozofia zaczyna się od tkaniny', 'Materiały', 'Wybieramy naturalne włókna, wyważoną gramaturę i faktury bez ciężkiej dekoracji.', null, null, 30, true),
  ('made_to_order', 'Szycie wolniej, bliżej ciała i potrzeb.', 'Made to order', 'Modele na zamówienie powstają po konsultacji wymiarów, tkaniny i sposobu noszenia.', 'Przejdź do made to order', '/made-to-order', 40, true),
  ('story', 'Rosna porządkuje garderobę zamiast ją zagęszczać.', 'Historia marki', 'Projektujemy krótkie serie oparte na powtarzalnych proporcjach i spokojnych kolorach.', null, null, 50, true),
  ('lookbook', 'Sylwetki w naturalnym świetle', 'Lookbook', 'Editorialowy rytm obrazów, stałe proporcje i wyśrodkowany grid.', null, null, 60, true),
  ('newsletter', 'Nowości, zapowiedzi i limitowane serie', 'Newsletter', 'Zapisz się, aby otrzymywać pierwsze informacje o premierach i tkaninach.', null, null, 70, true)
on conflict (section_key) do nothing;

insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true)
on conflict (id) do update set public = true;

create policy "Public product image reads"
on storage.objects
for select
using (bucket_id = 'product-images');

create policy "Admins upload product images"
on storage.objects
for insert
with check (bucket_id = 'product-images' and public.is_admin_user());

create policy "Admins update product images"
on storage.objects
for update
using (bucket_id = 'product-images' and public.is_admin_user())
with check (bucket_id = 'product-images' and public.is_admin_user());

create policy "Admins delete product images"
on storage.objects
for delete
using (bucket_id = 'product-images' and public.is_admin_user());
