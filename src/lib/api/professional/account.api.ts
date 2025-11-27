/**
 * Account API Service
 * Handles all account-related API calls for professionals
 */

import { apiClient } from '../client';
import type { GetAccountResponse } from '@/types/dto/professional/account/account.dto';
import type {
  UpdateProfileRequest,
  UpdateProfileResponse,
} from '@/types/dto/professional/account/profile.dto';
import type {
  UpdateCompanyRequest,
  UpdateCompanyResponse,
  UpdateCompanyDescriptionRequest,
  UpdateCompanyDescriptionResponse,
  UpdateCompanyLogoResponse,
  DeleteCompanyLogoResponse,
} from '@/types/dto/professional/account/company.dto';

/**
 * Fetches complete account data including status, company info, contact info, and profile completion
 * @returns Account data object
 */
export async function getAccount(): Promise<GetAccountResponse> {
  return apiClient.get<GetAccountResponse>('/api/account');
}

/**
 * Updates professional profile personal information
 * @param data Profile update data (firstName, lastName, emails, phone, gender)
 * @returns Updated profile data
 */
export async function updateProfile(
  data: UpdateProfileRequest
): Promise<UpdateProfileResponse> {
  return apiClient.patch<UpdateProfileResponse>('/api/account/contact', data);
}

/**
 * Updates professional company information
 * @param data Company update data (companyName, address, etc.)
 * @returns Updated company data
 */
export async function updateCompany(
  data: UpdateCompanyRequest
): Promise<UpdateCompanyResponse> {
  return apiClient.patch<UpdateCompanyResponse>('/api/account/company', data);
}

/**
 * Updates company description
 * @param data Company description update data
 * @returns Updated company data
 */
export async function updateCompanyDescription(
  data: UpdateCompanyDescriptionRequest
): Promise<UpdateCompanyDescriptionResponse> {
  return apiClient.patch<UpdateCompanyDescriptionResponse>(
    '/api/account/company/description',
    data
  );
}

/**
 * Uploads company logo
 * @param file Logo file to upload
 * @returns Logo URL
 */
export async function updateCompanyLogo(
  file: File
): Promise<UpdateCompanyLogoResponse> {
  const formData = new FormData();
  formData.append('file', file);

  return apiClient.post<UpdateCompanyLogoResponse>(
    '/api/account/company/logo',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );
}

/**
 * Deletes company logo
 * @returns Success response
 */
export async function deleteCompanyLogo(): Promise<DeleteCompanyLogoResponse> {
  return apiClient.delete<DeleteCompanyLogoResponse>('/api/account/company/logo');
}
