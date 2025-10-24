'use client';

import React, { forwardRef, useState, useEffect, ChangeEvent } from 'react';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

export interface PhoneInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  value?: string;
  onChange?: (value: string) => void;
  error?: string;
}

/**
 * PhoneInput component for Dutch phone numbers
 * - Auto-adds +31 prefix
 * - Masks input as: +31 (XXX) XXX-XXXX
 * - Saves plain number to database (e.g., "+31612345678")
 */
const PhoneInput = forwardRef<HTMLInputElement, PhoneInputProps>(
  ({ className, value = '', onChange, error, onFocus, onBlur, ...props }, ref) => {
    const [displayValue, setDisplayValue] = useState('');

    // Format phone number for display according to Dutch rules
    // Mobile: +31 6 12345678 (9 digits after country code)
    // Landline: +31 20 1234567 (2-3 digit area code + 7 digits)
    const formatPhoneNumber = (plainNumber: string): string => {
      if (!plainNumber) return '';

      // Remove all non-digits
      const digits = plainNumber.replace(/\D/g, '');

      // Must start with 31 for Dutch numbers
      if (!digits.startsWith('31')) return plainNumber;

      // Extract digits after country code (31)
      const remainingDigits = digits.slice(2);

      if (remainingDigits.length === 0) return '+31';
      if (remainingDigits.length === 1) return `+31 ${remainingDigits}`;

      // Check if it's a mobile number (starts with 6)
      if (remainingDigits.startsWith('6')) {
        // Mobile format: +31 6 12345678
        const mobilePrefix = remainingDigits.slice(0, 1); // "6"
        const rest = remainingDigits.slice(1); // "12345678"
        return `+31 ${mobilePrefix} ${rest}`;
      } else {
        // Landline format: +31 20 1234567 (area code can be 2-3 digits)
        // For simplicity, we'll use 2-digit area code
        const areaCode = remainingDigits.slice(0, 2);
        const rest = remainingDigits.slice(2);
        return `+31 ${areaCode} ${rest}`;
      }
    };

    // Extract plain number for database: +31612345678
    const extractPlainNumber = (formattedValue: string): string => {
      if (!formattedValue) return '';

      let digits = formattedValue.replace(/\D/g, '');

      // Convert 0612345678 to 31612345678
      if (digits.startsWith('0')) {
        digits = '31' + digits.slice(1);
      } else if (!digits.startsWith('31')) {
        digits = '31' + digits;
      }

      return '+' + digits;
    };

    // Sync display value when external value changes
    useEffect(() => {
      setDisplayValue(formatPhoneNumber(value));
    }, [value]);

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      // If empty, auto-fill with +31
      if (!value || value === '+31') {
        setDisplayValue('+31 ');
        if (onChange) {
          onChange('+31');
        }
      }

      if (onFocus) {
        onFocus(e);
      }
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      // If only +31 remains, clear it
      if (value === '+31' || !value) {
        setDisplayValue('');
        if (onChange) {
          onChange('');
        }
      }

      if (onBlur) {
        onBlur(e);
      }
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value;

      // Extract digits only
      const digits = inputValue.replace(/\D/g, '');

      // Prevent removing +31 prefix
      if (!inputValue.startsWith('+31') && digits.length > 0) {
        return;
      }

      // Limit to valid Dutch phone number length (31 + 9 digits = 11 total)
      if (digits.length > 11) {
        return;
      }

      // Format for display
      const formatted = formatPhoneNumber('+' + digits);
      setDisplayValue(formatted);

      // Extract plain number and pass to parent
      const plainNumber = extractPlainNumber(formatted);
      if (onChange) {
        onChange(plainNumber);
      }
    };

    return (
      <div className='relative'>
        <div className='absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2 pointer-events-none z-10'>
          <Image
            src='/icons/nl-flag.svg'
            alt='Netherlands'
            width={24}
            height={16}
            className='rounded-sm'
          />
        </div>

        <Input
          {...props}
          ref={ref}
          type='tel'
          value={displayValue}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className={cn('pl-14', className)}
        />

        {error && <p className='text-red-500 text-sm mt-1'>{error}</p>}
      </div>
    );
  }
);

PhoneInput.displayName = 'PhoneInput';

export { PhoneInput };
