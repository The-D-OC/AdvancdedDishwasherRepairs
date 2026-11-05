/**
 * Site content: brands, services, fault codes, manuals, blog posts, coverage
 * areas, testimonials and case studies. Changes here need a rebuild/deploy.
 *
 * Machines for sale and manuals are NOT here — they live in Supabase and are
 * managed live from /admin (see src/lib/machines.ts and src/lib/manuals.ts).
 *
 * Before launch, replace the placeholder testimonials and fault codes.
 */
import type {
  BlogPost,
  Brand,
  CaseStudy,
  FaultCode,
  Location,
  Service,
  Testimonial,
} from '@/types/content';

const brand = (name: string, slug: string, description: string): Brand => ({
  name,
  slug,
  description,
  seoTitle: `${name} Commercial Dishwasher Repair`,
  seoDescription: `Expert ${name} commercial dishwasher and glasswasher repair, servicing, fault codes and manuals across the North West.`,
});

export const BRANDS: Brand[] = [
  brand('Hobart', 'hobart', 'Industry-leading commercial dishwashers trusted by professional kitchens worldwide.'),
  brand('Winterhalter', 'winterhalter', 'Premium warewashing for hotels, restaurants and contract catering.'),
  brand('Classeq', 'classeq', 'British-made glasswashers and dishwashers built for reliability.'),
  brand('Maidaid', 'maidaid', 'Commercial catering equipment specialists focused on warewashing.'),
  brand('Meiko', 'meiko', 'High-performance warewashing for demanding, high-volume kitchens.'),
  brand('Electrolux', 'electrolux', 'Professional dishwashers and glasswashers for every size of kitchen.'),
  brand('Fagor', 'fagor', 'Spanish manufacturer of professional kitchen and warewashing equipment.'),
  brand('Comenda', 'comenda', 'Italian dishwashers known for energy-efficient, robust design.'),
];

export const SERVICES: Service[] = [
  {
    title: 'Dishwasher Repairs',
    slug: 'repairs',
    icon: 'wrench',
    description: 'Fast diagnosis and repair for every make and model of commercial dishwasher and glasswasher.',
    content: [
      'Our engineers carry a wide range of genuine spare parts, so most faults are diagnosed and fixed on the first visit.',
      'We repair undercounter dishwashers, glasswashers, pass-through hood machines and rack conveyors from Hobart, Winterhalter, Classeq, Meiko and more.',
      'Every repair is quoted before work starts and is covered by a 90-day parts and labour warranty.',
    ],
    seoTitle: 'Commercial Dishwasher Repairs',
    seoDescription: 'Commercial dishwasher and glasswasher repairs across the North West. 98% first-time fix rate, fixed quotes, 90-day warranty.',
  },
  {
    title: 'Installation',
    slug: 'installation',
    icon: 'install',
    description: 'Professional installation and commissioning of new and refurbished warewashing equipment.',
    content: [
      'We install commercial dishwashers and glasswashers with correct water, drainage and electrical connections, then commission and test before handover.',
      'Need a machine as well? Browse our refurbished and new machines for sale — installation can be quoted together.',
    ],
    seoTitle: 'Commercial Dishwasher Installation',
    seoDescription: 'Commercial dishwasher and glasswasher installation and commissioning by experienced engineers.',
  },
  {
    title: 'Planned Maintenance',
    slug: 'maintenance',
    icon: 'calendar',
    description: 'Preventive maintenance contracts that cut breakdowns and extend machine life.',
    content: [
      'Regular servicing reduces breakdowns, keeps wash results consistent and helps you stay compliant with hygiene standards.',
      'We offer flexible maintenance plans tailored to how hard your machines work — from single sites to multi-site groups.',
    ],
    seoTitle: 'Commercial Dishwasher Maintenance Contracts',
    seoDescription: 'Planned maintenance contracts for commercial dishwashers and glasswashers. Fewer breakdowns, longer machine life.',
  },
  {
    title: 'Emergency Call Outs',
    slug: 'emergency',
    icon: 'alert',
    description: 'Fast emergency response when your machine fails mid-service.',
    content: [
      'When your dishwasher breaks down during service, every minute counts. Call us and we will get an engineer to you as quickly as possible.',
      'Our vans are stocked with the most common failure parts, so emergency visits usually end with a working machine.',
    ],
    seoTitle: 'Emergency Commercial Dishwasher Repair',
    seoDescription: 'Fast emergency commercial dishwasher repair across the North West. Call 07745 407 919.',
  },
];

