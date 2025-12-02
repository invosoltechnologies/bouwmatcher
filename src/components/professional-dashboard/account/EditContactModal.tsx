'use client';

import { useForm, Controller } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import GlassyModal from '@/components/ui/glassy-modal';
import { useUpdateProfile } from '@/lib/hooks/professional/account';
import type { ContactInfoData } from '@/lib/types/account';

interface EditContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  contactInfo: ContactInfoData;
}

interface ContactFormData {
  gender: string;
  firstName: string;
  lastName: string;
  quotesEmail: string;
  invoicesEmail: string;
  phoneNumber: string;
}

export default function EditContactModal({
  isOpen,
  onClose,
  contactInfo,
}: EditContactModalProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ContactFormData>({
    defaultValues: {
      gender: 'prefer_not_to_say',
      firstName: contactInfo.contactPerson.split(' ')[0] || '',
      lastName: contactInfo.contactPerson.split(' ').slice(1).join(' ') || '',
      quotesEmail: contactInfo.quotesEmail,
      invoicesEmail: contactInfo.invoicesEmail,
      phoneNumber: contactInfo.phoneNumber,
    },
  });

  const updateProfileMutation = useUpdateProfile({
    onSuccess: () => {
      toast.success('Contactgegevens succesvol bijgewerkt');
      onClose();
    },
    onError: (error) => {
      toast.error(error.message || 'Kon contactgegevens niet bijwerken');
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    updateProfileMutation.mutate({
      firstName: data.firstName,
      lastName: data.lastName,
      quotesEmail: data.quotesEmail || null,
      invoicesEmail: data.invoicesEmail || null,
      phoneNumber: data.phoneNumber,
      gender: data.gender || null,
    });
  };

  const emailValidation = {
    pattern: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: 'Ongeldig e-mailadres',
    },
  };

  return (
    <GlassyModal
      isOpen={isOpen}
      onClose={onClose}
      title='Pas contactinformatie aan'
      className='lg:max-w-3xl'
    >
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
        {/* First Name */}
        <div>
          <Label htmlFor='firstName' className='text-base font-medium mb-2'>
            Voornaam
          </Label>
          <Input
            id='firstName'
            {...register('firstName', {
              required: 'Voornaam is verplicht',
            })}
            type='text'
            className='w-full'
            placeholder='John'
          />
          {errors.firstName && (
            <p className='text-destructive text-sm mt-1'>
              {errors.firstName.message}
            </p>
          )}
        </div>
        {/* Last Name */}
        <div>
          <Label htmlFor='lastName' className='text-base font-medium mb-2'>
            Achternaam
          </Label>
          <Input
            id='lastName'
            {...register('lastName', {
              required: 'Achternaam is verplicht',
            })}
            type='text'
            className='w-full'
            placeholder='Doe'
          />
          {errors.lastName && (
            <p className='text-destructive text-sm mt-1'>
              {errors.lastName.message}
            </p>
          )}
        </div>
        {/* Phone Number */}
        <div>
          <Label htmlFor='phoneNumber' className='text-base font-medium mb-2'>
            Telefoonnummer
          </Label>
          <Input
            id='phoneNumber'
            {...register('phoneNumber', {
              required: 'Telefoonnummer is verplicht',
              pattern: {
                value:
                  /^[+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,9}$/,
                message: 'Ongeldig telefoonnummer',
              },
            })}
            type='tel'
            className='w-full'
            placeholder='+31 683 827 367'
          />
          {errors.phoneNumber && (
            <p className='text-destructive text-sm mt-1'>
              {errors.phoneNumber.message}
            </p>
          )}
        </div>
        {/* General Email (Read-only) */}
        <div>
          <Label htmlFor='generalEmail' className='text-base font-medium mb-2'>
            E-mailadres (algemeen)
          </Label>
          <Input
            id='generalEmail'
            value={contactInfo.generalEmail}
            type='email'
            className='w-full bg-black/10'
            placeholder='johndoe@gmail.com'
            disabled
            readOnly
          />
          <p className='text-muted-foreground text-xs mt-1'>
            Dit is je account e-mailadres en kan niet worden gewijzigd
          </p>
        </div>
        {/* Quotes Email */}
        {/* <div>
          <Label htmlFor='quotesEmail' className='text-base font-medium mb-2'>
            E-mailadres (offertesaanvragen)
          </Label>
          <Input
            id='quotesEmail'
            {...register('quotesEmail', emailValidation)}
            type='email'
            className='w-full'
            placeholder='johndoe@gmail.com'
          />
          {errors.quotesEmail && (
            <p className='text-destructive text-sm mt-1'>
              {errors.quotesEmail.message}
            </p>
          )}
        </div> */}

        {/* Invoices Email */}
        <div>
          <Label htmlFor='invoicesEmail' className='text-base font-medium mb-2'>
            E-mailadres (facturering)
          </Label>
          <Input
            id='invoicesEmail'
            {...register('invoicesEmail', emailValidation)}
            type='email'
            className='w-full'
            placeholder='johndoe@gmail.com'
          />
          {errors.invoicesEmail && (
            <p className='text-destructive text-sm mt-1'>
              {errors.invoicesEmail.message}
            </p>
          )}
        </div>
        
        {/* Gender */}
        <div>
          <Label htmlFor='gender' className='text-base font-medium mb-2'>
            Geslacht
          </Label>
          <Controller
            name='gender'
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger className='w-full' iconWidth={20} iconHeight={20}>
                  <SelectValue placeholder='Kies een optie' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='male'>Man</SelectItem>
                  <SelectItem value='female'>Vrouw</SelectItem>
                  {/* <SelectItem value='other'>Anders</SelectItem> */}
                  <SelectItem value='prefer_not_to_say'>Zeg ik liever niet</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          {errors.gender && (
            <p className='text-destructive text-sm mt-1'>
              {errors.gender.message}
            </p>
          )}
        </div>

        {/* Action Buttons */}
        <div className='flex justify-end gap-3 pt-2'>
          <Button
            type='button'
            variant='outline'
            onClick={onClose}
            disabled={updateProfileMutation.isPending}
            className='border-gray-200 rounded-xl shadow-2xl lg:text-xl'
            size='default'
          >
            Annuleren
          </Button>
          <Button
            type='submit'
            disabled={updateProfileMutation.isPending}
            className='rounded-xl lg:text-xl'
            size='default'
          >
            {updateProfileMutation.isPending ? 'Opslaan...' : 'Opslaan'}
          </Button>
        </div>
      </form>
    </GlassyModal>
  );
}
