'use client';
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SMS_CONFIG } from "@/lib/config";
import { useTranslations } from "next-intl";

interface OTPVerificationProps {
  phoneNumber: string;
  draftId: string;
  onVerify: (projectId: string) => void;
  onBack: () => void;
}

export default function OTPVerification({ phoneNumber, draftId, onVerify, onBack }: OTPVerificationProps) {
  const t = useTranslations('questionnaire.otpVerification');
  const [otp, setOtp] = useState('');
  const [countdown, setCountdown] = useState<number>(SMS_CONFIG.otpDisplayCountdownSeconds);
  const [canResend, setCanResend] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState('');
  const [developmentOtp, setDevelopmentOtp] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  // Send initial OTP when component mounts
  useEffect(() => {
    sendOtp();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Countdown timer
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [countdown]);

  // Auto-focus on input when component mounts
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const sendOtp = async () => {
    try {
      const response = await fetch('/api/otp/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          draftId,
          phoneNumber,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Failed to send OTP');
        return;
      }

      // Development mode: Show OTP in console and UI
      if (data.developmentOtp && !SMS_CONFIG.enableSMS) {
        console.log('🔐 Development OTP:', data.developmentOtp);
        setDevelopmentOtp(data.developmentOtp);
      }

      setError('');
    } catch (err) {
      console.error('Error sending OTP:', err);
      setError('Failed to send OTP');
    }
  };

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ''); // Only digits
    if (value.length <= SMS_CONFIG.otpLength) {
      setOtp(value);
      setError(''); // Clear error when user types
    }
  };

  const handleResend = async () => {
    setCountdown(SMS_CONFIG.otpDisplayCountdownSeconds);
    setCanResend(false);
    setOtp('');
    setError('');
    await sendOtp();
  };

  const handleSubmit = async () => {
    if (otp.length !== SMS_CONFIG.otpLength) return;

    setIsVerifying(true);
    setError('');

    try {
      const response = await fetch('/api/otp/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          draftId,
          phoneNumber,
          otp,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Invalid OTP');
        setIsVerifying(false);
        return;
      }

      // Success! Call onVerify with project ID
      onVerify(data.projectId);
    } catch (err) {
      console.error('Error verifying OTP:', err);
      setError('Failed to verify OTP');
      setIsVerifying(false);
    }
  };

  // Mask phone number (show last 4 digits)
  const maskedPhone = phoneNumber.replace(/\d(?=\d{4})/g, '*');

  return (
    <div className='w-full max-w-[680px] mx-auto'>
      {/* Title */}
      <h2 className='text-2xl md:text-4xl font-normal leading-10 text-center text-foreground mb-6 md:mb-12'>
        {t('heading')}
      </h2>

      {/* OTP Card */}
      <div
        className='rounded-xl md:rounded-2xl px-5 py-6 md:p-8 mb-8'
        style={{
          background:
            'linear-gradient(90deg, rgba(10, 178, 126, 0.10) 0%, rgba(2, 58, 162, 0.10) 100%)',
        }}
      >
        <h3 className='text-xl md:text-2xl font-semibold text-foreground mb-3.5'>
          {t('enterCode')}
        </h3>

        <p className='text-sm md:text-base text-gray-600 mb-3.5 md:mb-9'>
          {t('description')} <span className='font-semibold'>{maskedPhone}</span>.{' '}
          <button
            onClick={onBack}
            className='text-primary hover:underline font-medium'
          >
            {t('resendCode')}
          </button>
        </p>

        {/* OTP Input */}
        <div className='mb-2'>
          <Input
            ref={inputRef}
            type='text'
            inputMode='numeric'
            value={otp}
            onChange={handleOtpChange}
            placeholder={t('enterCode')}
            className='max-w-48 bg-white text-center text-xl md:text-2xl tracking-wide md:tracking-widest font-semibold placeholder:font-light'
            maxLength={SMS_CONFIG.otpLength}
          />
          {error && <p className='text-red-600 text-sm mt-2'>{error}</p>}
          {developmentOtp && (
            <p className='text-blue-600 text-sm mt-2 font-mono'>
              Dev OTP: {developmentOtp}
            </p>
          )}
        </div>

        {/* Resend/Countdown */}
        <div className='text-sm text-gray-600'>
          {canResend ? (
            <button
              onClick={handleResend}
              className='text-primary cursor-pointer hover:underline font-medium'
            >
              {t('resendCode')} {t('resendButton')}
            </button>
          ) : (
            <p>
              {t('resendCode')}{' '}
              <span className='text-primary font-medium'>
                {t('resendTimer', { seconds: countdown })}
              </span>
            </p>
          )}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className='flex items-center justify-between'>
        <Button
          variant='ghost'
          onClick={onBack}
          className='text-primary font-medium text-sm md:text-base flex items-center gap-2'
        >
          {t('previousButton')}
        </Button>

        <Button
          onClick={handleSubmit}
          disabled={otp.length !== SMS_CONFIG.otpLength || isVerifying}
          className='bg-primary hover:bg-primary/90 text-white font-medium text-sm px-4 py-2 md:text-base md:px-8 md:py-4 rounded-lg md:rounded-xl flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed'
        >
          {isVerifying ? t('submitting') : t('submitButton')}
        </Button>
      </div>
    </div>
  );
}
