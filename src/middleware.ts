import { createServerClient } from '@supabase/ssr';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
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

  const pathname = request.nextUrl.pathname;
  const isAuthPage = pathname.startsWith('/auth');
  const isProDashboard = pathname.startsWith('/pro-dashboard');

  // If user is not signed in
  if (!user) {
    // Redirect to login if trying to access protected routes
    if (!isAuthPage) {
      const redirectUrl = new URL('/auth/login', request.url);
      redirectUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(redirectUrl);
    }
    // Allow access to auth pages
    return supabaseResponse;
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
      return NextResponse.redirect(new URL('/auth/register', request.url));
    }
    // Profile is completed, allow access
    return supabaseResponse;
  }

  // If user is trying to access auth pages
  if (isAuthPage) {
    // Allow access to /auth/register if profile is not completed
    if (pathname.startsWith('/auth/register')) {
      if (!isProfileCompleted || currentStep < 6) {
        return supabaseResponse;
      }
      // Profile is completed, redirect to dashboard
      return NextResponse.redirect(new URL('/pro-dashboard/account', request.url));
    }

    // For other auth pages (like login), redirect to dashboard if profile is completed
    if (isProfileCompleted && currentStep >= 6) {
      return NextResponse.redirect(new URL('/pro-dashboard/account', request.url));
    }

    // Otherwise redirect to registration to complete profile
    return NextResponse.redirect(new URL('/auth/register', request.url));
  }

  return supabaseResponse;
}

// Configure which routes to run middleware on
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/pro-dashboard/:path*',
    '/profile/:path*',
    '/projects/:path*',
    '/auth/:path*',
  ],
};
