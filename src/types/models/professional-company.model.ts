/**
 * Professional Company Model
 * Represents the professional_companies table schema
 */
export interface ProfessionalCompany {
  id: string;
  company_name: string;
  business_id: string | null;
  business_id_type: 'KVK' | 'KBO' | null; // KVK for Dutch, KBO for Belgian companies
  business_id_formatted: string | null; // Formatted for display (e.g., "0417.497.106")
  country: 'NL' | 'BE' | null; // ISO 3166-1 alpha-2 country code
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
  verification_documents: unknown | null;
  verified_at: string | null;
  verified_by: string | null;
  business_description: string | null;
  year_established: number | null;
  employee_count: string | null;
  service_categories: string[] | null;
  service_areas: string[] | null;
  created_by: string | null;
  is_active: boolean | null;
  created_at: string | null;
  updated_at: string | null;
}
