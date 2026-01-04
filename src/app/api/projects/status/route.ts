import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

/**
 * GET /api/projects/status?token={accessToken}
 * Fetch project details by access token
 */
export async function GET(request: NextRequest) {
  try {
    const token = request.nextUrl.searchParams.get('token');

    if (!token) {
      return NextResponse.json(
        { error: 'Access token is required' },
        { status: 400 }
      );
    }

    // Fetch project by access token
    const { data: project, error } = await supabase
      .from('projects')
      .select(
        `
        id,
        created_at,
        service_category_id,
        status,
        street_name,
        street_number,
        postcode,
        city,
        access_token,
        access_token_expires_at,
        description,
        request_type
      `
      )
      .eq('access_token', token)
      .single();

    if (error || !project) {
      console.error('Project fetch error:', error);
      return NextResponse.json(
        { error: 'Project not found or invalid token' },
        { status: 404 }
      );
    }

    // Check if token has expired
    if (project.access_token_expires_at) {
      const expiresAt = new Date(project.access_token_expires_at);
      if (new Date() > expiresAt) {
        return NextResponse.json(
          { error: 'Access token has expired' },
          { status: 401 }
        );
      }
    }

    // Convert status to step number for progress tracker
    let currentStep = 0;
    if (project.status === 'specialist_selected') currentStep = 1;
    else if (project.status === 'in_progress') currentStep = 2;
    else if (project.status === 'completed') currentStep = 3;

    // Build full address
    const addressParts = [];
    if (project.street_name) addressParts.push(project.street_name);
    if (project.street_number) addressParts.push(project.street_number);
    const street = addressParts.length > 0 ? addressParts.join(' ') : null;

    const location = [street, project.postcode, project.city]
      .filter(Boolean)
      .join(', ') || 'Onbekend';

    return NextResponse.json({
      id: project.id,
      createdDate: new Date(project.created_at).toLocaleDateString('nl-NL', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
      location,
      status: project.status,
      currentStep,
      rawStatus: project.status,
      serviceCategory: project.service_category_id,
      description: project.description,
      requestType: project.request_type,
    });
  } catch (error) {
    console.error('Error fetching project:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/projects/status?token={accessToken}
 * Update project status
 */
export async function PATCH(request: NextRequest) {
  try {
    const token = request.nextUrl.searchParams.get('token');
    const body = await request.json();
    const { status } = body;

    if (!token || !status) {
      return NextResponse.json(
        { error: 'Access token and status are required' },
        { status: 400 }
      );
    }

    // Validate status
    const validStatuses = [
      'pending_quotes',
      'specialist_selected',
      'in_progress',
      'completed',
    ];
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status value' },
        { status: 400 }
      );
    }

    // Fetch project first to verify token and ownership
    const { data: project, error: fetchError } = await supabase
      .from('projects')
      .select('id, access_token_expires_at')
      .eq('access_token', token)
      .single();

    if (fetchError || !project) {
      return NextResponse.json(
        { error: 'Project not found or invalid token' },
        { status: 404 }
      );
    }

    // Check if token has expired
    if (project.access_token_expires_at) {
      const expiresAt = new Date(project.access_token_expires_at);
      if (new Date() > expiresAt) {
        return NextResponse.json(
          { error: 'Access token has expired' },
          { status: 401 }
        );
      }
    }

    // Update project status
    const { data: updatedProject, error: updateError } = await supabase
      .from('projects')
      .update({
        status,
        updated_at: new Date().toISOString(),
      })
      .eq('id', project.id)
      .select('id, status, updated_at')
      .single();

    if (updateError) {
      console.error('Error updating project:', updateError);
      return NextResponse.json(
        { error: 'Failed to update project status' },
        { status: 500 }
      );
    }

    console.log(`✅ Project ${project.id} status updated to ${status}`);

    return NextResponse.json({
      success: true,
      message: 'Project status updated successfully',
      project: updatedProject,
    });
  } catch (error) {
    console.error('Error updating project status:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * Helper function to get status label in Dutch
 */
function getStatusLabel(status: string): string {
  const statusLabels: Record<string, string> = {
    pending_quotes: 'Wachten op offertes',
    specialist_selected: 'Vakspecialist gekozen',
    in_progress: 'In uitvoering',
    completed: 'Project afgerond',
  };
  return statusLabels[status] || 'Onbekend';
}
