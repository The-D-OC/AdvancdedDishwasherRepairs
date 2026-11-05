import { defineMiddleware } from 'astro:middleware';

/**
 * Protects /admin. Runs only for on-demand requests; prerendered pages are
 * untouched. Supabase modules are loaded lazily so prerendering never needs
 * the Worker environment.
 */
export const onRequest = defineMiddleware(async (context, next) => {
  const { pathname } = context.url;
  const isAdmin = pathname === '/admin' || pathname.startsWith('/admin/');
  if (!isAdmin || context.isPrerendered) return next();

  const [{ sessionClient }, { getAdmin }] = await Promise.all([import('@/lib/supabase'), import('@/lib/auth')]);
  const authHeaders = new Headers();
  const db = sessionClient(context.request, context.cookies, authHeaders);
  context.locals.supabase = db;

  const isLogin = pathname === '/admin/login';
  if (!isLogin) {
    const admin = await getAdmin(db);
    if (!admin) {
      const login = new URL('/admin/login', context.url);
      if (pathname !== '/admin') login.searchParams.set('next', pathname);
      return context.redirect(`${login.pathname}${login.search}`, 303);
    }
    context.locals.admin = admin;
  }

  const response = await next();
  authHeaders.forEach((value, key) => response.headers.set(key, value));
  response.headers.set('X-Robots-Tag', 'noindex, nofollow');
  response.headers.set('Cache-Control', 'no-store');
  return response;
});
