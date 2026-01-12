import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export async function PATCH(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
      {
        cookies: {
          getAll: () => cookieStore.getAll(),
          setAll: (cookiesToSet) => {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          },
        },
      }
    );

    const { servicePageId, status } = await request.json();

    if (!servicePageId || !status) {
      return NextResponse.json(
        { error: 'servicePageId and status are required' },
        { status: 400 }
      );
    }

    if (!['draft', 'pending', 'active'].includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status. Must be one of: draft, pending, active' },
        { status: 400 }
      );
    }

    // Get current user
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json(
        { error: 'User not authenticated' },
        { status: 401 }
      );
    }

    // Update page status
    const updateData: any = {
      status,
      updated_at: new Date().toISOString(),
    };

    // If publishing (status = 'active'), set published_at
    if (status === 'active') {
      updateData.published_at = new Date().toISOString();
    }

    const { data: page, error } = await supabase
      .from('service_pages')
      .update(updateData)
      .eq('id', servicePageId)
      .select()
      .single();

    if (error) throw error;

    // Trigger cache revalidation for all locales when page is published
    try {
      const { data: category } = await supabase
        .from('service_categories')
        .select('slug')
        .eq('id', page.service_category_id)
        .single();

      if (category) {
        // Revalidate for both locales
        revalidatePath(`/en/service/${category.slug}`);
        revalidatePath(`/nl/service/${category.slug}`);
      }
    } catch (revalidateError) {
      console.error('Error revalidating cache:', revalidateError);
      // Continue even if revalidation fails
    }

    return NextResponse.json({
      message: 'Page published successfully',
      data: page,
    });
  } catch (error) {
    console.error('Error publishing page:', error);
    return NextResponse.json(
      { error: 'Failed to publish page' },
      { status: 500 }
    );
  }
}
