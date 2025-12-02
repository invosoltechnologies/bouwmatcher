import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { randomUUID } from 'crypto';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB for portfolio photos
const ALLOWED_MIME_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
];
const MAX_PHOTOS = 6;

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();

    // Get the authenticated user
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;

    // Validate inputs
    if (!file) {
      return NextResponse.json({ error: 'File is required' }, { status: 400 });
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
        {
          error: 'Invalid file type. Only PNG and JPG images are allowed',
        },
        { status: 400 }
      );
    }

    // Get the user's professional profile
    const { data: profileData, error: profileError } = await supabase
      .from('professional_profiles')
      .select('id, portfolio_photos')
      .eq('user_id', user.id)
      .single();

    if (profileError || !profileData) {
      return NextResponse.json(
        { error: 'Professional profile not found' },
        { status: 404 }
      );
    }

    // Check if user already has max photos
    const currentPhotos = profileData.portfolio_photos || [];
    if (currentPhotos.length >= MAX_PHOTOS) {
      return NextResponse.json(
        { error: `Maximum ${MAX_PHOTOS} portfolio photos allowed` },
        { status: 400 }
      );
    }

    // Generate unique filename
    const fileExtension = file.name.split('.').pop();
    const uniqueFileName = `portfolio/${profileData.id}_${randomUUID()}.${fileExtension}`;
    const storagePath = uniqueFileName;

    // Upload to Supabase Storage
    const fileBuffer = await file.arrayBuffer();
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('professional-files')
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

    // Get public URL
    const {
      data: { publicUrl },
    } = supabase.storage.from('professional-files').getPublicUrl(uploadData.path);

    // Update profile with new photo URL
    const updatedPhotos = [...currentPhotos, publicUrl];
    const { error: updateError } = await supabase
      .from('professional_profiles')
      .update({
        portfolio_photos: updatedPhotos,
        updated_at: new Date().toISOString(),
      })
      .eq('id', profileData.id);

    if (updateError) {
      console.error('Error updating portfolio photos:', updateError);
      // Try to delete the uploaded file
      await supabase.storage.from('professional-files').remove([storagePath]);
      return NextResponse.json(
        { error: 'Failed to update portfolio photos' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      photoUrl: publicUrl,
      photos: updatedPhotos,
    });
  } catch (error) {
    console.error('Error in portfolio upload API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const supabase = await createClient();

    // Get the authenticated user
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const photoUrl = searchParams.get('photoUrl');

    if (!photoUrl) {
      return NextResponse.json(
        { error: 'Photo URL is required' },
        { status: 400 }
      );
    }

    // Get the user's professional profile
    const { data: profileData, error: profileError } = await supabase
      .from('professional_profiles')
      .select('id, portfolio_photos')
      .eq('user_id', user.id)
      .single();

    if (profileError || !profileData) {
      return NextResponse.json(
        { error: 'Professional profile not found' },
        { status: 404 }
      );
    }

    const currentPhotos = profileData.portfolio_photos || [];

    // Check if photo exists in user's portfolio
    if (!currentPhotos.includes(photoUrl)) {
      return NextResponse.json(
        { error: 'Photo not found in portfolio' },
        { status: 404 }
      );
    }

    // Extract path from URL and delete from storage
    const urlParts = photoUrl.split('/professional-files/');
    if (urlParts.length > 1) {
      const filePath = urlParts[1];
      await supabase.storage.from('professional-files').remove([filePath]);
    }

    // Update profile to remove photo URL
    const updatedPhotos = currentPhotos.filter((url: string) => url !== photoUrl);
    const { error: updateError } = await supabase
      .from('professional_profiles')
      .update({
        portfolio_photos: updatedPhotos,
        updated_at: new Date().toISOString(),
      })
      .eq('id', profileData.id);

    if (updateError) {
      console.error('Error removing portfolio photo:', updateError);
      return NextResponse.json(
        { error: 'Failed to remove portfolio photo' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      photos: updatedPhotos,
    });
  } catch (error) {
    console.error('Error in portfolio delete API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
