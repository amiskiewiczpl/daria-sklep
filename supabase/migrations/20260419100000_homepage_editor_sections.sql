do $$ begin
  alter type public.homepage_section_key add value if not exists 'announcement_bar' before 'hero';
exception when duplicate_object then null;
end $$;

alter table public.homepage_sections
add column if not exists linked_collection_id uuid references public.collections(id) on update cascade on delete set null;

alter table public.homepage_section_items
add column if not exists linked_collection_id uuid references public.collections(id) on update cascade on delete set null;

insert into storage.buckets (id, name, public)
values ('homepage-images', 'homepage-images', true)
on conflict (id) do update set public = excluded.public;

drop policy if exists "storage_homepage_images_public_read" on storage.objects;
create policy "storage_homepage_images_public_read"
on storage.objects
for select
using (bucket_id = 'homepage-images');

drop policy if exists "storage_homepage_images_admin_insert" on storage.objects;
create policy "storage_homepage_images_admin_insert"
on storage.objects
for insert
with check (bucket_id = 'homepage-images' and public.is_admin_user());

drop policy if exists "storage_homepage_images_admin_update" on storage.objects;
create policy "storage_homepage_images_admin_update"
on storage.objects
for update
using (bucket_id = 'homepage-images' and public.is_admin_user())
with check (bucket_id = 'homepage-images' and public.is_admin_user());

drop policy if exists "storage_homepage_images_admin_delete" on storage.objects;
create policy "storage_homepage_images_admin_delete"
on storage.objects
for delete
using (bucket_id = 'homepage-images' and public.is_admin_user());

insert into public.homepage_sections (
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
values (
  'announcement_bar',
  'public',
  'Darmowa dostawa od 500 zl',
  'Announcement',
  'Krotkie serie szyte w Polsce z naturalnych tkanin.',
  null,
  null,
  null,
  5,
  'published'
)
on conflict (section_key) do nothing;
