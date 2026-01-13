import { createClient } from '@/lib/supabase/server';

/**
 * Admin email (stored statically in environment variable)
 */
export const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@bouwmatcher.be';

/**
 * User role enum
 */
export type UserRole = 'admin' | 'professional' | 'personal';

/**
 * Check if a user is an admin based on their email
 */
export async function isAdmin(userId: string): Promise<boolean> {
  try {
    const supabase = await createClient();

    // Get user data from Supabase Auth
    const { data: { user }, error } = await supabase.auth.admin.getUserById(userId);

    if (error || !user) {
      return false;
    }

    // Check if user email matches admin email
    return user.email === ADMIN_EMAIL;
  } catch (error) {
    console.error('Error checking admin status:', error);
    return false;
  }
}

/**
 * Get user role based on their profile
 */
export async function getUserRole(userId: string): Promise<UserRole> {
  try {
    const supabase = await createClient();

    // First check if user is admin
    const { data: { user }, error: userError } = await supabase.auth.admin.getUserById(userId);

    if (!userError && user?.email === ADMIN_EMAIL) {
      return 'admin';
    }

    // Check if user has a professional profile
    const { data: professionalProfile, error: profileError } = await supabase
      .from('professional_profiles')
      .select('id')
      .eq('user_id', userId)
      .single();

    if (!profileError && professionalProfile) {
      return 'professional';
    }

    // Check if user has a personal user profile
    const { data: personalUser, error: personalError } = await supabase
      .from('personal_users')
      .select('id')
      .eq('email', user?.email || '')
      .single();

    if (!personalError && personalUser) {
      return 'personal';
    }

    // Default to professional (as the current system assumes all users are professionals)
    return 'professional';
  } catch (error) {
    console.error('Error getting user role:', error);
    return 'professional';
  }
}

/**
 * Check if current session user is admin (client-side compatible)
 */
export async function checkIsAdmin(): Promise<boolean> {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return false;
    }

    return await isAdmin(user.id);
  } catch (error) {
    console.error('Error checking admin status:', error);
    return false;
  }
}

/**
 * Require admin access - throws error if not admin
 */
export async function requireAdmin(): Promise<void> {
  const isAdminUser = await checkIsAdmin();

  if (!isAdminUser) {
    throw new Error('Unauthorized: Admin access required');
  }
}
