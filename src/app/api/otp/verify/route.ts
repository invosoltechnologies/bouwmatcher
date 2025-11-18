import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { draftId, phoneNumber, otp } = body;

    // Validate required fields
    if (!draftId || !phoneNumber || !otp) {
      return NextResponse.json(
        { error: 'Draft ID, phone number, and OTP are required' },
        { status: 400 }
      );
    }

    // Get draft with verification code
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

    // Check if OTP exists
    if (!draft.verification_code || !draft.verification_expires_at) {
      console.log(`❌ No OTP found for draft ${draftId}`);
      return NextResponse.json(
        { error: 'No OTP found. Please request a new one.' },
        { status: 400 }
      );
    }

    // Check if OTP has expired
    const expiresAt = new Date(draft.verification_expires_at);
    const now = new Date();

    if (now > expiresAt) {
      console.log(`❌ OTP expired for draft ${draftId}. Expired at: ${expiresAt.toISOString()}`);

      // Clear expired OTP
      await supabase
        .from('project_drafts')
        .update({
          verification_code: null,
          verification_expires_at: null,
        })
        .eq('id', draftId);

      return NextResponse.json(
        { error: 'OTP has expired. Please request a new one.' },
        { status: 400 }
      );
    }

    // Decode stored OTP from base64
    const decodedOtp = Buffer.from(draft.verification_code, 'base64').toString('utf-8');

    // Verify OTP
    if (decodedOtp !== otp) {
      console.log(`❌ Invalid OTP for draft ${draftId}`);
      return NextResponse.json(
        { error: 'Invalid OTP. Please try again.' },
        { status: 400 }
      );
    }

    console.log(`✅ OTP verified successfully for draft ${draftId}`);

    // Mark phone as verified and clear OTP
    const { error: updateError } = await supabase
      .from('project_drafts')
      .update({
        phone_verified: true,
        phone_verified_at: new Date().toISOString(),
        verification_code: null, // Clear OTP after successful verification
        verification_expires_at: null,
        updated_at: new Date().toISOString(),
      })
      .eq('id', draftId);

    if (updateError) {
      console.error('Error updating draft:', updateError);
      return NextResponse.json(
        { error: 'Failed to verify phone number' },
        { status: 500 }
      );
    }

    // Convert draft to project
    try {
      const { data: result, error: conversionError } = await supabase
        .rpc('convert_draft_to_project', { p_draft_id: draftId });

      if (conversionError) {
        console.error('Error converting draft to project:', conversionError);
        return NextResponse.json(
          { error: 'Failed to create project' },
          { status: 500 }
        );
      }

      // Parse result JSON
      const { project_id: projectId, access_token: accessToken } = result;

      console.log(`✅ Draft ${draftId} converted to project ${projectId}`);

      // Send confirmation email with status link
      const { sendProjectCreatedEmail } = await import('@/lib/emailService');

      const emailResult = await sendProjectCreatedEmail({
        projectId,
        accessToken,
        email: draft.email,
        firstName: draft.first_name || 'daar',
      });

      if (!emailResult.success) {
        console.error('❌ Failed to send email:', emailResult.error);
        // Don't fail the request if email fails, just log it
      }

      return NextResponse.json({
        success: true,
        message: 'Phone verified and project created successfully',
        projectId,
      });
    } catch (conversionError) {
      console.error('Error calling convert function:', conversionError);
      return NextResponse.json(
        { error: 'Failed to create project' },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('Error verifying OTP:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
