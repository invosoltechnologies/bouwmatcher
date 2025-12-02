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

const PhoneInput: React.ForwardRefExoticComponent<PhoneInputProps> =
  React.forwardRef<React.ElementRef<typeof RPNInput.default>, PhoneInputProps>(
    ({ className, classInput, onChange, error, style, ...props }, ref) => {
      const InputComponentWithClass = React.useMemo(() => {
        const component = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
          (inputProps, inputRef) => (
            <Input
              {...inputProps}
              ref={inputRef}
              className={cn('rounded-lg rounded-l-none border-l-0', classInput)}
            />
          )
        );
        component.displayName = 'InputComponentWithClass';
        return component;
      }, [classInput]);

      return (
        <div className='w-full' style={style}>
          <RPNInput.default
            ref={ref}
            className={cn('flex', className)}
            flagComponent={FlagComponent}
            countrySelectComponent={CountrySelect}
            inputComponent={InputComponentWithClass}
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
  value: RPNInput.Country;
  onChange: (value: RPNInput.Country) => void;
  options: CountrySelectOption[];
};

const CountrySelect = ({ disabled, value, onChange, options }: CountrySelectProps) => {
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
            'flex gap-3 rounded-lg rounded-r-none px-4 py-0 h-auto border-r-0',
            'bg-white border-neutral-300 hover:bg-gray-50 hover:text-primary',
          )}
          disabled={disabled}
        >
          <FlagComponent country={value} countryName={value} />
          <span className='text-base md:text-xl font-normal'>
            +{RPNInput.getCountryCallingCode(value)}
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
                        option.value === value ? 'opacity-100' : 'opacity-0'
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
