import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';
import { randomUUID } from 'crypto';

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
const ACCEPTED_FILE_TYPES = ['image/png', 'image/jpeg', 'image/jpg'];

export async function POST(request: Request) {
  try {
    const supabase = await createClient();

    // Get authenticated user
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get professional profile
    const { data: profileData, error: profileError } = await supabase
      .from('professional_profiles')
      .select('id, profile_picture_url')
      .eq('user_id', user.id)
      .single();

    if (profileError || !profileData) {
      return NextResponse.json(
        { error: 'Professional profile not found' },
        { status: 404 }
      );
    }

    // Parse form data
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Validate file type
    if (!ACCEPTED_FILE_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: 'Alleen PNG en JPG bestanden zijn toegestaan' },
        { status: 400 }
      );
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: 'Bestand mag maximaal 2MB groot zijn' },
        { status: 400 }
      );
    }

    // Convert file to buffer
    const arrayBuffer = await file.arrayBuffer();
    const fileBuffer = Buffer.from(arrayBuffer);

    // Get file extension
    const mimeType = file.type;
    let fileExtension = 'jpg';
    if (mimeType === 'image/png') fileExtension = 'png';
    else if (mimeType === 'image/jpeg') fileExtension = 'jpg';

    // Generate unique filename
    const uniqueFileName = `profile-pictures/${profileData.id}_${randomUUID()}.${fileExtension}`;

    // Delete old picture if exists
    if (profileData.profile_picture_url) {
      const urlParts = profileData.profile_picture_url.split('/professional-files/');
      if (urlParts.length > 1) {
        const filePath = urlParts[1];
        await supabase.storage
          .from('professional-files')
          .remove([filePath])
          .catch((err) => {
            console.log('Error deleting old picture:', err);
          });
      }
    }

    // Upload new file
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('professional-files')
      .upload(uniqueFileName, fileBuffer, {
        contentType: file.type,
        upsert: false,
      });

    if (uploadError) {
      console.error('Upload error:', uploadError);
      return NextResponse.json(
        { error: 'Failed to upload file' },
        { status: 500 }
      );
    }

    // Get public URL
    const { data: publicUrlData } = supabase.storage
      .from('professional-files')
      .getPublicUrl(uniqueFileName);

    // Update profile with new picture URL
    const { error: updateError } = await supabase
      .from('professional_profiles')
      .update({ profile_picture_url: publicUrlData.publicUrl })
      .eq('id', profileData.id);

    if (updateError) {
      console.error('Update error:', updateError);
      return NextResponse.json(
        { error: 'Failed to update profile picture URL' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      profilePictureUrl: publicUrlData.publicUrl,
      message: 'Profile picture uploaded successfully',
    });
  } catch (error) {
    console.error('Profile picture upload error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  try {
    const supabase = await createClient();

    // Get authenticated user
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get professional profile
    const { data: profileData, error: profileError } = await supabase
      .from('professional_profiles')
      .select('id, profile_picture_url')
      .eq('user_id', user.id)
      .single();

    if (profileError || !profileData) {
      return NextResponse.json(
        { error: 'Professional profile not found' },
        { status: 404 }
      );
    }

    // Delete file if exists
    if (profileData.profile_picture_url) {
      const urlParts = profileData.profile_picture_url.split('/professional-files/');
      if (urlParts.length > 1) {
        const filePath = urlParts[1];
        await supabase.storage
          .from('professional-files')
          .remove([filePath])
          .catch((err) => {
            console.log('Error deleting picture:', err);
          });
      }
    }

    // Update profile to remove picture URL
    const { error: updateError } = await supabase
      .from('professional_profiles')
      .update({ profile_picture_url: null })
      .eq('id', profileData.id);

    if (updateError) {
      console.error('Update error:', updateError);
      return NextResponse.json(
        { error: 'Failed to update profile' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: 'Profile picture deleted successfully',
    });
  } catch (error) {
    console.error('Profile picture delete error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
