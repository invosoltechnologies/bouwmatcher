import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { Resend } from 'resend';
import { EMAIL_CONFIG } from '@/lib/config';

const resend = new Resend(EMAIL_CONFIG.apiKey);

// Admin email where contact submissions should be sent
const ADMIN_EMAIL = process.env.CONTACT_ADMIN_EMAIL || 'info@bouwmatcher.com';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    // Extract form fields
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string | null;
    const subject = formData.get('subject') as string;
    const category = formData.get('category') as string;
    const message = formData.get('message') as string;
    const file = formData.get('file') as File | null;

    // Validate required fields
    if (!name || !email || !subject || !category || !message) {
      return NextResponse.json(
        { error: 'All required fields must be filled' },
        { status: 400 }
      );
    }

    // Validate category
    const validCategories = ['general', 'quote', 'support', 'partnership', 'complaint'];
    if (!validCategories.includes(category)) {
      return NextResponse.json(
        { error: 'Invalid category' },
        { status: 400 }
      );
    }

    let fileBuffer: Buffer | null = null;
    let fileName: string | null = null;
    let fileType: string | null = null;

    // Handle file if present (for email attachment)
    if (file && file.size > 0) {
      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        return NextResponse.json(
          { error: 'File size must be less than 10MB' },
          { status: 400 }
        );
      }

      // Validate file type
      const allowedTypes = [
        'image/jpeg',
        'image/jpg',
        'image/png',
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      ];

      if (!allowedTypes.includes(file.type)) {
        return NextResponse.json(
          { error: 'Invalid file type. Only JPG, PNG, PDF, DOC, and DOCX are allowed' },
          { status: 400 }
        );
      }

      // Convert file to buffer for email attachment
      const arrayBuffer = await file.arrayBuffer();
      fileBuffer = Buffer.from(arrayBuffer);
      fileName = file.name;
      fileType = file.type;
    }

    // Save to database (without file - file will be sent via email only)
    const { data: submission, error: dbError } = await supabaseAdmin
      .from('contact_submissions')
      .insert({
        name,
        email,
        phone,
        subject,
        category,
        message,
        file_name: fileName, // Store filename for reference
        status: 'new'
      })
      .select()
      .single();

    if (dbError) {
      console.error('Database error:', dbError);
      return NextResponse.json(
        { error: 'Failed to save submission' },
        { status: 500 }
      );
    }

    // Send email notification to admin
    try {
      const categoryLabels: Record<string, string> = {
        general: 'Algemene vraag',
        quote: 'Offerte aanvraag',
        support: 'Ondersteuning',
        partnership: 'Samenwerking',
        complaint: 'Klacht'
      };

      // Prepare email data
      const emailData: {
        from: string;
        to: string;
        replyTo: string;
        subject: string;
        html: string;
        attachments?: Array<{ filename: string; content: Buffer }>;
      } = {
        from: `${EMAIL_CONFIG.fromName} <${EMAIL_CONFIG.fromEmail}>`,
        to: ADMIN_EMAIL,
        replyTo: email,
        subject: `[Contact Form] ${categoryLabels[category]} - ${subject}`,
        html: `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <style>
                body {
                  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                  line-height: 1.6;
                  color: #333;
                  max-width: 600px;
                  margin: 0 auto;
                  padding: 20px;
                  background-color: #f5f5f5;
                }
                .container {
                  background: white;
                  padding: 30px;
                  border-radius: 12px;
                  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                }
                .header {
                  background: linear-gradient(90deg, rgba(10, 178, 126, 0.10) 0%, rgba(2, 58, 162, 0.10) 100%);
                  padding: 20px;
                  border-radius: 8px;
                  margin-bottom: 20px;
                }
                .header h1 {
                  color: #0AB27E;
                  margin: 0;
                  font-size: 24px;
                }
                .field {
                  margin-bottom: 20px;
                }
                .field-label {
                  font-weight: 600;
                  color: #555;
                  margin-bottom: 5px;
                }
                .field-value {
                  color: #333;
                  padding: 10px;
                  background: #f8f9fa;
                  border-radius: 6px;
                  white-space: pre-wrap;
                }
                .category-badge {
                  display: inline-block;
                  padding: 4px 12px;
                  background: #0AB27E;
                  color: white;
                  border-radius: 20px;
                  font-size: 14px;
                  font-weight: 600;
                }
                .footer {
                  margin-top: 30px;
                  padding-top: 20px;
                  border-top: 1px solid #eee;
                  font-size: 12px;
                  color: #999;
                  text-align: center;
                }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h1>📧 Nieuw contactformulier bericht</h1>
                </div>

                <div class="field">
                  <div class="field-label">Categorie</div>
                  <div>
                    <span class="category-badge">${categoryLabels[category]}</span>
                  </div>
                </div>

                <div class="field">
                  <div class="field-label">Onderwerp</div>
                  <div class="field-value">${subject}</div>
                </div>

                <div class="field">
                  <div class="field-label">Naam</div>
                  <div class="field-value">${name}</div>
                </div>

                <div class="field">
                  <div class="field-label">Email</div>
                  <div class="field-value"><a href="mailto:${email}">${email}</a></div>
                </div>

                ${phone ? `
                <div class="field">
                  <div class="field-label">Telefoon</div>
                  <div class="field-value">${phone}</div>
                </div>
                ` : ''}

                <div class="field">
                  <div class="field-label">Bericht</div>
                  <div class="field-value">${message}</div>
                </div>

                ${fileName ? `
                <div class="field">
                  <div class="field-label">Bijlage</div>
                  <div class="field-value">${fileName} (zie bijlage)</div>
                </div>
                ` : ''}

                <div class="footer">
                  <p>Submission ID: ${submission.id}</p>
                  <p>Ontvangen op: ${new Date().toLocaleString('nl-NL')}</p>
                </div>
              </div>
            </body>
          </html>
        `
      };

      // Add attachment if file is present
      if (fileBuffer && fileName) {
        emailData.attachments = [
          {
            filename: fileName,
            content: fileBuffer
          }
        ];
      }

      const { error: emailError } = await resend.emails.send(emailData);

      if (emailError) {
        console.error('Email send error:', emailError);
        // Don't fail the request if email fails - submission is already saved
      }
    } catch (emailException) {
      console.error('Email exception:', emailException);
      // Don't fail the request if email fails
    }

    // Send confirmation email to user
    try {
      await resend.emails.send({
        from: `${EMAIL_CONFIG.fromName} <${EMAIL_CONFIG.fromEmail}>`,
        to: email,
        subject: 'Bedankt voor je bericht - Bouwmatcher',
        html: `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <style>
                body {
                  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                  line-height: 1.6;
                  color: #333;
                  max-width: 600px;
                  margin: 0 auto;
                  padding: 20px;
                }
                .header {
                  background: linear-gradient(90deg, rgba(10, 178, 126, 0.10) 0%, rgba(2, 58, 162, 0.10) 100%);
                  padding: 30px;
                  border-radius: 12px;
                  text-align: center;
                  margin-bottom: 30px;
                }
                .header h1 {
                  color: #0AB27E;
                  margin: 0;
                  font-size: 28px;
                }
                .content {
                  padding: 20px 0;
                }
                .footer {
                  margin-top: 40px;
                  padding-top: 20px;
                  border-top: 1px solid #eee;
                  font-size: 14px;
                  color: #666;
                }
              </style>
            </head>
            <body>
              <div class="header">
                <h1>Bedankt ${name}! 🎉</h1>
              </div>

              <div class="content">
                <p>We hebben je bericht ontvangen en nemen binnen 24 uur contact met je op.</p>

                <p><strong>Jouw bericht:</strong></p>
                <p style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin: 15px 0;">
                  ${message}
                </p>

                <p>Als je nog vragen hebt, aarzel dan niet om contact met ons op te nemen.</p>
              </div>

              <div class="footer">
                <p>
                  <strong>Bouwmatcher</strong><br>
                  Platform voor het vinden van betrouwbare bouwprofessionals
                </p>
              </div>
            </body>
          </html>
        `,
      });
    } catch (confirmEmailError) {
      console.error('Confirmation email error:', confirmEmailError);
      // Don't fail the request if confirmation email fails
    }

    return NextResponse.json({
      success: true,
      message: 'Your message has been submitted successfully',
      submissionId: submission.id
    });

  } catch (error) {
    console.error('Error in contact form submission:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
