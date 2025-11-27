import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { randomUUID } from 'crypto';

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
const ALLOWED_MIME_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/svg+xml',
];

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
        { error: 'File size exceeds 2MB limit' },
        { status: 400 }
      );
    }

    // Validate file type
    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      return NextResponse.json(
        {
          error:
            'Invalid file type. Only PNG, JPG, and SVG images are allowed',
        },
        { status: 400 }
      );
    }

    // Get the user's professional profile to find company_id and role
    const { data: profileData, error: profileError } = await supabase
      .from('professional_profiles')
      .select('company_id, role_in_company')
      .eq('user_id', user.id)
      .single();

    if (profileError || !profileData) {
      return NextResponse.json(
        { error: 'Professional profile not found' },
        { status: 404 }
      );
    }

    if (!profileData.company_id) {
      return NextResponse.json(
        { error: 'No company linked to this profile' },
        { status: 404 }
      );
    }

    // Check if user is owner
    if (profileData.role_in_company !== 'owner') {
      return NextResponse.json(
        { error: 'Only company owners can update the logo' },
        { status: 403 }
      );
    }

    // Generate unique filename
    const fileExtension = file.name.split('.').pop();
    const uniqueFileName = `${profileData.company_id}_${randomUUID()}.${fileExtension}`;
    const storagePath = `company-logos/${uniqueFileName}`;

    // Upload to Supabase Storage
    const fileBuffer = await file.arrayBuffer();
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('company-logos')
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
    } = supabase.storage.from('company-logos').getPublicUrl(uploadData.path);

    // Update company with new logo URL
    const { error: updateError } = await supabase
      .from('professional_companies')
      .update({
        logo_url: publicUrl,
        updated_at: new Date().toISOString(),
      })
      .eq('id', profileData.company_id);

    if (updateError) {
      console.error('Error updating company logo:', updateError);
      // Try to delete the uploaded file
      await supabase.storage.from('company-logos').remove([storagePath]);
      return NextResponse.json(
        { error: 'Failed to update company logo' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      logoUrl: publicUrl,
    });
  } catch (error) {
    console.error('Error in company logo upload API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE() {
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

    // Get the user's professional profile to find company_id and role
    const { data: profileData, error: profileError } = await supabase
      .from('professional_profiles')
      .select('company_id, role_in_company')
      .eq('user_id', user.id)
      .single();

    if (profileError || !profileData) {
      return NextResponse.json(
        { error: 'Professional profile not found' },
        { status: 404 }
      );
    }

    if (!profileData.company_id) {
      return NextResponse.json(
        { error: 'No company linked to this profile' },
        { status: 404 }
      );
    }

    // Check if user is owner
    if (profileData.role_in_company !== 'owner') {
      return NextResponse.json(
        { error: 'Only company owners can delete the logo' },
        { status: 403 }
      );
    }

    // Get current logo URL
    const { data: companyData, error: companyError } = await supabase
      .from('professional_companies')
      .select('logo_url')
      .eq('id', profileData.company_id)
      .single();

    if (companyError || !companyData) {
      return NextResponse.json({ error: 'Company not found' }, { status: 404 });
    }

    // Extract path from URL and delete from storage
    if (companyData.logo_url) {
      const urlParts = companyData.logo_url.split('/company-logos/');
      if (urlParts.length > 1) {
        const filePath = `company-logos/${urlParts[1]}`;
        await supabase.storage.from('company-logos').remove([filePath]);
      }
    }

    // Update company to remove logo URL
    const { error: updateError } = await supabase
      .from('professional_companies')
      .update({
        logo_url: null,
        updated_at: new Date().toISOString(),
      })
      .eq('id', profileData.company_id);

    if (updateError) {
      console.error('Error removing company logo:', updateError);
      return NextResponse.json(
        { error: 'Failed to remove company logo' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error('Error in company logo delete API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
