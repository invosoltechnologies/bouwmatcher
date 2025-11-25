/**
 * Application Configuration
 * Centralized environment variables and configuration
 */

// SMS/OTP Configuration
export const SMS_CONFIG = {
  // Set to true to send real SMS, false to show OTP in console (for development)
  enableSMS: process.env.NEXT_PUBLIC_ENABLE_SMS === 'true',

  // OTP settings
  otpLength: 6,
  otpExpiryMinutes: 2,
  otpDisplayCountdownSeconds: 60, // Show 1 minute to user even though it's 2 min
} as const;

// Twilio Configuration (server-side only)
export const TWILIO_CONFIG = {
  accountSid: process.env.TWILIO_ACCOUNT_SID,
  authToken: process.env.TWILIO_AUTH_TOKEN,
  phoneNumber: process.env.TWILIO_PHONE_NUMBER,
} as const;

// Supabase Configuration
export const SUPABASE_CONFIG = {
  url: process.env.NEXT_PUBLIC_SUPABASE_URL!,
  publishableKey: process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
  serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
} as const;

// Email Configuration (server-side only)
export const EMAIL_CONFIG = {
  apiKey: process.env.RESEND_API_KEY,
  fromEmail: process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev',
  fromName: 'Bouwmatcher',
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000',
} as const;

// Belgian KBO API Configuration (server-side only)
export const KBO_CONFIG = {
  apiKey: process.env.KBO_API_KEY,
  apiUrl: process.env.KBO_API_URL || 'https://api.kbodata.app/v2',
  mockApiUrl: 'https://mock.api.kbodata.app/v2', // For development/testing
} as const;
