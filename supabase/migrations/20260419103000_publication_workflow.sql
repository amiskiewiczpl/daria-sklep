update public.homepage_sections
set status = 'hidden'
where status = 'archived';

update public.homepage_section_items
set status = 'hidden'
where status = 'archived';

alter table public.homepage_sections
  drop constraint if exists homepage_sections_status_no_archived_check;

alter table public.homepage_sections
  add constraint homepage_sections_status_no_archived_check
  check (status in ('draft', 'published', 'hidden'));

alter table public.homepage_section_items
  drop constraint if exists homepage_section_items_status_no_archived_check;

alter table public.homepage_section_items
  add constraint homepage_section_items_status_no_archived_check
  check (status in ('draft', 'published', 'hidden'));

create index if not exists products_public_listing_idx
on public.products (sort_order, created_at desc)
where status = 'published';

create index if not exists homepage_sections_public_listing_idx
on public.homepage_sections (sort_order)
where status = 'published' and visibility = 'public';

create index if not exists homepage_section_items_public_listing_idx
on public.homepage_section_items (section_id, sort_order)
where status = 'published';
