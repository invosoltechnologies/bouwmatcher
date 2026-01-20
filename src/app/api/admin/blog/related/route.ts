import { NextResponse, NextRequest } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    const searchParams = request.nextUrl.searchParams;
    const blog_post_id = searchParams.get('blog_post_id');

    if (!blog_post_id) {
      return NextResponse.json(
        { error: 'blog_post_id is required' },
        { status: 400 }
      );
    }

    const { data: relatedPosts, error } = await supabase
      .from('blog_post_related')
      .select(`
        *,
        related_post:blog_posts!blog_post_related_related_blog_post_id_fkey (
          id,
          slug,
          status,
          blog_post_content (
            title_nl,
            title_en,
            excerpt_nl,
            excerpt_en,
            featured_image_url
          )
        )
      `)
      .eq('blog_post_id', blog_post_id)
      .order('order_index', { ascending: true });

    if (error) {
      console.error('Error fetching related posts:', error);
      return NextResponse.json(
        { error: 'Failed to fetch related posts' },
        { status: 500 }
      );
    }

    return NextResponse.json(relatedPosts || []);
  } catch (error) {
    console.error('Error in related posts GET:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const body = await request.json();
    const { blog_post_id, related_blog_post_id, order_index } = body;

    if (!blog_post_id || !related_blog_post_id) {
      return NextResponse.json(
        { error: 'blog_post_id and related_blog_post_id are required' },
        { status: 400 }
      );
    }

    // Check if trying to relate a post to itself
    if (blog_post_id === related_blog_post_id) {
      return NextResponse.json(
        { error: 'Cannot relate a post to itself' },
        { status: 400 }
      );
    }

    // Check if relation already exists
    const { data: existingRelation } = await supabase
      .from('blog_post_related')
      .select('id')
      .eq('blog_post_id', blog_post_id)
      .eq('related_blog_post_id', related_blog_post_id)
      .single();

    if (existingRelation) {
      return NextResponse.json(
        { error: 'This post is already in the related posts list' },
        { status: 400 }
      );
    }

    // Check current count of related posts (max 12)
    const { count } = await supabase
      .from('blog_post_related')
      .select('*', { count: 'exact', head: true })
      .eq('blog_post_id', blog_post_id);

    if (count && count >= 12) {
      return NextResponse.json(
        { error: 'Maximum of 12 related posts allowed' },
        { status: 400 }
      );
    }

    // Get the next order_index if not provided
    let nextOrderIndex = order_index;
    if (nextOrderIndex === undefined || nextOrderIndex === null) {
      const { data: lastRelation } = await supabase
        .from('blog_post_related')
        .select('order_index')
        .eq('blog_post_id', blog_post_id)
        .order('order_index', { ascending: false })
        .limit(1)
        .single();

      nextOrderIndex = lastRelation ? lastRelation.order_index + 1 : 0;
    }

    // Insert the relation
    const { data: relation, error } = await supabase
      .from('blog_post_related')
      .insert({
        blog_post_id,
        related_blog_post_id,
        order_index: nextOrderIndex,
      })
      .select(`
        *,
        related_post:blog_posts!blog_post_related_related_blog_post_id_fkey (
          id,
          slug,
          status,
          blog_post_content (
            title_nl,
            title_en,
            excerpt_nl,
            excerpt_en,
            featured_image_url
          )
        )
      `)
      .single();

    if (error) {
      console.error('Error adding related post:', error);
      return NextResponse.json(
        { error: 'Failed to add related post' },
        { status: 500 }
      );
    }

    // Update the blog post's updated_by field
    const { data: { user } } = await supabase.auth.getUser();
    await supabase
      .from('blog_posts')
      .update({ updated_by: user?.id || null })
      .eq('id', blog_post_id);

    return NextResponse.json(relation, { status: 201 });
  } catch (error) {
    console.error('Error in related posts POST:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const supabase = await createClient();
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'id is required' },
        { status: 400 }
      );
    }

    // Get the blog_post_id before deleting (for updating updated_by)
    const { data: relation } = await supabase
      .from('blog_post_related')
      .select('blog_post_id')
      .eq('id', id)
      .single();

    // Delete the relation
    const { error } = await supabase
      .from('blog_post_related')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting related post:', error);
      return NextResponse.json(
        { error: 'Failed to delete related post' },
        { status: 500 }
      );
    }

    // Update the blog post's updated_by field
    if (relation) {
      const { data: { user } } = await supabase.auth.getUser();
      await supabase
        .from('blog_posts')
        .update({ updated_by: user?.id || null })
        .eq('id', relation.blog_post_id);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in related posts DELETE:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const supabase = await createClient();
    const body = await request.json();
    const { blog_post_id, related_posts } = body;

    if (!blog_post_id || !Array.isArray(related_posts)) {
      return NextResponse.json(
        { error: 'blog_post_id and related_posts array are required' },
        { status: 400 }
      );
    }

    // Update order_index for each related post
    const updates = related_posts.map(async (post: { id: string; order_index: number }) => {
      return supabase
        .from('blog_post_related')
        .update({ order_index: post.order_index })
        .eq('id', post.id)
        .eq('blog_post_id', blog_post_id);
    });

    const results = await Promise.all(updates);

    // Check if any update failed
    const failedUpdate = results.find(result => result.error);
    if (failedUpdate) {
      console.error('Error reordering related posts:', failedUpdate.error);
      return NextResponse.json(
        { error: 'Failed to reorder related posts' },
        { status: 500 }
      );
    }

    // Update the blog post's updated_by field
    const { data: { user } } = await supabase.auth.getUser();
    await supabase
      .from('blog_posts')
      .update({ updated_by: user?.id || null })
      .eq('id', blog_post_id);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in related posts PATCH:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
