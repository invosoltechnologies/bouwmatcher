'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from '@/i18n/navigation';
import toast from 'react-hot-toast';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import AuthNavbar from '@/components/auth/AuthNavbar';
import type { ForgotPasswordFormData } from '@/types/auth';
import { useAuth } from '@/hooks/useAuth';
import { useTranslations } from 'next-intl';
import { ArrowLeft, Mail } from 'lucide-react';

export default function ForgotPasswordPage() {
  const { forgotPassword } = useAuth();
  const t = useTranslations('auth.forgotPassword');
  const [emailSent, setEmailSent] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<ForgotPasswordFormData>();

  const onSubmit = async (data: ForgotPasswordFormData) => {
    forgotPassword.mutate(data.email, {
      onSuccess: (result) => {
        if (result.success) {
          setEmailSent(true);
        } else {
          toast.error(result.error || t('errorSending'));
        }
      },
      onError: (err) => {
        console.error('Forgot password error:', err);
        const errorMessage =
          err instanceof Error ? err.message : t('errorSending');
        toast.error(errorMessage);
      },
    });
  };

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
          {!emailSent ? (
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
                    htmlFor='email'
                    className='block text-sm md:text-base lg:text-lg font-medium mb-2'
                  >
                    {t('emailLabel')}
                  </label>
                  <Input
                    {...register('email', {
                      required: t('emailRequired'),
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: t('emailInvalid'),
                      },
                    })}
                    type='email'
                    placeholder={t('emailPlaceholder')}
                    className='h-12 md:h-14 lg:h-[60px] bg-white border-neutral-300 rounded-lg px-4 md:px-6 lg:px-7 text-base md:text-lg lg:text-xl font-medium'
                    style={{ boxShadow: '0px 2px 6.5px 0px #0000001A' }}
                  />
                  {errors.email && (
                    <p className='text-red-500 text-sm mt-1'>
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <Button
                  type='submit'
                  disabled={forgotPassword.isPending}
                  className='w-full text-base md:text-lg lg:text-2xl py-3 md:py-4 lg:py-4.5 font-medium rounded-[7px] mt-6 md:mt-8'
                >
                  {forgotPassword.isPending
                    ? t('submitting')
                    : t('submitButton')}
                </Button>

                <div className='text-center pt-4'>
                  <Link
                    href='/auth/login'
                    className='inline-flex items-center gap-2 text-base md:text-lg lg:text-xl text-primary font-medium hover:underline'
                  >
                    <ArrowLeft className='w-4 h-4 md:w-5 md:h-5' />
                    {t('backToLogin')}
                  </Link>
                </div>
              </form>
            </>
          ) : (
            <div className='text-center'>
              <div className='flex justify-center mb-6'>
                <div className='w-16 h-16 md:w-20 md:h-20 bg-green-100 rounded-full flex items-center justify-center'>
                  <Mail className='w-8 h-8 md:w-10 md:h-10 text-green-600' />
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
                  {t('successHeading')}
                </span>
              </h1>

              <p className='text-base md:text-lg lg:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto'>
                {t('successMessage')}
              </p>

              <p className='text-sm md:text-base text-muted-foreground mb-8'>
                {getValues('email')}
              </p>

              <Link href='/auth/login'>
                <Button className='text-base md:text-lg lg:text-xl py-3 md:py-4 px-8 md:px-12 font-medium rounded-[7px]'>
                  {t('backToLogin')}
                </Button>
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
