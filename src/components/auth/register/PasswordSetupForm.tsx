'use client';

import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import type { PasswordSetupData } from '@/types/auth';

interface PasswordSetupFormProps {
  email: string;
  onBack: () => void;
  onNext: (data: PasswordSetupData) => void;
}

export default function PasswordSetupForm({ email, onBack, onNext }: PasswordSetupFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<PasswordSetupData>({
    defaultValues: {
      email,
    },
  });

  const password = watch('password');

  const onSubmit = (data: PasswordSetupData) => {
    if (data.password !== data.confirmPassword) {
      return;
    }
    onNext(data);
  };

  return (
    <div className='w-full max-w-[640px] mx-auto'>
      <h1 className='text-[32px] md:text-[40px] font-normal text-center mb-8 md:mb-12'>
        Stel een wachtwoord in voor jouw account
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
        <div>
          <label className='block text-sm md:text-base text-neutral-600 mb-2'>
            E-mailadres (Log in met je e-mailadres)
          </label>
          <Input
            {...register('email')}
            type='email'
            disabled
            className='h-[56px] bg-neutral-100 border-neutral-300 rounded-lg px-4 text-base md:text-lg text-neutral-500'
            style={{ boxShadow: '0px 2px 6.5px 0px #0000001A' }}
          />
        </div>

        <div>
          <label className='block text-sm md:text-base text-neutral-600 mb-2'>
            Wachtwoord
          </label>
          <div className='relative'>
            <Input
              {...register('password', {
                required: 'Wachtwoord is verplicht',
                minLength: {
                  value: 8,
                  message: 'Wachtwoord moet minimaal 8 tekens bevatten',
                },
              })}
              type={showPassword ? 'text' : 'password'}
              className='h-[56px] bg-white border-neutral-300 rounded-lg px-4 pr-12 text-base md:text-lg'
              style={{ boxShadow: '0px 2px 6.5px 0px #0000001A' }}
            />
            <button
              type='button'
              onClick={() => setShowPassword(!showPassword)}
              className='absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600'
            >
              {showPassword ? <EyeOff className='w-5 h-5' /> : <Eye className='w-5 h-5' />}
            </button>
          </div>
          {errors.password && (
            <p className='text-red-500 text-sm mt-1'>{errors.password.message}</p>
          )}
        </div>

        <div>
          <label className='block text-sm md:text-base text-neutral-600 mb-2'>
            Bevestig jouw wachtwoord
          </label>
          <div className='relative'>
            <Input
              {...register('confirmPassword', {
                required: 'Bevestig je wachtwoord',
                validate: (value) =>
                  value === password || 'Wachtwoorden komen niet overeen',
              })}
              type={showConfirmPassword ? 'text' : 'password'}
              className='h-[56px] bg-white border-neutral-300 rounded-lg px-4 pr-12 text-base md:text-lg'
              style={{ boxShadow: '0px 2px 6.5px 0px #0000001A' }}
            />
            <button
              type='button'
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className='absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600'
            >
              {showConfirmPassword ? <EyeOff className='w-5 h-5' /> : <Eye className='w-5 h-5' />}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className='text-red-500 text-sm mt-1'>{errors.confirmPassword.message}</p>
          )}
        </div>

        <div className='flex justify-between items-center pt-4'>
          <button
            type='button'
            onClick={onBack}
            className='flex items-center text-neutral-700 text-base font-medium hover:text-neutral-900'
          >
            <svg
              className='mr-2 w-5 h-5'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M15 19l-7-7 7-7'
              />
            </svg>
            Terug
          </button>

          <Button
            type='submit'
            className='h-[56px] px-8 text-base font-semibold rounded-lg'
          >
            Bevestig aanmelding
            <svg
              className='ml-2 w-5 h-5'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M9 5l7 7-7 7'
              />
            </svg>
          </Button>
        </div>
      </form>
    </div>
  );
}
