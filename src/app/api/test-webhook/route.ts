import { NextResponse } from 'next/server';

/**
 * Test endpoint to check environment variables
 * DELETE THIS FILE after debugging!
 */
export async function GET() {
  return NextResponse.json({
    stripe_webhook_secret_exists: !!process.env.STRIPE_WEBHOOK_SECRET,
    stripe_webhook_secret_length: process.env.STRIPE_WEBHOOK_SECRET?.length || 0,
    supabase_url_exists: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
    supabase_service_role_exists: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
    supabase_service_role_length: process.env.SUPABASE_SERVICE_ROLE_KEY?.length || 0,
    node_env: process.env.NODE_ENV,
  });
}
