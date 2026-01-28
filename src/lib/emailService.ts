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

interface PasswordResetEmailParams {
  email: string;
  firstName: string;
  resetLink: string;
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
  const baseUrl = EMAIL_CONFIG.baseUrl;
  const statusLink = `${baseUrl}/project-status?token=${accessToken}`;
  const updateLink = `${baseUrl}/project-status/update?token=${accessToken}`;

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
              * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
              }
              body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                line-height: 1.6;
                color: #333;
                background-color: #f9fafb;
              }
              .wrapper {
                max-width: 600px;
                margin: 0 auto;
                background-color: white;
              }
              .header {
                background: linear-gradient(90deg, rgba(10, 178, 126, 0.15) 0%, rgba(2, 58, 162, 0.15) 100%);
                padding: 40px 20px;
                text-align: center;
                border-bottom: 2px solid #0AB27E;
              }
              .header h1 {
                color: #0AB27E;
                margin: 0;
                font-size: 28px;
                font-weight: 600;
              }
              .header p {
                color: #666;
                font-size: 14px;
                margin-top: 8px;
              }
              .content {
                padding: 40px 20px;
              }
              .content h2 {
                color: #1a1a1a;
                font-size: 20px;
                margin-bottom: 16px;
                font-weight: 600;
              }
              .content p {
                color: #555;
                margin-bottom: 16px;
                font-size: 14px;
                line-height: 1.8;
              }
              .status-info {
                background: #f0fdf4;
                border-left: 4px solid #0AB27E;
                padding: 20px;
                margin: 24px 0;
                border-radius: 4px;
              }
              .status-info h3 {
                color: #0AB27E;
                font-size: 16px;
                margin-bottom: 12px;
                font-weight: 600;
              }
              .status-info ul {
                list-style: none;
                padding-left: 0;
              }
              .status-info li {
                color: #555;
                font-size: 14px;
                margin-bottom: 8px;
                padding-left: 24px;
                position: relative;
              }
              .status-info li:before {
                content: "✓";
                position: absolute;
                left: 0;
                color: #0AB27E;
                font-weight: bold;
              }
              .action-buttons {
                margin: 32px 0;
                text-align: center;
              }
              .button {
                display: inline-block;
                background: #0AB27E;
                color: white !important;
                padding: 14px 32px;
                text-decoration: none;
                border-radius: 8px;
                font-weight: 600;
                font-size: 14px;
                margin: 8px;
                transition: background 0.2s;
              }
              .button:hover {
                background: #099968;
              }
              .button-secondary {
                background: #023AA2;
              }
              .button-secondary:hover {
                background: #022582;
              }
              .button-block {
                display: block;
                width: 100%;
                text-align: center;
                margin: 12px 0;
                padding: 16px 20px;
              }
              .divider {
                border-top: 1px solid #e5e7eb;
                margin: 32px 0;
              }
              .links-section {
                background: #f9fafb;
                padding: 20px;
                border-radius: 4px;
                margin: 24px 0;
              }
              .links-section p {
                font-size: 12px;
                color: #666;
                margin: 8px 0;
              }
              .links-section a {
                color: #0AB27E;
                text-decoration: none;
                word-break: break-all;
              }
              .links-section a:hover {
                text-decoration: underline;
              }
              .footer {
                background: #f9fafb;
                padding: 32px 20px;
                text-align: center;
                border-top: 1px solid #e5e7eb;
                font-size: 12px;
                color: #999;
              }
              .footer p {
                margin: 8px 0;
              }
              .footer-brand {
                font-weight: 600;
                color: #333;
                margin-bottom: 4px;
              }
              @media (max-width: 600px) {
                .wrapper {
                  width: 100%;
                }
                .content {
                  padding: 24px 16px;
                }
                .header {
                  padding: 32px 16px;
                }
                .header h1 {
                  font-size: 24px;
                }
                .button {
                  display: block;
                  width: 100%;
                  margin: 10px 0;
                }
                .action-buttons {
                  margin: 24px 0;
                }
              }
            </style>
          </head>
          <body>
            <div class="wrapper">
              <div class="header">
                <h1>Bedankt ${firstName}! 🎉</h1>
                <p>Je aanvraag is succesvol ontvangen</p>
              </div>

              <div class="content">
                <h2>Je aanvraag is verstuurd</h2>
                <p>Je hebt succesvol een projectaanvraag ingediend. Vakspecialisten in jouw regio hebben deze inmiddels ontvangen en gaan ervan horen.</p>

                <div class="status-info">
                  <h3>Wat gebeurt er nu?</h3>
                  <ul>
                    <li>Vakspecialisten in jouw regio ontvangen je aanvraag</li>
                    <li>Je ontvangt binnen 48 uur offertes van geïnteresseerde professionals</li>
                    <li>Je kunt de offertes vergelijken en de beste specialist kiezen</li>
                  </ul>
                </div>

                <p>Je kunt de voortgang van je project op elk moment volgen via de volgende links:</p>

                <div class="action-buttons">
                  <a href="${statusLink}" class="button">
                    Bekijk project status
                  </a>
                  <a href="${updateLink}" class="button button-secondary">
                    Update project status
                  </a>
                </div>

                <div class="divider"></div>

                <div class="links-section">
                  <p><strong>Directe links:</strong></p>
                  <p>
                    Project status: <br>
                    <a href="${statusLink}">${statusLink}</a>
                  </p>
                  <p>
                    Update status: <br>
                    <a href="${updateLink}">${updateLink}</a>
                  </p>
                </div>

                <p style="font-size: 13px; color: #666; margin-top: 24px;">
                  <strong>Project ID:</strong> ${projectId}
                </p>
              </div>

              <div class="footer">
                <p class="footer-brand">Bouwmatcher</p>
                <p>Platform voor het vinden van betrouwbare bouwprofessionals</p>
                <p style="margin-top: 16px; font-size: 11px; color: #bbb;">
                  Je ontvangt deze e-mail omdat je een projectaanvraag hebt ingediend op Bouwmatcher.nl
                </p>
              </div>
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

