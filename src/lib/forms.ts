/**
 * Server-side validation for every website form (contact, booking,
 * for-sale enquiry). Runs inside the Cloudflare Worker.
 */

export const FORM_TYPES = ['contact', 'booking', 'machine'] as const;
export type FormType = (typeof FORM_TYPES)[number];

export const FORM_LABEL: Record<FormType, string> = {
  contact: 'Contact enquiry',
  booking: 'Repair booking request',
  machine: 'Machine for sale enquiry',
};

/** Honeypot field name — hidden from people, often filled in by bots. */
export const HONEYPOT_FIELD = 'company_website';
/** Hidden timestamp — submissions faster than this are treated as bots. */
export const MIN_FILL_MS = 2500;

interface FieldRule {
  label: string;
  required?: boolean;
  max: number;
  kind?: 'email' | 'phone' | 'postcode';
}

const COMMON: Record<string, FieldRule> = {
  name: { label: 'Name', required: true, max: 100 },
  email: { label: 'Email', required: true, max: 200, kind: 'email' },
  phone: { label: 'Phone', max: 30, kind: 'phone' },
  company: { label: 'Company', max: 150 },
  message: { label: 'Message', max: 3000 },
};

export const FORM_FIELDS: Record<FormType, Record<string, FieldRule>> = {
  contact: {
    ...COMMON,
    message: { label: 'Message', required: true, max: 3000 },
  },
  booking: {
    ...COMMON,
    email: { label: 'Email', max: 200, kind: 'email' },
    phone: { label: 'Phone', required: true, max: 30, kind: 'phone' },
    machine: { label: 'Machine make & model', max: 150 },
    urgency: { label: 'Urgency', max: 40 },
    postcode: { label: 'Postcode', required: true, max: 10, kind: 'postcode' },
    address: { label: 'Site address', max: 300 },
    message: { label: 'Fault description', required: true, max: 3000 },
  },
  machine: {
    ...COMMON,
    email: { label: 'Email', max: 200, kind: 'email' },
    machineRef: { label: 'Machine', required: true, max: 200 },
    postcode: { label: 'Delivery postcode', max: 10, kind: 'postcode' },
    installation: { label: 'Installation required', max: 10 },
  },
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^[+()\d\s-]{7,30}$/;
const POSTCODE_RE = /^[A-Z]{1,2}\d[A-Z\d]?\s*\d[A-Z]{2}$/i;

export interface ValidationResult {
  ok: boolean;
  values: Record<string, string>;
  errors: Record<string, string>;
}

export function validateForm(type: FormType, data: FormData): ValidationResult {
  const rules = FORM_FIELDS[type];
  const values: Record<string, string> = {};
  const errors: Record<string, string> = {};

  for (const [name, rule] of Object.entries(rules)) {
    const raw = data.get(name);
    const value = typeof raw === 'string' ? raw.trim() : '';
    values[name] = value;

    if (!value) {
      if (rule.required) errors[name] = `${rule.label} is required.`;
      continue;
    }
    if (value.length > rule.max) {
      errors[name] = `${rule.label} must be ${rule.max} characters or fewer.`;
    } else if (rule.kind === 'email' && !EMAIL_RE.test(value)) {
      errors[name] = 'Enter a valid email address.';
    } else if (rule.kind === 'phone' && !PHONE_RE.test(value)) {
      errors[name] = 'Enter a valid phone number.';
    } else if (rule.kind === 'postcode' && !POSTCODE_RE.test(value)) {
      errors[name] = 'Enter a valid UK postcode.';
    }
  }

  // Need at least one way to reply.
  if (!values['email'] && !values['phone'] && !errors['email']) {
    errors['email'] = 'Enter an email address or phone number so we can reply.';
  }

  return { ok: Object.keys(errors).length === 0, values, errors };
}

/** Plain-text email body listing every submitted field. */
export function formatSubmission(type: FormType, values: Record<string, string>): string {
  const rules = FORM_FIELDS[type];
  const lines = Object.entries(rules)
    .filter(([name]) => values[name])
    .map(([name, rule]) => `${rule.label}:\n${values[name]}\n`);
  return `${FORM_LABEL[type]} from the website\n\n${lines.join('\n')}`;
}
