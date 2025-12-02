import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  const origin = requestUrl.origin;

  if (!code) {
    // Redirect to login if no code provided
    return NextResponse.redirect(new URL('/auth/login', origin));
  }

  try {
    const supabase = await createClient();

    // Exchange code for session
    const { data: sessionData, error: sessionError } = await supabase.auth.exchangeCodeForSession(code);

    if (sessionError || !sessionData.user) {
      console.error('OAuth session error:', sessionError);
      return NextResponse.redirect(new URL('/auth/login?error=oauth_failed', origin));
    }

    const user = sessionData.user;

    // Check if professional profile exists
    const { data: existingProfile } = await supabase
      .from('professional_profiles')
      .select('id, profile_completed, current_step')
      .eq('user_id', user.id)
      .single();

    if (existingProfile) {
      // Profile exists - redirect based on completion status
      if (existingProfile.profile_completed && existingProfile.current_step >= 6) {
        // Profile is complete - redirect to dashboard
        return NextResponse.redirect(new URL('/pro-dashboard/account', origin));
      } else {
        // Profile is incomplete - redirect to registration to continue
        return NextResponse.redirect(new URL('/auth/register', origin));
      }
    }

    // Profile was created by database trigger with minimal data
    // Update it with OAuth metadata
    const userMetadata = user.user_metadata || {};
    const email = user.email || '';

    // Extract name from metadata (Google provides full_name, given_name, family_name)
    const fullName = userMetadata.full_name || userMetadata.name || '';
    const firstName = userMetadata.given_name || userMetadata.first_name || fullName.split(' ')[0] || '';
    const lastName = userMetadata.family_name || userMetadata.last_name || fullName.split(' ').slice(1).join(' ') || '';

    // Get profile picture from OAuth provider
    const profilePictureUrl = userMetadata.avatar_url || userMetadata.picture || null;

    // Get phone if available (not typically provided by Google)
    const phone = userMetadata.phone || userMetadata.phone_number || '';

    // Update professional profile with OAuth data (only if values are not empty)
    const updateData: Record<string, unknown> = {
      email: email,
      updated_at: new Date().toISOString(),
    };

    // Only update non-empty values
    if (firstName) updateData.first_name = firstName;
    if (lastName) updateData.last_name = lastName;
    if (profilePictureUrl) updateData.profile_picture_url = profilePictureUrl;
    if (phone) updateData.phone = phone;

    const { error: updateError } = await supabase
      .from('professional_profiles')
      .update(updateData)
      .eq('user_id', user.id);

    if (updateError) {
      console.error('Error updating professional profile with OAuth data:', updateError);
      return NextResponse.redirect(new URL('/auth/login?error=profile_update_failed', origin));
    }

    // Redirect to registration to complete profile (step 2 onwards)
    return NextResponse.redirect(new URL('/auth/register', origin));

  } catch (error) {
    console.error('OAuth callback error:', error);
    return NextResponse.redirect(new URL('/auth/login?error=oauth_callback_failed', origin));
  }
}
