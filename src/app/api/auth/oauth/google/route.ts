import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

/**
 * OAuth Initiation Endpoint for Google
 * This endpoint proxies the OAuth request to hide Supabase URL from users
 */
export async function GET(request: Request) {
  // Use explicit base URL from environment to ensure consistency with Google Console
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const redirectUri = `${baseUrl}/api/auth/oauth/callback`;

  try {
    const supabase = await createClient();

    // DEBUG: Log the redirect URI we're using
    console.log('=== OAuth Debug Info ===');
    console.log('Base URL:', baseUrl);
    console.log('Redirect URI:', redirectUri);

    // Initiate OAuth flow with Google
    // The callback will come to our domain instead of Supabase's domain
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: redirectUri,
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
      },
    });

    if (error) {
      console.error('OAuth initiation error:', error);
      return NextResponse.redirect(
        new URL('/nl/auth/login?error=oauth_initiation_failed', baseUrl)
      );
    }

    if (!data.url) {
      console.error('No OAuth URL returned from Supabase');
      return NextResponse.redirect(
        new URL('/nl/auth/login?error=oauth_url_missing', baseUrl)
      );
    }

    // DEBUG: Log the OAuth URL that Supabase generated
    console.log('OAuth URL generated:', data.url);
    console.log('=======================');

    // Redirect user to Google's OAuth consent screen
    return NextResponse.redirect(data.url);
  } catch (error) {
    console.error('OAuth initiation exception:', error);
    return NextResponse.redirect(
      new URL('/nl/auth/login?error=oauth_exception', baseUrl)
    );
  }
}
