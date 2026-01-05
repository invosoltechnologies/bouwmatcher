import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

interface ProfessionalData {
  id: string;
  first_name: string;
  last_name: string;
  quotes_email: string;
}

export function useFindProfessionalByEmail(email: string | null, debounceMs: number = 500) {
  const [debouncedEmail, setDebouncedEmail] = useState<string | null>(null);

  // Debounce email
  useEffect(() => {
    if (!email || email.length < 3) {
      setDebouncedEmail(null);
      return;
    }

    const timer = setTimeout(() => {
      setDebouncedEmail(email);
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [email, debounceMs]);

  const { data, isLoading, error } = useQuery({
    queryKey: ['professional', debouncedEmail],
    queryFn: async () => {
      if (!debouncedEmail) return null;

      const response = await fetch(
        `/api/professionals/by-email?email=${encodeURIComponent(debouncedEmail)}`
      );

      if (!response.ok) {
        throw new Error('Professional not found');
      }

      const result = await response.json();
      return result.professional as ProfessionalData;
    },
    enabled: !!debouncedEmail,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  return {
    professional: data || null,
    isLoading,
    isError: !!error,
    error: error instanceof Error ? error.message : null,
  };
}
