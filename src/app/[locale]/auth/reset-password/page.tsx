'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from '@/i18n/navigation';
import toast from 'react-hot-toast';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import AuthNavbar from '@/components/auth/AuthNavbar';
import PasswordStrength from '@/components/ui/password-strength';
import type { ResetPasswordFormData } from '@/types/auth';
import { useAuth } from '@/hooks/useAuth';
import { useTranslations } from 'next-intl';
import { validatePasswordStrength } from '@/lib/utils/password-validator';
import { CheckCircle, Eye, EyeOff } from 'lucide-react';

export default function ResetPasswordPage() {
  const router = useRouter();
  const { resetPassword } = useAuth();
  const t = useTranslations('auth.resetPassword');
  const [resetComplete, setResetComplete] = useState(false);
  const [isValidSession, setIsValidSession] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<ResetPasswordFormData>();

  const password = watch('password');
  const confirmPassword = watch('confirmPassword');

  // Check if user has valid reset session on mount
  useEffect(() => {
    const checkSession = async () => {
      try {
        // Give Supabase a moment to process the token from URL
        await new Promise(resolve => setTimeout(resolve, 500));

        // Supabase automatically handles the token from URL hash/query params
        // We just need to verify the session exists
        const response = await fetch('/api/auth/session');
        if (response.ok) {
          const { session } = await response.json();
          if (session) {
            setIsValidSession(true);
          } else {
            toast.error(t('invalidLink'));
            setTimeout(() => {
              router.push('/auth/forgot-password');
            }, 2000);
          }
        } else {
          toast.error(t('invalidLink'));
          setTimeout(() => {
            router.push('/auth/forgot-password');
          }, 2000);
        }
      } catch (error) {
        console.error('Session check error:', error);
        toast.error(t('invalidLink'));
        setTimeout(() => {
          router.push('/auth/forgot-password');
        }, 2000);
      }
    };

    checkSession();
  }, [router, t]);

  const onSubmit = async (data: ResetPasswordFormData) => {
    // Validate password strength
    const validation = validatePasswordStrength(data.password);
    if (!validation.isValid) {
      toast.error(validation.message);
      return;
    }

    // Check if passwords match
    if (data.password !== data.confirmPassword) {
      toast.error(t('passwordMismatch'));
      return;
    }

    resetPassword.mutate(data.password, {
      onSuccess: (result) => {
        if (result.success) {
          setResetComplete(true);
          toast.success(t('successMessage'));
          setTimeout(() => {
            router.push('/auth/login');
          }, 3000);
        } else {
          toast.error(result.error || t('errorResetting'));
        }
      },
      onError: (err) => {
        console.error('Reset password error:', err);
        const errorMessage =
          err instanceof Error ? err.message : t('errorResetting');
        toast.error(errorMessage);
      },
    });
  };

  if (!isValidSession) {
    return (
      <div
        className='min-h-screen pt-8 md:pt-10 flex flex-col'
        style={{
          background:
            'linear-gradient(90deg, rgba(10, 178, 126, 0.1) 0%, rgba(2, 58, 162, 0.1) 100%)',
        }}
      >
        <AuthNavbar />
        <main className='flex-1 flex items-center justify-center px-4'>
          <div className='text-center'>
            <p className='text-lg md:text-xl text-muted-foreground'>
              Verifying reset link...
            </p>
          </div>
        </main>
      </div>
    );
  }

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
        <div className='w-full max-w-md md:max-w-3xl px-4'>
          {!resetComplete ? (
            <>
              <h1 className='text-2xl sm:text-3xl md:text-4xl lg:text-[55px] font-normal text-center mb-4 md:mb-6 leading-tight'>
                <span
                  style={{
                    background:
                      'linear-gradient(90deg, #023AA2 0%, #0AB27E 62.02%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  {t('heading')}
                </span>
              </h1>

              <p className='text-center text-base md:text-lg lg:text-xl text-muted-foreground mb-8 md:mb-12'>
                {t('description')}
              </p>

              <form
                onSubmit={handleSubmit(onSubmit)}
                className='space-y-4 md:space-y-6'
              >
                <div>
                  <label
                    htmlFor='password'
                    className='block text-sm md:text-base lg:text-lg font-medium mb-2'
                  >
                    {t('newPasswordLabel')}
                  </label>
                  <div className='relative'>
                    <Input
                      {...register('password', {
                        required: t('passwordRequired'),
                        minLength: {
                          value: 8,
                          message: t('passwordTooShort'),
                        },
                        validate: (value) => {
                          const validation = validatePasswordStrength(value);
                          return validation.isValid || t('passwordRequirements');
                        },
                      })}
                      type={showPassword ? 'text' : 'password'}
                      placeholder={t('newPasswordPlaceholder')}
                      className='h-12 md:h-14 lg:h-[60px] bg-white border-neutral-300 rounded-lg px-4 md:px-6 lg:px-7 pr-12 md:pr-14 text-base md:text-lg lg:text-xl font-medium'
                      style={{ boxShadow: '0px 2px 6.5px 0px #0000001A' }}
                    />
                    <button
                      type='button'
                      onClick={() => setShowPassword(!showPassword)}
                      className='absolute right-4 md:right-6 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600'
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
                  <PasswordStrength password={password || ''} />
                </div>

                <div>
                  <label
                    htmlFor='confirmPassword'
                    className='block text-sm md:text-base lg:text-lg font-medium mb-2'
                  >
                    {t('confirmPasswordLabel')}
                  </label>
                  <div className='relative'>
                    <Input
                      {...register('confirmPassword', {
                        required: t('confirmPasswordRequired'),
                        validate: (value) =>
                          value === password || t('passwordMismatch'),
                      })}
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder={t('confirmPasswordPlaceholder')}
                      className='h-12 md:h-14 lg:h-[60px] bg-white border-neutral-300 rounded-lg px-4 md:px-6 lg:px-7 pr-12 md:pr-14 text-base md:text-lg lg:text-xl font-medium'
                      style={{ boxShadow: '0px 2px 6.5px 0px #0000001A' }}
                    />
                    <button
                      type='button'
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className='absolute right-4 md:right-6 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600'
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
                  {confirmPassword &&
                    password &&
                    confirmPassword === password && (
                      <p className='text-green-600 text-sm mt-1 flex items-center gap-1'>
                        <CheckCircle className='w-4 h-4' />
                        Passwords match
                      </p>
                    )}
                </div>

                <Button
                  type='submit'
                  disabled={resetPassword.isPending}
                  className='w-full text-base md:text-lg lg:text-2xl py-3 md:py-4 lg:py-4.5 font-medium rounded-[7px] mt-6 md:mt-8'
                >
                  {resetPassword.isPending ? t('submitting') : t('submitButton')}
                </Button>
              </form>
            </>
          ) : (
            <div className='text-center'>
              <div className='flex justify-center mb-6'>
                <div className='w-16 h-16 md:w-20 md:h-20 bg-green-100 rounded-full flex items-center justify-center'>
                  <CheckCircle className='w-8 h-8 md:w-10 md:h-10 text-green-600' />
                </div>
              </div>

              <h1 className='text-2xl sm:text-3xl md:text-4xl lg:text-[55px] font-normal mb-4 md:mb-6 leading-tight'>
                <span
                  style={{
                    background:
                      'linear-gradient(90deg, #023AA2 0%, #0AB27E 62.02%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  Password Reset!
                </span>
              </h1>

              <p className='text-base md:text-lg lg:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto'>
                {t('successMessage')}
              </p>

              <p className='text-sm md:text-base text-muted-foreground'>
                {t('redirecting')}
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
