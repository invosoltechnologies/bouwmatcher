import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { Resend } from 'resend';
import { EMAIL_CONFIG } from '@/lib/config';
import { ADMIN_EMAIL } from '@/lib/utils/admin-auth';

const resend = new Resend(EMAIL_CONFIG.apiKey);

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();

    // Check if user is authenticated
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { categoryName, specializedFields, message } = body;

    // Validate required fields
    if (!categoryName || !specializedFields) {
      return NextResponse.json(
        { error: 'Category name and specialized fields are required' },
        { status: 400 }
      );
    }

    // Get user's professional profile for additional context
    const { data: profile } = await supabase
      .from('professional_profiles')
      .select('first_name, last_name, email, phone')
      .eq('user_id', user.id)
      .single();

    const userName = profile
      ? `${profile.first_name} ${profile.last_name}`
      : user.email || 'Unknown User';
    const userEmail = profile?.email || user.email || 'No email';
    const userPhone = profile?.phone || 'Not provided';

    // Send email notification to admin
    try {
      await resend.emails.send({
        from: `${EMAIL_CONFIG.fromName} <${EMAIL_CONFIG.fromEmail}>`,
        to: ADMIN_EMAIL,
        replyTo: userEmail,
        subject: `[Specialization Suggestion] ${categoryName}`,
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
                  font-size: 14px;
                }
                .field-value {
                  color: #333;
                  padding: 10px;
                  background: #f8f9fa;
                  border-radius: 6px;
                  white-space: pre-wrap;
                }
                .badge {
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
                  <h1>💡 Nieuwe specialisatie suggestie</h1>
                </div>

                <div class="field">
                  <div class="field-label">Voorgestelde Categorie Naam</div>
                  <div class="field-value">
                    <span class="badge">${categoryName}</span>
                  </div>
                </div>

                <div class="field">
                  <div class="field-label">Gespecialiseerde Velden</div>
                  <div class="field-value">${specializedFields}</div>
                </div>

                ${message ? `
                <div class="field">
                  <div class="field-label">Aanvullend Bericht</div>
                  <div class="field-value">${message}</div>
                </div>
                ` : ''}

                <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">

                <div class="field">
                  <div class="field-label">Ingediend Door</div>
                  <div class="field-value">${userName}</div>
                </div>

                <div class="field">
                  <div class="field-label">Email</div>
                  <div class="field-value"><a href="mailto:${userEmail}">${userEmail}</a></div>
                </div>

                <div class="field">
                  <div class="field-label">Telefoon</div>
                  <div class="field-value">${userPhone}</div>
                </div>

                <div class="footer">
                  <p>User ID: ${user.id}</p>
                  <p>Ontvangen op: ${new Date().toLocaleString('nl-NL')}</p>
                </div>
              </div>
            </body>
          </html>
        `
      });

      return NextResponse.json({
        success: true,
        message: 'Specialization suggestion submitted successfully'
      });

    } catch (emailError) {
      console.error('Email send error:', emailError);
      return NextResponse.json(
        { error: 'Failed to send suggestion email' },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('Error in suggest-specialization endpoint:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
