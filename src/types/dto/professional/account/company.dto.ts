import { ProfessionalCompany } from '@/types/models/professional-company.model';

/**
 * PATCH /api/account/company request
 * Updates professional company information
 */
export interface UpdateCompanyRequest {
  companyName: string;
  address: string;
  postalCode: string;
  city: string;
  website?: string | null;
  businessId?: string | null;
  businessEmail?: string | null;
  businessPhone?: string | null;
}

/**
 * PATCH /api/account/company response
 */
export interface UpdateCompanyResponse {
  success: boolean;
  company: ProfessionalCompany;
}

/**
 * PATCH /api/account/company/description request
 * Updates company description
 */
export interface UpdateCompanyDescriptionRequest {
  description: string;
}

/**
 * PATCH /api/account/company/description response
 */
export interface UpdateCompanyDescriptionResponse {
  success: boolean;
  company: ProfessionalCompany;
}

/**
 * POST /api/account/company/logo request
 * Uploads company logo
 */
export interface UpdateCompanyLogoRequest {
  file: File;
}

/**
 * POST /api/account/company/logo response
 */
export interface UpdateCompanyLogoResponse {
  success: boolean;
  logoUrl: string;
}

/**
 * DELETE /api/account/company/logo response
 */
export interface DeleteCompanyLogoResponse {
  success: boolean;
}
