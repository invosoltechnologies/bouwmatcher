import { NextResponse, NextRequest } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function PATCH(request: NextRequest) {
  try {
    const supabase = await createClient();
    const body = await request.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json(
        { error: 'id and status are required' },
        { status: 400 }
      );
    }

    // Validate status
    if (!['draft', 'pending', 'published'].includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status. Must be draft, pending, or published' },
        { status: 400 }
      );
    }

    // Get current user
    const { data: { user } } = await supabase.auth.getUser();

    // Prepare update data
    const updateData: any = {
      status,
      updated_by: user?.id || null,
    };

    // If publishing, set published_at and published_by
    if (status === 'published') {
      // Check if already published (to preserve original publish date)
      const { data: existingPost } = await supabase
        .from('blog_posts')
        .select('published_at')
        .eq('id', id)
        .single();

      if (!existingPost?.published_at) {
        updateData.published_at = new Date().toISOString();
        updateData.published_by = user?.id || null;
      }
    }

    // Update the blog post
    const { data: blogPost, error } = await supabase
      .from('blog_posts')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating blog post status:', error);
      return NextResponse.json(
        { error: 'Failed to update blog post status' },
        { status: 500 }
      );
    }

    return NextResponse.json(blogPost);
  } catch (error) {
    console.error('Error in publish PATCH:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
