// Account page types matching database schema

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
  is_active: boolean | null;
  is_verified: boolean | null;
  profile_completed: boolean | null;
  // Email fields (to be added to database)
  quotes_email?: string | null;
  invoices_email?: string | null;
  general_email?: string | null;
  created_at: string | null;
  updated_at: string | null;
}

export interface Company {
  id: string;
  company_name: string;
  business_id: string | null;
  postal_code: string | null;
  house_number: string | null;
  street_name: string | null;
  city: string | null;
  full_address: string | null;
  business_email: string | null;
  business_phone: string | null;
  website: string | null;
  vat_number: string | null;
  is_verified: boolean | null;
  verification_status: string | null;
  verification_documents: any | null;
  verified_at: string | null;
  business_description: string | null;
  year_established: number | null;
  employee_count: string | null;
  service_categories: string[] | null;
  service_areas: string[] | null;
  is_active: boolean | null;
  created_at: string | null;
  updated_at: string | null;
}

// Raw database data
export interface AccountDataRaw {
  profile: ProfessionalProfile;
  company: Company | null;
}

// Transformed frontend data
export interface AccountData {
  accountStatus: AccountStatusData;
  companyInfo: CompanyInfoData;
  contactInfo: ContactInfoData;
  profileCompletion: ProfileCompletionData;
}

// Frontend display types
export interface AccountStatusData {
  status: string;
  description: string;
  statusCode: -1 | 1 | 2; // -1: inactive/blocked, 1: verified, 2: in process
  documentRequired: boolean;
}

export interface CompanyInfoData {
  companyName: string;
  address: string;
  postalCode: string;
  city: string;
  website: string;
  businessId: string;
}

export interface ContactInfoData {
  contactPerson: string;
  quotesEmail: string;
  invoicesEmail: string;
  generalEmail: string;
  phoneNumber: string;
}

export interface ProfileTask {
  id: string;
  title: string;
  statusText: string;
  completed: boolean;
}

export interface ProfileCompletionData {
  percentage: number;
  tasks: ProfileTask[];
}
