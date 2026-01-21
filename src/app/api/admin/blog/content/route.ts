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

    const { data: content, error } = await supabase
      .from('blog_post_content')
      .select('*')
      .eq('blog_post_id', blog_post_id)
      .single();

    if (error) {
      // If not found, return null (content not created yet)
      if (error.code === 'PGRST116') {
        return NextResponse.json(null);
      }
      console.error('Error fetching blog post content:', error);
      return NextResponse.json(
        { error: 'Failed to fetch blog post content' },
        { status: 500 }
      );
    }

    return NextResponse.json(content);
  } catch (error) {
    console.error('Error in blog content GET:', error);
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
    const {
      blog_post_id,
      title_nl,
      title_en,
      excerpt_nl,
      excerpt_en,
      content_nl,
      content_en,
      featured_image_url,
      featured_image_alt,
    } = body;

    if (!blog_post_id) {
      return NextResponse.json(
        { error: 'blog_post_id is required' },
        { status: 400 }
      );
    }

    // Validate excerpt length
    if (excerpt_nl && excerpt_nl.length > 300) {
      return NextResponse.json(
        { error: 'Excerpt (NL) must be 300 characters or less' },
        { status: 400 }
      );
    }
    if (excerpt_en && excerpt_en.length > 300) {
      return NextResponse.json(
        { error: 'Excerpt (EN) must be 300 characters or less' },
        { status: 400 }
      );
    }

    // Check if content already exists
    const { data: existingContent } = await supabase
      .from('blog_post_content')
      .select('id')
      .eq('blog_post_id', blog_post_id)
      .single();

    let content;
    let error;

    if (existingContent) {
      // Update existing content - only update fields that are provided
      const updateData: any = {};
      if (title_nl !== undefined) updateData.title_nl = title_nl;
      if (title_en !== undefined) updateData.title_en = title_en;
      if (excerpt_nl !== undefined) updateData.excerpt_nl = excerpt_nl;
      if (excerpt_en !== undefined) updateData.excerpt_en = excerpt_en;
      if (content_nl !== undefined) updateData.content_nl = content_nl;
      if (content_en !== undefined) updateData.content_en = content_en;
      if (featured_image_url !== undefined) updateData.featured_image_url = featured_image_url;
      if (featured_image_alt !== undefined) updateData.featured_image_alt = featured_image_alt;

      const result = await supabase
        .from('blog_post_content')
        .update(updateData)
        .eq('blog_post_id', blog_post_id)
        .select()
        .single();

      content = result.data;
      error = result.error;
    } else {
      // Insert new content
      const result = await supabase
        .from('blog_post_content')
        .insert({
          blog_post_id,
          title_nl: title_nl || null,
          title_en: title_en || null,
          excerpt_nl: excerpt_nl || null,
          excerpt_en: excerpt_en || null,
          content_nl: content_nl || null,
          content_en: content_en || null,
          featured_image_url: featured_image_url || null,
          featured_image_alt: featured_image_alt || null,
        })
        .select()
        .single();

      content = result.data;
      error = result.error;
    }

    if (error) {
      console.error('Error saving blog post content:', error);
      return NextResponse.json(
        { error: 'Failed to save blog post content' },
        { status: 500 }
      );
    }

    // Update the blog post's updated_by field
    const { data: { user } } = await supabase.auth.getUser();
    await supabase
      .from('blog_posts')
      .update({ updated_by: user?.id || null })
      .eq('id', blog_post_id);

    return NextResponse.json(content);
  } catch (error) {
    console.error('Error in blog content POST:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
