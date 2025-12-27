'use client';

import { Suspense, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSearchParams } from 'next/navigation';
import { useRouter } from '@/i18n/navigation';
import toast from 'react-hot-toast';
import Image from 'next/image';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import AuthNavbar from '@/components/auth/AuthNavbar';
import type { LoginFormData } from '@/types/auth';
import { useAuth } from '@/hooks/useAuth';

function LoginForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { signIn, signInWithOAuth } = useAuth();

  // Get redirect URL from query params (set by middleware)
  const redirectUrl = searchParams.get('redirect');

  // Show OAuth error if present
  useEffect(() => {
    const oauthError = searchParams.get('error');
    if (oauthError) {
      const errorMessages: Record<string, string> = {
        oauth_failed: 'OAuth authenticatie mislukt. Probeer het opnieuw.',
        profile_creation_failed: 'Kon profiel niet aanmaken. Neem contact op met support.',
        oauth_callback_failed: 'Er ging iets mis tijdens het inloggen. Probeer het opnieuw.',
      };

      const message = errorMessages[oauthError] || 'Er is een fout opgetreden tijdens het inloggen.';
      toast.error(message);

      // Remove error from URL
      const newUrl = new URL(window.location.href);
      newUrl.searchParams.delete('error');
      window.history.replaceState({}, '', newUrl);
    }
  }, [searchParams]);

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
    signIn.mutate(
      {
        email: data.email,
        password: data.password,
      },
      {
        onSuccess: async (result) => {
          if (result.success) {
            toast.success('Succesvol ingelogd! Je wordt doorgestuurd...');

            // Check profile completion status
            try {
              const response = await fetch('/api/registration/current-step');
              if (response.ok) {
                const profileData = await response.json();

                // Determine where to redirect based on profile status
                let destination = redirectUrl || '/pro-dashboard/account';

                // If profile is not completed or current step < 6, redirect to registration
                if (!profileData.profile_completed || profileData.current_step < 6) {
                  destination = '/auth/register';
                }

                setTimeout(() => {
                  router.push(destination);
                }, 1000);
              } else {
                // Fallback: redirect to specified URL or dashboard
                setTimeout(() => {
                  router.push(redirectUrl || '/pro-dashboard/account');
                }, 1000);
              }
            } catch (error) {
              console.error('Error checking profile:', error);
              // Fallback on error
              setTimeout(() => {
                router.push(redirectUrl || '/pro-dashboard/account');
              }, 1000);
            }
          } else {
            toast.error(result.error || 'Onjuist e-mailadres of wachtwoord');
          }
        },
        onError: (err) => {
          console.error('Login error:', err);
          const errorMessage = err instanceof Error ? err.message : 'Onjuist e-mailadres of wachtwoord';
          toast.error(errorMessage);
        },
      }
    );
  };

  const handleOAuthLogin = async (provider: 'google' | 'facebook' | 'apple') => {
    await signInWithOAuth(provider);
  };

  return (
    <div className='w-full max-w-md md:max-w-lg lg:max-w-xl px-4'>
          <h1 className='text-2xl sm:text-3xl md:text-4xl lg:text-[55px] font-normal text-center mb-8 md:mb-12 leading-tight'>
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

          <form onSubmit={handleSubmit(onSubmit)} className='space-y-4 md:space-y-6'>
            <div>
              <Input
                {...register('email')}
                type='email'
                placeholder='E-mailadres'
                className='h-12 md:h-14 lg:h-[60px] bg-white border-neutral-300 rounded-lg px-4 md:px-6 lg:px-7 text-base md:text-lg lg:text-xl font-medium'
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
                className='h-12 md:h-14 lg:h-[60px] bg-white border-neutral-300 rounded-lg px-4 md:px-6 lg:px-7 text-base md:text-lg lg:text-xl font-medium'
                style={{ boxShadow: '0px 2px 6.5px 0px #0000001A' }}
              />
              {errors.password && (
                <p className='text-red-500 text-sm mt-1'>
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className='flex justify-between sm:justify-between gap-3 sm:gap-0 mt-4 md:mt-7 mb-6 md:mb-8'>
              <div className='flex items-center gap-2'>
                <Checkbox
                  id='rememberMe'
                  checked={rememberMe}
                  onCheckedChange={(checked) =>
                    setValue('rememberMe', checked as boolean)
                  }
                  className='bg-white rounded-none border-neutral-300 w-4 h-4 md:w-5 md:h-5 font-medium'
                />
                <label
                  htmlFor='rememberMe'
                  className='text-sm md:text-base lg:text-xl text-secondary-foreground cursor-pointer'
                >
                  Onthoud mij
                </label>
              </div>

              <Link
                href='/auth/forgot-password'
                className='text-sm md:text-base lg:text-xl text-primary font-medium hover:underline'
              >
                Wachtwoord vergeten?
              </Link>
            </div>

            <Button
              type='submit'
              disabled={signIn.isPending}
              className='w-full text-base md:text-lg lg:text-2xl py-3 md:py-4 lg:py-4.5 font-medium rounded-[7px]'
            >
              {signIn.isPending ? 'Bezig met inloggen...' : 'Inloggen'}
            </Button>

            <div className='relative py-0 md:py-4'>
              <div className='absolute inset-0 flex items-center'>
                <div className='w-full border-t border border-dashed border-muted-foreground'></div>
              </div>
              <div className='relative flex justify-center text-sm'>
                <span
                  className='px-3 md:px-4.5 py-1.5 md:py-2 text-sm md:text-base font-medium text-muted-foreground bg-[#e6f1f4d9]'
                >
                  Of inloggen met
                </span>
              </div>
            </div>

            <div className='flex gap-3 md:gap-4'>
              <button
                type='button'
                onClick={() => handleOAuthLogin('google')}
                className='flex-1 py-3 md:py-4 cursor-pointer bg-white border border-neutral-300 rounded-lg flex items-center justify-center hover:bg-neutral-50 transition-colors'
                style={{ boxShadow: '0px 2px 6.5px 0px #0000001A' }}
              >
                <Image
                  src='/images/auth/google.svg'
                  alt='Google'
                  width={20}
                  height={20}
                  className='w-5 h-5 md:w-6 md:h-6'
                />
              </button>

              {/* <button
                type='button'
                onClick={() => handleOAuthLogin('facebook')}
                className='flex-1 py-3 md:py-4 cursor-pointer bg-white border border-neutral-300 rounded-lg flex items-center justify-center hover:bg-neutral-50 transition-colors'
                style={{ boxShadow: '0px 2px 6.5px 0px #0000001A' }}
              >
                <Image
                  src='/images/auth/facebook.svg'
                  alt='Facebook'
                  width={20}
                  height={20}
                  className='w-5 h-5 md:w-6 md:h-6'
                />
              </button>

              <button
                type='button'
                onClick={() => handleOAuthLogin('apple')}
                className='flex-1 py-3 md:py-4 bg-white border border-neutral-300 rounded-lg flex items-center justify-center hover:bg-neutral-50 transition-colors'
                style={{ boxShadow: '0px 2px 6.5px 0px #0000001A' }}
              >
                <Image
                  src='/images/auth/apple.svg'
                  alt='Apple'
                  width={20}
                  height={20}
                  className='w-5 h-5 md:w-6 md:h-6'
                />
              </button> */}
            </div>

            <div className='text-center pt-2'>
              <Link
                href='/auth/register'
                className='text-base md:text-lg lg:text-2xl text-primary font-medium hover:underline'
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
      className='min-h-screen pt-8 md:pt-10 flex flex-col'
      style={{
        background:
          'linear-gradient(90deg, rgba(10, 178, 126, 0.1) 0%, rgba(2, 58, 162, 0.1) 100%)',
      }}
    >
      <AuthNavbar />

      <main className='flex-1 flex items-center justify-center px-4 pt-20 md:pt-24 pb-8 md:pb-12'>
        <Suspense fallback={<div className='w-full max-w-md md:max-w-lg lg:max-w-xl text-center'>Loading...</div>}>
          <LoginForm />
        </Suspense>
      </main>
    </div>
  );
}
