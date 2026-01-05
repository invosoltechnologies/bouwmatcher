import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

interface AssignProfessionalPayload {
  projectId: string;
  accessToken: string;
  professionalEmail: string;
}

interface ProfessionalData {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  company_id: string | null;
  is_verified: boolean | null;
}

export function useAssignProfessional() {
  return useMutation({
    mutationFn: async (payload: AssignProfessionalPayload) => {
      const response = await fetch('/api/projects/assign-professional', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to assign professional');
      }

      return response.json();
    },
    onSuccess: (data) => {
      toast.success('Professional assigned successfully!');
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}
