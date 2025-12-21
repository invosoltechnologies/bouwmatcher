"use client";

import { useForm, Controller } from "react-hook-form";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Send, CloudUpload } from "lucide-react";
import { ContactFormData, ContactFormProps } from "@/types/contact";
import { useTranslations } from 'next-intl';

export default function ContactForm({ onSubmit }: ContactFormProps) {
  const t = useTranslations('contact.form');
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      category: "",
      message: "",
      agreeToTerms: false,
    },
  });

  const watchedFile = watch("file");
  const selectedFileName = watchedFile?.[0]?.name;

  const onFormSubmit = async (data: ContactFormData) => {
    try {
      console.log("Form submitted:", data);
      if (onSubmit) {
        await onSubmit(data);
      }
      // Reset form after successful submission
      reset();
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

  return (
    <div className='w-full max-w-3xl mx-auto bg-white/90 border-gray-200 rounded-3xl p-6 md:p-12 shadow-lg relative z-20 -top-20'>
      {/* Header */}
      <div className='flex items-center gap-3 md:gap-4 mb-6 md:mb-8'>
        <Image
          src='/images/contact/contact-form-head.svg'
          width={48}
          height={48}
          alt='Contact'
          className='w-10 h-10 md:w-12 md:h-12'
        />
        <div>
          <h2 className='text-lg md:text-2xl leading-6 md:leading-8 text-foreground font-medium'>
            {t('heading')}
          </h2>
          <p className='text-sm md:text-base leading-4 md:leading-5 text-muted-foreground'>
            {t('subheading')}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onFormSubmit)} className='space-y-4 md:space-y-6'>
        {/* Name and Email Row */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div>
            <Label
              htmlFor='name'
              className='block text-sm md:text-base font-medium text-slate-700 mb-1.5 md:mb-2'
            >
              {t('nameLabel')} <span className='text-red-600'>*</span>
            </Label>
            <Input
              id='name'
              type='text'
              placeholder={t('namePlaceholder')}
              className='h-10 md:h-12 text-sm md:text-base'
              {...register('name', {
                required: t('nameRequired'),
                minLength: {
                  value: 2,
                  message: t('nameMinLength'),
                },
              })}
            />
            {errors.name && (
              <p className='text-xs md:text-sm text-red-500 mt-1'>{errors.name.message}</p>
            )}
          </div>
          <div>
            <Label
              htmlFor='email'
              className='block text-sm md:text-base font-medium text-slate-700 mb-1.5 md:mb-2'
            >
              {t('emailLabel')} <span className='text-red-600'>*</span>
            </Label>
            <Input
              id='email'
              type='email'
              placeholder={t('emailPlaceholder')}
              className='h-10 md:h-12 text-sm md:text-base'
              {...register('email', {
                required: t('emailRequired'),
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: t('emailInvalid'),
                },
              })}
            />
            {errors.email && (
              <p className='text-xs md:text-sm text-red-500 mt-1'>
                {errors.email.message}
              </p>
            )}
          </div>
        </div>

        {/* Phone and Subject Row */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div>
            <Label
              htmlFor='phone'
              className='block text-sm md:text-base font-medium text-slate-700 mb-1.5 md:mb-2'
            >
              {t('phoneLabel')}
            </Label>
            <Input
              id='phone'
              type='tel'
              placeholder={t('phonePlaceholder')}
              className='h-10 md:h-12 text-sm md:text-base'
              {...register('phone', {
                pattern: {
                  value: /^[\+]?[0-9\s\-\(\)]+$/,
                  message: t('phoneInvalid'),
                },
              })}
            />
            {errors.phone && (
              <p className='text-xs md:text-sm text-red-500 mt-1'>
                {errors.phone.message}
              </p>
            )}
          </div>
          <div>
            <Label
              htmlFor='subject'
              className='block text-sm md:text-base font-medium text-slate-700 mb-1.5 md:mb-2'
            >
              {t('subjectLabel')} <span className='text-red-600'>*</span>
            </Label>
            <Input
              id='subject'
              type='text'
              placeholder={t('subjectPlaceholder')}
              className='h-10 md:h-12 text-sm md:text-base'
              {...register('subject', {
                required: t('subjectRequired'),
                minLength: {
                  value: 3,
                  message: t('subjectMinLength'),
                },
              })}
            />
            {errors.subject && (
              <p className='text-xs md:text-sm text-red-500 mt-1'>
                {errors.subject.message}
              </p>
            )}
          </div>
        </div>

        {/* Category Select */}
        <div>
          <Label
            htmlFor='category'
            className='block text-sm md:text-base font-medium text-slate-700 mb-1.5 md:mb-2'
          >
            {t('categoryLabel')}
          </Label>
          <Controller
            name='category'
            control={control}
            rules={{ required: t('categoryRequired') }}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger
                  className='w-full h-10 md:h-12 text-sm md:text-base cursor-pointer'
                  iconClassName='w-5 h-5 md:w-[31px] md:h-[31px]'
                >
                  <SelectValue placeholder={t('categoryPlaceholder')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='general'>{t('categoryGeneral')}</SelectItem>
                  <SelectItem value='quote'>{t('categoryQuote')}</SelectItem>
                  <SelectItem value='support'>{t('categorySupport')}</SelectItem>
                  <SelectItem value='partnership'>{t('categoryPartnership')}</SelectItem>
                  <SelectItem value='complaint'>{t('categoryComplaint')}</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          {errors.category && (
            <p className='text-xs md:text-sm text-red-500 mt-1'>
              {errors.category.message}
            </p>
          )}
        </div>

        {/* Message */}
        <div>
          <Label
            htmlFor='message'
            className='block text-sm md:text-base font-medium text-slate-700 mb-1.5 md:mb-2'
          >
            {t('messageLabel')} <span className='text-red-600'>*</span>
          </Label>
          <Textarea
            id='message'
            placeholder={t('messagePlaceholder')}
            className='min-h-24 md:min-h-32 resize-none text-sm md:text-base'
            {...register('message', {
              required: t('messageRequired'),
              minLength: {
                value: 10,
                message: t('messageMinLength'),
              },
            })}
          />
          {errors.message && (
            <p className='text-xs md:text-sm text-red-500 mt-1'>
              {errors.message.message}
            </p>
          )}
        </div>

        {/* File Upload */}
        <div>
          <Label
            htmlFor='file'
            className='block text-sm md:text-base font-medium text-slate-700 mb-1.5 md:mb-2'
          >
            {t('fileLabel')}
          </Label>
          <div className='relative'>
            <input
              id='file'
              type='file'
              className='hidden'
              accept='.jpg,.jpeg,.png,.pdf,.doc,.docx'
              {...register('file', {
                validate: {
                  fileSize: (files) => {
                    if (!files || files.length === 0) return true;
                    const file = files[0];
                    return (
                      file.size <= 10 * 1024 * 1024 ||
                      t('fileMaxSize')
                    );
                  },
                },
              })}
            />
            <label
              htmlFor='file'
              className='flex items-center justify-center w-full h-10 md:h-12 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400 transition-colors'
            >
              <div className='flex items-center gap-2 text-slate-600'>
                <CloudUpload className='w-4 h-4 md:w-5 md:h-5' />
                <span className='text-sm md:text-base'>
                  {selectedFileName || t('filePlaceholder')}
                </span>
              </div>
            </label>
          </div>
          <p className='text-xs text-slate-600 mt-1'>
            {t('fileInfo')}
          </p>
          {errors.file && (
            <p className='text-xs md:text-sm text-red-500 mt-1'>{errors.file.message}</p>
          )}
        </div>

        {/* Terms Agreement */}
        <div className='flex items-start gap-2 md:gap-3'>
          <Controller
            name='agreeToTerms'
            control={control}
            rules={{ required: t('termsRequired') }}
            render={({ field }) => (
              <Checkbox
                id='terms'
                checked={field.value}
                onCheckedChange={field.onChange}
                className='rounded text-bold mt-0.5'
              />
            )}
          />
          <Label htmlFor='terms' className='text-xs md:text-sm text-slate-600 cursor-pointer'>
            {t('termsText')}{' '}
            <a href='#' className='text-primary hover:underline'>
              {t('termsLink')}
            </a>
            <span className='text-red-600'> *</span>
          </Label>
        </div>
        {errors.agreeToTerms && (
          <p className='text-xs md:text-sm text-red-500'>{errors.agreeToTerms.message}</p>
        )}

        {/* Submit Buttons */}
        <div className='flex flex-col sm:flex-row gap-3 md:gap-4 pt-2 md:pt-4'>
          <Button
            type='submit'
            disabled={isSubmitting}
            className='flex-1 bg-primary hover:bg-primary/90 text-white font-semibold py-3 md:py-4 flex items-center text-base md:text-xl rounded-[12px] justify-center gap-2 disabled:opacity-50'
            style={{
              boxShadow:
                '0px 10px 15px 0px #0000001A, 0px 4px 6px 0px #0000001A',
            }}
          >
            <span>{isSubmitting ? t('submittingButton') : t('submitButton')}</span>
            <Send className='w-4 h-4 md:w-5 md:h-5' />
          </Button>

          <Button
            type='button'
            variant='outline'
            className='px-4 md:px-6 text-primary border-none hover:border hover:border-primary hover:bg-transparent hover:text-primary font-semibold py-3 md:py-4 text-sm md:text-xl rounded-[12px] flex items-center justify-center gap-2'
          >
            <Image
              src='/icons/chat.svg'
              width={20}
              height={24}
              alt='Chat'
              className='w-4 h-5 md:w-5 md:h-6'
            />
            <span className='hidden sm:inline'>{t('chatButton')}</span>
            <span className='sm:hidden'>{t('chatButtonShort')}</span>
          </Button>
        </div>
      </form>
    </div>
  );
}