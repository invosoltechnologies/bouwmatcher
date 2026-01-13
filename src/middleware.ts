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
  const isAdminRoute = pathnameWithoutLocale === '/admin' || pathnameWithoutLocale.startsWith('/admin/');
  const isAdminDashboard = pathnameWithoutLocale.startsWith('/admin-dashboard');
  const isAdminLoginPage = pathnameWithoutLocale === '/auth/admin-login';
  const isRegisterPage = pathnameWithoutLocale === '/auth/register' || pathnameWithoutLocale.startsWith('/auth/register/');

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
    '/project-status', // Public project status page - accessible with token query param
  ];

  const isPublicRoute = publicRoutes.some(route =>
    pathnameWithoutLocale === route || pathnameWithoutLocale.startsWith(`${route}/`)
  );

  // If user is not signed in
  if (!user) {
    // Allow access to public routes, auth pages (including admin login)
    if (isPublicRoute || isAuthPage) {
      return supabaseResponse;
    }

    // If trying to access admin routes (/admin or /admin-dashboard), redirect to admin login
    if (isAdminRoute || isAdminDashboard) {
      return NextResponse.redirect(new URL(`/${locale}/auth/admin-login`, request.url));
    }

    // Redirect to login if trying to access protected routes
    const redirectUrl = new URL(`/${locale}/auth/login`, request.url);
    redirectUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(redirectUrl);
  }

  // Check if user is admin by querying admin_users table
  const { data: adminUser } = await supabase
    .from('admin_users')
    .select('id, email, role, is_active')
    .eq('email', user.email)
    .eq('is_active', true)
    .single();

  const isUserAdmin = !!adminUser;

  // If user is trying to access admin routes
  if (isAdminRoute || isAdminDashboard) {
    if (!isUserAdmin) {
      // Non-admin trying to access admin routes - redirect to admin login
      return NextResponse.redirect(new URL(`/${locale}/auth/admin-login`, request.url));
    }
    // Admin user accessing /admin - redirect to admin dashboard
    if (isAdminRoute) {
      return NextResponse.redirect(new URL(`/${locale}/admin-dashboard`, request.url));
    }
    // Admin user accessing admin dashboard - allow access
    return supabaseResponse;
  }

  // If admin is trying to access other pages (except admin login), redirect to admin dashboard
  if (isUserAdmin && !isAdminLoginPage && !isPublicRoute) {
    return NextResponse.redirect(new URL(`/${locale}/admin-dashboard`, request.url));
  }

  // If admin is already logged in and accessing admin login, redirect to dashboard
  if (isUserAdmin && isAdminLoginPage) {
    return NextResponse.redirect(new URL(`/${locale}/admin-dashboard`, request.url));
  }

  // User is signed in (non-admin) - check if they're a professional
  const { data: professionalProfile } = await supabase
    .from('professional_profiles')
    .select('id, profile_completed, current_step, is_active')
    .eq('user_id', user.id)
    .single();

  const isProfessional = !!professionalProfile;
  const isProfileCompleted = professionalProfile?.profile_completed === true;
  const currentStep = professionalProfile?.current_step || 1;

  // If user is trying to access pro-dashboard
  if (isProDashboard) {
    // Check if user is a professional
    if (!isProfessional) {
      // Not a professional - sign out and redirect to login
      await supabase.auth.signOut();
      return NextResponse.redirect(new URL(`/${locale}/auth/login`, request.url));
    }
    // Check if profile is completed
    if (!isProfileCompleted || currentStep < 6) {
      // Redirect to registration to complete profile
      return NextResponse.redirect(new URL(`/${locale}/auth/register`, request.url));
    }
    // Check if profile is active
    if (!professionalProfile?.is_active) {
      // Profile is inactive - sign out and redirect to login
      await supabase.auth.signOut();
      return NextResponse.redirect(new URL(`/${locale}/auth/login`, request.url));
    }
    // Profile is completed and active, allow access
    return supabaseResponse;
  }

  // If user is trying to access auth pages
  if (isAuthPage) {
    // Professional user handling
    if (isProfessional) {
      // Allow access to /auth/register if profile is not completed
      if (isRegisterPage) {
        if (!isProfileCompleted || currentStep < 6) {
          return supabaseResponse;
        }
        // Profile is completed, redirect to pro dashboard
        return NextResponse.redirect(new URL(`/${locale}/pro-dashboard/account`, request.url));
      }

      // For other auth pages (like login), redirect to dashboard if profile is completed
      if (isProfileCompleted && currentStep >= 6) {
        return NextResponse.redirect(new URL(`/${locale}/pro-dashboard/account`, request.url));
      }

      // Otherwise redirect to registration to complete profile
      return NextResponse.redirect(new URL(`/${locale}/auth/register`, request.url));
    }

    // User exists in auth but not in professional_profiles table - allow auth page access
    // This allows new signups to proceed
    return supabaseResponse;
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
