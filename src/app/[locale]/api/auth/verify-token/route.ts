import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

/**
 * Token Verification Endpoint
 * Verifies the magic link token and creates a session
 */
export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const token = requestUrl.searchParams.get('token');
  const type = requestUrl.searchParams.get('type');
  const redirect = requestUrl.searchParams.get('redirect') || '/nl/pro-dashboard/account';

  if (!token || !type) {
    return NextResponse.redirect(new URL('/nl/auth/login?error=invalid_token', requestUrl.origin));
  }

  try {
    const supabase = await createClient();

    // Verify the token and create a session
    const { data, error } = await supabase.auth.verifyOtp({
      token_hash: token,
      type: type as 'magiclink',
    });

    if (error || !data.user) {
      console.error('Token verification failed:', error);
      return NextResponse.redirect(
        new URL('/nl/auth/login?error=token_verification_failed', requestUrl.origin)
      );
    }

    // Session created successfully, redirect to the target page
    return NextResponse.redirect(new URL(redirect, requestUrl.origin));
  } catch (error) {
    console.error('Token verification error:', error);
    return NextResponse.redirect(
      new URL('/nl/auth/login?error=verification_failed', requestUrl.origin)
    );
  }
}
