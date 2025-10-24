'use client';

import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
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
          <Input
            {...register('phone', { required: 'Telefoonnummer is verplicht' })}
            type='tel'
            placeholder='+31 6 12345678'
            className='py-7 bg-white border-neutral-300 rounded-lg px-4 text-base md:text-xl placeholder:text-slate-300'
            style={{ boxShadow: '0px 2px 6.5px 0px #0000001A' }}
          />
          {errors.phone && (
            <p className='text-red-500 text-sm mt-1'>{errors.phone.message}</p>
          )}
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
