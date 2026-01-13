import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

/**
 * POST /api/projects/assign-professional
 * Assign a professional to a project
 * Body: { projectId, accessToken, professionalEmail }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { projectId, accessToken, professionalEmail } = body;

    // Validate input
    if (!projectId || !accessToken || !professionalEmail) {
      return NextResponse.json(
        { error: 'projectId, accessToken, and professionalEmail are required' },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    // Step 1: Verify project exists and token is valid
    const { data: project, error: projectError } = await supabase
      .from('projects')
      .select('id, access_token, status')
      .eq('id', projectId)
      .eq('access_token', accessToken)
      .single();

    if (projectError || !project) {
      return NextResponse.json(
        { error: 'Invalid project or access token' },
        { status: 404 }
      );
    }

    // Step 2: Find professional by quotes_email
    const { data: professional, error: profError } = await supabase
      .from('professional_profiles')
      .select('id, first_name, last_name, quotes_email, company_id, is_verified')
      .eq('quotes_email', professionalEmail.toLowerCase())
      .single();

    if (profError || !professional) {
      return NextResponse.json(
        { error: 'Professional not found with that email' },
        { status: 404 }
      );
    }

    // Step 3: Check if professional purchased this lead
    const { data: leadPurchase } = await supabase
      .from('professional_lead_purchases')
      .select('id')
      .eq('project_id', projectId)
      .eq('professional_id', professional.id)
      .eq('payment_status', 'completed')
      .maybeSingle();

    // Note: We allow assignment even if lead wasn't purchased (user might assign external professional)
    // If you want to enforce it, uncomment below:
    // if (!leadPurchase) {
    //   return NextResponse.json(
    //     { error: 'Professional did not purchase this lead' },
    //     { status: 400 }
    //   );
    // }

    // Step 4: Create project_professionals record
    const { data: assignment, error: assignError } = await supabase
      .from('project_professionals')
      .insert({
        project_id: projectId,
        professional_id: professional.id,
        assignment_type: 'user_assigned',
        professional_email: professional.quotes_email,
        assigned_at: new Date().toISOString(),
        is_active: true,
      })
      .select()
      .single();

    if (assignError) {
      console.error('Error creating assignment:', assignError);
      // If unique constraint violation, update existing instead
      if (assignError.code === '23505') {
        const { data: updated } = await supabase
          .from('project_professionals')
          .update({
            professional_email: professional.quotes_email,
            assigned_at: new Date().toISOString(),
            is_active: true,
          })
          .eq('project_id', projectId)
          .eq('professional_id', professional.id)
          .select()
          .single();

        assignment_data = updated;
      } else {
        throw assignError;
      }
    }

    // Step 5: Update projects.assigned_professional_id
    const { error: updateError } = await supabase
      .from('projects')
      .update({
        assigned_professional_id: professional.id,
        updated_at: new Date().toISOString(),
      })
      .eq('id', projectId);

    if (updateError) {
      console.error('Error updating project:', updateError);
      throw updateError;
    }

    console.log(`✅ Professional ${professional.id} assigned to project ${projectId}`);

    return NextResponse.json({
      success: true,
      message: 'Professional assigned successfully',
      professional: {
        id: professional.id,
        first_name: professional.first_name,
        last_name: professional.last_name,
        email: professional.quotes_email,
        company_id: professional.company_id,
        is_verified: professional.is_verified,
      },
    });
  } catch (error) {
    console.error('Error assigning professional:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Variable declaration fix
let assignment_data: any;
