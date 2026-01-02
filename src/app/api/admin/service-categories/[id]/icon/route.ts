import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import { IconUploadResponse } from '@/types/admin/category-form';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

/**
 * POST /api/admin/service-categories/[id]/icon
 * Uploads an icon for a category
 */
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const supabase = await createClient();
    const { id: categoryId } = await params;

    // Check authentication
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Parse form data
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Validate file type
    const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/svg+xml'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Only PNG, JPG, and SVG are allowed.' },
        { status: 400 }
      );
    }

    // Validate file size (max 2MB)
    const maxSize = 2 * 1024 * 1024; // 2MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'File size exceeds 2MB limit' },
        { status: 400 }
      );
    }

    // Check if category exists
    const { data: category, error: categoryError } = await supabase
      .from('service_categories')
      .select('id, slug, icon_url')
      .eq('id', categoryId)
      .eq('is_deleted', false)
      .single();

    if (categoryError || !category) {
      return NextResponse.json({ error: 'Category not found' }, { status: 404 });
    }

    // Create admin client for storage operations
    const supabaseAdmin = createSupabaseClient(supabaseUrl, supabaseServiceKey);

    // Delete old icon if exists
    if (category.icon_url) {
      const oldFileName = category.icon_url.split('/').pop();
      if (oldFileName) {
        await supabaseAdmin.storage
          .from('service-icons')
          .remove([oldFileName]);
      }
    }

    // Generate unique filename
    const fileExt = file.name.split('.').pop();
    const fileName = `${category.slug}.${fileExt}`;

    // Convert File to ArrayBuffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload to Supabase Storage
    const { error: uploadError } = await supabaseAdmin.storage
      .from('service-icons')
      .upload(fileName, buffer, {
        contentType: file.type,
        upsert: true,
      });

    if (uploadError) {
      console.error('Error uploading icon:', uploadError);
      return NextResponse.json(
        { error: 'Failed to upload icon' },
        { status: 500 }
      );
    }

    // Get public URL
    const { data: publicUrlData } = supabaseAdmin.storage
      .from('service-icons')
      .getPublicUrl(fileName);

    const iconUrl = publicUrlData.publicUrl;

    // Update category with icon URL
    const { error: updateError } = await supabase
      .from('service_categories')
      .update({ icon_url: iconUrl })
      .eq('id', categoryId);

    if (updateError) {
      console.error('Error updating category with icon URL:', updateError);
      return NextResponse.json(
        { error: 'Failed to update category with icon URL' },
        { status: 500 }
      );
    }

    const response: IconUploadResponse = {
      icon_url: iconUrl,
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error('Unexpected error in POST /api/admin/service-categories/[categoryId]/icon:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
