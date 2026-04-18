create extension if not exists "pgcrypto";

do $$ begin
  create type public.admin_role as enum ('admin', 'editor', 'seller');
exception when duplicate_object then null;
end $$;

do $$ begin
  create type public.product_production_type as enum ('in_stock', 'made_to_order');
exception when duplicate_object then null;
end $$;

do $$ begin
  create type public.content_status as enum ('draft', 'published', 'archived', 'hidden');
exception when duplicate_object then null;
end $$;

do $$ begin
  create type public.product_image_type as enum ('packshot', 'lifestyle', 'detail');
exception when duplicate_object then null;
end $$;

do $$ begin
  create type public.homepage_section_key as enum (
    'announcement_bar',
    'hero',
    'new_collection',
    'materials',
    'bestsellers',
    'made_to_order',
    'story',
    'lookbook',
    'newsletter'
  );
exception when duplicate_object then null;
end $$;

do $$ begin
  create type public.homepage_visibility as enum ('public', 'private');
exception when duplicate_object then null;
end $$;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table if not exists public.admin_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null unique check (position('@' in email) > 1),
  role public.admin_role not null default 'seller',
  full_name text,
  avatar_url text,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  description text,
  image_url text,
  sort_order integer not null default 0 check (sort_order >= 0),
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.collections (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  description text,
  hero_image_url text,
  starts_at timestamptz,
  ends_at timestamptz,
  sort_order integer not null default 0 check (sort_order >= 0),
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint collections_date_range_check check (ends_at is null or starts_at is null or ends_at >= starts_at)
);

create table if not exists public.materials (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  description text,
  care_notes text,
  sort_order integer not null default 0 check (sort_order >= 0),
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 2 and 160),
  slug text not null unique check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  short_description text not null check (char_length(short_description) <= 280),
  description text not null,
  price numeric(10, 2) not null check (price >= 0),
  compare_at_price numeric(10, 2) check (compare_at_price is null or compare_at_price >= price),
  currency char(3) not null default 'PLN' check (currency ~ '^[A-Z]{3}$'),
  category_id uuid not null references public.categories(id) on update cascade on delete restrict,
  collection_id uuid references public.collections(id) on update cascade on delete set null,
  production_type public.product_production_type not null default 'in_stock',
  lead_time_days integer check (lead_time_days is null or lead_time_days >= 0),
  status public.content_status not null default 'draft',
  is_new boolean not null default false,
  is_bestseller boolean not null default false,
  is_featured boolean not null default false,
  sort_order integer not null default 0 check (sort_order >= 0),
  seo_title text,
  seo_description text,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint products_mto_lead_time_check check (
    production_type = 'in_stock'
    or lead_time_days is not null
  )
);

