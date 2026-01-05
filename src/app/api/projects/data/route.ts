import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

/**
 * GET /api/projects/data?token={accessToken}
 * Fetch project data including assigned professional information
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

    const supabase = await createClient();

    // Fetch project with assigned professional details
    const { data: project, error } = await supabase
      .from('projects')
      .select(
        `
        id,
        status,
        assigned_professional_id,
        access_token_expires_at,
        project_professionals (
          professional_id,
          professional_email
        )
      `
      )
      .eq('access_token', token)
      .single();

    if (error || !project) {
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

    // Get professional details if assigned
    let professional_name: string | null = null;
    const professional_email = project.project_professionals?.[0]?.professional_email;

    if (project.assigned_professional_id) {
      const { data: professional } = await supabase
        .from('professional_profiles')
        .select('first_name, last_name')
        .eq('id', project.assigned_professional_id)
        .single();

      if (professional) {
        professional_name = `${professional.first_name} ${professional.last_name}`;
      }
    }

    return NextResponse.json({
      id: project.id,
      status: project.status,
      assigned_professional_id: project.assigned_professional_id,
      professional_email,
      professional_name,
    });
  } catch (error) {
    console.error('Error fetching project data:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
