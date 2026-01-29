import { createClient } from '@/lib/supabase/server';

/**
 * Generates a unique invoice number in the format: BM-YYYY-NNNNN
 * Example: BM-2026-00001
 */
export async function generateInvoiceNumber(): Promise<string> {
  const supabase = await createClient();
  const currentYear = new Date().getFullYear();

  // Get the last invoice number for the current year
  const { data, error } = await supabase
    .from('professional_lead_purchases')
    .select('invoice_number')
    .like('invoice_number', `BM-${currentYear}-%`)
    .order('invoice_number', { ascending: false })
    .limit(1)
    .single();

  let nextNumber = 1;

  if (data && data.invoice_number) {
    // Extract the sequential number from the last invoice
    const lastNumber = parseInt(data.invoice_number.split('-')[2], 10);
    nextNumber = lastNumber + 1;
  }

  // Format with leading zeros (5 digits)
  const paddedNumber = nextNumber.toString().padStart(5, '0');

  return `BM-${currentYear}-${paddedNumber}`;
}

/**
 * Formats currency for display
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('nl-NL', {
    style: 'currency',
    currency: 'EUR',
  }).format(amount);
}

/**
 * Formats date for invoices
 */
export function formatInvoiceDate(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('nl-NL', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(dateObj);
}