const fault = (f: Omit<FaultCode, 'slug'>): FaultCode => ({
  ...f,
  slug: `${f.brand}-${f.model}-${f.code}`.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
});

export const FAULT_CODES: FaultCode[] = [
  fault({
    brand: 'Hobart', model: 'AM15', code: 'F1', title: 'Temperature sensor fault',
    description: 'The wash temperature sensor is not reading correctly.',
    commonCauses: ['Faulty temperature probe', 'Wiring fault', 'Control board issue'],
    recommendedActions: ['Check probe resistance', 'Inspect wiring harness', 'Replace probe if out of spec'],
    seoTitle: 'Hobart AM15 F1 Fault Code — Temperature Sensor',
    seoDescription: 'What the Hobart AM15 F1 fault code means, common causes and how to fix it.',
  }),
  fault({
    brand: 'Winterhalter', model: 'UC-M', code: 'E2', title: 'Wash pump fault',
    description: 'The wash pump is not operating correctly.',
    commonCauses: ['Blocked pump', 'Capacitor failure', 'Motor winding fault'],
    recommendedActions: ['Clear blockage', 'Test capacitor', 'Replace pump motor'],
    seoTitle: 'Winterhalter UC-M E2 Fault Code — Wash Pump',
    seoDescription: 'What the Winterhalter UC-M E2 fault code means, common causes and how to fix it.',
  }),
  fault({
    brand: 'Classeq', model: 'Hydro 750', code: 'C3', title: 'Drain fault',
    description: 'The machine is not draining within the set time.',
    commonCauses: ['Blocked drain filter', 'Blocked drain hose', 'Drain pump failure'],
    recommendedActions: ['Clean drain filter', 'Check drain hose', 'Test drain pump'],
    seoTitle: 'Classeq Hydro 750 C3 Fault Code — Drain Fault',
    seoDescription: 'What the Classeq Hydro 750 C3 fault code means, common causes and how to fix it.',
  }),
];

/** Placeholder reviews — replace with genuine customer testimonials before launch. */
export const TESTIMONIALS: Testimonial[] = [
  { customerName: 'James H.', companyName: 'Hotel, Manchester', rating: 5, review: 'The engineer arrived within two hours and had our Hobart running again before lunch service. Highly recommended.' },
  { customerName: 'Sarah C.', companyName: 'Restaurant group', rating: 5, review: 'Reliable, knowledgeable engineers and fair pricing across all of our sites. We won’t use anyone else.' },
  { customerName: 'Mike T.', companyName: 'Catering company', rating: 5, review: 'Called at 7pm on a Friday when our machine packed up. Sorted by 9pm. The emergency service is worth every penny.' },
];

