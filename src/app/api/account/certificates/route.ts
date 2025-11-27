import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { randomUUID } from 'crypto';

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB for certificates
const ALLOWED_MIME_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'application/pdf',
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
    const title = formData.get('title') as string;
    const issuingOrganization = formData.get('issuing_organization') as string;
    const issueDate = formData.get('issue_date') as string;
    const expiryDate = formData.get('expiry_date') as string;

    // Validate inputs
    if (!file || !title || !issuingOrganization || !issueDate || !expiryDate) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: 'File size exceeds 10MB limit' },
        { status: 400 }
      );
    }

    // Validate file type
    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      return NextResponse.json(
        {
          error: 'Invalid file type. Only JPG, PNG, and PDF files are allowed',
        },
        { status: 400 }
      );
    }

    // Validate dates
    const issueDateObj = new Date(issueDate);
    const expiryDateObj = new Date(expiryDate);
    if (issueDateObj >= expiryDateObj) {
      return NextResponse.json(
        { error: 'Expiry date must be after issue date' },
        { status: 400 }
      );
    }

    // Get the user's professional profile
    const { data: profileData, error: profileError } = await supabase
      .from('professional_profiles')
      .select('id')
      .eq('user_id', user.id)
      .single();

    if (profileError || !profileData) {
      return NextResponse.json(
        { error: 'Professional profile not found' },
        { status: 404 }
      );
    }

    // Generate unique filename
    const fileExtension = file.name.split('.').pop();
    const uniqueFileName = `certificates/${profileData.id}_${randomUUID()}.${fileExtension}`;
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

    // Insert certificate record into database
    const { data: certificateData, error: insertError } = await supabase
      .from('professional_certificates')
      .insert({
        professional_profile_id: profileData.id,
        title,
        issuing_organization: issuingOrganization,
        issue_date: issueDate,
        expiry_date: expiryDate,
        file_url: publicUrl,
      })
      .select()
      .single();

    if (insertError) {
      console.error('Error inserting certificate:', insertError);
      // Try to delete the uploaded file
      await supabase.storage.from('professional-files').remove([storagePath]);
      return NextResponse.json(
        { error: 'Failed to save certificate' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      certificate: certificateData,
    });
  } catch (error) {
    console.error('Error in certificate upload API:', error);
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
    const certificateId = searchParams.get('certificateId');

    if (!certificateId) {
      return NextResponse.json(
        { error: 'Certificate ID is required' },
        { status: 400 }
      );
    }

    // Get the user's professional profile
    const { data: profileData, error: profileError } = await supabase
      .from('professional_profiles')
      .select('id')
      .eq('user_id', user.id)
      .single();

    if (profileError || !profileData) {
      return NextResponse.json(
        { error: 'Professional profile not found' },
        { status: 404 }
      );
    }

    // Get the certificate to verify ownership and get file URL
    const { data: certificateData, error: certificateError } = await supabase
      .from('professional_certificates')
      .select('*')
      .eq('id', certificateId)
      .eq('professional_profile_id', profileData.id)
      .single();

    if (certificateError || !certificateData) {
      return NextResponse.json(
        { error: 'Certificate not found or access denied' },
        { status: 404 }
      );
    }

    // Extract path from URL and delete from storage
    const urlParts = certificateData.file_url.split('/professional-files/');
    if (urlParts.length > 1) {
      const filePath = urlParts[1];
      await supabase.storage.from('professional-files').remove([filePath]);
    }

    // Delete certificate record from database
    const { error: deleteError } = await supabase
      .from('professional_certificates')
      .delete()
      .eq('id', certificateId);

    if (deleteError) {
      console.error('Error deleting certificate:', deleteError);
      return NextResponse.json(
        { error: 'Failed to delete certificate' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Certificate deleted successfully',
    });
  } catch (error) {
    console.error('Error in certificate delete API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
