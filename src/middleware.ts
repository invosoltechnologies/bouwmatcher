import { createServerClient } from '@supabase/ssr';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

// Create the internationalization middleware
const intlMiddleware = createMiddleware(routing);

export async function middleware(request: NextRequest) {
  // Handle internationalization first
  const pathname = request.nextUrl.pathname;

  // Check if the pathname is missing a locale
  const pathnameIsMissingLocale = routing.locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  // If no locale in pathname, let next-intl handle the redirect
  if (pathnameIsMissingLocale) {
    return intlMiddleware(request);
  }
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          cookiesToSet.forEach(({ name, value, options }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // Refresh session if expired - required for Server Components
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Extract locale from pathname
  const locale = pathname.split('/')[1];
  const pathnameWithoutLocale = pathname.replace(`/${locale}`, '') || '/';

  const isAuthPage = pathnameWithoutLocale.startsWith('/auth');
  const isProDashboard = pathnameWithoutLocale.startsWith('/pro-dashboard');
  const isDashboard = pathnameWithoutLocale.startsWith('/dashboard');

  // Define public routes that don't require authentication
  const publicRoutes = [
    '/',
    '/contact',
    '/faq-klanten',
    '/faq-specialisten',
    '/privacy-policy',
    '/terms',
    '/cookies-policy',
    '/disclaimer',
    '/categories',
    '/service',
    '/blog',
    '/create-project',
  ];

  const isPublicRoute = publicRoutes.some(route =>
    pathnameWithoutLocale === route || pathnameWithoutLocale.startsWith(`${route}/`)
  );

  // If user is not signed in
  if (!user) {
    // Allow access to public routes and auth pages
    if (isPublicRoute || isAuthPage) {
      return supabaseResponse;
    }

    // Redirect to login if trying to access protected routes
    const redirectUrl = new URL(`/${locale}/auth/login`, request.url);
    redirectUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(redirectUrl);
  }

  // User is signed in - check profile completion status
  const { data: profiles } = await supabase
    .from('professional_profiles')
    .select('profile_completed, current_step')
    .eq('user_id', user.id)
    .limit(1);

  const profile = profiles && profiles.length > 0 ? profiles[0] : null;
  const isProfileCompleted = profile?.profile_completed === true;
  const currentStep = profile?.current_step || 1;

  // If user is trying to access pro-dashboard
  if (isProDashboard) {
    // Check if profile is completed
    if (!isProfileCompleted || currentStep < 6) {
      // Redirect to registration to complete profile
      return NextResponse.redirect(new URL(`/${locale}/auth/register`, request.url));
    }
    // Profile is completed, allow access
    return supabaseResponse;
  }

  // If user is trying to access auth pages
  if (isAuthPage) {
    // Allow access to /auth/register if profile is not completed
    if (pathnameWithoutLocale.startsWith('/auth/register')) {
      if (!isProfileCompleted || currentStep < 6) {
        return supabaseResponse;
      }
      // Profile is completed, redirect to dashboard
      return NextResponse.redirect(new URL(`/${locale}/pro-dashboard/account`, request.url));
    }

    // For other auth pages (like login), redirect to dashboard if profile is completed
    if (isProfileCompleted && currentStep >= 6) {
      return NextResponse.redirect(new URL(`/${locale}/pro-dashboard/account`, request.url));
    }

    // Otherwise redirect to registration to complete profile
    return NextResponse.redirect(new URL(`/${locale}/auth/register`, request.url));
  }

  return supabaseResponse;
}

// Configure which routes to run middleware on
export const config = {
  matcher: [
    // Enable a redirect to a matching locale at the root
    '/',

    // Set a cookie to remember the previous locale for
    // all requests that have a locale prefix
    '/(nl|en)/:path*',

    // Enable redirects that add missing locales
    // Exclude: _next, _vercel, api, files with extensions
    '/((?!api|_next|_vercel|.*\\..*).*)',
  ],
};
