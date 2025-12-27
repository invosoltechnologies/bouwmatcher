'use client';

import * as React from 'react';
import { CheckIcon, ChevronsUpDown } from 'lucide-react';
import * as RPNInput from 'react-phone-number-input';
import flags from 'react-phone-number-input/flags';

import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';

type PhoneInputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'onChange' | 'value'
> &
  Omit<RPNInput.Props<typeof RPNInput.default>, 'onChange'> & {
    onChange?: (value: RPNInput.Value) => void;
    error?: string;
    classInput?: string;
  };

// Filter to only Netherlands and Belgium
const allowedCountries: RPNInput.Country[] = ['NL', 'BE'];

// Formatting utilities
const formatPhoneNumber = (value: string, country: RPNInput.Country): string => {
  // Extract only digits from the value
  const digits = value.replace(/\D/g, '');

  if (digits.length === 0) return '';

  // Format based on country
  // NL: (6)-12-34-56-78 (9 digits total)
  // BE: (4)-12-34-56-78 (9 digits total)

  const parts: string[] = [];

  if (digits.length >= 1) {
    parts.push(`(${digits.substring(0, 1)})`);
  }
  if (digits.length >= 3) {
    parts.push(digits.substring(1, 3));
  } else if (digits.length > 1) {
    parts.push(digits.substring(1));
  }
  if (digits.length >= 5) {
    parts.push(digits.substring(3, 5));
  } else if (digits.length > 3) {
    parts.push(digits.substring(3));
  }
  if (digits.length >= 7) {
    parts.push(digits.substring(5, 7));
  } else if (digits.length > 5) {
    parts.push(digits.substring(5));
  }
  if (digits.length >= 9) {
    parts.push(digits.substring(7, 9));
  } else if (digits.length > 7) {
    parts.push(digits.substring(7));
  }

  return parts.join('-');
};

const parsePhoneInput = (value: string): string => {
  // Extract only digits
  return value.replace(/\D/g, '');
};

const getPlaceholder = (country: RPNInput.Country): string => {
  if (country === 'NL') {
    return '(6)-12-34-56-78';
  } else if (country === 'BE') {
    return '(4)-12-34-56-78';
  }
  return '(6)-12-34-56-78'; // Default to NL format
};

const PhoneInput: React.ForwardRefExoticComponent<PhoneInputProps> =
  React.forwardRef<React.ElementRef<typeof RPNInput.default>, PhoneInputProps>(
    ({ className, classInput, onChange, error, style, ...props }, ref) => {
      const [currentCountry, setCurrentCountry] = React.useState<RPNInput.Country>('NL');
      const inputElementRef = React.useRef<HTMLInputElement | null>(null);

      const handleKeyDown = React.useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
        const input = e.currentTarget;
        const value = input.value;

        // Handle backspace
        if (e.key === 'Backspace') {
          e.preventDefault();

          const digits = parsePhoneInput(value);

          if (digits.length > 0) {
            const newDigits = digits.slice(0, -1);
            const formatted = formatPhoneNumber(newDigits, currentCountry);
            input.value = formatted;

            const event = new Event('input', { bubbles: true });
            input.dispatchEvent(event);
          }
          return;
        }

        // Handle number input
        if (e.key >= '0' && e.key <= '9') {
          e.preventDefault();

          const digits = parsePhoneInput(value);

          if (digits.length >= 9) {
            return;
          }

          const newDigits = digits + e.key;
          const formatted = formatPhoneNumber(newDigits, currentCountry);
          input.value = formatted;

          const event = new Event('input', { bubbles: true });
          input.dispatchEvent(event);
        }
      }, [currentCountry]);

      const handlePaste = React.useCallback((e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();

        const pastedText = e.clipboardData.getData('text');
        const digits = parsePhoneInput(pastedText);
        const validDigits = digits.slice(0, 9);
        const formatted = formatPhoneNumber(validDigits, currentCountry);

        const input = e.currentTarget;
        input.value = formatted;

        const event = new Event('input', { bubbles: true });
        input.dispatchEvent(event);
      }, [currentCountry]);

      const FormattedInputComponent = React.useMemo(() => {
        const component = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
          (inputProps, forwardedRef) => {
            // Remove value from inputProps to avoid controlled/uncontrolled conflict
            const { value: _value, onChange: _onChange, ...restInputProps } = inputProps;

            const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
              // Format the input value
              const rawValue = e.target.value;
              const digits = parsePhoneInput(rawValue);

              if (digits.length <= 9) {
                const formatted = formatPhoneNumber(digits, currentCountry);
                e.target.value = formatted;
              }

              // Call original onChange with just digits
              if (_onChange) {
                const syntheticEvent = {
                  ...e,
                  target: { ...e.target, value: digits },
                } as React.ChangeEvent<HTMLInputElement>;
                _onChange(syntheticEvent);
              }
            };

            const setRefs = React.useCallback((node: HTMLInputElement | null) => {
              if (typeof forwardedRef === 'function') {
                forwardedRef(node);
              } else if (forwardedRef) {
                forwardedRef.current = node;
              }
              inputElementRef.current = node;
            }, [forwardedRef]);

            return (
              <Input
                {...restInputProps}
                ref={setRefs}
                onKeyDown={handleKeyDown}
                onPaste={handlePaste}
                onChange={handleChange}
                placeholder={getPlaceholder(currentCountry)}
                className={cn('rounded-lg rounded-l-none border-l-0', classInput)}
              />
            );
          }
        );
        component.displayName = 'FormattedInputComponent';
        return component;
      }, [classInput, currentCountry, handleKeyDown, handlePaste]);

      // Update input value when external value changes
      React.useEffect(() => {
        if (inputElementRef.current) {
          if (props.value) {
            const phoneStr = String(props.value);
            // Extract national number (remove country code)
            const digits = phoneStr.replace(/^\+\d{1,3}/, '').replace(/\D/g, '');
            const formatted = formatPhoneNumber(digits, currentCountry);
            inputElementRef.current.value = formatted;
          } else {
            inputElementRef.current.value = '';
          }
        }
      }, [props.value, currentCountry]);

      return (
        <div className='w-full' style={style}>
          <RPNInput.default
            ref={ref}
            className={cn('flex', className)}
            flagComponent={FlagComponent}
            countrySelectComponent={(countryProps) => (
              <CountrySelect
                {...countryProps}
                onChange={(country) => {
                  setCurrentCountry(country);
                  countryProps.onChange(country);
                }}
              />
            )}
            inputComponent={FormattedInputComponent}
            countries={allowedCountries}
            defaultCountry='NL'
            /**
             * Handles the onChange event.
             *
             * react-phone-number-input might trigger the onChange event as undefined
             * when a valid phone number is not entered. To prevent this,
             * the value is coerced to an empty string.
             *
             * @param {E164Number | undefined} value - The entered phone number in E164 format or undefined.
             */
            onChange={(value) => onChange?.(value || ('' as RPNInput.Value))}
            {...props}
          />
          {error && <p className='text-red-500 text-sm mt-1'>{error}</p>}
        </div>
      );
    }
  );
