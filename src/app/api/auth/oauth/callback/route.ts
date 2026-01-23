import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { routing } from '@/i18n/routing';

/**
 * OAuth Callback Endpoint
 * This endpoint receives the OAuth callback from Google and exchanges the code for a session
 * It then redirects to our existing auth callback handler for profile processing
 */
export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  const error = requestUrl.searchParams.get('error');
  const origin = requestUrl.origin;

  // Get locale from cookie or default to 'nl'
  const cookies = request.headers.get('cookie') || '';
  const localeCookie = cookies.match(/NEXT_LOCALE=([^;]+)/);
  const locale = localeCookie ? localeCookie[1] : routing.defaultLocale;

  // Handle OAuth error from Google
  if (error) {
    console.error('OAuth error from provider:', error);
    return NextResponse.redirect(
      new URL(`/${locale}/auth/login?error=oauth_provider_error`, origin)
    );
  }

  // Validate authorization code
  if (!code) {
    console.error('No authorization code received from OAuth provider');
    return NextResponse.redirect(
      new URL(`/${locale}/auth/login?error=oauth_no_code`, origin)
    );
  }

  try {
    const supabase = await createClient();

    // Exchange the authorization code for a session
    const { data: sessionData, error: sessionError } = await supabase.auth.exchangeCodeForSession(code);

    if (sessionError) {
      console.error('OAuth code exchange error:', sessionError);
      return NextResponse.redirect(
        new URL(`/${locale}/auth/login?error=oauth_exchange_failed`, origin)
      );
    }

    if (!sessionData.user) {
      console.error('No user data received after code exchange');
      return NextResponse.redirect(
        new URL(`/${locale}/auth/login?error=oauth_no_user`, origin)
      );
    }

    // Session created successfully
    // Now redirect to our existing callback handler which processes the profile
    // We pass the code again so the existing handler can work as before
    return NextResponse.redirect(
      new URL(`/api/auth/callback?code=${code}`, origin)
    );
  } catch (error) {
    console.error('OAuth callback exception:', error);
    return NextResponse.redirect(
      new URL(`/${locale}/auth/login?error=oauth_callback_failed`, origin)
    );
  }
}
