'use client';

import { useState, Suspense } from 'react';
import { useForm } from 'react-hook-form';
import { useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';
import Image from 'next/image';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import AuthNavbar from '@/components/auth/AuthNavbar';
import type { LoginFormData } from '@/types/auth';
import { signIn, signInWithOAuth } from '@/lib/supabase/auth';

function LoginForm() {
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);

  // Get redirect URL from query params (set by middleware)
  const redirectUrl = searchParams.get('redirect') || '/pro-dashboard/account';

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<LoginFormData>({
    defaultValues: {
      rememberMe: false,
    },
  });

  const rememberMe = watch('rememberMe');

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);

    try {
      const result = await signIn({
        email: data.email,
        password: data.password,
      });

      // Check if login was successful
      if (result.session) {
        toast.success('Succesvol ingelogd! Je wordt doorgestuurd...');

        // Wait for auth state to propagate
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Use replace to prevent back button issues
        window.location.href = redirectUrl;
      }
    } catch (err) {
      console.error('Login error:', err);
      const errorMessage = err instanceof Error ? err.message : 'Onjuist e-mailadres of wachtwoord';
      toast.error(errorMessage);
      setIsLoading(false);
    }
  };

  const handleOAuthLogin = async (provider: 'google' | 'facebook' | 'apple') => {
    try {
      await signInWithOAuth(provider);
    } catch (err) {
      console.error('OAuth login error:', err);
      const errorMessage = err instanceof Error ? err.message : 'Er is een fout opgetreden bij het inloggen';
      toast.error(errorMessage);
    }
  };

  return (
    <div className='w-full max-w-3xl'>
          <h1 className='text-[55px] font-normal text-center mb-12 leading-tight'>
            <span
              style={{
                background:
                  'linear-gradient(90deg, #023AA2 0%, #0AB27E 62.02%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Log in
            </span>{' '}
            op je account
          </h1>

          <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
            <div>
              <Input
                {...register('email')}
                type='email'
                placeholder='E-mailadres'
                className='h-[60px] bg-white border-neutral-300 rounded-lg px-7 text-xl md:text-lg font-medium'
                style={{ boxShadow: '0px 2px 6.5px 0px #0000001A' }}
              />
              {errors.email && (
                <p className='text-red-500 text-sm mt-1'>
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <Input
                {...register('password')}
                type='password'
                placeholder='Wachtwoord'
                className='h-[60px] bg-white border-neutral-300 rounded-lg px-7 text-xl md:text-lg font-medium'
                style={{ boxShadow: '0px 2px 6.5px 0px #0000001A' }}
              />
              {errors.password && (
                <p className='text-red-500 text-sm mt-1'>
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className='flex items-center justify-between mt-7 mb-8'>
              <div className='flex items-center gap-2'>
                <Checkbox
                  id='rememberMe'
                  checked={rememberMe}
                  onCheckedChange={(checked) =>
                    setValue('rememberMe', checked as boolean)
                  }
                  className='bg-white rounded-none border-neutral-300 w-5 h-5 font-medium'
                />
                <label
                  htmlFor='rememberMe'
                  className='text-xl text-secondary-foreground cursor-pointer'
                >
                  Onthoud mij
                </label>
              </div>

              <Link
                href='/auth/forgot-password'
                className='text-xl text-primary font-medium'
              >
                Wachtwoord vergeten?
              </Link>
            </div>

            <Button
              type='submit'
              disabled={isLoading}
              className='w-full text-2xl py-4.5 font-medium rounded-[7px]'
            >
              {isLoading ? 'Bezig met inloggen...' : 'Inloggen'}
            </Button>

            <div className='relative'>
              <div className='absolute inset-0 flex items-center'>
                <div className='w-full border-t border border-dashed border-muted-foreground'></div>
              </div>
              <div className='relative flex justify-center text-sm'>
                <span
                  className='px-4.5 py-2 text-base font-medium text-muted-foreground bg-[#e6f1f4d9]'
                  // style={{
                  //   background:
                  //     'linear-gradient(90deg, rgba(10, 178, 126, 0.1) 0%, rgba(2, 58, 162, 0.1) 100%)',
                  // }}
                >
                  Of inloggen met
                </span>
              </div>
            </div>

            <div className='flex gap-4'>
              <button
                type='button'
                onClick={() => handleOAuthLogin('google')}
                className='flex-1 py-4 cursor-pointer bg-white border border-neutral-300 rounded-lg flex items-center justify-center hover:bg-neutral-50 transition-colors'
                style={{ boxShadow: '0px 2px 6.5px 0px #0000001A' }}
              >
                <Image
                  src='/images/auth/google.svg'
                  alt='Google'
                  width={24}
                  height={24}
                />
              </button>

              <button
                type='button'
                onClick={() => handleOAuthLogin('facebook')}
                className='flex-1 py-4 cursor-pointer bg-white border border-neutral-300 rounded-lg flex items-center justify-center hover:bg-neutral-50 transition-colors'
                style={{ boxShadow: '0px 2px 6.5px 0px #0000001A' }}
              >
                <Image
                  src='/images/auth/facebook.svg'
                  alt='Facebook'
                  width={24}
                  height={24}
                />
              </button>

              <button
                type='button'
                onClick={() => handleOAuthLogin('apple')}
                className='flex-1 py-4 bg-white border border-neutral-300 rounded-lg flex items-center justify-center hover:bg-neutral-50 transition-colors'
                style={{ boxShadow: '0px 2px 6.5px 0px #0000001A' }}
              >
                <Image
                  src='/images/auth/apple.svg'
                  alt='Apple'
                  width={24}
                  height={24}
                />
              </button>
            </div>

            <div className='text-center'>
              <Link
                href='/auth/register'
                className='text-2xl text-primary font-medium hover:underline'
              >
                Maak een account aan
              </Link>
            </div>
          </form>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div
      className='min-h-screen pt-10 flex flex-col'
      style={{
        background:
          'linear-gradient(90deg, rgba(10, 178, 126, 0.1) 0%, rgba(2, 58, 162, 0.1) 100%)',
      }}
    >
      <AuthNavbar />

      <main className='flex-1 flex items-center justify-center px-4 pt-24 pb-12'>
        <Suspense fallback={<div className='w-full max-w-3xl text-center'>Loading...</div>}>
          <LoginForm />
        </Suspense>
      </main>
    </div>
  );
}
