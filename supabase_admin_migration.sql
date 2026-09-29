CREATE TABLE public.admins (
  id uuid primary key default uuid_generate_v4(),
  email text unique not null,
  created_at timestamptz default now()
);

-- Active RLS on admins table (optional, but good practice)
ALTER TABLE public.admins ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins can view admins" ON public.admins FOR SELECT USING (true);
