import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';

import { SITE } from '@/config/site';
import {
  FORM_LABEL,
  FORM_TYPES,
  HONEYPOT_FIELD,
  MIN_FILL_MS,
  formatSubmission,
  validateForm,
  type FormType,
} from '@/lib/forms';

export const prerender = false;

interface ApiResult {
  ok: boolean;
  message: string;
  errors?: Record<string, string>;
}

const wantsJson = (request: Request) => (request.headers.get('accept') ?? '').includes('application/json');

/** JSON for the enhanced (JS) form; a redirect for the plain HTML fallback. */
function respond(request: Request, result: ApiResult, status: number, type: FormType | null): Response {
  if (wantsJson(request)) {
    return Response.json(result, { status });
  }
  if (result.ok) {
    return Response.redirect(new URL(`/thanks${type ? `?form=${type}` : ''}`, request.url), 303);
  }
  const back = new URL(request.headers.get('referer') ?? '/contact', request.url);
  back.searchParams.set('error', result.message);
  back.hash = 'enquiry-form';
  return Response.redirect(back, 303);
}

async function verifyTurnstile(token: string, ip: string): Promise<boolean> {
  const secret = env.TURNSTILE_SECRET_KEY;
  if (!secret) return true; // Turnstile not configured — rely on honeypot + rate limit.
  if (!token) return false;
  const body = new FormData();
  body.set('secret', secret);
  body.set('response', token);
  if (ip) body.set('remoteip', ip);
  const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', { method: 'POST', body });
  const data = (await res.json()) as { success?: boolean };
  return data.success === true;
}

async function sendEmail(type: FormType, values: Record<string, string>): Promise<boolean> {
  const apiKey = env.RESEND_API_KEY;
  const subjectDetail = type === 'machine' ? values['machineRef'] : values['name'];
  const subject = `${FORM_LABEL[type]}: ${subjectDetail ?? ''}`.slice(0, 180);
  const text = formatSubmission(type, values);

  if (!apiKey) {
    if (import.meta.env.DEV) {
      console.info(`[enquiry] RESEND_API_KEY not set — email not sent.\n\n${subject}\n\n${text}`);
      return true;
    }
    console.error('[enquiry] RESEND_API_KEY is not configured.');
    return false;
  }

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: env.ENQUIRY_FROM_EMAIL,
      to: [env.ENQUIRY_TO_EMAIL],
      ...(values['email'] ? { reply_to: values['email'] } : {}),
      subject,
      text,
    }),
  });
  if (!res.ok) {
    console.error(`[enquiry] Resend responded ${res.status}: ${await res.text()}`);
  }
  return res.ok;
}

export const POST: APIRoute = async ({ request }) => {
  let data: FormData;
  try {
    data = await request.formData();
  } catch {
    return respond(request, { ok: false, message: 'Invalid submission.' }, 400, null);
  }

  const rawType = data.get('formType');
  const type = FORM_TYPES.find((t) => t === rawType);
  if (!type) {
    return respond(request, { ok: false, message: 'Unknown form.' }, 400, null);
  }

  const success: ApiResult = { ok: true, message: 'Thanks — we’ve received your message and will be in touch shortly.' };

  // Spam traps: honeypot filled, or submitted faster than a person could type.
  // Respond as if successful so bots get no signal.
  const honeypot = data.get(HONEYPOT_FIELD);
  if (typeof honeypot === 'string' && honeypot.trim() !== '') {
    return respond(request, success, 200, type);
  }
  const startedAt = Number(data.get('_started'));
  if (Number.isFinite(startedAt) && startedAt > 0 && Date.now() - startedAt < MIN_FILL_MS) {
    return respond(request, success, 200, type);
  }

  const ip = request.headers.get('cf-connecting-ip') ?? '';
  const limiter = env.FORM_RATE_LIMITER;
  if (limiter && ip) {
    const { success: allowed } = await limiter.limit({ key: ip });
    if (!allowed) {
      return respond(
        request,
        { ok: false, message: `Too many submissions — please wait a minute or call us on ${SITE.phone.display}.` },
        429,
        type,
      );
    }
  }

  const token = data.get('cf-turnstile-response');
  if (!(await verifyTurnstile(typeof token === 'string' ? token : '', ip))) {
    return respond(request, { ok: false, message: 'Spam check failed — please try again.' }, 400, type);
  }

  const result = validateForm(type, data);
  if (!result.ok) {
    return respond(
      request,
      { ok: false, message: 'Please check the highlighted fields.', errors: result.errors },
      422,
      type,
    );
  }

  const sent = await sendEmail(type, result.values);
  if (!sent) {
    return respond(
      request,
      { ok: false, message: `Sorry, we couldn’t send your message. Please call ${SITE.phone.display} or email ${SITE.email}.` },
      502,
      type,
    );
  }

  return respond(request, success, 200, type);
};

export const ALL: APIRoute = () =>
  new Response('Method Not Allowed', { status: 405, headers: { Allow: 'POST' } });
