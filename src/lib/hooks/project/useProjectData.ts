import { useQuery } from '@tanstack/react-query';

interface ProjectData {
  id: string;
  status: string;
  assigned_professional_id?: string;
  professional_email?: string;
  professional_name?: string;
}

export function useProjectData(token: string | null) {
  return useQuery({
    queryKey: ['projectData', token],
    queryFn: async () => {
      if (!token) throw new Error('Token is required');

      const response = await fetch(`/api/projects/data?token=${token}`);

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to fetch project data');
      }

      return response.json() as Promise<ProjectData>;
    },
    enabled: !!token,
  });
}