create table if not exists public.product_images (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on update cascade on delete cascade,
  url text not null,
  path text not null,
  alt_text text not null default '',
  image_type public.product_image_type not null default 'packshot',
  sort_order integer not null default 0 check (sort_order >= 0),
  is_primary boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.product_sizes (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on update cascade on delete cascade,
  size_value text not null,
  size_label text,
  sort_order integer not null default 0 check (sort_order >= 0),
  is_available boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (product_id, size_value)
);

create table if not exists public.product_variants (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on update cascade on delete cascade,
  sku text unique,
  color_name text,
  pattern_name text,
  color_hex text check (color_hex is null or color_hex ~ '^#[0-9A-Fa-f]{6}$'),
  material_id uuid references public.materials(id) on update cascade on delete set null,
  size_value text,
  price numeric(10, 2) check (price is null or price >= 0),
  compare_at_price numeric(10, 2),
  stock_quantity integer not null default 0 check (stock_quantity >= 0),
  is_active boolean not null default true,
  sort_order integer not null default 0 check (sort_order >= 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint product_variants_compare_price_check check (
    compare_at_price is null
    or price is null
    or compare_at_price >= price
  )
);

create table if not exists public.product_materials (
  product_id uuid not null references public.products(id) on update cascade on delete cascade,
  material_id uuid not null references public.materials(id) on update cascade on delete restrict,
  sort_order integer not null default 0 check (sort_order >= 0),
  created_at timestamptz not null default now(),
  primary key (product_id, material_id)
);

create table if not exists public.tags (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  created_at timestamptz not null default now()
);

create table if not exists public.product_tags (
  product_id uuid not null references public.products(id) on update cascade on delete cascade,
  tag_id uuid not null references public.tags(id) on update cascade on delete cascade,
  created_at timestamptz not null default now(),
  primary key (product_id, tag_id)
);

create table if not exists public.homepage_sections (
  id uuid primary key default gen_random_uuid(),
  section_key public.homepage_section_key not null unique,
  visibility public.homepage_visibility not null default 'public',
  title text not null,
  subtitle text,
  body text,
  cta_label text,
  cta_href text,
  image_url text,
  image_path text,
  linked_collection_id uuid references public.collections(id) on update cascade on delete set null,
  sort_order integer not null default 0 check (sort_order >= 0),
  status public.content_status not null default 'draft',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.homepage_section_items (
  id uuid primary key default gen_random_uuid(),
  section_id uuid not null references public.homepage_sections(id) on update cascade on delete cascade,
  title text not null,
  subtitle text,
  body text,
  cta_label text,
  cta_href text,
  image_url text,
  image_path text,
  linked_product_id uuid references public.products(id) on update cascade on delete set null,
  linked_category_id uuid references public.categories(id) on update cascade on delete set null,
  linked_collection_id uuid references public.collections(id) on update cascade on delete set null,
  sort_order integer not null default 0 check (sort_order >= 0),
  status public.content_status not null default 'draft',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index if not exists product_images_one_primary_per_product_idx
on public.product_images (product_id)
where is_primary = true;

create unique index if not exists product_images_product_sort_idx
on public.product_images (product_id, sort_order);

create index if not exists products_status_sort_idx
on public.products (status, sort_order, created_at desc);

create index if not exists products_category_status_idx
on public.products (category_id, status, sort_order);

create index if not exists products_collection_status_idx
on public.products (collection_id, status, sort_order);

create index if not exists products_flags_idx
on public.products (is_featured, is_bestseller, is_new)
where status = 'published';

create index if not exists product_sizes_product_sort_idx
on public.product_sizes (product_id, sort_order);

create index if not exists product_variants_product_sort_idx
on public.product_variants (product_id, sort_order);

create index if not exists product_materials_material_idx
on public.product_materials (material_id);

create index if not exists product_tags_tag_idx
on public.product_tags (tag_id);

create index if not exists homepage_sections_public_sort_idx
on public.homepage_sections (visibility, status, sort_order);

create index if not exists homepage_section_items_section_sort_idx
on public.homepage_section_items (section_id, status, sort_order);

create index if not exists categories_active_sort_idx
on public.categories (is_active, sort_order);

create index if not exists collections_active_sort_idx
on public.collections (is_active, sort_order);

create index if not exists materials_active_sort_idx
on public.materials (is_active, sort_order);

drop trigger if exists set_admin_profiles_updated_at on public.admin_profiles;
create trigger set_admin_profiles_updated_at
before update on public.admin_profiles
for each row execute function public.set_updated_at();

drop trigger if exists set_categories_updated_at on public.categories;
create trigger set_categories_updated_at
before update on public.categories
for each row execute function public.set_updated_at();

drop trigger if exists set_collections_updated_at on public.collections;
create trigger set_collections_updated_at
before update on public.collections
for each row execute function public.set_updated_at();

drop trigger if exists set_materials_updated_at on public.materials;
create trigger set_materials_updated_at
before update on public.materials
for each row execute function public.set_updated_at();

drop trigger if exists set_products_updated_at on public.products;
create trigger set_products_updated_at
before update on public.products
for each row execute function public.set_updated_at();

drop trigger if exists set_product_images_updated_at on public.product_images;
create trigger set_product_images_updated_at
before update on public.product_images
for each row execute function public.set_updated_at();

drop trigger if exists set_product_sizes_updated_at on public.product_sizes;
create trigger set_product_sizes_updated_at
before update on public.product_sizes
for each row execute function public.set_updated_at();

drop trigger if exists set_product_variants_updated_at on public.product_variants;
create trigger set_product_variants_updated_at
before update on public.product_variants
for each row execute function public.set_updated_at();

drop trigger if exists set_homepage_sections_updated_at on public.homepage_sections;
create trigger set_homepage_sections_updated_at
before update on public.homepage_sections
for each row execute function public.set_updated_at();

drop trigger if exists set_homepage_section_items_updated_at on public.homepage_section_items;
create trigger set_homepage_section_items_updated_at
before update on public.homepage_section_items
for each row execute function public.set_updated_at();

alter table public.admin_profiles enable row level security;
alter table public.categories enable row level security;
alter table public.collections enable row level security;
alter table public.materials enable row level security;
alter table public.products enable row level security;
alter table public.product_images enable row level security;
alter table public.product_sizes enable row level security;
alter table public.product_variants enable row level security;
alter table public.product_materials enable row level security;
alter table public.tags enable row level security;
alter table public.product_tags enable row level security;
alter table public.homepage_sections enable row level security;
alter table public.homepage_section_items enable row level security;

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
      and is_active = true
      and role in ('admin', 'editor', 'seller')
  );
$$;

drop policy if exists "admin_profiles_select_own_or_admin" on public.admin_profiles;
create policy "admin_profiles_select_own_or_admin"
on public.admin_profiles
for select
using (id = auth.uid() or public.is_admin_user());

drop policy if exists "admin_profiles_admin_manage" on public.admin_profiles;
create policy "admin_profiles_admin_manage"
on public.admin_profiles
for all
using (public.is_admin_user())
with check (public.is_admin_user());

drop policy if exists "categories_public_read_active" on public.categories;
create policy "categories_public_read_active"
on public.categories
for select
using (is_active = true);

drop policy if exists "categories_admin_manage" on public.categories;
create policy "categories_admin_manage"
on public.categories
for all
using (public.is_admin_user())
with check (public.is_admin_user());

drop policy if exists "collections_public_read_active" on public.collections;
create policy "collections_public_read_active"
on public.collections
for select
using (is_active = true);

drop policy if exists "collections_admin_manage" on public.collections;
create policy "collections_admin_manage"
on public.collections
for all
using (public.is_admin_user())
with check (public.is_admin_user());

drop policy if exists "materials_public_read_active" on public.materials;
create policy "materials_public_read_active"
on public.materials
for select
using (is_active = true);

drop policy if exists "materials_admin_manage" on public.materials;
create policy "materials_admin_manage"
on public.materials
for all
using (public.is_admin_user())
with check (public.is_admin_user());

drop policy if exists "products_public_read_published" on public.products;
create policy "products_public_read_published"
on public.products
for select
using (status = 'published');

drop policy if exists "products_admin_manage" on public.products;
create policy "products_admin_manage"
on public.products
for all
using (public.is_admin_user())
with check (public.is_admin_user());

drop policy if exists "product_images_public_read_published_product" on public.product_images;
create policy "product_images_public_read_published_product"
on public.product_images
for select
using (
  exists (
    select 1
    from public.products
    where products.id = product_images.product_id
      and products.status = 'published'
  )
);

drop policy if exists "product_images_admin_manage" on public.product_images;
create policy "product_images_admin_manage"
on public.product_images
for all
using (public.is_admin_user())
with check (public.is_admin_user());

drop policy if exists "product_sizes_public_read_published_product" on public.product_sizes;
create policy "product_sizes_public_read_published_product"
on public.product_sizes
for select
using (
  exists (
    select 1
    from public.products
    where products.id = product_sizes.product_id
      and products.status = 'published'
  )
);

drop policy if exists "product_sizes_admin_manage" on public.product_sizes;
create policy "product_sizes_admin_manage"
on public.product_sizes
for all
using (public.is_admin_user())
with check (public.is_admin_user());

drop policy if exists "product_variants_public_read_published_product" on public.product_variants;
create policy "product_variants_public_read_published_product"
on public.product_variants
for select
using (
  is_active = true
  and exists (
    select 1
    from public.products
    where products.id = product_variants.product_id
      and products.status = 'published'
  )
);

drop policy if exists "product_variants_admin_manage" on public.product_variants;
create policy "product_variants_admin_manage"
on public.product_variants
for all
using (public.is_admin_user())
with check (public.is_admin_user());

drop policy if exists "product_materials_public_read_published_product" on public.product_materials;
create policy "product_materials_public_read_published_product"
on public.product_materials
for select
using (
  exists (
    select 1
    from public.products
    where products.id = product_materials.product_id
      and products.status = 'published'
  )
);

drop policy if exists "product_materials_admin_manage" on public.product_materials;
create policy "product_materials_admin_manage"
on public.product_materials
for all
using (public.is_admin_user())
with check (public.is_admin_user());

drop policy if exists "tags_public_read" on public.tags;
create policy "tags_public_read"
on public.tags
for select
using (true);

drop policy if exists "tags_admin_manage" on public.tags;
create policy "tags_admin_manage"
on public.tags
for all
using (public.is_admin_user())
with check (public.is_admin_user());

drop policy if exists "product_tags_public_read_published_product" on public.product_tags;
create policy "product_tags_public_read_published_product"
on public.product_tags
for select
using (
  exists (
    select 1
    from public.products
    where products.id = product_tags.product_id
      and products.status = 'published'
  )
);

drop policy if exists "product_tags_admin_manage" on public.product_tags;
create policy "product_tags_admin_manage"
on public.product_tags
for all
using (public.is_admin_user())
with check (public.is_admin_user());

drop policy if exists "homepage_sections_public_read_published" on public.homepage_sections;
create policy "homepage_sections_public_read_published"
on public.homepage_sections
for select
using (visibility = 'public' and status = 'published');

drop policy if exists "homepage_sections_admin_manage" on public.homepage_sections;
create policy "homepage_sections_admin_manage"
on public.homepage_sections
for all
using (public.is_admin_user())
with check (public.is_admin_user());

drop policy if exists "homepage_section_items_public_read_published" on public.homepage_section_items;
create policy "homepage_section_items_public_read_published"
on public.homepage_section_items
for select
using (
  status = 'published'
  and exists (
    select 1
    from public.homepage_sections
    where homepage_sections.id = homepage_section_items.section_id
      and homepage_sections.visibility = 'public'
      and homepage_sections.status = 'published'
  )
);

drop policy if exists "homepage_section_items_admin_manage" on public.homepage_section_items;
create policy "homepage_section_items_admin_manage"
on public.homepage_section_items
for all
using (public.is_admin_user())
with check (public.is_admin_user());

insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true)
on conflict (id) do update set public = true;

drop policy if exists "storage_product_images_public_read" on storage.objects;
create policy "storage_product_images_public_read"
on storage.objects
for select
using (bucket_id = 'product-images');

drop policy if exists "storage_product_images_admin_insert" on storage.objects;
create policy "storage_product_images_admin_insert"
on storage.objects
for insert
with check (bucket_id = 'product-images' and public.is_admin_user());

drop policy if exists "storage_product_images_admin_update" on storage.objects;
create policy "storage_product_images_admin_update"
on storage.objects
for update
using (bucket_id = 'product-images' and public.is_admin_user())
with check (bucket_id = 'product-images' and public.is_admin_user());

drop policy if exists "storage_product_images_admin_delete" on storage.objects;
create policy "storage_product_images_admin_delete"
on storage.objects
for delete
using (bucket_id = 'product-images' and public.is_admin_user());

insert into public.categories (id, name, slug, description, sort_order, is_active)
values
  ('00000000-0000-4000-8000-000000000101', 'Koszule', 'koszule', 'Koszule z naturalnych tkanin.', 10, true),
  ('00000000-0000-4000-8000-000000000102', 'Spodnie', 'spodnie', 'Spodnie o spokojnej, eleganckiej linii.', 20, true),
  ('00000000-0000-4000-8000-000000000103', 'Sukienki', 'sukienki', 'Sukienki codzienne i made to order.', 30, true),
  ('00000000-0000-4000-8000-000000000104', 'Dzianina', 'dzianina', 'Swetry i miękkie warstwy premium.', 40, true),
  ('00000000-0000-4000-8000-000000000105', 'Akcesoria', 'akcesoria', 'Torby i dodatki.', 50, true)
on conflict (slug) do update set
  name = excluded.name,
  description = excluded.description,
  sort_order = excluded.sort_order,
  is_active = excluded.is_active;

insert into public.collections (id, name, slug, description, sort_order, is_active)
values
  ('00000000-0000-4000-8000-000000000201', 'Essential', 'essential', 'Baza garderoby Rosna.', 10, true),
  ('00000000-0000-4000-8000-000000000202', 'Kolekcja Lato', 'kolekcja-lato', 'Lniane formy na ciepłe dni.', 20, true),
  ('00000000-0000-4000-8000-000000000203', 'Made to order', 'made-to-order', 'Modele szyte na zamówienie.', 30, true)
on conflict (slug) do update set
  name = excluded.name,
  description = excluded.description,
  sort_order = excluded.sort_order,
  is_active = excluded.is_active;

insert into public.materials (id, name, slug, description, care_notes, sort_order, is_active)
values
  ('00000000-0000-4000-8000-000000000301', 'Len', 'len', 'Oddychające włókno o naturalnej strukturze.', 'Prać delikatnie w niskiej temperaturze.', 10, true),
  ('00000000-0000-4000-8000-000000000302', 'Bawełna', 'bawelna', 'Miękka, codzienna baza.', 'Prać z podobnymi kolorami.', 20, true),
  ('00000000-0000-4000-8000-000000000303', 'Wiskoza', 'wiskoza', 'Płynna tkanina o subtelnym połysku.', 'Prać ręcznie lub chemicznie.', 30, true),
  ('00000000-0000-4000-8000-000000000304', 'Wełna', 'welna', 'Ciepła i sprężysta przędza premium.', 'Wietrzyć, prać ręcznie w zimnej wodzie.', 40, true),
  ('00000000-0000-4000-8000-000000000305', 'Bambus', 'bambus', 'Lekka i miękka dzianina.', 'Prać delikatnie.', 50, true)
on conflict (slug) do update set
  name = excluded.name,
  description = excluded.description,
  care_notes = excluded.care_notes,
  sort_order = excluded.sort_order,
  is_active = excluded.is_active;

insert into public.tags (id, name, slug)
values
  ('00000000-0000-4000-8000-000000000401', 'Nowość', 'nowosc'),
  ('00000000-0000-4000-8000-000000000402', 'Bestseller', 'bestseller'),
  ('00000000-0000-4000-8000-000000000403', 'Featured', 'featured'),
  ('00000000-0000-4000-8000-000000000404', 'Made to order', 'made-to-order')
on conflict (slug) do update set name = excluded.name;

insert into public.products (
  id,
  name,
  slug,
  short_description,
  description,
  price,
  compare_at_price,
  currency,
  category_id,
  collection_id,
  production_type,
  lead_time_days,
  status,
  is_new,
  is_bestseller,
  is_featured,
  sort_order
)
values
  (
    '00000000-0000-4000-8000-000000000501',
    'Koszula Amelia',
    'koszula-amelia',
    'Lniana koszula o miękkiej, oversizeowej linii.',
    'Koszula Amelia powstaje z lnu o naturalnej fakturze. Ma swobodną formę, miękki kołnierzyk i proporcje zaprojektowane do noszenia warstwowo.',
    319,
    null,
    'PLN',
    '00000000-0000-4000-8000-000000000101',
    '00000000-0000-4000-8000-000000000202',
    'in_stock',
    null,
    'published',
    true,
    false,
    true,
    10
  ),
  (
    '00000000-0000-4000-8000-000000000502',
    'Spodnie Rio',
    'spodnie-rio',
    'Lniane spodnie z wysokim stanem.',
    'Spodnie Rio mają wysoki stan, lekko zwężaną nogawkę i spokojną linię gotową do codziennych oraz formalnych stylizacji.',
    369,
    429,
    'PLN',
    '00000000-0000-4000-8000-000000000102',
    '00000000-0000-4000-8000-000000000202',
    'in_stock',
    null,
    'published',
    false,
    true,
    true,
    20
  ),
  (
    '00000000-0000-4000-8000-000000000503',
    'Sukienka Flora',
    'sukienka-flora',
    'Sukienka made to order z personalizowanym dopasowaniem.',
    'Sukienka Flora jest szyta po konsultacji wymiarów. Model opiera się na płynnej wiskozie i proporcjach dobranych do sylwetki.',
    529,
    null,
    'PLN',
    '00000000-0000-4000-8000-000000000103',
    '00000000-0000-4000-8000-000000000203',
    'made_to_order',
    28,
    'published',
    true,
    false,
    false,
    30
  ),
  (
    '00000000-0000-4000-8000-000000000504',
    'Sweter Maia',
    'sweter-maia',
    'Miękki sweter z wełny do warstwowych stylizacji.',
    'Sweter Maia ma klasyczną linię, miękki chwyt i stabilną formę, która pracuje z prostą garderobą przez wiele sezonów.',
    429,
    null,
    'PLN',
    '00000000-0000-4000-8000-000000000104',
    '00000000-0000-4000-8000-000000000201',
    'in_stock',
    null,
    'draft',
    false,
    false,
    false,
    40
  )
on conflict (slug) do update set
  name = excluded.name,
  short_description = excluded.short_description,
  description = excluded.description,
  price = excluded.price,
  compare_at_price = excluded.compare_at_price,
  currency = excluded.currency,
  category_id = excluded.category_id,
  collection_id = excluded.collection_id,
  production_type = excluded.production_type,
  lead_time_days = excluded.lead_time_days,
  status = excluded.status,
  is_new = excluded.is_new,
  is_bestseller = excluded.is_bestseller,
  is_featured = excluded.is_featured,
  sort_order = excluded.sort_order;

insert into public.product_images (product_id, url, path, alt_text, image_type, sort_order, is_primary)
values
  ('00000000-0000-4000-8000-000000000501', 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1200&q=80', 'seed/koszula-amelia-packshot.jpg', 'Koszula Amelia na modelce', 'packshot', 0, true),
  ('00000000-0000-4000-8000-000000000501', 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1200&q=80', 'seed/koszula-amelia-lifestyle.jpg', 'Koszula Amelia w stylizacji', 'lifestyle', 1, false),
  ('00000000-0000-4000-8000-000000000502', 'https://images.unsplash.com/photo-1495121605193-b116b5b9c5d6?auto=format&fit=crop&w=1200&q=80', 'seed/spodnie-rio-packshot.jpg', 'Spodnie Rio', 'packshot', 0, true),
  ('00000000-0000-4000-8000-000000000503', 'https://images.unsplash.com/photo-1520962918057-4bf0ab08f3aa?auto=format&fit=crop&w=1200&q=80', 'seed/sukienka-flora-packshot.jpg', 'Sukienka Flora', 'packshot', 0, true)
on conflict (product_id, sort_order) do update set
  url = excluded.url,
  path = excluded.path,
  alt_text = excluded.alt_text,
  image_type = excluded.image_type,
  is_primary = excluded.is_primary;

insert into public.product_sizes (product_id, size_value, size_label, sort_order, is_available)
values
  ('00000000-0000-4000-8000-000000000501', 'XXS-S', 'XXS-S', 10, true),
  ('00000000-0000-4000-8000-000000000501', 'M-L', 'M-L', 20, true),
  ('00000000-0000-4000-8000-000000000501', 'XL-XXL', 'XL-XXL', 30, true),
  ('00000000-0000-4000-8000-000000000502', 'XXS-S', 'XXS-S', 10, true),
  ('00000000-0000-4000-8000-000000000502', 'M-L', 'M-L', 20, true),
  ('00000000-0000-4000-8000-000000000503', 'XXS-S', 'XXS-S', 10, true),
  ('00000000-0000-4000-8000-000000000503', 'M-L', 'M-L', 20, true),
  ('00000000-0000-4000-8000-000000000503', 'XL-XXL', 'XL-XXL', 30, true)
on conflict (product_id, size_value) do update set
  size_label = excluded.size_label,
  sort_order = excluded.sort_order,
  is_available = excluded.is_available;

insert into public.product_materials (product_id, material_id, sort_order)
values
  ('00000000-0000-4000-8000-000000000501', '00000000-0000-4000-8000-000000000301', 10),
  ('00000000-0000-4000-8000-000000000501', '00000000-0000-4000-8000-000000000302', 20),
  ('00000000-0000-4000-8000-000000000502', '00000000-0000-4000-8000-000000000301', 10),
  ('00000000-0000-4000-8000-000000000503', '00000000-0000-4000-8000-000000000303', 10),
  ('00000000-0000-4000-8000-000000000504', '00000000-0000-4000-8000-000000000304', 10)
on conflict (product_id, material_id) do update set sort_order = excluded.sort_order;

insert into public.product_variants (
  product_id,
  sku,
  color_name,
  color_hex,
  material_id,
  size_value,
  price,
  stock_quantity,
  sort_order,
  is_active
)
values
  ('00000000-0000-4000-8000-000000000501', 'ROS-AMELIA-WHITE-XXSS', 'Biały', '#f8f7f2', '00000000-0000-4000-8000-000000000301', 'XXS-S', 319, 8, 10, true),
  ('00000000-0000-4000-8000-000000000501', 'ROS-AMELIA-SAND-ML', 'Piaskowy', '#d8c7b2', '00000000-0000-4000-8000-000000000301', 'M-L', 319, 6, 20, true),
  ('00000000-0000-4000-8000-000000000502', 'ROS-RIO-SAND-XXSS', 'Piaskowy', '#d8c7b2', '00000000-0000-4000-8000-000000000301', 'XXS-S', 369, 5, 10, true),
  ('00000000-0000-4000-8000-000000000503', 'ROS-FLORA-NAVY-MTO', 'Granatowy', '#1f2c3d', '00000000-0000-4000-8000-000000000303', 'M-L', 529, 0, 10, true)
on conflict (sku) do update set
  color_name = excluded.color_name,
  color_hex = excluded.color_hex,
  material_id = excluded.material_id,
  size_value = excluded.size_value,
  price = excluded.price,
  stock_quantity = excluded.stock_quantity,
  sort_order = excluded.sort_order,
  is_active = excluded.is_active;

insert into public.product_tags (product_id, tag_id)
values
  ('00000000-0000-4000-8000-000000000501', '00000000-0000-4000-8000-000000000401'),
  ('00000000-0000-4000-8000-000000000501', '00000000-0000-4000-8000-000000000403'),
  ('00000000-0000-4000-8000-000000000502', '00000000-0000-4000-8000-000000000402'),
  ('00000000-0000-4000-8000-000000000502', '00000000-0000-4000-8000-000000000403'),
  ('00000000-0000-4000-8000-000000000503', '00000000-0000-4000-8000-000000000404')
on conflict (product_id, tag_id) do nothing;

insert into public.homepage_sections (
  id,
  section_key,
  visibility,
  title,
  subtitle,
  body,
  cta_label,
  cta_href,
  image_url,
  sort_order,
  status
)
values
  ('00000000-0000-4000-8000-000000000601', 'hero', 'public', 'Naturalne tkaniny, spokojna forma, precyzyjne dopasowanie.', 'Rosna premium', 'Kolekcje Rosna powstają z myślą o garderobie, która zostaje na dłużej.', 'Zobacz kolekcję', '/sklep', 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1600&q=85', 10, 'published'),
  ('00000000-0000-4000-8000-000000000602', 'new_collection', 'public', 'Cztery spokojne filary sezonu', 'Nowa kolekcja', 'Każdy element ma własną fakturę, ale wszystkie pracują w jednej, uporządkowanej garderobie.', 'Przeglądaj', '/sklep', null, 20, 'published'),
  ('00000000-0000-4000-8000-000000000603', 'materials', 'public', 'Filozofia zaczyna się od tkaniny', 'Materiały', 'Wybieramy naturalne włókna, wyważoną gramaturę i faktury, które nie potrzebują mocnej dekoracji.', null, null, null, 30, 'published'),
  ('00000000-0000-4000-8000-000000000604', 'bestsellers', 'public', 'Najczęściej wybierane formy', 'Bestsellery', 'Produkty o stabilnej formie, naturalnym składzie i dopracowanych proporcjach.', 'Zobacz bestsellery', '/sklep', null, 40, 'published'),
  ('00000000-0000-4000-8000-000000000605', 'made_to_order', 'public', 'Szycie wolniej, bliżej ciała i potrzeb.', 'Made to order', 'Modele na zamówienie powstają po konsultacji wymiarów, tkaniny i sposobu noszenia.', 'Przejdź do made to order', '/made-to-order', null, 50, 'published'),
  ('00000000-0000-4000-8000-000000000606', 'story', 'public', 'Rosna porządkuje garderobę zamiast ją zagęszczać.', 'Historia marki', 'Projektujemy krótkie serie oparte na powtarzalnych proporcjach, spokojnych kolorach i jakości detalu.', null, null, null, 60, 'published'),
  ('00000000-0000-4000-8000-000000000607', 'lookbook', 'public', 'Sylwetki w naturalnym świetle', 'Lookbook', 'Editorialowy rytm obrazów, stałe proporcje i wyśrodkowany grid.', null, null, null, 70, 'published'),
  ('00000000-0000-4000-8000-000000000608', 'newsletter', 'public', 'Nowości, zapowiedzi i limitowane serie', 'Newsletter', 'Zapisz się, aby otrzymywać pierwsze informacje o premierach, tkaninach i krótkich seriach Rosna.', null, null, null, 80, 'published')
on conflict (section_key) do update set
  visibility = excluded.visibility,
  title = excluded.title,
  subtitle = excluded.subtitle,
  body = excluded.body,
  cta_label = excluded.cta_label,
  cta_href = excluded.cta_href,
  image_url = excluded.image_url,
  sort_order = excluded.sort_order,
  status = excluded.status;

insert into public.homepage_section_items (
  section_id,
  title,
  subtitle,
  body,
  cta_label,
  cta_href,
  image_url,
  linked_product_id,
  linked_category_id,
  sort_order,
  status
)
values
  ('00000000-0000-4000-8000-000000000602', 'Lniana koszula', 'Koszule', 'Miękka struktura, spokojna forma i proporcje gotowe do warstw.', 'Zobacz', '/kategoria/koszule', 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=900&q=85', '00000000-0000-4000-8000-000000000501', '00000000-0000-4000-8000-000000000101', 10, 'published'),
  ('00000000-0000-4000-8000-000000000602', 'Spodnie z lnu', 'Spodnie', 'Wysoki stan, swobodna linia i tkanina, która pracuje z ruchem.', 'Zobacz', '/kategoria/spodnie', 'https://images.unsplash.com/photo-1495121605193-b116b5b9c5d6?auto=format&fit=crop&w=900&q=85', '00000000-0000-4000-8000-000000000502', '00000000-0000-4000-8000-000000000102', 20, 'published'),
  ('00000000-0000-4000-8000-000000000603', 'Len', null, 'Oddychający, lekko nieregularny, pięknie układa się w prostych formach.', null, null, null, null, null, 10, 'published'),
  ('00000000-0000-4000-8000-000000000603', 'Wełna', null, 'Ciepła, sprężysta i trwała. Wybierana do modeli na wiele sezonów.', null, null, null, null, null, 20, 'published'),
  ('00000000-0000-4000-8000-000000000603', 'Wiskoza', null, 'Płynny chwyt, miękkość przy skórze i subtelny połysk w ruchu.', null, null, null, null, null, 30, 'published'),
  ('00000000-0000-4000-8000-000000000607', 'Poranek w mieście', null, null, null, null, 'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=900&q=85', null, null, 10, 'published'),
  ('00000000-0000-4000-8000-000000000607', 'Naturalna warstwa', null, null, null, null, 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=900&q=85', null, null, 20, 'published'),
  ('00000000-0000-4000-8000-000000000607', 'Wieczorna prostota', null, null, null, null, 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=85', null, null, 30, 'published')
on conflict do nothing;
