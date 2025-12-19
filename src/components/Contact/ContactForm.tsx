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

export default function ContactForm({ onSubmit }: ContactFormProps) {
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
            Stuur ons een bericht
          </h2>
          <p className='text-sm md:text-base leading-4 md:leading-5 text-muted-foreground'>
            Gratis, reactietijd &lt;24u
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
              Naam <span className='text-red-600'>*</span>
            </Label>
            <Input
              id='name'
              type='text'
              placeholder='Uw volledige naam'
              className='h-10 md:h-12 text-sm md:text-base'
              {...register('name', {
                required: 'Naam is verplicht',
                minLength: {
                  value: 2,
                  message: 'Naam moet minimaal 2 karakters bevatten',
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
              E-mail <span className='text-red-600'>*</span>
            </Label>
            <Input
              id='email'
              type='email'
              placeholder='uw.email@voorbeeld.nl'
              className='h-10 md:h-12 text-sm md:text-base'
              {...register('email', {
                required: 'E-mail is verplicht',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Voer een geldig e-mailadres in',
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
              Telefoon
            </Label>
            <Input
              id='phone'
              type='tel'
              placeholder='06 12 34 56 78'
              className='h-10 md:h-12 text-sm md:text-base'
              {...register('phone', {
                pattern: {
                  value: /^[\+]?[0-9\s\-\(\)]+$/,
                  message: 'Voer een geldig telefoonnummer in',
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
              Onderwerp <span className='text-red-600'>*</span>
            </Label>
            <Input
              id='subject'
              type='text'
              placeholder='Waar gaat uw vraag over?'
              className='h-10 md:h-12 text-sm md:text-base'
              {...register('subject', {
                required: 'Onderwerp is verplicht',
                minLength: {
                  value: 3,
                  message: 'Onderwerp moet minimaal 3 karakters bevatten',
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
            Type vraag
          </Label>
          <Controller
            name='category'
            control={control}
            rules={{ required: 'Selecteer een categorie' }}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger
                  className='w-full h-10 md:h-12 text-sm md:text-base cursor-pointer'
                  iconClassName='w-5 h-5 md:w-[31px] md:h-[31px]'
                >
                  <SelectValue placeholder='Selecteer een categorie' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='general'>Algemene vraag</SelectItem>
                  <SelectItem value='quote'>Offerte aanvraag</SelectItem>
                  <SelectItem value='support'>Ondersteuning</SelectItem>
                  <SelectItem value='partnership'>Samenwerking</SelectItem>
                  <SelectItem value='complaint'>Klacht</SelectItem>
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
            Bericht <span className='text-red-600'>*</span>
          </Label>
          <Textarea
            id='message'
            placeholder='Beschrijf uw vraag of project zo gedetailleerd mogelijk...'
            className='min-h-24 md:min-h-32 resize-none text-sm md:text-base'
            {...register('message', {
              required: 'Bericht is verplicht',
              minLength: {
                value: 10,
                message: 'Bericht moet minimaal 10 karakters bevatten',
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
            Bestand toevoegen (optioneel)
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
                      'Bestand mag maximaal 10MB zijn'
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
                  {selectedFileName || 'Klik om bestand te selecteren'}
                </span>
              </div>
            </label>
          </div>
          <p className='text-xs text-slate-600 mt-1'>
            JPG, PNG of PDF - max 10MB
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
            rules={{ required: 'U moet akkoord gaan met de privacyverklaring' }}
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
            Ik ga akkoord met de{' '}
            <a href='#' className='text-primary hover:underline'>
              privacyverklaring
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
            <span>{isSubmitting ? 'Versturen...' : 'Versturen'}</span>
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
            <span className='hidden sm:inline'>Liever direct chatten?</span>
            <span className='sm:hidden'>Direct chatten?</span>
          </Button>
        </div>
      </form>
    </div>
  );
}