import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function GET() {
  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev', // Use Resend's test domain
      to: 'your-email@example.com', // Change to your actual email
      subject: 'Bouwmatcher Email Test',
      html: '<h1>Test Email</h1><p>If you receive this, Resend is working!</p>',
    });

    if (error) {
      return NextResponse.json({
        success: false,
        error: error
      }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      data,
      message: 'Email sent successfully! Check your inbox.'
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: String(error)
    }, { status: 500 });
  }
}
