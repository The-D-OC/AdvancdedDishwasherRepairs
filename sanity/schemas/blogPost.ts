export default {
  name: 'blogPost',
  title: 'Blog Post',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string', validation: (r: any) => r.required() },
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' }, validation: (r: any) => r.required() },
    { name: 'excerpt', title: 'Excerpt', type: 'text', rows: 3 },
    { name: 'content', title: 'Content', type: 'array', of: [{ type: 'block' }, { type: 'image' }] },
    { name: 'featuredImage', title: 'Featured Image', type: 'image', options: { hotspot: true } },
    { name: 'author', title: 'Author', type: 'string' },
    { name: 'publishDate', title: 'Publish Date', type: 'datetime' },
    { name: 'seoTitle', title: 'SEO Title', type: 'string' },
    { name: 'seoDescription', title: 'SEO Description', type: 'text', rows: 2 },
  ],
  orderings: [{ title: 'Publish Date (newest)', name: 'publishDateDesc', by: [{ field: 'publishDate', direction: 'desc' }] }],
};
