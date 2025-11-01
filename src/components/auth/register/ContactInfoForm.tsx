'use client';

import { useForm, Controller } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { PhoneInput } from '@/components/ui/phone-input';
import Link from 'next/link';
import type { ContactInfoData } from '@/types/auth';
import { ArrowRight } from 'lucide-react';

interface ContactInfoFormProps {
  onNext: (data: ContactInfoData) => void;
  defaultValues?: Partial<ContactInfoData>;
}

export default function ContactInfoForm({ onNext, defaultValues }: ContactInfoFormProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ContactInfoData>({
    defaultValues: defaultValues || {},
  });

  const onSubmit = (data: ContactInfoData) => {
    onNext(data);
  };

  return (
    <div className='w-full max-w-3xl mx-auto'>
      <h1 className='text-lg text-slate-900 md:text-4xl font-normal text-center mb-8 md:mb-14'>
        Contactgegevens
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className='space-y-8'>
        <div className='flex flex-col md:flex-row gap-6'>
          <div className='flex-1'>
            <Label className='block text-sm md:text-xl text-muted-foreground mb-3'>
              Voornaam
            </Label>
            <Input
              {...register('firstName', { required: 'Voornaam is verplicht' })}
              type='text'
              placeholder='Jhon'
              className='py-7 bg-white border-neutral-300 rounded-lg px-4 text-base md:text-xl placeholder:text-slate-300'
              style={{ boxShadow: '0px 2px 6.5px 0px #0000001A' }}
            />
            {errors.firstName && (
              <p className='text-red-500 text-sm mt-1'>
                {errors.firstName.message}
              </p>
            )}
          </div>

          <div className='flex-1'>
            <Label className='block text-sm md:text-xl text-muted-foreground mb-3'>
              Achternaam
            </Label>
            <Input
              {...register('lastName', { required: 'Achternaam is verplicht' })}
              type='text'
              placeholder='Ilya'
              className='py-7 bg-white border-neutral-300 rounded-lg px-4 text-base md:text-xl placeholder:text-slate-300'
              style={{ boxShadow: '0px 2px 6.5px 0px #0000001A' }}
            />
            {errors.lastName && (
              <p className='text-red-500 text-sm mt-1'>
                {errors.lastName.message}
              </p>
            )}
          </div>
        </div>

        <div>
          <Label className='block text-sm md:text-xl text-muted-foreground mb-3'>
            E-mailadres (zakelijk)
          </Label>
          <Input
            {...register('email', {
              required: 'E-mailadres is verplicht',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Ongeldig e-mailadres',
              },
            })}
            type='email'
            placeholder='voorbeeld@bedrijf.nl'
            className='py-7 bg-white border-neutral-300 rounded-lg px-4 text-base md:text-xl placeholder:text-slate-300'
            style={{ boxShadow: '0px 2px 6.5px 0px #0000001A' }}
          />
          {errors.email && (
            <p className='text-red-500 text-sm mt-1'>{errors.email.message}</p>
          )}
        </div>

        <div>
          <Label className='block text-sm md:text-xl text-muted-foreground mb-3'>
            Telefoonnummer
          </Label>
          <Controller
            name='phone'
            control={control}
            rules={{
              required: 'Telefoonnummer is verplicht',
              validate: (value) => {
                if (!value) return 'Telefoonnummer is verplicht';

                // Remove all non-digits
                const digits = value.replace(/\D/g, '');

                // Dutch mobile numbers: +31 6 XXXXXXXX (11 digits total)
                // Dutch landline: +31 XX XXXXXXX (varies, but typically 10-11 digits)
                if (digits.length < 11 || digits.length > 12) {
                  return 'Ongeldig Nederlands telefoonnummer';
                }

                // Must start with 31 (Netherlands country code)
                if (!digits.startsWith('31')) {
                  return 'Telefoonnummer moet beginnen met +31';
                }

                return true;
              },
            }}
            render={({ field }) => (
              <PhoneInput
                {...field}
                placeholder='+31 (6XX) XXX-XXXX'
                className='py-7 bg-white border-neutral-300 rounded-lg px-4 pl-14 text-base md:text-xl placeholder:text-slate-300'
                style={{ boxShadow: '0px 2px 6.5px 0px #0000001A' }}
                error={errors.phone?.message}
              />
            )}
          />
        </div>

        <div className='text-sm md:text-lg text-muted-foreground'>
          Door verder te gaan, ga je akkoord met de{' '}
          <Link
            href='/terms'
            className='font-medium text-primary hover:underline'
          >
            algemene voorwaarden
          </Link>{' '}
          van Bouwmatcher
        </div>

        <div className='flex justify-end pt-4'>
          <Button
            type='submit'
            className='px-6 py-4 text-base rounded-2xl md:text-lg font-semibold'
          >
            Wachtwoord instellen
            <ArrowRight className='w-5 h-5 md:h-7 md:w-7' size={20} />
          </Button>
        </div>
      </form>
    </div>
  );
}
