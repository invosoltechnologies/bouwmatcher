import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { stripe } from '@/lib/stripe/server';

interface CheckoutSessionRequest {
  leadId: string;
}

/**
 * API endpoint to create a Stripe checkout session for purchasing a lead
 * POST /api/payments/create-checkout-session
 */
export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const body: CheckoutSessionRequest = await request.json();
    const { leadId } = body;

    if (!leadId) {
      return NextResponse.json(
        { error: 'Lead ID is required' },
        { status: 400 }
      );
    }

    // Get authenticated user
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get professional profile
    const { data: profile, error: profileError } = await supabase
      .from('professional_profiles')
      .select('id, first_name, last_name, email')
      .eq('user_id', user.id)
      .single();

    if (profileError || !profile) {
      return NextResponse.json(
        { error: 'Professional profile not found' },
        { status: 404 }
      );
    }

    // Check if already purchased
    const { data: existingPurchase } = await supabase
      .from('professional_lead_purchases')
      .select('id')
      .eq('professional_id', profile.id)
      .eq('project_id', leadId)
      .single();

    if (existingPurchase) {
      return NextResponse.json(
        { error: 'You have already purchased this lead' },
        { status: 400 }
      );
    }

    // Fetch lead details to get price
    const { data: project, error: projectError } = await supabase
      .from('projects')
      .select(`
        id,
        request_type,
        service_categories (
          id,
          name_nl,
          name_en
        ),
        service_subcategories (
          id,
          name_nl,
          name_en,
          price_particulier,
          price_zakelijk
        )
      `)
      .eq('id', leadId)
      .single();

    if (projectError || !project) {
      return NextResponse.json(
        { error: 'Lead not found' },
        { status: 404 }
      );
    }

    // Calculate price based on request type
    const subcategory = Array.isArray(project.service_subcategories)
      ? project.service_subcategories[0]
      : project.service_subcategories;

    const leadPrice = project.request_type === 'private'
      ? subcategory?.price_particulier
      : subcategory?.price_zakelijk;

    if (!leadPrice) {
      return NextResponse.json(
        { error: 'Lead price not available' },
        { status: 400 }
      );
    }

    // Get category name for description
    const category = Array.isArray(project.service_categories)
      ? project.service_categories[0]
      : project.service_categories;

    const categoryName = category?.name_nl || 'Project';

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: [
        'card',
        'ideal',
        'bancontact',
        'eps',
        'klarna',
      ],
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: `Lead: ${categoryName}`,
              description: `Unlock contact information for lead ${leadId.slice(0, 8)}`,
            },
            unit_amount: Math.round(leadPrice * 100), // Convert to cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/pro-dashboard/offerteaanvragen?session_id={CHECKOUT_SESSION_ID}&success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/pro-dashboard/offerteaanvragen?canceled=true`,
      client_reference_id: leadId, // Store lead ID for webhook
      customer_email: profile.email || undefined,
      metadata: {
        professional_id: profile.id,
        project_id: leadId,
        lead_price: leadPrice.toString(),
        request_type: project.request_type,
      },
    });

    return NextResponse.json({
      sessionId: session.id,
      url: session.url,
    });

  } catch (error) {
    console.error('Error creating checkout session:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
