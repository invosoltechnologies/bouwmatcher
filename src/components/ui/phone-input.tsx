'use client';

import * as React from 'react';
import * as RPNInput from 'react-phone-number-input';
import flags from 'react-phone-number-input/flags';
import { CheckIcon, ChevronsUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';

type PhoneInputProps = {
  value?: string;
  onChange?: (value: string) => void;
  error?: string;
  className?: string;
  classInput?: string;
  style?: React.CSSProperties;
};

// Country configurations
const COUNTRIES = [
  { code: 'NL', dialCode: '+31', flag: '🇳🇱', mask: '(6)-12-34-56-78', name: 'Netherlands' },
  { code: 'BE', dialCode: '+32', flag: '🇧🇪', mask: '(4)-12-34-56-78', name: 'Belgium' },
] as const;

type CountryCode = typeof COUNTRIES[number]['code'];

// Format phone number with mask: (6)-12-34-56-78
const formatPhoneNumber = (digits: string): string => {
  if (!digits) return '';

  const parts: string[] = [];

  // First digit in parentheses
  if (digits.length >= 1) {
    parts.push(`(${digits[0]})`);
  }
  // Next 2 digits
  if (digits.length >= 2) {
    parts.push(digits.substring(1, Math.min(3, digits.length)));
  }
  // Next 2 digits
  if (digits.length >= 3) {
    parts.push(digits.substring(3, Math.min(5, digits.length)));
  }
  // Next 2 digits
  if (digits.length >= 5) {
    parts.push(digits.substring(5, Math.min(7, digits.length)));
  }
  // Last 2 digits
  if (digits.length >= 7) {
    parts.push(digits.substring(7, Math.min(9, digits.length)));
  }

  return parts.join('-');
};

// Extract only digits from any string
const extractDigits = (value: string): string => {
  return value.replace(/\D/g, '');
};

// Convert E.164 format (+31612345678) to display format ((6)-12-34-56-78)
const e164ToDisplay = (e164: string): string => {
  if (!e164) return '';
  const digits = extractDigits(e164);
  // Remove country code (first 2 digits for +31/+32)
  const nationalNumber = digits.substring(2);
  return formatPhoneNumber(nationalNumber);
};

// Convert digits to E.164 format
const digitsToE164 = (digits: string, countryCode: CountryCode): string => {
  if (!digits) return '';
  const country = COUNTRIES.find(c => c.code === countryCode);
  return `${country?.dialCode}${digits}`;
};

const PhoneInput = React.forwardRef<HTMLInputElement, PhoneInputProps>(
  ({ value, onChange, error, className, classInput, style }, ref) => {
    // State: selected country (NL or BE)
    const [country, setCountry] = React.useState<CountryCode>('NL');
    const [open, setOpen] = React.useState(false);

    // Get display value from E.164 value
    const displayValue = e164ToDisplay(value || '');

    // Handle input change
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const input = e.target.value;
      const digits = extractDigits(input);

      // Limit to 9 digits
      if (digits.length > 9) return;

      // Convert to E.164 and send to parent
      const e164 = digitsToE164(digits, country);
      onChange?.(e164);
    };

    // Handle backspace - remove last digit when hitting formatting characters
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Backspace') {
        e.preventDefault();

        // Get current digits (without formatting and without country code)
        const allDigits = extractDigits(value || '');
        const nationalDigits = allDigits.substring(2); // Remove country code (+31 or +32 = 2 digits)

        if (nationalDigits.length > 0) {
          // Remove last digit
          const newDigits = nationalDigits.slice(0, -1);
          const e164 = digitsToE164(newDigits, country);
          onChange?.(e164);
        } else {
          // If no digits left, clear the value
          onChange?.('');
        }
      }
    };

    // Handle paste
    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
      e.preventDefault();
      const pastedText = e.clipboardData.getData('text');
      const digits = extractDigits(pastedText).slice(0, 9);

      const e164 = digitsToE164(digits, country);
      onChange?.(e164);
    };

    // Handle country change
    const handleCountrySelect = (newCountry: CountryCode) => {
      setCountry(newCountry);
      setOpen(false);

      // Update existing value with new country code
      if (value) {
        const digits = extractDigits(value).substring(2); // Remove old country code
        const e164 = digitsToE164(digits, newCountry);
        onChange?.(e164);
      }
    };

    const currentCountry = COUNTRIES.find(c => c.code === country)!;
    const Flag = flags[country as RPNInput.Country];

    return (
      <div className='w-full' style={style}>
        <div className={cn('flex', className)}>
          {/* Country Selector Dropdown */}
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                type='button'
                variant='outline'
                role='combobox'
                aria-expanded={open}
                className={cn(
                  'flex gap-2 md:gap-3 rounded-lg rounded-r-none px-3 md:px-4 py-0 h-auto border-r-0',
                  'bg-white border-neutral-300 hover:bg-gray-50 hover:text-primary',
                )}
              >
                {Flag && <Flag title={country} />}
                <span className='text-base md:text-xl font-normal'>
                  {currentCountry.dialCode}
                </span>
                <ChevronsUpDown className='ml-1 h-4 w-4 shrink-0 opacity-50' />
              </Button>
            </PopoverTrigger>
            <PopoverContent className='w-[200px] p-0'>
              <Command>
                <CommandList>
                  <CommandGroup>
                    {COUNTRIES.map((c) => {
                      const CountryFlag = flags[c.code as RPNInput.Country];
                      return (
                        <CommandItem
                          key={c.code}
                          value={c.code}
                          onSelect={() => handleCountrySelect(c.code)}
                          className='cursor-pointer'
                        >
                          <CheckIcon
                            className={cn(
                              'mr-2 h-4 w-4',
                              country === c.code ? 'opacity-100' : 'opacity-0'
                            )}
                          />
                          {CountryFlag && <CountryFlag title={c.name} />}
                          <span className='ml-2'>{c.name}</span>
                          <span className='ml-auto text-sm opacity-70'>{c.dialCode}</span>
                        </CommandItem>
                      );
                    })}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>

          {/* Phone Input */}
          <Input
            ref={ref}
            type='tel'
            value={displayValue}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onPaste={handlePaste}
            placeholder={currentCountry.mask}
            className={cn('rounded-lg rounded-l-none border-l-0', classInput)}
          />
        </div>
        {error && <p className='text-red-500 text-sm mt-1'>{error}</p>}
      </div>
    );
  }
);

PhoneInput.displayName = 'PhoneInput';

export { PhoneInput };
