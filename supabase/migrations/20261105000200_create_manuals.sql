-- Manuals library, managed from the website's /admin area.
create table public.manuals (
  id              bigint generated always as identity primary key,
  slug            text        not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  title           text        not null,
  brand           text        not null,
  model           text        not null default '',
  product_type    text        not null default '',
  description     text        not null default '',
  pdf_key         text,                       -- object key in the "manuals" bucket
  pdf_size        integer     check (pdf_size >= 0),
  published       boolean     not null default true,
  seo_title       text        not null default '',
  seo_description text        not null default '',
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

create index manuals_brand_idx on public.manuals (brand, model);

create trigger manuals_set_updated_at
  before update on public.manuals
  for each row execute function public.set_updated_at();

alter table public.manuals enable row level security;

create policy "Anyone can read published manuals"
  on public.manuals for select to anon, authenticated using (published);
create policy "Admins can read all manuals"
  on public.manuals for select to authenticated using ((select public.is_admin()));
create policy "Admins can add manuals"
  on public.manuals for insert to authenticated with check ((select public.is_admin()));
create policy "Admins can edit manuals"
  on public.manuals for update to authenticated
  using ((select public.is_admin())) with check ((select public.is_admin()));
create policy "Admins can delete manuals"
  on public.manuals for delete to authenticated using ((select public.is_admin()));

-- Public PDF bucket: anyone can download, only admins can upload/replace/delete.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('manuals', 'manuals', true, 26214400, array['application/pdf']);

create policy "Admins can read manual objects"
  on storage.objects for select to authenticated using (bucket_id = 'manuals' and (select public.is_admin()));
create policy "Admins can upload manuals"
  on storage.objects for insert to authenticated with check (bucket_id = 'manuals' and (select public.is_admin()));
create policy "Admins can update manuals"
  on storage.objects for update to authenticated using (bucket_id = 'manuals' and (select public.is_admin()));
create policy "Admins can delete manuals"
  on storage.objects for delete to authenticated using (bucket_id = 'manuals' and (select public.is_admin()));

-- (The three sample manuals were inserted at the same time — see supabase/seed.sql.)
