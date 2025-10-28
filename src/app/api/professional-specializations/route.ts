import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

// GET - Fetch professional's specializations
export async function GET() {
  try {
    const supabase = await createClient();

    // Get current user
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
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

    // Get specializations with category details
    const { data: specializations, error } = await supabase
      .from('professional_specializations')
      .select(
        `
        id,
        priority,
        service_category_id,
        service_categories (
          id,
          slug,
          name_nl,
          name_en,
          icon_url
        )
      `
      )
      .eq('professional_id', profile.id)
      .order('priority', { ascending: true });

    if (error) {
      console.error('Error fetching specializations:', error);
      return NextResponse.json(
        { error: 'Failed to fetch specializations' },
        { status: 500 }
      );
    }

    return NextResponse.json({ specializations: specializations || [] });
  } catch (error) {
    console.error('Error in GET /api/professional-specializations:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST - Add a new specialization
export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();

    // Get current user
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
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

    const body = await request.json();
    const { service_category_id, priority } = body;

    if (!service_category_id) {
      return NextResponse.json(
        { error: 'service_category_id is required' },
        { status: 400 }
      );
    }

    // Insert specialization
    const { data, error } = await supabase
      .from('professional_specializations')
      .insert({
        professional_id: profile.id,
        service_category_id,
        priority: priority || 1,
      })
      .select(
        `
        id,
        priority,
        service_category_id,
        service_categories (
          id,
          slug,
          name_nl,
          name_en,
          icon_url
        )
      `
      )
      .single();

    if (error) {
      console.error('Error inserting specialization:', error);
      return NextResponse.json(
        { error: 'Failed to add specialization' },
        { status: 500 }
      );
    }

    return NextResponse.json({ specialization: data }, { status: 201 });
  } catch (error) {
    console.error('Error in POST /api/professional-specializations:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PUT - Update specialization priority
export async function PUT(request: NextRequest) {
  try {
    const supabase = await createClient();

    // Get current user
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
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

    const body = await request.json();
    const { specialization_id, priority } = body;

    if (!specialization_id || priority === undefined) {
      return NextResponse.json(
        { error: 'specialization_id and priority are required' },
        { status: 400 }
      );
    }

    // Update priority
    const { data, error } = await supabase
      .from('professional_specializations')
      .update({ priority, updated_at: new Date().toISOString() })
      .eq('id', specialization_id)
      .eq('professional_id', profile.id)
      .select()
      .single();

    if (error) {
      console.error('Error updating specialization:', error);
      return NextResponse.json(
        { error: 'Failed to update specialization' },
        { status: 500 }
      );
    }

    return NextResponse.json({ specialization: data });
  } catch (error) {
    console.error('Error in PUT /api/professional-specializations:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE - Remove a specialization
export async function DELETE(request: NextRequest) {
  try {
    const supabase = await createClient();

    // Get current user
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
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

    const { searchParams } = new URL(request.url);
    const specialization_id = searchParams.get('id');

    if (!specialization_id) {
      return NextResponse.json(
        { error: 'specialization_id is required' },
        { status: 400 }
      );
    }

    // Delete specialization
    const { error } = await supabase
      .from('professional_specializations')
      .delete()
      .eq('id', specialization_id)
      .eq('professional_id', profile.id);

    if (error) {
      console.error('Error deleting specialization:', error);
      return NextResponse.json(
        { error: 'Failed to delete specialization' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in DELETE /api/professional-specializations:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
