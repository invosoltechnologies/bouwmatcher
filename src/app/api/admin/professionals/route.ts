import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { getProfessionalStatus, ProfessionalStatusType } from '@/lib/utils/professional-status';

export interface ProfessionalWithStatus {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;
  profile_picture_url?: string | null;
  specializations: string[] | null;
  company_id: string | null;
  company_name?: string | null;
  categories: Array<{ id: number; name: string }>;
  status: ProfessionalStatusType;
  rating: number;
  review_count: number;
  created_at: string;
  is_active: boolean | null;
}

interface ProfessionalsResponse {
  professionals: ProfessionalWithStatus[];
  total: number;
}

/**
 * GET /api/admin/professionals
 *
 * Fetches list of professionals for admin dashboard with:
 * - Verification status computation
 * - Company association
 * - Ratings aggregation
 * - Filtering by status, search, etc.
 *
 * Query parameters:
 * - status: Filter by verification status (verified, pending, in_review, rejected, suspended, unverified)
 * - search: Search by name or email
 * - limit: Results per page (default: 20)
 * - offset: Pagination offset (default: 0)
 * - sortBy: Sort field (name, created_at, status) (default: created_at)
 * - sortOrder: asc or desc (default: desc)
 */
export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();

    // Get query parameters
    const searchParams = request.nextUrl.searchParams;
    const statusFilter = searchParams.get('status');
    const searchQuery = searchParams.get('search');
    const limit = Math.min(parseInt(searchParams.get('limit') || '20'), 100);
    const offset = parseInt(searchParams.get('offset') || '0');
    const sortBy = searchParams.get('sortBy') || 'created_at';
    const sortOrder = (searchParams.get('sortOrder') || 'desc').toUpperCase() as 'ASC' | 'DESC';

    // Validate sort fields
    const validSortFields = ['name', 'created_at', 'status'];
    const finalSortBy = validSortFields.includes(sortBy) ? sortBy : 'created_at';

    // Fetch professionals with company information
    let query = supabase
      .from('professional_profiles')
      .select(
        `
        id,
        first_name,
        last_name,
        email,
        phone,
        profile_picture_url,
        specializations,
        company_id,
        is_verified,
        is_active,
        created_at,
        professional_companies:company_id (
          id,
          company_name,
          is_verified,
          verification_status,
          aggregate_rating,
          total_ratings
        )
        `,
        { count: 'exact' }
      )
      .eq('is_active', true)
      .order(finalSortBy === 'name' ? 'first_name' : finalSortBy, { ascending: sortOrder === 'ASC' })
      .range(offset, offset + limit - 1);

    // Apply search filter
    if (searchQuery && searchQuery.trim()) {
      const search = searchQuery.trim();
      query = query.or(
        `first_name.ilike.%${search}%,last_name.ilike.%${search}%,email.ilike.%${search}%`
      );
    }

    const { data: professionals, error: fetchError, count } = await query;

    if (fetchError) {
      console.error('Error fetching professionals:', fetchError);
      return NextResponse.json(
        { error: 'Failed to fetch professionals' },
        { status: 500 }
      );
    }

    if (!professionals) {
      return NextResponse.json<ProfessionalsResponse>(
        {
          professionals: [],
          total: 0,
        },
        { status: 200 }
      );
    }

    // Fetch categories and ratings for all professionals at once
    const professionalIds = professionals.map((p) => p.id);

    // Fetch specializations with category details
    const { data: specializations, error: specializationsError } = await supabase
      .from('professional_specializations')
      .select(
        `
        professional_id,
        service_categories (
          id,
          name_nl,
          name_en
        )
      `
      )
      .in('professional_id', professionalIds);

    if (specializationsError && specializationsError.code !== 'PGRST116') {
      console.error('Error fetching specializations:', specializationsError);
    }

    // Organize categories by professional
    const categoriesByProfessional: Record<string, Array<{ id: number; name: string }>> = {};
    if (specializations) {
      specializations.forEach((spec) => {
        if (!categoriesByProfessional[spec.professional_id]) {
          categoriesByProfessional[spec.professional_id] = [];
        }
        const category = (spec.service_categories as any);
        if (category) {
          categoriesByProfessional[spec.professional_id].push({
            id: category.id,
            name: category.name_nl, // Use Dutch name by default
          });
        }
      });
    }

    // Transform and filter professionals
    // Note: Ratings are now fetched from stored aggregates in professional_companies table
    const result: ProfessionalWithStatus[] = professionals
      .map((professional) => {
        // Supabase returns the joined company as an object, not an array
        const company = professional.professional_companies as any;
        const status = getProfessionalStatus(professional, company);

        // Apply status filter if provided
        if (statusFilter && status !== statusFilter) {
          return null;
        }

        // Use stored aggregate ratings from company table
        // Convert to numbers as they come from DB as strings/numbers
        const avgRating = company?.aggregate_rating
          ? Number(company.aggregate_rating)
          : 0;
        const reviewCount = company?.total_ratings
          ? Number(company.total_ratings)
          : 0;

        return {
          id: professional.id,
          first_name: professional.first_name,
          last_name: professional.last_name,
          email: professional.email,
          phone: professional.phone,
          profile_picture_url: (professional as any).profile_picture_url || null,
          specializations: professional.specializations || [],
          company_id: professional.company_id,
          company_name: company?.company_name,
          categories: categoriesByProfessional[professional.id] || [],
          status,
          rating: avgRating,
          review_count: reviewCount,
          created_at: professional.created_at,
          is_active: professional.is_active,
        };
      })
      .filter((p) => p !== null) as ProfessionalWithStatus[];

    return NextResponse.json<ProfessionalsResponse>(
      {
        professionals: result,
        total: result.length,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error in GET /api/admin/professionals:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
