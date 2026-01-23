'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export interface SignUpData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
}

export interface SignInData {
  email: string;
  password: string;
}

export interface AuthResult {
  success: boolean;
  error?: string;
  user?: {
    id: string;
    email: string;
  };
  profile?: unknown;
}

/**
 * Sign up a new professional user
 * Server action - runs on server only
 */
export async function signUpProfessionalAction(data: SignUpData): Promise<AuthResult> {
  const supabase = await createClient();

  try {
    // Create auth user - profile will be auto-created by trigger
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          first_name: data.firstName,
          last_name: data.lastName,
          phone: data.phone,
        },
      },
    });

    if (authError) {
      return {
        success: false,
        error: authError.message,
      };
    }

    if (!authData.user) {
      return {
        success: false,
        error: 'User creation failed',
      };
    }

    // Profile is created automatically by database trigger
    let profile = null;
    if (authData.session) {
      // User is auto-confirmed, wait briefly and fetch profile
      await new Promise(resolve => setTimeout(resolve, 500));

      // Update current_step to 2 since step 1 (account creation) is complete
      await supabase
        .from('professional_profiles')
        .update({ current_step: 2 })
        .eq('user_id', authData.user.id);

      const { data: profileData } = await supabase
        .from('professional_profiles')
        .select('*')
        .eq('user_id', authData.user.id)
        .single();

      profile = profileData;
    }

    revalidatePath('/', 'layout');

    return {
      success: true,
      user: {
        id: authData.user.id,
        email: authData.user.email || '',
      },
      profile,
    };
  } catch (error) {
    console.error('Sign up error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An error occurred during sign up',
    };
  }
}

/**
 * Sign in an existing user (Professional users only)
 * Server action - runs on server only
 */
export async function signInAction(data: SignInData): Promise<AuthResult> {
  const supabase = await createClient();

  try {
    // Check if user is an admin (admins cannot login through professional route)
    const { data: adminUser } = await supabase
      .from('admin_users')
      .select('id, email')
      .eq('email', data.email)
      .eq('is_active', true)
      .single();

    if (adminUser) {
      return {
        success: false,
        error: 'Please use the admin login page',
      };
    }

    const { data: authData, error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });

    if (error) {
      return {
        success: false,
        error: error.message,
      };
    }

    // Check if user has a professional profile
    const { data: professionalProfile } = await supabase
      .from('professional_profiles')
      .select('id, is_active')
      .eq('user_id', authData.user.id)
      .single();

    if (!professionalProfile) {
      // Sign out if not a professional
      await supabase.auth.signOut();
      return {
        success: false,
        error: 'No professional profile found. Please register as a professional.',
      };
    }

    if (!professionalProfile.is_active) {
      // Sign out if profile is inactive
      await supabase.auth.signOut();
      return {
        success: false,
        error: 'Your account is inactive. Please contact support.',
      };
    }

    // Update last login
    await supabase
      .from('professional_profiles')
      .update({ last_login_at: new Date().toISOString() })
      .eq('user_id', authData.user.id);

    revalidatePath('/', 'layout');

    return {
      success: true,
      user: {
        id: authData.user.id,
        email: authData.user.email || '',
      },
    };
  } catch (error) {
    console.error('Sign in error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An error occurred during sign in',
    };
  }
}

/**
 * Sign out the current user
 * Server action - runs on server only
 */
export async function signOutAction(): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient();

  try {
    const { error } = await supabase.auth.signOut();

    if (error) {
      return {
        success: false,
        error: error.message,
      };
    }

    revalidatePath('/', 'layout');

    return {
      success: true,
    };
  } catch (error) {
    console.error('Sign out error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An error occurred during sign out',
    };
  }
}

/**
 * Get the current user session
 * Server action - runs on server only
 */
export async function getSessionAction() {
  const supabase = await createClient();

  try {
    const { data: { session }, error } = await supabase.auth.getSession();

    if (error) {
      console.error('Get session error:', error);
      return null;
    }

    return session;
  } catch (error) {
    console.error('Get session error:', error);
    return null;
  }
}

/**
 * Get the current user
 * Server action - runs on server only
 */
export async function getCurrentUserAction() {
  const supabase = await createClient();

  try {
    const { data: { user }, error } = await supabase.auth.getUser();

    if (error) {
      console.error('Get user error:', error);
      return null;
    }

    return user;
  } catch (error) {
    console.error('Get user error:', error);
    return null;
  }
}

/**
 * Get professional profile by user_id
 * Server action - runs on server only
 */
export async function getProfessionalProfileAction(userId?: string) {
  const supabase = await createClient();

  try {
    // If no userId provided, get current user
    let targetUserId = userId;
    if (!targetUserId) {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return null;
      targetUserId = user.id;
    }

    const { data, error } = await supabase
      .from('professional_profiles')
      .select('*')
      .eq('user_id', targetUserId)
      .single();

    if (error) {
      console.error('Get profile error:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Get profile error:', error);
    return null;
  }
}

/**
 * Update professional profile
 * Server action - runs on server only
 */
export async function updateProfessionalProfileAction(
  updates: Record<string, unknown>
): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient();

  try {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return {
        success: false,
        error: 'User not authenticated',
      };
    }

    const { error } = await supabase
      .from('professional_profiles')
      .update(updates)
      .eq('user_id', user.id);

    if (error) {
      return {
        success: false,
        error: error.message,
      };
    }

    revalidatePath('/', 'layout');

    return {
      success: true,
    };
  } catch (error) {
    console.error('Update profile error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An error occurred',
    };
  }
}

/**
 * Sign in with OAuth provider (Google, Facebook, Apple)
 * Returns the OAuth URL for client-side redirect
 * Uses our proxy endpoint to hide Supabase domain from users
 */
export async function getOAuthUrlAction(
  provider: 'google' | 'facebook' | 'apple'
): Promise<{ success: boolean; error?: string; url?: string }> {
  try {
    // Use our proxy endpoint instead of calling Supabase directly
    // This ensures users only see our domain (bouwmatcher.be) throughout the OAuth flow
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const url = `${baseUrl}/api/auth/oauth/${provider}`;

    return {
      success: true,
      url,
    };
  } catch (error) {
    console.error('OAuth sign in error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An error occurred',
    };
  }
}

/**
 * Send password reset email
 * Server action - runs on server only
 */
export async function sendPasswordResetAction(
  email: string
): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient();

  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/auth/reset-password`,
    });

    if (error) {
      return {
        success: false,
        error: error.message,
      };
    }

    return {
      success: true,
    };
  } catch (error) {
    console.error('Password reset email error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An error occurred while sending reset email',
    };
  }
}

/**
 * Update password with new password
 * Server action - runs on server only
 * Used after clicking reset link from email
 */
export async function resetPasswordAction(
  newPassword: string
): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient();

  try {
    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) {
      return {
        success: false,
        error: error.message,
      };
    }

    revalidatePath('/', 'layout');

    return {
      success: true,
    };
  } catch (error) {
    console.error('Password reset error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An error occurred while resetting password',
    };
  }
}