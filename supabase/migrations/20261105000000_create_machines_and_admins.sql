-- Applied to Supabase project hxziesvqdjweaydxlwmd (advanced-dishwasher-repairs).
-- Machines for sale, managed from the website's /admin area.
create table public.machines (
  id              bigint generated always as identity primary key,
  slug            text        not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  reference       text        not null,
  title           text        not null,
  brand           text        not null,
  model           text        not null default '',
  machine_type    text        not null check (machine_type in ('Undercounter dishwasher', 'Glasswasher', 'Pass-through / hood', 'Rack conveyor')),
  condition       text        not null check (condition in ('new', 'refurbished', 'used')),
  status          text        not null default 'available' check (status in ('available', 'reserved', 'sold', 'draft')),
  price           integer     not null check (price >= 0),
  was_price       integer     check (was_price >= 0),
  summary         text        not null default '',
  description     text        not null default '',
  specs           jsonb       not null default '[]'::jsonb,   -- [{label, value}]
  highlights      jsonb       not null default '[]'::jsonb,   -- [string]
  warranty        text        not null default '',
  featured        boolean     not null default false,
  images          jsonb       not null default '[]'::jsonb,   -- [{key, thumbKey, alt, width, height}]
  seo_title       text        not null default '',
  seo_description text        not null default '',
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

create index machines_listing_idx on public.machines (status, featured desc, updated_at desc);

create function public.set_updated_at() returns trigger
language plpgsql set search_path = '' as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

create trigger machines_set_updated_at
  before update on public.machines
  for each row execute function public.set_updated_at();

-- Who may manage listings. Add rows via the dashboard / SQL editor only.
create table public.admins (
  email      text primary key check (email = lower(email)),
  created_at timestamptz not null default now()
);
alter table public.admins enable row level security;
-- No policies: not readable or writable through the API.

create function public.is_admin() returns boolean
language sql stable security definer set search_path = '' as $$
  select exists (
    select 1 from public.admins
    where email = lower(coalesce(auth.jwt() ->> 'email', ''))
  );
$$;
revoke execute on function public.is_admin() from public, anon;
grant execute on function public.is_admin() to authenticated;

alter table public.machines enable row level security;

create policy "Anyone can read published machines"
  on public.machines for select to anon, authenticated
  using (status <> 'draft');

create policy "Admins can read all machines"
  on public.machines for select to authenticated
  using ((select public.is_admin()));

create policy "Admins can add machines"
  on public.machines for insert to authenticated
  with check ((select public.is_admin()));

create policy "Admins can edit machines"
  on public.machines for update to authenticated
  using ((select public.is_admin()))
  with check ((select public.is_admin()));

create policy "Admins can delete machines"
  on public.machines for delete to authenticated
  using ((select public.is_admin()));

-- Public photo bucket: anyone can view, only admins can upload/change/delete.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('machine-photos', 'machine-photos', true, 8388608, array['image/jpeg', 'image/png', 'image/webp', 'image/avif']);

create policy "Admins can upload machine photos"
  on storage.objects for insert to authenticated
  with check (bucket_id = 'machine-photos' and (select public.is_admin()));

create policy "Admins can update machine photos"
  on storage.objects for update to authenticated
  using (bucket_id = 'machine-photos' and (select public.is_admin()));

create policy "Admins can delete machine photos"
  on storage.objects for delete to authenticated
  using (bucket_id = 'machine-photos' and (select public.is_admin()));
