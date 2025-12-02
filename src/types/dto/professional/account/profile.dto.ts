import { ProfessionalProfile } from '@/types/models/professional-profile.model';

/**
 * PATCH /api/account/contact request
 * Updates professional profile personal information
 */
export interface UpdateProfileRequest {
  firstName: string;
  lastName: string;
  quotesEmail?: string | null;
  invoicesEmail?: string | null;
  phoneNumber: string;
  gender?: string | null;
}

/**
 * PATCH /api/account/contact response
 */
export interface UpdateProfileResponse {
  success: boolean;
  profile: ProfessionalProfile;
}
