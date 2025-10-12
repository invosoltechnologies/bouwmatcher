'use client';
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface OTPVerificationProps {
  phoneNumber: string;
  onVerify: (otp: string) => void;
  onBack: () => void;
}

export default function OTPVerification({ phoneNumber, onVerify, onBack }: OTPVerificationProps) {
  const [otp, setOtp] = useState('');
  const [countdown, setCountdown] = useState(59);
  const [canResend, setCanResend] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

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

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ''); // Only digits
    if (value.length <= 4) {
      setOtp(value);
    }
  };

  const handleResend = () => {
    // TODO: Implement resend OTP logic
    setCountdown(59);
    setCanResend(false);
    setOtp('');
  };

  const handleSubmit = () => {
    if (otp.length === 4) {
      onVerify(otp);
    }
  };

  // Mask phone number (show last 4 digits)
  const maskedPhone = phoneNumber.replace(/\d(?=\d{4})/g, '*');

  return (
    <div className="w-full max-w-[680px] mx-auto">
      {/* Title */}
      <h2 className="text-4xl font-normal leading-10 text-center text-foreground mb-12">
        Verifieer jouw telefoonnummer
      </h2>

      {/* OTP Card */}
      <div className="rounded-2xl p-8 mb-8" style={{ background: 'linear-gradient(90deg, rgba(10, 178, 126, 0.10) 0%, rgba(2, 58, 162, 0.10) 100%)' }}>
        <h3 className="text-2xl font-semibold text-foreground mb-3.5">
          Voer de 4-cijferige code in
        </h3>

        <p className="text-base text-gray-600 mb-9">
          Er is zojuist een <span className="font-semibold">SMS</span> met een 4-cijferige code verzonden naar{' '}
          <span className="font-semibold">{maskedPhone}</span>.{' '}
          <button
            onClick={onBack}
            className="text-primary hover:underline font-medium"
          >
            Wijzigen
          </button>
        </p>

        {/* OTP Input */}
        <div className="mb-2">
          <Input
            ref={inputRef}
            type="text"
            inputMode="numeric"
            value={otp}
            onChange={handleOtpChange}
            placeholder="Voer de code in"
            className="max-w-36 bg-white text-center text-2xl tracking-widest font-semibold placeholder:font-light"
            maxLength={4}
          />
        </div>

        {/* Resend/Countdown */}
        <div className="text-sm text-gray-600">
          {canResend ? (
            <button
              onClick={handleResend}
              className="text-primary cursor-pointer hover:underline font-medium"
            >
              Geen code ontvangen? Opnieuw verzenden
            </button>
          ) : (
            <p>
              Geen code ontvangen?{' '}
              <span className="text-primary font-medium">
                Opnieuw verzenden over {countdown} seconden
              </span>
            </p>
          )}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          onClick={onBack}
          className="text-primary font-medium text-base flex items-center gap-2"
        >
          Vorige
        </Button>

        <Button
          onClick={handleSubmit}
          disabled={otp.length !== 4}
          className="bg-primary hover:bg-primary/90 text-white font-medium text-base px-8 py-6 rounded-xl flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Ontvang offertes
        </Button>
      </div>
    </div>
  );
}
