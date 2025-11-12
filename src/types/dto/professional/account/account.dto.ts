/**
 * Account DTOs based on actual API responses
 */

/**
 * GET /api/account response
 */
export interface GetAccountResponse {
  accountData: {
    accountStatus: {
      status: string;
      description: string;
      statusCode: -1 | 1 | 2;
      documentRequired: boolean;
    };
    companyInfo: {
      companyName: string;
      address: string;
      postalCode: string;
      city: string;
      website: string;
      businessId: string;
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
  };
}

export interface ProfileTask {
  id: string;
  title: string;
  statusText: string;
  completed: boolean;
}