PhoneInput.displayName = 'PhoneInput';

type CountrySelectOption = { label: string; value: RPNInput.Country };

type CountrySelectProps = {
  disabled?: boolean;
  value: RPNInput.Country | undefined;
  onChange: (value: RPNInput.Country) => void;
  options: CountrySelectOption[];
};

const CountrySelect = ({ disabled, value, onChange, options }: CountrySelectProps) => {
  // Default to NL if value is undefined
  const selectedCountry = value || 'NL';

  const handleSelect = React.useCallback(
    (country: RPNInput.Country) => {
      onChange(country);
    },
    [onChange]
  );

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          type='button'
          variant={'outline'}
          className={cn(
            'flex gap-2 md:gap-3 rounded-lg rounded-r-none px-3 md:px-4 py-0 h-auto border-r-0',
            'bg-white border-neutral-300 hover:bg-gray-50 hover:text-primary',
          )}
          disabled={disabled}
        >
          <FlagComponent country={selectedCountry} countryName={selectedCountry} />
          <span className='text-base md:text-xl font-normal'>
            +{RPNInput.getCountryCallingCode(selectedCountry)}
          </span>
          <ChevronsUpDown
            className={cn(
              'h-4 w-4 opacity-50',
              disabled ? 'hidden' : 'opacity-100'
            )}
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-[300px] p-0'>
        <Command>
          <CommandInput placeholder='Zoek land...' />
          <CommandList>
            <CommandEmpty>Geen land gevonden.</CommandEmpty>
            <CommandGroup>
              {options
                .filter((x) => x.value)
                .map((option) => (
                  <CommandItem
                    className='gap-3 py-3 cursor-pointer hover:bg-primary hover:text-white'
                    key={option.value}
                    onSelect={() => handleSelect(option.value)}
                  >
                    <FlagComponent
                      country={option.value}
                      countryName={option.label}
                    />
                    <span className='flex-1 text-base'>{option.label}</span>
                    {option.value && (
                      <span className='text-sm opacity-70'>
                        +{RPNInput.getCountryCallingCode(option.value)}
                      </span>
                    )}
                    <CheckIcon
                      className={cn(
                        'ml-auto h-4 w-4',
                        option.value === selectedCountry ? 'opacity-100' : 'opacity-0'
                      )}
                    />
                  </CommandItem>
                ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

const FlagComponent = ({ country, countryName }: RPNInput.FlagProps) => {
  const Flag = flags[country];

  return (
    <span
      className='flex items-center justify-center overflow-hidden rounded-sm'

    >
      {Flag && (
        <span style={{ width: '100%', height: '100%', display: 'flex' }}>
          <Flag title={countryName} />
        </span>
      )}
    </span>
  );
};
FlagComponent.displayName = 'FlagComponent';

export { PhoneInput };
