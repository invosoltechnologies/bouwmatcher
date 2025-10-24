import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function middleware(request: NextRequest) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!;

  const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: false, // Middleware doesn't need to persist
    },
  });

  // Check for Supabase session cookies
  // Supabase stores tokens in cookies with project-specific names
  const cookieNames = [
    `sb-${supabaseUrl.split('//')[1].split('.')[0]}-auth-token`,
    'sb-access-token',
    'sb-refresh-token',
  ];

  let hasValidSession = false;

  // Try to get session from cookies
  for (const cookieName of cookieNames) {
    const cookie = request.cookies.get(cookieName);
    if (cookie) {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          hasValidSession = true;
          break;
        }
      } catch (error) {
        // Continue checking other cookies
        continue;
      }
    }
  }

  if (hasValidSession) {
    // User is authenticated, allow access
    return NextResponse.next();
  }

  // No valid session, redirect to login with original URL
  const redirectUrl = new URL('/auth/login', request.url);
  redirectUrl.searchParams.set('redirect', request.nextUrl.pathname);
  return NextResponse.redirect(redirectUrl);
}

// Configure which routes require authentication
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/profile/:path*',
    '/projects/:path*',
    // Add more protected routes as needed
  ],
};
