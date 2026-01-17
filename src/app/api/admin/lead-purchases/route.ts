import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { LeadPurchase, LeadPurchasesResponse } from '@/types/models/admin-lead-purchase.model';

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();

    // Check if user is admin
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get query parameters
    const searchParams = request.nextUrl.searchParams;
    const paymentStatus = searchParams.get('paymentStatus') || undefined;
    const search = searchParams.get('search') || undefined;
    const limit = Math.min(parseInt(searchParams.get('limit') || '20'), 100);
    const offset = parseInt(searchParams.get('offset') || '0');
    const sortBy = searchParams.get('sortBy') || 'purchased_at';
    const sortOrder = searchParams.get('sortOrder')?.toUpperCase() === 'ASC' ? 'ASC' : 'DESC';

    // Validate sortBy field to prevent SQL injection
    const allowedSortFields = ['purchased_at', 'created_at', 'amount_paid', 'payment_status'];
    const validSortBy = allowedSortFields.includes(sortBy) ? sortBy : 'purchased_at';

    // Build base query
    let query = supabase
      .from('professional_lead_purchases')
      .select(`
        id,
        professional_id,
        project_id,
        amount_paid,
        payment_status,
        payment_method,
        transaction_id,
        purchased_at,
        created_at,
        updated_at,
        professional_profiles:professional_id (
          id,
          first_name,
          last_name,
          email,
          phone
        ),
        projects:project_id (
          id,
          first_name,
          last_name,
          company_name,
          email,
          description,
          request_type,
          service_categories:service_category_id (
            id,
            name_nl,
            name_en
          ),
          service_subcategories:subcategory_id (
            id,
            name_nl,
            name_en
          )
        )
      `, { count: 'exact' });

    // Apply filters
    if (paymentStatus) {
      query = query.eq('payment_status', paymentStatus);
    }

    // Apply sorting and pagination
    query = query
      .order(validSortBy, { ascending: sortOrder === 'ASC' })
      .range(offset, offset + limit - 1);

    const { data: purchases, error: purchasesError, count } = await query;

    if (purchasesError) {
      console.error('Error fetching lead purchases:', purchasesError);
      return NextResponse.json(
        { error: 'Failed to fetch lead purchases', details: purchasesError.message },
        { status: 500 }
      );
    }

    if (!purchases || purchases.length === 0) {
      return NextResponse.json({
        purchases: [],
        total: count || 0,
      } as LeadPurchasesResponse);
    }

    // Normalize the data structure - Supabase may return relations as arrays
    const normalizedPurchases = purchases.map((purchase: any) => ({
      ...purchase,
      professional_profiles: Array.isArray(purchase.professional_profiles)
        ? purchase.professional_profiles[0] || null
        : purchase.professional_profiles,
      projects: Array.isArray(purchase.projects)
        ? purchase.projects[0] || null
        : purchase.projects,
    }));

    // If search is provided, filter results client-side
    let filteredPurchases = normalizedPurchases;
    if (search) {
      const searchLower = search.toLowerCase();
      filteredPurchases = normalizedPurchases.filter((purchase) => {
        const professionalName = purchase.professional_profiles
          ? `${purchase.professional_profiles.first_name} ${purchase.professional_profiles.last_name}`.toLowerCase()
          : '';
        const professionalEmail = purchase.professional_profiles?.email?.toLowerCase() || '';
        const projectClient = purchase.projects?.company_name?.toLowerCase() ||
          `${purchase.projects?.first_name} ${purchase.projects?.last_name}`.toLowerCase() || '';
        const transactionId = purchase.transaction_id?.toLowerCase() || '';

        return (
          professionalName.includes(searchLower) ||
          professionalEmail.includes(searchLower) ||
          projectClient.includes(searchLower) ||
          transactionId.includes(searchLower)
        );
      });
    }

    return NextResponse.json({
      purchases: filteredPurchases as LeadPurchase[],
      total: count || 0,
    } as LeadPurchasesResponse);

  } catch (error) {
    console.error('Unexpected error in lead purchases API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
