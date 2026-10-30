-- Comptes de la console : administrateurs et partenaires (staff).
-- À exécuter dans le SQL editor Supabase.

create table if not exists public.console_users (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  role text not null check (role in ('admin', 'partenaire')),
  created_at timestamptz not null default now()
);

alter table public.console_users enable row level security;

drop policy if exists "Lecture des comptes console" on public.console_users;
create policy "Lecture des comptes console"
  on public.console_users
  for select
  using (true);

insert into public.console_users (email, role)
select lower(trim(email)), 'admin'
from public.admins
where email is not null and position('@' in email) > 0
on conflict (email) do nothing;

-- MPME confiées à un partenaire. Une même MPME peut être suivie par plusieurs partenaires.
create table if not exists public.partner_assignments (
  partner_email text not null,
  application_id text not null,
  created_at timestamptz not null default now(),
  primary key (partner_email, application_id)
);

alter table public.partner_assignments enable row level security;
