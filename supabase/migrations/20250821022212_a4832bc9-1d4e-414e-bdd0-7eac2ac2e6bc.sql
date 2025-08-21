-- Avoid recursive RLS: helper functions
create or replace function public.get_current_user_org_id()
returns uuid
language sql
stable
security definer
set search_path = public
as $$
  select organization_id from public.profiles where id = auth.uid();
$$;

create or replace function public.has_admin_role()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
$$;

-- Replace recursive policies on profiles
drop policy if exists "Admins can insert profiles" on public.profiles;
drop policy if exists "Admins can update profiles" on public.profiles;
drop policy if exists "Users can view org profiles" on public.profiles;

-- Users can insert their own profile (first time)
create policy "Users can insert own profile"
on public.profiles
for insert
to authenticated
with check (id = auth.uid());

-- Admins can insert profiles within their org
create policy "Admins can insert profiles in org"
on public.profiles
for insert
to authenticated
with check (public.has_admin_role() and organization_id = public.get_current_user_org_id());

-- Admins can update profiles within their org
create policy "Admins can update profiles in org"
on public.profiles
for update
to authenticated
using (public.has_admin_role() and organization_id = public.get_current_user_org_id());

-- Users can view profiles in their org
create policy "Users can view org profiles"
on public.profiles
for select
to authenticated
using (organization_id = public.get_current_user_org_id());