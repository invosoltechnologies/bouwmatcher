import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

/**
 * API endpoint to fetch individual lead details
 * Contact information is masked unless the professional has paid to unlock
 */
export async function GET(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const supabase = await createClient();
    const { id } = await params;

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
      .select('id')
      .eq('user_id', user.id)
      .single();

    if (profileError || !profile) {
      return NextResponse.json(
        { error: 'Professional profile not found' },
        { status: 404 }
      );
    }

    // Fetch the project with all details including subcategory pricing
    const { data: project, error: projectError } = await supabase
      .from('projects')
      .select(`
        id,
        service_category_id,
        subcategory_id,
        request_type,
        has_photos,
        description,
        postcode,
        street_number,
        street_name,
        city,
        first_name,
        last_name,
        company_name,
        email,
        phone,
        latitude,
        longitude,
        status,
        created_at,
        execution_timing,
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
      .eq('id', id)
      .single();

    if (projectError || !project) {
      return NextResponse.json(
        { error: 'Lead not found' },
        { status: 404 }
      );
    }

    // TODO: Check if professional has paid to unlock this lead
    // For now, we'll check a placeholder table 'professional_lead_purchases'
    // You'll need to create this table later
    const { data: purchase } = await supabase
      .from('professional_lead_purchases')
      .select('id')
      .eq('professional_id', profile.id)
      .eq('project_id', id)
      .single();

    const isPaid = !!purchase;

    // Calculate the price based on request type
    // Note: service_subcategories might be null if no subcategory is set
    const subcategory = Array.isArray(project.service_subcategories)
      ? project.service_subcategories[0]
      : project.service_subcategories;

    const leadPrice = project.request_type === 'private'
      ? subcategory?.price_particulier
      : subcategory?.price_zakelijk;

    // Mask contact information if not paid
    const maskedProject = {
      ...project,
      // Name is always visible
      first_name: project.first_name,
      last_name: project.last_name,
      // Hide contact details if not paid
      email: isPaid ? project.email : maskEmail(project.email),
      phone: isPaid ? project.phone : maskPhone(project.phone),
      street_name: isPaid ? project.street_name : maskString(project.street_name),
      street_number: isPaid ? project.street_number : '•••',
      postcode: isPaid ? project.postcode : maskPostcode(project.postcode),
      company_name: isPaid && project.company_name ? project.company_name : maskString(project.company_name),
      is_locked: !isPaid,
      lead_price: leadPrice, // Send only the relevant price
      service_subcategories: undefined, // Don't send full subcategory data
    };

    // Fetch project photos
    const { data: photos } = await supabase
      .from('project_photos')
      .select('id, storage_path, file_name, display_order')
      .eq('project_id', id)
      .order('display_order', { ascending: true });

    // Fetch form answers
    const { data: answers } = await supabase
      .from('project_form_answers')
      .select(`
        id,
        answer_text,
        selected_option_id,
        question_id,
        project_form_questions (
          id,
          question_text_nl,
          question_text_en,
          question_type
        ),
        project_form_question_options (
          id,
          option_label_nl,
          option_label_en
        )
      `)
      .eq('project_id', id);

    return NextResponse.json({
      lead: maskedProject,
      photos: photos || [],
      answers: answers || [],
      is_locked: !isPaid,
    });

  } catch (error) {
    console.error('Error in lead details API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * Helper functions to mask sensitive data
 */
function maskString(str: string | null): string {
  if (!str) return '•••••••••';
  return '•'.repeat(Math.min(str.length, 9));
}

function maskEmail(email: string | null): string {
  if (!email) return '•••••••••@••.••';
  const [username, domain] = email.split('@');
  if (!domain) return '•••••••••@••.••';
  const maskedUsername = username.charAt(0) + '•'.repeat(Math.min(username.length - 1, 8));
  const [, tld] = domain.split('.');
  const maskedDomain = '••';
  return `${maskedUsername}@${maskedDomain}.${tld || '••'}`;
}

function maskPhone(phone: string | null): string {
  if (!phone) return '•••••••••';
  return '•'.repeat(Math.min(phone.length, 9));
}

function maskPostcode(postcode: string | null): string {
  if (!postcode) return '••••';
  return '•'.repeat(Math.min(postcode.length, 6));
}
