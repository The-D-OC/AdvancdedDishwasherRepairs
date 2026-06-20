export default {
  name: 'brand',
  title: 'Brand',
  type: 'document',
  fields: [
    { name: 'name', title: 'Name', type: 'string', validation: (r: any) => r.required() },
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'name' }, validation: (r: any) => r.required() },
    { name: 'logo', title: 'Logo', type: 'image', options: { hotspot: true } },
    { name: 'description', title: 'Description', type: 'text', rows: 4 },
    { name: 'seoTitle', title: 'SEO Title', type: 'string' },
    { name: 'seoDescription', title: 'SEO Description', type: 'text', rows: 2 },
  ],
};
