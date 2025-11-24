import { ProfileVerificationStatus, Gender } from '../enums/professional/verification-status.enum';

/**
 * Professional Profile Model
 * Represents the professional_profiles table schema
 */
export interface ProfessionalProfile {
  id: string;
  user_id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;
  phone_verified: boolean | null;
  phone_verified_at: string | null;
  company_id: string | null;
  role_in_company: string | null;
  joined_company_at: string | null;
  is_active: boolean | null;
  is_verified: ProfileVerificationStatus | string | null;
  profile_completed: boolean | null;
  bio: string | null;
  years_of_experience: number | null;
  specializations: string[] | null;
  certifications: unknown | null;
  notification_preferences: unknown | null;
  availability_status: string | null;
  auth_provider: string | null;
  created_at: string | null;
  updated_at: string | null;
  last_login_at: string | null;
  work_address: string | null;
  work_postal_code: string | null;
  work_city: string | null;
  work_latitude: number | null;
  work_longitude: number | null;
  service_radius_km: number | null;
  // New fields from migration
  quotes_email: string | null;
  invoices_email: string | null;
  gender: Gender | string | null;
}
