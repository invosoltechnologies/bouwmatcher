import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { randomUUID } from 'crypto';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const draftId = formData.get('draftId') as string;

    // Validate inputs
    if (!file || !draftId) {
      return NextResponse.json(
        { error: 'File and draft ID are required' },
        { status: 400 }
      );
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: 'File size exceeds 5MB limit' },
        { status: 400 }
      );
    }

    // Validate file type
    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Only images are allowed (JPEG, PNG, WebP, GIF)' },
        { status: 400 }
      );
    }

    // Verify draft exists
    const { data: draft, error: draftError } = await supabase
      .from('project_drafts')
      .select('id')
      .eq('id', draftId)
      .single();

    if (draftError || !draft) {
      return NextResponse.json(
        { error: 'Draft not found' },
        { status: 404 }
      );
    }

    // Generate unique filename
    const fileExtension = file.name.split('.').pop();
    const uniqueFileName = `${randomUUID()}.${fileExtension}`;
    const storagePath = `${draftId}/${uniqueFileName}`;

    // Upload to Supabase Storage
    const fileBuffer = await file.arrayBuffer();
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('project-photos')
      .upload(storagePath, fileBuffer, {
        contentType: file.type,
        upsert: false,
      });

    if (uploadError) {
      console.error('Storage upload error:', uploadError);
      return NextResponse.json(
        { error: 'Failed to upload file to storage' },
        { status: 500 }
      );
    }

    // Get current photo count for display order
    const { count } = await supabase
      .from('project_photos')
      .select('*', { count: 'exact', head: true })
      .eq('project_draft_id', draftId);

    // Save metadata to database
    const photoId = randomUUID();
    const { data: photoData, error: photoError } = await supabase
      .from('project_photos')
      .insert({
        id: photoId,
        project_draft_id: draftId,
        storage_path: storagePath,
        file_name: file.name,
        file_size: file.size,
        mime_type: file.type,
        display_order: (count || 0) + 1,
        is_primary: count === 0, // First photo is primary
        upload_status: 'completed',
      })
      .select()
      .single();

    if (photoError) {
      console.error('Database insert error:', photoError);
      // Try to cleanup uploaded file
      await supabase.storage.from('project-photos').remove([storagePath]);
      return NextResponse.json(
        { error: 'Failed to save photo metadata', details: photoError.message, code: photoError.code },
        { status: 500 }
      );
    }

    // Get public URL
    const { data: publicUrlData } = supabase.storage
      .from('project-photos')
      .getPublicUrl(storagePath);

    return NextResponse.json({
      success: true,
      photo: {
        ...photoData,
        url: publicUrlData.publicUrl,
      },
    });

  } catch (error) {
    console.error('Error uploading photo:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
