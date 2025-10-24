import { supabase } from './client';

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

/**
 * Sign up a new professional user
 * The professional_profiles entry is auto-created by database trigger
 */
export async function signUpProfessional(data: SignUpData) {
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

    if (authError) throw authError;
    if (!authData.user) throw new Error('User creation failed');

    // Profile is created automatically by database trigger
    let profile = null;
    if (authData.session) {
      // User is auto-confirmed, wait briefly and fetch profile
      await new Promise(resolve => setTimeout(resolve, 500));
      profile = await getProfessionalProfile(authData.user.id);
    }

    return {
      user: authData.user,
      profile,
      session: authData.session
    };
  } catch (error) {
    console.error('Sign up error:', error);
    throw error;
  }
}

/**
 * Sign in an existing user
 */
export async function signIn(data: SignInData) {
  try {
    const { data: authData, error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });

    if (error) throw error;

    // Update last login
    if (authData.user) {
      await supabase
        .from('professional_profiles')
        .update({ last_login_at: new Date().toISOString() })
        .eq('user_id', authData.user.id);
    }

    return authData;
  } catch (error) {
    console.error('Sign in error:', error);
    throw error;
  }
}

/**
 * Sign out the current user
 */
export async function signOut() {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  } catch (error) {
    console.error('Sign out error:', error);
    throw error;
  }
}

/**
 * Get the current user session
 */
export async function getSession() {
  try {
    const { data: { session }, error } = await supabase.auth.getSession();
    if (error) throw error;
    return session;
  } catch (error) {
    console.error('Get session error:', error);
    return null;
  }
}

/**
 * Get the current user
 */
export async function getCurrentUser() {
  try {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) throw error;
    return user;
  } catch (error) {
    console.error('Get user error:', error);
    return null;
  }
}

/**
 * Get professional profile by user_id
 */
export async function getProfessionalProfile(userId: string) {
  try {
    const { data, error } = await supabase
      .from('professional_profiles')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Get profile error:', error);
    return null;
  }
}

/**
 * Sign in with OAuth provider (Google, Facebook, Apple)
 */
export async function signInWithOAuth(provider: 'google' | 'facebook' | 'apple') {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('OAuth sign in error:', error);
    throw error;
  }
}
