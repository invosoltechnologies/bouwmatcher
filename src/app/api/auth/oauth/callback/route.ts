import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { routing } from '@/i18n/routing';
import { createClient as createAdminClient } from '@supabase/supabase-js';

/**
 * Custom Google OAuth Callback Endpoint
 * Handles OAuth callback, exchanges code for tokens, and creates Supabase session
 */
export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  const state = requestUrl.searchParams.get('state');
  const error = requestUrl.searchParams.get('error');
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const locale = routing.defaultLocale;

  // Handle OAuth error from Google
  if (error) {
    console.error('OAuth error from Google:', error);
    return NextResponse.redirect(
      new URL(`/${locale}/auth/login?error=oauth_provider_error`, baseUrl)
    );
  }

  // Validate authorization code and state
  if (!code || !state) {
    console.error('Missing code or state parameter');
    return NextResponse.redirect(
      new URL(`/${locale}/auth/login?error=oauth_invalid_request`, baseUrl)
    );
  }

  try {
    // Verify state to prevent CSRF attacks
    const cookieStore = await cookies();
    const storedState = cookieStore.get('oauth_state')?.value;

    if (!storedState || storedState !== state) {
      console.error('State mismatch - possible CSRF attack');
      return NextResponse.redirect(
        new URL(`/${locale}/auth/login?error=oauth_state_mismatch`, baseUrl)
      );
    }

    // Clear the state cookie
    cookieStore.delete('oauth_state');

    // Exchange authorization code for access token
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        code,
        client_id: process.env.GOOGLE_CLIENT_ID!,
        client_secret: process.env.GOOGLE_CLIENT_SECRET!,
        redirect_uri: `${baseUrl}/api/auth/oauth/callback`,
        grant_type: 'authorization_code',
      }),
    });

    if (!tokenResponse.ok) {
      const errorData = await tokenResponse.text();
      console.error('Token exchange failed:', errorData);
      return NextResponse.redirect(
        new URL(`/${locale}/auth/login?error=oauth_token_exchange_failed`, baseUrl)
      );
    }

    const tokens = await tokenResponse.json();

    // Fetch user info from Google
    const userInfoResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: {
        Authorization: `Bearer ${tokens.access_token}`,
      },
    });

    if (!userInfoResponse.ok) {
      console.error('Failed to fetch user info from Google');
      return NextResponse.redirect(
        new URL(`/${locale}/auth/login?error=oauth_userinfo_failed`, baseUrl)
      );
    }

    const googleUser = await userInfoResponse.json();

    console.log('=== Google User Info ===');
    console.log('Email:', googleUser.email);
    console.log('Name:', googleUser.name);
    console.log('=======================');

    // Create Supabase admin client
    const supabaseAdmin = createAdminClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // Check if user exists in Supabase Auth
    const { data: existingUsers } = await supabaseAdmin.auth.admin.listUsers();
    const existingUser = existingUsers?.users.find(u => u.email === googleUser.email);

    let userId: string;

    if (existingUser) {
      // User exists, use their ID
      userId = existingUser.id;
      console.log('Existing user found:', userId);
    } else {
      // Create new user in Supabase Auth
      const { data: newUser, error: createError } = await supabaseAdmin.auth.admin.createUser({
        email: googleUser.email,
        email_confirm: true, // Auto-confirm email for OAuth users
        user_metadata: {
          full_name: googleUser.name,
          given_name: googleUser.given_name,
          family_name: googleUser.family_name,
          avatar_url: googleUser.picture,
          provider: 'google',
        },
      });

      if (createError || !newUser.user) {
        console.error('Failed to create user in Supabase:', createError);
        return NextResponse.redirect(
          new URL(`/${locale}/auth/login?error=oauth_user_creation_failed`, baseUrl)
        );
      }

      userId = newUser.user.id;
      console.log('New user created:', userId);
    }

    // Check if professional profile exists
    const { data: existingProfile } = await supabaseAdmin
      .from('professional_profiles')
      .select('id, profile_completed, current_step')
      .eq('user_id', userId)
      .single();

    if (!existingProfile) {
      // Create professional profile (trigger should handle this, but create manually if needed)
      const updateData: Record<string, unknown> = {
        email: googleUser.email,
        first_name: googleUser.given_name || googleUser.name?.split(' ')[0] || '',
        last_name: googleUser.family_name || googleUser.name?.split(' ').slice(1).join(' ') || '',
        profile_picture_url: googleUser.picture,
        current_step: 2, // Step 1 (account creation) is complete
        updated_at: new Date().toISOString(),
      };

      const { error: profileError } = await supabaseAdmin
        .from('professional_profiles')
        .upsert({
          user_id: userId,
          ...updateData,
        });

      if (profileError) {
        console.error('Failed to create/update professional profile:', profileError);
      }
    } else {
      // Update existing profile with OAuth data
      const updateData: Record<string, unknown> = {
        email: googleUser.email,
        updated_at: new Date().toISOString(),
      };

      if (googleUser.given_name) updateData.first_name = googleUser.given_name;
      if (googleUser.family_name) updateData.last_name = googleUser.family_name;
      if (googleUser.picture) updateData.profile_picture_url = googleUser.picture;

      await supabaseAdmin
        .from('professional_profiles')
        .update(updateData)
        .eq('user_id', userId);
    }

    // Generate a session token for the user
    // We'll create a session by signing them in with a one-time token
    const { data: tokenData, error: tokenError } = await supabaseAdmin.auth.admin.generateLink({
      type: 'magiclink',
      email: googleUser.email,
    });

    if (tokenError || !tokenData) {
      console.error('Failed to generate auth token:', tokenError);
      return NextResponse.redirect(
        new URL(`/${locale}/auth/login?error=oauth_session_failed`, baseUrl)
      );
    }

    // Extract the verification token from the magic link
    const tokenUrl = new URL(tokenData.properties.action_link);
    const verificationToken = tokenUrl.searchParams.get('token');

    if (!verificationToken) {
      console.error('No verification token in magic link');
      return NextResponse.redirect(
        new URL(`/${locale}/auth/login?error=oauth_session_failed`, baseUrl)
      );
    }

    // Redirect to a session verification endpoint with the token
    const sessionUrl = new URL(`/${locale}/api/auth/verify-token`, baseUrl);
    sessionUrl.searchParams.set('token', verificationToken);
    sessionUrl.searchParams.set('type', 'magiclink');

    // Check profile completion for final redirect
    const { data: profile } = await supabaseAdmin
      .from('professional_profiles')
      .select('profile_completed, current_step')
      .eq('user_id', userId)
      .single();

    const isComplete = profile?.profile_completed && profile?.current_step >= 6;
    sessionUrl.searchParams.set('redirect', isComplete ? `/${locale}/pro-dashboard/account` : `/${locale}/auth/register`);

    return NextResponse.redirect(sessionUrl.toString());

  } catch (error) {
    console.error('OAuth callback error:', error);
    return NextResponse.redirect(
      new URL(`/${locale}/auth/login?error=oauth_callback_failed`, baseUrl)
    );
  }
}
