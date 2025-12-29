'use client';

import { useForm, Controller } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { PhoneInput } from '@/components/ui/phone-input';
import { isValidPhoneNumber } from 'react-phone-number-input';
import { Link } from '@/i18n/navigation';
import type { ContactInfoData } from '@/types/auth';
import { ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface ContactInfoFormProps {
  onNext: (data: ContactInfoData) => void;
  defaultValues?: Partial<ContactInfoData>;
}

export default function ContactInfoForm({ onNext, defaultValues }: ContactInfoFormProps) {
  const t = useTranslations('auth.register.contactInfo');

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
        {t('heading')}
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className='space-y-8'>
        <div className='flex flex-col md:flex-row gap-6'>
          <div className='flex-1'>
            <Label className='block text-sm md:text-xl text-muted-foreground mb-3'>
              {t('firstNameLabel')}
            </Label>
            <Input
              {...register('firstName', { required: t('firstNameRequired') })}
              type='text'
              placeholder={t('firstNamePlaceholder')}
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
              {t('lastNameLabel')}
            </Label>
            <Input
              {...register('lastName', { required: t('lastNameRequired') })}
              type='text'
              placeholder={t('lastNamePlaceholder')}
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
            {t('emailLabel')}
          </Label>
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
            className='py-7 bg-white border-neutral-300 rounded-lg px-4 text-base md:text-xl placeholder:text-slate-300'
            style={{ boxShadow: '0px 2px 6.5px 0px #0000001A' }}
          />
          {errors.email && (
            <p className='text-red-500 text-sm mt-1'>{errors.email.message}</p>
          )}
        </div>

        <div>
          <Label className='block text-sm md:text-xl text-muted-foreground mb-3'>
            {t('phoneLabel')}
          </Label>
          <Controller
            name='phone'
            control={control}
            rules={{
              required: t('phoneRequired'),
              validate: (value) => {
                if (!value) return t('phoneRequired');
                return isValidPhoneNumber(value) || t('phoneInvalid');
              },
            }}
            render={({ field }) => (
              <PhoneInput
                {...field}
                className=' bg-white border-neutral-300 rounded-lg text-base md:text-xl placeholder:text-slate-300'
                classInput='py-7 px-4 text-base border-neutral-300 md:text-xl placeholder:text-slate-300'
                style={{ boxShadow: '0px 2px 6.5px 0px #0000001A' }}
                error={errors.phone?.message}
              />
            )}
          />
        </div>

        <div className='text-sm md:text-lg text-muted-foreground'>
          {t('termsText')}{' '}
          <Link
            href='/terms'
            className='font-medium text-primary hover:underline'
          >
            {t('termsLink')}
          </Link>{' '}
          {t('termsTextSuffix')}
        </div>

        <div className='flex justify-end pt-4'>
          <Button
            type='submit'
            className='px-6 py-4 text-base rounded-2xl md:text-lg font-semibold'
          >
            {t('submitButton')}
            <ArrowRight className='w-5 h-5 md:h-7 md:w-7' size={20} />
          </Button>
        </div>
      </form>
    </div>
  );
}
