-- Storage deletes need SELECT as well as DELETE permission on the object.
create policy "Admins can read machine photo objects"
  on storage.objects for select to authenticated
  using (bucket_id = 'machine-photos' and (select public.is_admin()));
