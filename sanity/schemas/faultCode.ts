export default {
  name: 'faultCode',
  title: 'Fault Code',
  type: 'document',
  fields: [
    { name: 'brand', title: 'Brand', type: 'string', validation: (r: any) => r.required() },
    { name: 'model', title: 'Model', type: 'string' },
    { name: 'code', title: 'Fault Code', type: 'string', validation: (r: any) => r.required() },
    { name: 'title', title: 'Title', type: 'string', validation: (r: any) => r.required() },
    { name: 'description', title: 'Description', type: 'text', rows: 4 },
    { name: 'commonCauses', title: 'Common Causes', type: 'array', of: [{ type: 'string' }] },
    { name: 'recommendedActions', title: 'Recommended Actions', type: 'array', of: [{ type: 'string' }] },
    { name: 'seoTitle', title: 'SEO Title', type: 'string' },
    { name: 'seoDescription', title: 'SEO Description', type: 'text', rows: 2 },
  ],
};
