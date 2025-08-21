-- Fix organizations table RLS policies for onboarding
drop policy if exists "Users can view own organization" on public.organizations;
drop policy if exists "Users can update own organization" on public.organizations;

-- Allow authenticated users to create organizations (for onboarding)
create policy "Users can create organizations"
on public.organizations
for insert
to authenticated
with check (auth.uid() is not null);

-- Users can view organizations they belong to
create policy "Users can view own organization"
on public.organizations
for select
to authenticated
using (id = public.get_current_user_org_id());

-- Admins can update their own organization
create policy "Admins can update own organization"
on public.organizations
for update
to authenticated
using (id = public.get_current_user_org_id() and public.has_admin_role());