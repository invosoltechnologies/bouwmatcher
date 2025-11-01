'use client';

import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff, ArrowRight, ArrowLeft } from 'lucide-react';
import { useState, useMemo } from 'react';
import type { PasswordSetupData } from '@/types/auth';
import PasswordStrength from '@/components/ui/password-strength';
import { validatePasswordStrength } from '@/lib/utils/password-validator';

interface PasswordSetupFormProps {
  email: string;
  onBack: () => void;
  onNext: (data: PasswordSetupData) => void;
  isLoading?: boolean;
}

export default function PasswordSetupForm({ email, onBack, onNext, isLoading = false }: PasswordSetupFormProps) {
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

  // Validate password strength in real-time
  const passwordValidation = useMemo(
    () => validatePasswordStrength(password || ''),
    [password]
  );

  const onSubmit = (data: PasswordSetupData) => {
    // Check password confirmation
    if (data.password !== data.confirmPassword) {
      return;
    }

    // Validate password strength before submitting
    if (!passwordValidation.isValid) {
      toast.error(passwordValidation.message);
      return;
    }

    // Only allow OK (score 1) or above
    if (passwordValidation.score < 1) {
      toast.error('Wachtwoord is te zwak. Gebruik minimaal 8 tekens met letters en cijfers.');
      return;
    }

    onNext(data);
  };

  return (
    <div className='w-full max-w-3xl mx-auto'>
      <h1 className='text-lg text-slate-900 md:text-4xl font-normal text-center mb-8 md:mb-14'>
        Stel een wachtwoord in voor jouw account
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className='space-y-8'>
        <div>
          <Label className='block text-sm md:text-xl text-muted-foreground mb-3'>
            E-mailadres (Log in met je e-mailadres)
          </Label>
          <Input
            {...register('email')}
            type='email'
            disabled
            placeholder={email}
            className='h-[56px] bg-neutral-100 border-neutral-300 rounded-lg px-4 text-base md:text-lg text-neutral-500'
            style={{ boxShadow: '0px 2px 6.5px 0px #0000001A' }}
          />
        </div>

        <div>
          <Label className='block text-sm md:text-xl text-muted-foreground mb-3'>
            Wachtwoord
          </Label>
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
              placeholder='Minimaal 8 tekens'
              className='h-[56px] bg-white border-neutral-300 rounded-lg px-4 pr-12 text-base md:text-lg'
              style={{ boxShadow: '0px 2px 6.5px 0px #0000001A' }}
            />
            <button
              type='button'
              onClick={() => setShowPassword(!showPassword)}
              className='absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600'
            >
              {showPassword ? (
                <EyeOff className='w-5 h-5' />
              ) : (
                <Eye className='w-5 h-5' />
              )}
            </button>
          </div>
          {errors.password && (
            <p className='text-red-500 text-sm mt-1'>
              {errors.password.message}
            </p>
          )}
        </div>

        <div>
          <Label className='block text-sm md:text-xl text-muted-foreground mb-3'>
            Bevestig jouw wachtwoord
          </Label>
          <div className='relative'>
            <Input
              {...register('confirmPassword', {
                required: 'Bevestig je wachtwoord',
                validate: (value) =>
                  value === password || 'Wachtwoorden komen niet overeen',
              })}
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder='Herhaal wachtwoord'
              className='h-[56px] bg-white border-neutral-300 rounded-lg px-4 pr-12 text-base md:text-lg'
              style={{ boxShadow: '0px 2px 6.5px 0px #0000001A' }}
            />
            <button
              type='button'
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className='absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600'
            >
              {showConfirmPassword ? (
                <EyeOff className='w-5 h-5' />
              ) : (
                <Eye className='w-5 h-5' />
              )}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className='text-red-500 text-sm mt-1'>
              {errors.confirmPassword.message}
            </p>
          )}
        </div>
        {/* Password Strength Indicator */}
        <PasswordStrength password={password || ''} />
        <div className='flex justify-between items-center pt-4'>
          <button
            type='button'
            onClick={onBack}
            className='flex items-center text-neutral-700 text-base md:text-lg font-medium hover:text-neutral-900'
          >
            <ArrowLeft className='w-5 h-5 md:h-6 md:w-6 mr-2' />
            Terug
          </button>

          <Button
            type='submit'
            disabled={isLoading || !passwordValidation.isValid}
            className='px-6 py-4 text-base rounded-2xl md:text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed'
          >
            {isLoading ? 'Bezig met registreren...' : 'Bevestig aanmelding'}
            <ArrowRight className='w-5 h-5 md:h-7 md:w-7' />
          </Button>
        </div>
      </form>
    </div>
  );
}
