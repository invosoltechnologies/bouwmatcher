/**
 * Admin Project Models
 * Type definitions for project data in admin dashboard
 */

export interface ProjectLead {
  id: string;
  first_name: string | null;
  last_name: string | null;
  company_name: string | null;
  email: string;
  phone: string | null;
  description: string | null;
  request_type: 'private' | 'business';
  execution_timing: string | null;
  status: string;
  assigned_professional_id: string | null;
  cancellation_reason: string | null;
  cancelled_at: string | null;
  created_at: string;
  updated_at: string;

  // Related data
  service_categories: {
    id: number;
    name_nl: string;
    name_en: string;
  } | null;

  service_subcategories: {
    id: number;
    name_nl: string;
    name_en: string;
  } | null;

  professional_profiles: {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
  } | null;

  // Computed fields
  bidCount: number;
}

export interface ProjectsResponse {
  projects: ProjectLead[];
  total: number;
}

export interface ProjectStats {
  total: number;
  newThisMonth: number;
  assigned: number;
  cancelled: number;
  available: number;
}
