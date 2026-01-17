import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { ProjectLead, ProjectsResponse } from '@/types/models/admin-project.model';

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
    const status = searchParams.get('status') || undefined;
    const search = searchParams.get('search') || undefined;
    const limit = Math.min(parseInt(searchParams.get('limit') || '20'), 100);
    const offset = parseInt(searchParams.get('offset') || '0');
    const sortBy = searchParams.get('sortBy') || 'created_at';
    const sortOrder = searchParams.get('sortOrder')?.toUpperCase() === 'ASC' ? 'ASC' : 'DESC';

    // Validate sortBy field to prevent SQL injection
    const allowedSortFields = ['created_at', 'updated_at', 'status', 'request_type', 'email'];
    const validSortBy = allowedSortFields.includes(sortBy) ? sortBy : 'created_at';

    // Build base query
    let query = supabase
      .from('projects')
      .select(`
        id,
        first_name,
        last_name,
        company_name,
        email,
        phone,
        description,
        request_type,
        execution_timing,
        status,
        assigned_professional_id,
        cancellation_reason,
        cancelled_at,
        created_at,
        updated_at,
        service_categories:service_category_id (
          id,
          name_nl,
          name_en
        ),
        service_subcategories:subcategory_id (
          id,
          name_nl,
          name_en
        ),
        professional_profiles:assigned_professional_id (
          id,
          first_name,
          last_name,
          email
        )
      `, { count: 'exact' });

    // Apply filters
    if (status) {
      query = query.eq('status', status);
    }

    if (search) {
      query = query.or(
        `first_name.ilike.%${search}%,last_name.ilike.%${search}%,email.ilike.%${search}%,company_name.ilike.%${search}%`
      );
    }

    // Apply sorting and pagination
    query = query
      .order(validSortBy, { ascending: sortOrder === 'ASC' })
      .range(offset, offset + limit - 1);

    const { data: projects, error: projectsError, count } = await query;

    if (projectsError) {
      console.error('Error fetching projects:', projectsError);
      return NextResponse.json(
        { error: 'Failed to fetch projects', details: projectsError.message },
        { status: 500 }
      );
    }

    if (!projects || projects.length === 0) {
      return NextResponse.json({
        projects: [],
        total: count || 0,
      } as ProjectsResponse);
    }

    // Fetch bid counts for all projects
    const projectIds = projects.map(p => p.id);
    const { data: bidData, error: bidError } = await supabase
      .from('professional_lead_purchases')
      .select('project_id')
      .in('project_id', projectIds);

    if (bidError) {
      console.error('Error fetching bid counts:', bidError);
    }

    // Count bids per project
    const bidsPerProject: Record<string, number> = {};
    if (bidData) {
      bidData.forEach(bid => {
        bidsPerProject[bid.project_id] = (bidsPerProject[bid.project_id] || 0) + 1;
      });
    }

    // Normalize the data structure and combine with bid counts
    const projectsWithBids: ProjectLead[] = projects.map((project: any) => ({
      ...project,
      service_categories: Array.isArray(project.service_categories)
        ? project.service_categories[0] || null
        : project.service_categories,
      service_subcategories: Array.isArray(project.service_subcategories)
        ? project.service_subcategories[0] || null
        : project.service_subcategories,
      professional_profiles: Array.isArray(project.professional_profiles)
        ? project.professional_profiles[0] || null
        : project.professional_profiles,
      bidCount: bidsPerProject[project.id] || 0,
    }));

    return NextResponse.json({
      projects: projectsWithBids,
      total: count || 0,
    } as ProjectsResponse);

  } catch (error) {
    console.error('Unexpected error in projects API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
