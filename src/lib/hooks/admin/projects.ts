import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api/client';
import { ProjectsResponse } from '@/types/models/admin-project.model';

export interface UseProjectsOptions {
  status?: string;
  search?: string;
  limit?: number;
  offset?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  enabled?: boolean;
}

/**
 * Hook to fetch projects list with filtering, sorting, and pagination
 */
export function useProjects(options: UseProjectsOptions = {}) {
  const {
    status,
    search,
    limit = 20,
    offset = 0,
    sortBy = 'created_at',
    sortOrder = 'desc',
    enabled = true,
  } = options;

  // Build query string
  const queryParams = new URLSearchParams();
  if (status) queryParams.append('status', status);
  if (search) queryParams.append('search', search);
  queryParams.append('limit', limit.toString());
  queryParams.append('offset', offset.toString());
  queryParams.append('sortBy', sortBy);
  queryParams.append('sortOrder', sortOrder);

  const queryString = queryParams.toString();

  return useQuery<ProjectsResponse, Error>({
    queryKey: ['admin', 'projects', { status, search, limit, offset, sortBy, sortOrder }],
    queryFn: async () => {
      const response = await apiClient.get<ProjectsResponse>(
        `/api/admin/projects?${queryString}`
      );
      return response;
    },
    enabled,
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes (formerly cacheTime)
    placeholderData: (previousData) => previousData, // Prevent UI flicker during refetch
  });
}

/**
 * Hook to fetch single project by ID
 */
export function useProject(projectId: string | null, enabled = true) {
  return useQuery<ProjectsResponse, Error>({
    queryKey: ['admin', 'project', projectId],
    queryFn: async () => {
      if (!projectId) throw new Error('Project ID is required');
      const response = await apiClient.get<ProjectsResponse>(
        `/api/admin/projects?search=${projectId}&limit=1`
      );
      return response;
    },
    enabled: enabled && !!projectId,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });
}
