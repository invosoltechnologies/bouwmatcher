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

    const { data: meta, error } = await supabase
      .from('blog_post_meta')
      .select('*')
      .eq('blog_post_id', blog_post_id)
      .single();

    if (error) {
      // If not found, return null (meta not created yet)
      if (error.code === 'PGRST116') {
        return NextResponse.json(null);
      }
      console.error('Error fetching blog post meta:', error);
      return NextResponse.json(
        { error: 'Failed to fetch blog post meta' },
        { status: 500 }
      );
    }

    return NextResponse.json(meta);
  } catch (error) {
    console.error('Error in blog meta GET:', error);
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
      meta_title_nl,
      meta_title_en,
      meta_description_nl,
      meta_description_en,
    } = body;

    if (!blog_post_id) {
      return NextResponse.json(
        { error: 'blog_post_id is required' },
        { status: 400 }
      );
    }

    // Validate meta title length
    if (meta_title_nl && meta_title_nl.length > 60) {
      return NextResponse.json(
        { error: 'Meta title (NL) must be 60 characters or less' },
        { status: 400 }
      );
    }
    if (meta_title_en && meta_title_en.length > 60) {
      return NextResponse.json(
        { error: 'Meta title (EN) must be 60 characters or less' },
        { status: 400 }
      );
    }

    // Validate meta description length
    if (meta_description_nl && meta_description_nl.length > 160) {
      return NextResponse.json(
        { error: 'Meta description (NL) must be 160 characters or less' },
        { status: 400 }
      );
    }
    if (meta_description_en && meta_description_en.length > 160) {
      return NextResponse.json(
        { error: 'Meta description (EN) must be 160 characters or less' },
        { status: 400 }
      );
    }

    // Check if meta already exists
    const { data: existingMeta } = await supabase
      .from('blog_post_meta')
      .select('id')
      .eq('blog_post_id', blog_post_id)
      .single();

    let meta;
    let error;

    if (existingMeta) {
      // Update existing meta
      const result = await supabase
        .from('blog_post_meta')
        .update({
          meta_title_nl: meta_title_nl || null,
          meta_title_en: meta_title_en || null,
          meta_description_nl: meta_description_nl || null,
          meta_description_en: meta_description_en || null,
        })
        .eq('blog_post_id', blog_post_id)
        .select()
        .single();

      meta = result.data;
      error = result.error;
    } else {
      // Insert new meta
      const result = await supabase
        .from('blog_post_meta')
        .insert({
          blog_post_id,
          meta_title_nl: meta_title_nl || null,
          meta_title_en: meta_title_en || null,
          meta_description_nl: meta_description_nl || null,
          meta_description_en: meta_description_en || null,
        })
        .select()
        .single();

      meta = result.data;
      error = result.error;
    }

    if (error) {
      console.error('Error saving blog post meta:', error);
      return NextResponse.json(
        { error: 'Failed to save blog post meta' },
        { status: 500 }
      );
    }

    // Update the blog post's updated_by field
    const { data: { user } } = await supabase.auth.getUser();
    await supabase
      .from('blog_posts')
      .update({ updated_by: user?.id || null })
      .eq('id', blog_post_id);

    return NextResponse.json(meta);
  } catch (error) {
    console.error('Error in blog meta POST:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
