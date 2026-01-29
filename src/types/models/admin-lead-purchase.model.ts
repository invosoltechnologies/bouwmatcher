/**
 * Admin Lead Purchase Models
 * Type definitions for lead purchase data in admin dashboard
 */

export interface LeadPurchase {
  id: string;
  professional_id: string;
  project_id: string;
  amount_paid: number;
  payment_status: 'pending' | 'completed' | 'failed' | 'refunded';
  payment_method: string | null;
  transaction_id: string | null;
  invoice_number: string | null;
  purchased_at: string;
  created_at: string;
  updated_at: string;

  // Related professional data
  professional_profiles: {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    phone: string | null;
    invoices_email: string | null;
  } | null;

  // Related project data
  projects: {
    id: string;
    first_name: string | null;
    last_name: string | null;
    company_name: string | null;
    email: string;
    description: string | null;
    request_type: 'private' | 'business';
    city: string | null;
    service_categories: {
      id: number;
      name_nl: string;
      name_en: string;
    } | null;
    service_subcategories: {
      id: number;
      name_nl: string;
      name_en: string;
    } | null;
  } | null;
}

export interface LeadPurchasesResponse {
  purchases: LeadPurchase[];
  total: number;
}

export interface LeadPurchaseStats {
  total: number;
  totalRevenue: number;
  thisMonth: number;
  revenueThisMonth: number;
  averagePrice: number;
}
