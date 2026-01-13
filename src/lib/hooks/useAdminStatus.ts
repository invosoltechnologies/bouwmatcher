'use client';

import { useQuery } from '@tanstack/react-query';
import { createClient } from '@/lib/supabase/client';

export function useAdminStatus() {
  const supabase = createClient();

  return useQuery({
    queryKey: ['adminStatus'],
    queryFn: async () => {
      // Get current user
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        return { isAdmin: false, adminUser: null };
      }

      // Check if user is in admin_users table
      const { data: adminUser, error } = await supabase
        .from('admin_users')
        .select('id, email, role, is_active')
        .eq('email', user.email)
        .eq('is_active', true)
        .single();

      if (error || !adminUser) {
        return { isAdmin: false, adminUser: null };
      }

      return { isAdmin: true, adminUser };
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: false,
  });
}
