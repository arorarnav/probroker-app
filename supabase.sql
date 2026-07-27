-- Run this once in Supabase: Dashboard -> SQL Editor -> New query -> paste this -> Run

create table public.reports (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null,
  filename text,
  status text default 'pending',        -- pending -> processing -> completed (or failed)
  report_url text,                      -- filled in once the report file is ready
  payment_id text,
  amount_paid integer,                  -- in paise (29900 = ₹299)
  created_at timestamp with time zone default now()
);

-- Row Level Security: without this, ANY logged-in user could read
-- everyone else's reports. This restricts each user to only their own rows.
alter table public.reports enable row level security;

create policy "Users can view their own reports"
  on public.reports for select
  using (auth.uid() = user_id);

create policy "Users can insert their own reports"
  on public.reports for insert
  with check (auth.uid() = user_id);

-- Note: the verify-payment API route uses the service_role key, which
-- bypasses these policies entirely (that's expected and safe -- it's a
-- trusted server-side route, not something the browser can call directly
-- with someone else's user_id and get away with it, since the signature
-- check happens first).
