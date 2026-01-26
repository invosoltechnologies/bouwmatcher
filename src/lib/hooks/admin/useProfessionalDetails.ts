import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api/client';

export interface ProfessionalDetailsResponse {
  profile: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string | null;
    phoneVerified: boolean;
    profilePictureUrl: string | null;
    bio: string | null;
    yearsOfExperience: number | null;
    quotesEmail: string | null;
    invoicesEmail: string | null;
    gender: string | null;
    workAddress: string | null;
    workPostalCode: string | null;
    workCity: string | null;
    workCountry: string | null;
    workLatitude: number | null;
    workLongitude: number | null;
    serviceRadiusKm: number | null;
    portfolioPhotos: string[];
    profileAnswers: Record<string, any>;
    isActive: boolean;
    isVerified: string;
    profileCompleted: boolean;
    currentStep: number;
    authProvider: string | null;
    createdAt: string;
    updatedAt: string;
    lastLoginAt: string | null;
    roleInCompany: string | null;
    joinedCompanyAt: string | null;
  };
  company: {
    id: string;
    companyName: string;
    businessId: string;
    country: string;
    postalCode: string;
    houseNumber: string;
    streetName: string;
    city: string;
    fullAddress: string;
    businessEmail: string;
    businessPhone: string;
    website: string | null;
    vatNumber: string | null;
    businessDescription: string | null;
    yearEstablished: number | null;
    employeeCount: string | null;
    logoUrl: string | null;
    isVerified: boolean;
    verificationStatus: string;
    verificationDocuments: Record<string, any> | null;
    verifiedAt: string | null;
    verifiedBy: string | null;
    serviceCategories: string[];
    serviceAreas: string[];
    aggregateRating: number;
    totalRatings: number;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
  } | null;
  specializations: Array<{
    id: string;
    categoryId: string;
    categoryNameNl: string;
    categoryNameEn: string;
    priority: number;
  }>;
  subcategories: Array<{
    id: string;
    subcategoryId: string;
    subcategoryNameNl: string;
    subcategoryNameEn: string;
  }>;
  certificates: Array<{
    id: string;
    professional_id: string;
    title: string;
    issuing_organization: string;
    issue_date: string | null;
    expiry_date: string | null;
    file_url: string;
    created_at: string;
    updated_at: string;
  }>;
  ratings: {
    summary: {
      averageRating: number;
      totalRatings: number;
    };
    recent: Array<{
      id: string;
      company_id: string;
      reviewer_name: string;
      rating: number;
      review_text: string | null;
      created_at: string;
      approval_status: string;
    }>;
  };
}

export function useProfessionalDetails(professionalId: string | null) {
  return useQuery<ProfessionalDetailsResponse, Error>({
    queryKey: ['admin', 'professionals', professionalId, 'details'],
    queryFn: async () => {
      if (!professionalId) {
        throw new Error('Professional ID is required');
      }
      const response = await apiClient.get<ProfessionalDetailsResponse>(
        `/api/admin/professionals/${professionalId}`
      );
      return response;
    },
    enabled: !!professionalId,
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 1,
  });
}
