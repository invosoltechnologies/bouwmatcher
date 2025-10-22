'use client';

import { useForm } from 'react-hook-form';
import * as z from 'zod';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import SocialAuth from './SocialAuth';
import { LogIn } from 'lucide-react';

const loginSchema = z.object({
  email: z.string().email({ message: 'Ongeldig e-mailadres' }),
  password: z.string().min(6, { message: 'Wachtwoord moet minimaal 6 tekens bevatten' }),
  rememberMe: z.boolean().optional(),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
    setError,
  } = useForm<LoginFormData>({
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  const rememberMe = watch('rememberMe');

  const onSubmit = async (data: LoginFormData) => {
    try {
      loginSchema.parse(data);
      console.log('Login data:', data);
    } catch (error) {
      if (error instanceof z.ZodError) {
        error.issues.forEach((issue) => {
          const field = issue.path[0] as keyof LoginFormData;
          setError(field, {
            type: 'manual',
            message: issue.message,
          });
        });
      }
    }
  };

  return (
    <div className='w-full max-w-[500px] md:max-w-[784px]'>
      {/* Mobile: White Card Container */}
      <div className='md:hidden bg-white rounded-[24px] px-6 py-8 shadow-lg'>
        {/* Icon - Mobile Only */}
        <div className='flex justify-center mb-6'>
          <div className='w-16 h-16 bg-white rounded-[16px] flex items-center justify-center'
            style={{
              boxShadow: '0px 4px 12px 0px #0000001A',
            }}>
            <LogIn className='w-7 h-7 text-primary' />
          </div>
        </div>

        {/* Heading - Mobile */}
        <h1 className='text-center text-[28px] font-normal mb-8 leading-tight'>
          <span
            className='font-semibold'
            style={{
              background: 'linear-gradient(90deg, #023AA2 0%, #0AB27E 62.02%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Log in
          </span>{' '}
          op je account
        </h1>

        {/* Form - Mobile */}
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
          <div>
            <Input
              type='email'
              placeholder='E-mailadres'
              {...register('email')}
              className='w-full h-12 px-4 bg-white border border-gray-200 rounded-[12px] text-base placeholder:text-gray-400'
              style={{
                boxShadow: '0px 2px 6.5px 0px #0000001A',
              }}
            />
            {errors.email && (
              <p className='text-sm text-red-500 mt-1.5'>{errors.email.message}</p>
            )}
          </div>

          <div>
            <Input
              type='password'
              placeholder='Wachtwoord'
              {...register('password')}
              className='w-full h-12 px-4 bg-white border border-gray-200 rounded-[12px] text-base placeholder:text-gray-400'
              style={{
                boxShadow: '0px 2px 6.5px 0px #0000001A',
              }}
            />
            {errors.password && (
              <p className='text-sm text-red-500 mt-1.5'>{errors.password.message}</p>
            )}
          </div>

          <div className='flex items-center justify-between'>
            <div className='flex items-center space-x-2'>
              <Checkbox
                id='rememberMe-mobile'
                checked={rememberMe}
                onCheckedChange={(checked) => setValue('rememberMe', checked as boolean)}
              />
              <Label htmlFor='rememberMe-mobile' className='text-sm cursor-pointer'>
                Onthoud mij
              </Label>
            </div>
            <Link href='/auth/forgot-password' className='text-sm text-primary hover:underline'>
              Wachtwoord vergeten?
            </Link>
          </div>

          <Button
            type='submit'
            disabled={isSubmitting}
            className='w-full bg-primary hover:bg-primary/90 text-white h-12 rounded-[12px] text-base font-medium'
          >
            {isSubmitting ? 'Inloggen...' : 'Inloggen'}
          </Button>

          <SocialAuth />

          <div className='text-center pt-4'>
            <Link href='/auth/signup' className='text-primary hover:underline font-medium'>
              Maak een account aan
            </Link>
          </div>
        </form>
      </div>

      {/* Desktop: No Card, Transparent Background */}
      <div className='hidden md:block'>
        {/* Heading - Desktop */}
        <h1 className='text-center text-[40px] font-normal mb-12 leading-tight'>
          <span
            className='font-semibold'
            style={{
              background: 'linear-gradient(90deg, #023AA2 0%, #0AB27E 62.02%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Log in
          </span>{' '}
          op je account
        </h1>

        {/* Form - Desktop */}
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-5'>
          <div>
            <Input
              type='email'
              placeholder='E-mailadres'
              {...register('email')}
              className='w-full h-[56px] px-5 bg-white border border-neutral-300 rounded-[12px] text-base placeholder:text-gray-400'
              style={{
                boxShadow: '0px 2px 6.5px 0px #0000001A',
              }}
            />
            {errors.email && (
              <p className='text-sm text-red-500 mt-1.5'>{errors.email.message}</p>
            )}
          </div>

          <div>
            <Input
              type='password'
              placeholder='Wachtwoord'
              {...register('password')}
              className='w-full h-[56px] px-5 bg-white border border-neutral-300 rounded-[12px] text-base placeholder:text-gray-400'
              style={{
                boxShadow: '0px 2px 6.5px 0px #0000001A',
              }}
            />
            {errors.password && (
              <p className='text-sm text-red-500 mt-1.5'>{errors.password.message}</p>
            )}
          </div>

          <div className='flex items-center justify-between py-2'>
            <div className='flex items-center space-x-2'>
              <Checkbox
                id='rememberMe-desktop'
                checked={rememberMe}
                onCheckedChange={(checked) => setValue('rememberMe', checked as boolean)}
              />
              <Label htmlFor='rememberMe-desktop' className='text-sm cursor-pointer'>
                Onthoud mij
              </Label>
            </div>
            <Link href='/auth/forgot-password' className='text-sm text-primary hover:underline'>
              Wachtwoord vergeten?
            </Link>
          </div>

          <Button
            type='submit'
            disabled={isSubmitting}
            className='w-full bg-primary hover:bg-primary/90 text-white h-[56px] rounded-[12px] text-base font-medium'
          >
            {isSubmitting ? 'Inloggen...' : 'Inloggen'}
          </Button>

          <div className='relative py-4'>
            <div className='absolute inset-0 flex items-center'>
              <div className='w-full border-t-2 border-neutral-300'></div>
            </div>
            <div className='relative flex justify-center text-sm'>
              <span className='px-4 text-gray-500' style={{ background: 'linear-gradient(90deg, rgba(10, 178, 126, 0.1) 0%, rgba(2, 58, 162, 0.1) 100%)' }}>
                Of inloggen met
              </span>
            </div>
          </div>

          <SocialAuth />

          <div className='text-center pt-6'>
            <Link href='/auth/signup' className='text-primary hover:underline font-medium text-base'>
              Maak een account aan
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
