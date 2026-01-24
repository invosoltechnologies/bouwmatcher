import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

/**
 * Custom Google OAuth Initiation Endpoint
 * Generates Google OAuth URL directly without using Supabase OAuth
 * This ensures users only see bouwmatcher.be domain throughout the flow
 */
export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const clientId = process.env.GOOGLE_CLIENT_ID;

  if (!clientId) {
    console.error('GOOGLE_CLIENT_ID is not configured');
    return NextResponse.redirect(
      new URL('/nl/auth/login?error=oauth_config_missing', baseUrl)
    );
  }

  try {
    // Generate random state for CSRF protection
    const state = crypto.randomUUID();

    // Store state in cookie for verification in callback
    const cookieStore = await cookies();
    cookieStore.set('oauth_state', state, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 600, // 10 minutes
      path: '/',
    });

    // Build Google OAuth authorization URL
    const authUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth');
    authUrl.searchParams.set('client_id', clientId);
    authUrl.searchParams.set('redirect_uri', `${baseUrl}/api/auth/oauth/callback`);
    authUrl.searchParams.set('response_type', 'code');
    authUrl.searchParams.set('scope', 'openid email profile');
    authUrl.searchParams.set('state', state);
    authUrl.searchParams.set('access_type', 'offline');
    authUrl.searchParams.set('prompt', 'consent');

    console.log('=== Custom OAuth Debug ===');
    console.log('Redirect URI:', `${baseUrl}/api/auth/oauth/callback`);
    console.log('State:', state);
    console.log('=========================');

    // Redirect user to Google OAuth consent screen
    return NextResponse.redirect(authUrl.toString());
  } catch (error) {
    console.error('OAuth initiation error:', error);
    return NextResponse.redirect(
      new URL('/nl/auth/login?error=oauth_initiation_failed', baseUrl)
    );
  }
}
