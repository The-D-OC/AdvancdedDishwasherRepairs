export default {
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    { name: 'customerName', title: 'Customer Name', type: 'string', validation: (r: any) => r.required() },
    { name: 'companyName', title: 'Company Name', type: 'string' },
    { name: 'review', title: 'Review', type: 'text', rows: 4, validation: (r: any) => r.required() },
    { name: 'rating', title: 'Rating (1-5)', type: 'number', validation: (r: any) => r.required().min(1).max(5) },
  ],
};
