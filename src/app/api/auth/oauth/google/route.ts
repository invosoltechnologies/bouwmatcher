import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

/**
 * OAuth Initiation Endpoint for Google
 * This endpoint proxies the OAuth request to hide Supabase URL from users
 */
export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const origin = requestUrl.origin;

  try {
    const supabase = await createClient();

    // Initiate OAuth flow with Google
    // The callback will come to our domain instead of Supabase's domain
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${origin}/api/auth/oauth/callback`,
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
      },
    });

    if (error) {
      console.error('OAuth initiation error:', error);
      return NextResponse.redirect(
        new URL('/auth/login?error=oauth_initiation_failed', origin)
      );
    }

    if (!data.url) {
      console.error('No OAuth URL returned from Supabase');
      return NextResponse.redirect(
        new URL('/auth/login?error=oauth_url_missing', origin)
      );
    }

    // Redirect user to Google's OAuth consent screen
    return NextResponse.redirect(data.url);
  } catch (error) {
    console.error('OAuth initiation exception:', error);
    return NextResponse.redirect(
      new URL('/auth/login?error=oauth_exception', origin)
    );
  }
}
