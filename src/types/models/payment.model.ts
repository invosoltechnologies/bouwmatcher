/**
 * Professional Lead Purchase Model
 * Represents a transaction where a professional has paid to unlock a lead's contact information
 */
export interface ProfessionalLeadPurchase {
  id: string;
  professional_id: string;
  project_id: string;
  amount_paid: number;
  payment_status: 'pending' | 'completed' | 'failed' | 'refunded';
  payment_method: string | null;
  transaction_id: string | null;
  purchased_at: string;
  created_at: string;
  updated_at: string;
}

/**
 * Stripe Checkout Session Request
 */
export interface CreateCheckoutSessionRequest {
  leadId: string;
}

/**
 * Stripe Checkout Session Response
 */
export interface CreateCheckoutSessionResponse {
  sessionId: string;
  url: string | null;
}

/**
 * Purchase Lead Dialog Props
 */
export interface PurchaseLeadDialogData {
  leadId: string;
  leadPrice: number;
  categoryName: string;
  city: string;
  customerName: string;
}