export const BLOG_POSTS: BlogPost[] = [
  {
    title: '5 signs your commercial dishwasher needs servicing',
    slug: '5-signs-commercial-dishwasher-needs-servicing',
    excerpt: 'Spotting the early warning signs prevents costly breakdowns mid-service.',
    content: [
      'Commercial dishwashers rarely fail without warning. Catching the early signs means a planned visit instead of an emergency call out.',
      '1. Poor wash results — streaks, residue or cloudy glasses usually point to blocked wash arms, a tired wash pump or incorrect detergent dosing.',
      '2. Longer cycle times — if the machine takes longer to reach temperature, the heating element or thermostat may be failing.',
      '3. Water left in the tank — slow draining is often a blocked filter or a weakening drain pump.',
      '4. New noises — grinding or humming from the pump area should be looked at before the motor fails.',
      '5. Leaks — even small drips from door seals or hoses can damage floors and electrics over time.',
      'If you notice any of these, book a service visit and we will check the machine over before it becomes an emergency.',
    ],
    author: 'Advanced Dishwasher Repairs',
    publishDate: '2026-06-01',
    seoDescription: 'The early warning signs that your commercial dishwasher needs servicing before it breaks down.',
  },
  {
    title: 'How to cut commercial dishwasher running costs',
    slug: 'reduce-commercial-dishwasher-running-costs',
    excerpt: 'Practical ways to save energy, water and chemicals without hurting wash results.',
    content: [
      'Energy, water and chemicals add up quickly on a machine that runs all day. Small changes make a real difference.',
      'Run full racks wherever possible, keep filters and wash arms clean so the machine does not need re-washes, and make sure detergent and rinse aid dosing is set correctly.',
      'Scale build-up forces elements to work harder. In hard-water areas, a working water softener and regular descaling pay for themselves.',
      'Finally, a planned maintenance visit catches failing parts that quietly waste energy — such as a heating element that never quite reaches temperature.',
    ],
    author: 'Advanced Dishwasher Repairs',
    publishDate: '2026-05-15',
    seoDescription: 'Practical tips to reduce commercial dishwasher energy, water and chemical costs.',
  },
  {
    title: 'Choosing the right commercial dishwasher for your business',
    slug: 'choosing-right-commercial-dishwasher',
    excerpt: 'From undercounter glasswashers to rack conveyors — how to pick the right machine.',
    content: [
      'The right machine depends on how many covers you serve, the space you have and what you are washing.',
      'Bars and cafés usually need a glasswasher or a compact undercounter dishwasher. Busy restaurants and hotels benefit from a pass-through hood machine, while large kitchens and schools may need a rack conveyor.',
      'A quality refurbished machine can save a large part of the cost of a new one. Every machine we sell is tested and serviced before it leaves us.',
      'Not sure what you need? Call us and we will talk through the options.',
    ],
    author: 'Advanced Dishwasher Repairs',
    publishDate: '2026-05-01',
    seoDescription: 'How to choose the right commercial dishwasher or glasswasher for your business.',
  },
];

const location = (name: string, slug: string, coverageArea: string, towns: string[]): Location => ({
  name,
  slug,
  coverageArea,
  towns,
  content: `We provide commercial dishwasher and glasswasher repairs, servicing and installation across ${coverageArea}, with fast emergency call outs for restaurants, hotels, pubs, schools and care homes.`,
  seoTitle: `Commercial Dishwasher Repair ${name}`,
  seoDescription: `Commercial dishwasher and glasswasher repair in ${name}. Fast response and emergency call outs. Call 07745 407 919.`,
});

export const LOCATIONS: Location[] = [
  location('Manchester', 'manchester', 'Greater Manchester', ['Manchester', 'Salford', 'Stockport', 'Oldham', 'Ashton-under-Lyne', 'Bolton', 'Wigan', 'Bury', 'Rochdale', 'Trafford']),
  location('Liverpool', 'liverpool', 'Liverpool and Merseyside', ['Liverpool', 'Birkenhead', 'St Helens', 'Southport', 'Bootle', 'Wirral']),
  location('Lancashire', 'lancashire', 'Lancashire', ['Preston', 'Blackburn', 'Blackpool', 'Lancaster', 'Burnley', 'Chorley']),
  location('Cheshire', 'cheshire', 'Cheshire', ['Chester', 'Warrington', 'Crewe', 'Macclesfield', 'Northwich', 'Knutsford']),
  location('West Yorkshire', 'west-yorkshire', 'West Yorkshire', ['Leeds', 'Huddersfield', 'Bradford', 'Halifax', 'Wakefield']),
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    title: 'Wash pump failure mid-service',
    site: 'Hotel kitchen',
    machine: 'Hobart AM15',
    before: 'Machine tripping out with no wash pressure during Friday dinner service.',
    after: 'Seized wash pump replaced from van stock and machine recommissioned.',
    turnaround: 'Fixed same evening',
  },
  {
    title: 'Glasses coming out cloudy',
    site: 'Busy city-centre bar',
    machine: 'Classeq Hydro 750',
    before: 'Heavy scale on elements and wash arms, poor rinse results.',
    after: 'Full descale, new rinse jets and water softener reset.',
    turnaround: 'Single visit',
  },
  {
    title: 'Repeated drain faults',
    site: 'School kitchen',
    machine: 'Winterhalter UC-M',
    before: 'Daily drain errors and standing water in the tank.',
    after: 'Blocked drain hose cleared and worn drain pump replaced.',
    turnaround: 'Next-day repair',
  },
];
