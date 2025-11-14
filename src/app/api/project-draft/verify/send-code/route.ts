import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// Twilio client setup
// Install: npm install twilio
// import twilio from 'twilio';
// const twilioClient = twilio(
//   process.env.TWILIO_ACCOUNT_SID!,
//   process.env.TWILIO_AUTH_TOKEN!
// );

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { draftId } = body;

    if (!draftId) {
      return NextResponse.json(
        { error: 'Draft ID is required' },
        { status: 400 }
      );
    }

    // Get draft data
    const { data: draft, error: draftError } = await supabase
      .from('project_drafts')
      .select('*')
      .eq('id', draftId)
      .single();

    if (draftError || !draft) {
      return NextResponse.json(
        { error: 'Draft not found' },
        { status: 404 }
      );
    }

    // Validate required fields
    if (!draft.phone) {
      return NextResponse.json(
        { error: 'Phone number is required' },
        { status: 400 }
      );
    }

    if (!draft.email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    if (!draft.first_name || !draft.last_name) {
      return NextResponse.json(
        { error: 'First name and last name are required' },
        { status: 400 }
      );
    }

    // Generate 6-digit verification code
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Create or update project record with verification code
    const { data: existingProject } = await supabase
      .from('projects')
      .select('id')
      .eq('source_draft_id', draftId)
      .single();

    let projectId: string;

    if (existingProject) {
      // Update existing project
      const { data: updatedProject, error: updateError } = await supabase
        .from('projects')
        .update({
          verification_code: verificationCode,
          verification_expires_at: expiresAt.toISOString(),
          phone_verified: false,
          updated_at: new Date().toISOString(),
        })
        .eq('id', existingProject.id)
        .select('id')
        .single();

      if (updateError) {
        console.error('Error updating project:', updateError);
        return NextResponse.json(
          { error: 'Failed to update verification code' },
          { status: 500 }
        );
      }

      projectId = updatedProject.id;
    } else {
      // Create new project record with verification pending
      const { data: newProject, error: insertError } = await supabase
        .from('projects')
        .insert({
          source_draft_id: draftId,
          service_category_id: draft.service_category_id,
          request_type: draft.request_type,
          execution_timing: draft.execution_timing,
          execution_date: draft.execution_timing,
          postcode: draft.postcode,
          city: draft.city,
          street_name: draft.street_name,
          street_number: draft.street_number,
          description: draft.description,
          has_photos: draft.has_photos,
          first_name: draft.first_name,
          last_name: draft.last_name,
          email: draft.email,
          phone: draft.phone,
          company_name: draft.company_name,
          contact_type: draft.request_type,
          verification_code: verificationCode,
          verification_expires_at: expiresAt.toISOString(),
          phone_verified: false,
          status: 'pending_verification',
          current_step: 8,
        })
        .select('id')
        .single();

      if (insertError) {
        console.error('Error creating project:', insertError);
        return NextResponse.json(
          { error: 'Failed to create project record' },
          { status: 500 }
        );
      }

      projectId = newProject.id;
    }

    // TODO: Send SMS via Twilio
    // Uncomment when Twilio is configured:
    /*
    try {
      await twilioClient.messages.create({
        body: `Uw Bouwmatcher verificatiecode is: ${verificationCode}. Geldig voor 10 minuten.`,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: draft.phone,
      });
    } catch (twilioError) {
      console.error('Error sending SMS:', twilioError);
      return NextResponse.json(
        { error: 'Failed to send verification SMS' },
        { status: 500 }
      );
    }
    */

    // For development: Return code in response (REMOVE IN PRODUCTION)
    console.log(`Verification code for ${draft.phone}: ${verificationCode}`);

    return NextResponse.json({
      success: true,
      projectId,
      // Remove this line in production:
      devCode: verificationCode, // Only for testing
      message: 'Verification code sent',
    });

  } catch (error) {
    console.error('Error in send verification code:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}