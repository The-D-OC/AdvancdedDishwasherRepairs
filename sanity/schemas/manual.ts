export default {
  name: 'manual',
  title: 'Manual',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string', validation: (r: any) => r.required() },
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' }, validation: (r: any) => r.required() },
    { name: 'brand', title: 'Brand', type: 'string' },
    { name: 'model', title: 'Model', type: 'string' },
    { name: 'productType', title: 'Product Type', type: 'string' },
    { name: 'description', title: 'Description', type: 'text', rows: 4 },
    { name: 'pdfAsset', title: 'PDF File', type: 'file', options: { accept: 'application/pdf' } },
    { name: 'thumbnail', title: 'Thumbnail', type: 'image', options: { hotspot: true } },
    { name: 'seoTitle', title: 'SEO Title', type: 'string' },
    { name: 'seoDescription', title: 'SEO Description', type: 'text', rows: 2 },
  ],
};