/**
 * Send password reset email
 */
export async function sendPasswordResetEmail({
  email,
  firstName,
  resetLink,
}: PasswordResetEmailParams) {
  try {
    const { data, error } = await resend.emails.send({
      from: `${EMAIL_CONFIG.fromName} <${EMAIL_CONFIG.fromEmail}>`,
      to: email,
      subject: 'Reset je wachtwoord - Bouwmatcher',
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
              * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
              }
              body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                line-height: 1.6;
                color: #333;
                background-color: #f9fafb;
              }
              .wrapper {
                max-width: 600px;
                margin: 0 auto;
                background-color: white;
              }
              .header {
                background: linear-gradient(90deg, rgba(10, 178, 126, 0.15) 0%, rgba(2, 58, 162, 0.15) 100%);
                padding: 40px 20px;
                text-align: center;
                border-bottom: 2px solid #0AB27E;
              }
              .header h1 {
                color: #0AB27E;
                margin: 0;
                font-size: 28px;
                font-weight: 600;
              }
              .header p {
                color: #666;
                font-size: 14px;
                margin-top: 8px;
              }
              .content {
                padding: 40px 20px;
              }
              .content h2 {
                color: #1a1a1a;
                font-size: 20px;
                margin-bottom: 16px;
                font-weight: 600;
              }
              .content p {
                color: #555;
                margin-bottom: 16px;
                font-size: 14px;
                line-height: 1.8;
              }
              .security-info {
                background: #fef3c7;
                border-left: 4px solid #f59e0b;
                padding: 20px;
                margin: 24px 0;
                border-radius: 4px;
              }
              .security-info p {
                color: #92400e;
                font-size: 14px;
                margin: 0;
              }
              .action-buttons {
                margin: 32px 0;
                text-align: center;
              }
              .button {
                display: inline-block;
                background: #0AB27E;
                color: white !important;
                padding: 16px 40px;
                text-decoration: none;
                border-radius: 8px;
                font-weight: 600;
                font-size: 16px;
                transition: background 0.2s;
              }
              .button:hover {
                background: #099968;
              }
              .link-section {
                background: #f9fafb;
                padding: 20px;
                border-radius: 4px;
                margin: 24px 0;
              }
              .link-section p {
                font-size: 12px;
                color: #666;
                margin: 8px 0;
              }
              .link-section a {
                color: #0AB27E;
                text-decoration: none;
                word-break: break-all;
              }
              .link-section a:hover {
                text-decoration: underline;
              }
              .footer {
                background: #f9fafb;
                padding: 32px 20px;
                text-align: center;
                border-top: 1px solid #e5e7eb;
                font-size: 12px;
                color: #999;
              }
              .footer p {
                margin: 8px 0;
              }
              .footer-brand {
                font-weight: 600;
                color: #333;
                margin-bottom: 4px;
              }
              @media (max-width: 600px) {
                .wrapper {
                  width: 100%;
                }
                .content {
                  padding: 24px 16px;
                }
                .header {
                  padding: 32px 16px;
                }
                .header h1 {
                  font-size: 24px;
                }
                .button {
                  display: block;
                  width: 100%;
                  padding: 14px 20px;
                }
              }
            </style>
          </head>
          <body>
            <div class="wrapper">
              <div class="header">
                <h1>🔐 Reset je wachtwoord</h1>
                <p>Bouwmatcher - Wachtwoord herstel</p>
              </div>

              <div class="content">
                <h2>Hallo ${firstName || 'daar'},</h2>
                <p>We hebben een verzoek ontvangen om het wachtwoord van je Bouwmatcher account te resetten.</p>

                <p>Klik op de onderstaande knop om een nieuw wachtwoord in te stellen:</p>

                <div class="action-buttons">
                  <a href="${resetLink}" class="button">
                    🔑 Reset mijn wachtwoord
                  </a>
                </div>

                <div class="security-info">
                  <p><strong>⚠️ Belangrijk:</strong> Deze link is 60 minuten geldig. Als je geen wachtwoord reset hebt aangevraagd, kun je deze email veilig negeren.</p>
                </div>

                <p>Als de knop niet werkt, kopieer en plak dan de onderstaande link in je browser:</p>

                <div class="link-section">
                  <p><strong>Reset link:</strong></p>
                  <p>
                    <a href="${resetLink}">${resetLink}</a>
                  </p>
                </div>

                <p style="margin-top: 32px; font-size: 13px; color: #666;">
                  Heb je vragen? Neem gerust contact met ons op via <a href="mailto:support@bouwmatcher.com" style="color: #0AB27E;">support@bouwmatcher.com</a>
                </p>
              </div>

              <div class="footer">
                <p class="footer-brand">Bouwmatcher</p>
                <p>Platform voor het vinden van betrouwbare bouwprofessionals</p>
                <p style="margin-top: 16px; font-size: 11px; color: #bbb;">
                  Je ontvangt deze e-mail omdat er een wachtwoord reset is aangevraagd voor je account op Bouwmatcher.be
                </p>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    if (error) {
      console.error('❌ Password reset email send error:', error);
      return { success: false, error };
    }

    console.log(`✅ Password reset email sent to ${email}:`, data);
    return { success: true, data };
  } catch (error) {
    console.error('❌ Password reset email service error:', error);
    return { success: false, error };
  }
}
