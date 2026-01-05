/**
 * Account DTOs based on actual API responses
 */

/**
 * GET /api/account response
 */
export interface GetAccountResponse {
  accountData: {
    accountStatus: {
      statusKey: string;
      descriptionKey: string;
      statusCode: -1 | 1 | 2;
      documentRequired: boolean;
      status: string;
    };
    companyInfo: {
      companyName: string;
      address: string;
      postalCode: string;
      city: string;
      website: string;
      businessId: string;
      businessEmail: string;
      businessPhone: string;
      businessDescription: string;
      logoUrl: string;
      companyId: string;
    };
    contactInfo: {
      contactPerson: string;
      quotesEmail: string;
      invoicesEmail: string;
      generalEmail: string;
      phoneNumber: string;
    };
    profileCompletion: {
      percentage: number;
      tasks: ProfileTask[];
    };
    roleInCompany: string | null;
    portfolioPhotos: string[];
    certificates: Certificate[];
    profilePictureUrl: string | null;
    profileAnswers: Record<string, string> | null;
    professionalProfileId: string; // Professional profile UUID for rating lookups
  };
}

export interface Certificate {
  id: string;
  professional_profile_id: string;
  title: string;
  issuing_organization: string;
  issue_date: string;
  expiry_date: string;
  file_url: string;
  created_at: string;
  updated_at: string;
}

export interface ProfileTask {
  id: string;
  titleKey: string;
  statusKey: string;
  completed: boolean;
}
