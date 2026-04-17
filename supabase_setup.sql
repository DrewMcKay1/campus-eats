-- ============================================================
--  Campus Eats — Supabase Database Setup
--  Run this entire file in:
--  Supabase Dashboard → SQL Editor → New Query → Paste → Run
-- ============================================================

-- 1. Create the table that stores each user's app state
create table if not exists public.user_state (
  user_id    uuid primary key references auth.users(id) on delete cascade,
  data       jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

-- 2. Enable Row Level Security so users can ONLY see their own data
alter table public.user_state enable row level security;

-- 3. Policy: a logged-in user can read their own row
create policy "Users can read own state"
  on public.user_state
  for select
  using (auth.uid() = user_id);

-- 4. Policy: a logged-in user can insert their own row
create policy "Users can insert own state"
  on public.user_state
  for insert
  with check (auth.uid() = user_id);

-- 5. Policy: a logged-in user can update their own row
create policy "Users can update own state"
  on public.user_state
  for update
  using (auth.uid() = user_id);

-- 6. Policy: a logged-in user can delete their own row
create policy "Users can delete own state"
  on public.user_state
  for delete
  using (auth.uid() = user_id);

-- 7. Keep updated_at current automatically
create or replace function public.update_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create or replace trigger set_updated_at
  before update on public.user_state
  for each row execute function public.update_updated_at();

-- Done! Your database is ready.
