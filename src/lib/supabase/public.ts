import { createClient as createSupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!;

// Cookie-free client for public, cacheable server-side reads (e.g. ISR/static pages).
// Does not call cookies()/headers(), so it won't force a route into dynamic rendering.
export function createPublicClient() {
  return createSupabaseClient(supabaseUrl, supabaseAnonKey);
}
