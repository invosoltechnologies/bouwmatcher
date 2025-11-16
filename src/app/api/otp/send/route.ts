import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { SMS_CONFIG, TWILIO_CONFIG } from '@/lib/config';
import twilio from 'twilio';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { draftId, phoneNumber } = body;

    // Validate required fields
    if (!draftId || !phoneNumber) {
      return NextResponse.json(
        { error: 'Draft ID and phone number are required' },
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

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Encode OTP to base64 for database storage
    const encodedOtp = Buffer.from(otp).toString('base64');

    // Calculate expiry time (2 minutes from now)
    const expiresAt = new Date(Date.now() + SMS_CONFIG.otpExpiryMinutes * 60 * 1000);

    // Store encoded OTP in database
    const { error: updateError } = await supabase
      .from('project_drafts')
      .update({
        verification_code: encodedOtp,
        verification_expires_at: expiresAt.toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq('id', draftId);

    if (updateError) {
      console.error('Error storing OTP:', updateError);
      return NextResponse.json(
        { error: 'Failed to generate verification code' },
        { status: 500 }
      );
    }

    console.log(`📝 OTP stored in database for ${phoneNumber}: ${otp} (expires at ${expiresAt.toISOString()})`);

    // Development mode: Skip Twilio and return OTP directly
    if (!SMS_CONFIG.enableSMS) {
      console.log(`📱 [DEV MODE] OTP for ${phoneNumber}: ${otp}`);

      return NextResponse.json({
        success: true,
        message: 'OTP sent successfully',
        developmentOtp: otp, // Only in dev mode
      });
    }

    // Production mode: Send real SMS via Twilio
    if (!TWILIO_CONFIG.accountSid || !TWILIO_CONFIG.authToken || !TWILIO_CONFIG.phoneNumber) {
      console.error('Twilio credentials missing');
      return NextResponse.json(
        { error: 'SMS service is not configured' },
        { status: 500 }
      );
    }

    try {
      // Initialize Twilio client
      const client = twilio(TWILIO_CONFIG.accountSid, TWILIO_CONFIG.authToken);

      // Send SMS
      await client.messages.create({
        body: `Je verificatiecode voor Bouwmatcher is: ${otp}`,
        from: TWILIO_CONFIG.phoneNumber,
        to: phoneNumber,
      });

      console.log(`✅ SMS sent to ${phoneNumber}`);

      return NextResponse.json({
        success: true,
        message: 'OTP sent successfully',
      });
    } catch (twilioError: any) {
      console.error('Twilio error:', twilioError);

      // Return generic error (don't leak OTP in production!)
      return NextResponse.json(
        { error: 'Failed to send SMS. Please try again.' },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('Error in send OTP:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
