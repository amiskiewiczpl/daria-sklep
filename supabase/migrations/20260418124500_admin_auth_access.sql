alter type public.admin_role add value if not exists 'editor';

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
