import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const supabase = await createClient();
    const { id } = await context.params;

    // Check if user is authenticated and is admin
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Fetch the complete professional profile
    const { data: profile, error: profileError } = await supabase
      .from('professional_profiles')
      .select('*')
      .eq('id', id)
      .single();

    if (profileError || !profile) {
      return NextResponse.json(
        { error: 'Professional not found' },
        { status: 404 }
      );
    }

    // Fetch company details if company_id exists
    let company = null;
    if (profile.company_id) {
      const { data: companyData, error: companyError } = await supabase
        .from('professional_companies')
        .select('*')
        .eq('id', profile.company_id)
        .single();

      if (!companyError && companyData) {
        company = companyData;
      }
    }

    // Fetch specializations (service categories)
    const { data: specializations, error: specializationsError } = await supabase
      .from('professional_specializations')
      .select(`
        id,
        priority,
        service_categories (
          id,
          name_nl,
          name_en
        )
      `)
      .eq('professional_id', id)
      .order('priority', { ascending: true });

    // Fetch subcategories
    const { data: subcategories, error: subcategoriesError } = await supabase
      .from('professional_subcategories')
      .select(`
        id,
        service_subcategories (
          id,
          name_nl,
          name_en
        )
      `)
      .eq('professional_id', id);

    // Fetch certificates
    const { data: certificates, error: certificatesError } = await supabase
      .from('professional_certificates')
      .select('*')
      .eq('professional_id', id)
      .order('created_at', { ascending: false });

    // Fetch recent reviews if company exists
    let ratings: {
      summary: { averageRating: number; totalRatings: number };
      recent: any[];
    } = {
      summary: {
        averageRating: company?.aggregate_rating || 0,
        totalRatings: company?.total_ratings || 0,
      },
      recent: [],
    };

    if (profile.company_id) {
      const { data: recentRatings, error: ratingsError } = await supabase
        .from('professional_company_ratings')
        .select('*')
        .eq('company_id', profile.company_id)
        .order('created_at', { ascending: false })
        .limit(5);

      if (!ratingsError && recentRatings) {
        ratings.recent = recentRatings;
      }
    }

    // Transform the data for frontend
    const response = {
      profile: {
        id: profile.id,
        firstName: profile.first_name,
        lastName: profile.last_name,
        email: profile.email,
        phone: profile.phone,
        phoneVerified: profile.phone_verified,
        profilePictureUrl: profile.profile_picture_url,
        bio: profile.bio,
        yearsOfExperience: profile.years_of_experience,
        quotesEmail: profile.quotes_email,
        invoicesEmail: profile.invoices_email,
        gender: profile.gender,
        workAddress: profile.work_address,
        workPostalCode: profile.work_postal_code,
        workCity: profile.work_city,
        workCountry: profile.work_country,
        workLatitude: profile.work_latitude,
        workLongitude: profile.work_longitude,
        serviceRadiusKm: profile.service_radius_km,
        portfolioPhotos: profile.portfolio_photos || [],
        profileAnswers: profile.profile_answers || {},
        isActive: profile.is_active,
        isVerified: profile.is_verified,
        profileCompleted: profile.profile_completed,
        currentStep: profile.current_step,
        authProvider: profile.auth_provider,
        createdAt: profile.created_at,
        updatedAt: profile.updated_at,
        lastLoginAt: profile.last_login_at,
        roleInCompany: profile.role_in_company,
        joinedCompanyAt: profile.joined_company_at,
      },
      company: company
        ? {
            id: company.id,
            companyName: company.company_name,
            businessId: company.business_id,
            country: company.country,
            postalCode: company.postal_code,
            houseNumber: company.house_number,
            streetName: company.street_name,
            city: company.city,
            fullAddress: company.full_address,
            businessEmail: company.business_email,
            businessPhone: company.business_phone,
            website: company.website,
            vatNumber: company.vat_number,
            businessDescription: company.business_description,
            yearEstablished: company.year_established,
            employeeCount: company.employee_count,
            logoUrl: company.logo_url,
            isVerified: company.is_verified,
            verificationStatus: company.verification_status,
            verificationDocuments: company.verification_documents,
            verifiedAt: company.verified_at,
            verifiedBy: company.verified_by,
            serviceCategories: company.service_categories || [],
            serviceAreas: company.service_areas || [],
            aggregateRating: company.aggregate_rating,
            totalRatings: company.total_ratings,
            isActive: company.is_active,
            createdAt: company.created_at,
            updatedAt: company.updated_at,
          }
        : null,
      specializations:
        specializations?.map((spec: any) => ({
          id: spec.id,
          categoryId: spec.service_categories?.id,
          categoryNameNl: spec.service_categories?.name_nl,
          categoryNameEn: spec.service_categories?.name_en,
          priority: spec.priority,
        })) || [],
      subcategories:
        subcategories?.map((sub: any) => ({
          id: sub.id,
          subcategoryId: sub.service_subcategories?.id,
          subcategoryNameNl: sub.service_subcategories?.name_nl,
          subcategoryNameEn: sub.service_subcategories?.name_en,
        })) || [],
      certificates: certificates || [],
      ratings,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching professional details:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
