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

  // If user is not signed in and the current path is not /auth/login,
  // redirect the user to /auth/login
  if (!user && !request.nextUrl.pathname.startsWith('/auth')) {
    const redirectUrl = new URL('/auth/login', request.url);
    redirectUrl.searchParams.set('redirect', request.nextUrl.pathname);
    return NextResponse.redirect(redirectUrl);
  }

  // If user is signed in and trying to access auth pages
  if (user && request.nextUrl.pathname.startsWith('/auth')) {
    // Allow access to /auth/register if profile is not completed
    if (request.nextUrl.pathname.startsWith('/auth/register')) {
      // Check if profile is completed
      const { data: profiles } = await supabase
        .from('professional_profiles')
        .select('profile_completed')
        .eq('user_id', user.id)
        .limit(1);

      // If profile not completed, allow access to registration
      if (profiles && profiles.length > 0 && !profiles[0].profile_completed) {
        return supabaseResponse;
      }
    }

    // Otherwise, redirect to pro-dashboard
    return NextResponse.redirect(new URL('/pro-dashboard/account', request.url));
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
