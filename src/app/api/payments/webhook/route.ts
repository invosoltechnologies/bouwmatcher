import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe/server';
import { createClient } from '@supabase/supabase-js';
import Stripe from 'stripe';
import { generateInvoiceNumber, formatInvoiceDate } from '@/lib/utils/invoice-generator';
import { sendPurchaseReceiptEmail } from '@/lib/emailService';

/**
 * Create admin Supabase client for webhook
 * Lazy initialization to avoid build-time errors
 */
function getSupabaseAdmin() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );
}

/**
 * Stripe webhook endpoint
 * Handles payment confirmation and creates purchase records
 * POST /api/payments/webhook
 */
export async function POST(request: NextRequest) {
  console.log('🔔 Webhook received');
  const supabaseAdmin = getSupabaseAdmin();
  try {
    const body = await request.text();
    const signature = request.headers.get('stripe-signature');

    console.log('Webhook signature present:', !!signature);
    console.log('Webhook body length:', body.length);

    if (!signature) {
      console.error('❌ Missing Stripe signature');
      return NextResponse.json(
        { error: 'Missing signature' },
        { status: 400 }
      );
    }

    if (!process.env.STRIPE_WEBHOOK_SECRET) {
      console.error('❌ STRIPE_WEBHOOK_SECRET not configured');
      return NextResponse.json(
        { error: 'Webhook secret not configured' },
        { status: 500 }
      );
    }

    // Verify webhook signature
    let event: Stripe.Event;
    try {
      event = stripe.webhooks.constructEvent(
        body,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET
      );
      console.log('✅ Webhook signature verified. Event type:', event.type);
    } catch (err) {
      console.error('❌ Webhook signature verification failed:', err);
      return NextResponse.json(
        { error: 'Invalid signature', details: err instanceof Error ? err.message : String(err) },
        { status: 400 }
      );
    }

    // Handle successful payment
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;

      console.log('💳 Payment successful! Session ID:', session.id);
      console.log('📦 Metadata:', session.metadata);

      const professionalId = session.metadata?.professional_id;
      const projectId = session.metadata?.project_id;
      const leadPrice = session.metadata?.lead_price;

      if (!professionalId || !projectId || !leadPrice) {
        console.error('❌ Missing metadata in webhook:', session.metadata);
        return NextResponse.json(
          { error: 'Missing required metadata', received_metadata: session.metadata },
          { status: 400 }
        );
      }

      // Check if purchase already exists (idempotency)
      const { data: existingPurchase } = await supabaseAdmin
        .from('professional_lead_purchases')
        .select('id')
        .eq('professional_id', professionalId)
        .eq('project_id', projectId)
        .single();

      if (existingPurchase) {
        console.log('Purchase already exists, skipping:', existingPurchase.id);
        return NextResponse.json({ received: true });
      }

      // Generate invoice number
      console.log('🔢 Generating invoice number...');
      const invoiceNumber = await generateInvoiceNumber();
      console.log('✅ Invoice number generated:', invoiceNumber);

      // Create purchase record
      console.log('💾 Creating purchase record...');
      const { data: purchase, error: purchaseError } = await supabaseAdmin
        .from('professional_lead_purchases')
        .insert({
          professional_id: professionalId,
          project_id: projectId,
          amount_paid: parseFloat(leadPrice),
          payment_status: 'completed',
          payment_method: session.payment_method_types?.[0] || 'card',
          transaction_id: session.payment_intent as string,
          invoice_number: invoiceNumber,
        })
        .select()
        .single();

      if (purchaseError) {
        console.error('❌ Error creating purchase record:', purchaseError);
        return NextResponse.json(
          {
            error: 'Failed to create purchase record',
            details: purchaseError.message,
            code: purchaseError.code
          },
          { status: 500 }
        );
      }

      console.log('✅ Purchase record created successfully:', purchase.id);

      // Fetch professional and project details for email
      console.log('📧 Fetching details for email...');
      const { data: professional } = await supabaseAdmin
        .from('professional_profiles')
        .select(`
          first_name,
          invoices_email,
          company:professional_companies(company_name)
        `)
        .eq('id', professionalId)
        .single();

      const { data: project } = await supabaseAdmin
        .from('projects')
        .select(`
          city,
          first_name,
          last_name,
          category:service_categories(name_nl),
          subcategory:service_subcategories(name_nl)
        `)
        .eq('id', projectId)
        .single();

      // Send receipt email
      if (professional && project) {
        console.log('📤 Sending receipt email to:', professional.invoices_email);

        // Handle Supabase returning arrays for relations
        const categoryData = Array.isArray(project.category) ? project.category[0] : project.category;
        const subcategoryData = Array.isArray(project.subcategory) ? project.subcategory[0] : project.subcategory;
        const companyData = Array.isArray(professional.company) ? professional.company[0] : professional.company;

        const emailResult = await sendPurchaseReceiptEmail({
          email: professional.invoices_email || '',
          firstName: professional.first_name || 'Professional',
          invoiceNumber,
          purchaseDate: formatInvoiceDate(new Date()),
          transactionId: session.payment_intent as string,
          amount: parseFloat(leadPrice),
          paymentMethod: session.payment_method_types?.[0] || 'card',
          leadDetails: {
            category: (categoryData as any)?.name_nl || 'Onbekend',
            subcategory: (subcategoryData as any)?.name_nl || 'Onbekend',
            city: project.city || 'Onbekend',
            clientName: `${project.first_name || ''} ${project.last_name || ''}`.trim() || 'Onbekend',
          },
          companyName: (companyData as any)?.company_name,
        });

        if (emailResult.success) {
          console.log('✅ Receipt email sent successfully');
        } else {
          console.error('❌ Failed to send receipt email:', emailResult.error);
          // Don't fail the webhook if email fails
        }
      } else {
        console.warn('⚠️ Missing professional or project data for email');
      }
    }

    // Handle failed payment
    if (event.type === 'checkout.session.expired' || event.type === 'payment_intent.payment_failed') {
      const session = event.data.object as Stripe.Checkout.Session;
      console.log('Payment failed or expired:', session.id);
      // You can add additional handling here if needed
    }

    return NextResponse.json({ received: true });

  } catch (error) {
    console.error('Error processing webhook:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}
