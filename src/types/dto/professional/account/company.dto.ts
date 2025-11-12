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
}

/**
 * PATCH /api/account/company response
 */
export interface UpdateCompanyResponse {
  success: boolean;
  company: ProfessionalCompany;
}
