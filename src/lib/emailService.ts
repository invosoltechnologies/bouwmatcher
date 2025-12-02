/**
 * Email Service using Resend
 * Handles all transactional emails
 */

import { Resend } from 'resend';
import { EMAIL_CONFIG } from './config';

const resend = new Resend(EMAIL_CONFIG.apiKey);

interface ProjectCreatedEmailParams {
  projectId: string;
  accessToken: string;
  email: string;
  firstName: string;
}

/**
 * Send project created confirmation email with status link
 */
export async function sendProjectCreatedEmail({
  projectId,
  accessToken,
  email,
  firstName,
}: ProjectCreatedEmailParams) {
  const statusLink = `${EMAIL_CONFIG.baseUrl}/project-status?token=${accessToken}`;

  try {
    const { data, error } = await resend.emails.send({
      from: `${EMAIL_CONFIG.fromName} <${EMAIL_CONFIG.fromEmail}>`,
      to: email,
      subject: 'Je aanvraag is verstuurd - Bouwmatcher',
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
              .button {
                display: inline-block;
                background: #0AB27E;
                color: white !important;
                padding: 14px 32px;
                text-decoration: none;
                border-radius: 8px;
                font-weight: 600;
                margin: 20px 0;
              }
              .button:hover {
                background: #099968;
              }
              .footer {
                margin-top: 40px;
                padding-top: 20px;
                border-top: 1px solid #eee;
                font-size: 14px;
                color: #666;
              }
              .status-info {
                background: #f8f9fa;
                padding: 20px;
                border-radius: 8px;
                margin: 20px 0;
              }
            </style>
          </head>
          <body>
            <div class="header">
              <h1>Bedankt ${firstName}! 🎉</h1>
            </div>

            <div class="content">
              <p>Je aanvraag is succesvol verstuurd naar vakspecialisten in jouw regio.</p>

              <div class="status-info">
                <p><strong>Wat gebeurt er nu?</strong></p>
                <ul>
                  <li>Vakspecialisten in jouw regio ontvangen je aanvraag</li>
                  <li>Je ontvangt binnen 48 uur offertes van geïnteresseerde professionals</li>
                  <li>Je kunt de offertes vergelijken en de beste specialist kiezen</li>
                </ul>
              </div>

              <p>Via onderstaande link kun je de status van je aanvraag volgen:</p>

              <center>
                <a href="${statusLink}" class="button">
                  Bekijk project status
                </a>
              </center>

              <p style="font-size: 14px; color: #666;">
                Of kopieer deze link: <br>
                <a href="${statusLink}">${statusLink}</a>
              </p>
            </div>

            <div class="footer">
              <p>
                <strong>Bouwmatcher</strong><br>
                Platform voor het vinden van betrouwbare bouwprofessionals
              </p>
              <p style="font-size: 12px; color: #999;">
                Project ID: ${projectId}
              </p>
            </div>
          </body>
        </html>
      `,
    });

    if (error) {
      console.error('❌ Email send error:', error);
      return { success: false, error };
    }

    console.log(`✅ Email sent to ${email}:`, data);
    return { success: true, data };
  } catch (error) {
    console.error('❌ Email service error:', error);
    return { success: false, error };
  }
}
