'use client';

import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import GlassyModal from '@/components/ui/glassy-modal';
import type { CompanyInfoData } from '@/lib/types/account';

interface EditCompanyModalProps {
  isOpen: boolean;
  onClose: () => void;
  companyInfo: CompanyInfoData;
  onSuccess: () => void;
}

interface CompanyFormData {
  companyName: string;
  address: string;
  postalCode: string;
  city: string;
  website: string;
  businessId: string;
}

export default function EditCompanyModal({
  isOpen,
  onClose,
  companyInfo,
  onSuccess,
}: EditCompanyModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CompanyFormData>({
    defaultValues: {
      companyName: companyInfo.companyName,
      address: companyInfo.address,
      postalCode: companyInfo.postalCode,
      city: companyInfo.city,
      website: companyInfo.website,
      businessId: companyInfo.businessId,
    },
  });

  const onSubmit = async (data: CompanyFormData) => {
    try {
      const response = await fetch('/api/account/company', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to update company info');
      }

      toast.success('Bedrijfsgegevens succesvol bijgewerkt');
      onSuccess();
      onClose();
    } catch (error) {
      console.error('Error updating company info:', error);
      toast.error(
        error instanceof Error
          ? error.message
          : 'Kon bedrijfsgegevens niet bijwerken'
      );
    }
  };

  return (
    <GlassyModal
      isOpen={isOpen}
      onClose={onClose}
      title='Pas bedrijfsinformatie aan'
      className='lg:max-w-3xl'
    >
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
        {/* Company Name */}
        <div>
          <Label htmlFor='companyName' className='text-base font-medium mb-2'>
            Bedrijfsnaam
          </Label>
          <Input
            id='companyName'
            {...register('companyName', {
              required: 'Bedrijfsnaam is verplicht',
            })}
            type='text'
            className='w-full bg-black/10'
            placeholder='Hotspot Amsterdam Noord'
            disabled
          />
          {errors.companyName && (
            <p className='text-destructive text-sm mt-1'>
              {errors.companyName.message}
            </p>
          )}
        </div>

        {/* Address */}
        <div>
          <Label htmlFor='address' className='text-base font-medium mb-2'>
            Adres
          </Label>
          <Input
            id='address'
            {...register('address', {
              required: 'Adres is verplicht',
            })}
            type='text'
            className='w-full'
            placeholder='Klaprozenweg 24'
          />
          {errors.address && (
            <p className='text-destructive text-sm mt-1'>
              {errors.address.message}
            </p>
          )}
        </div>

        {/* Postal Code */}
        <div>
          <Label htmlFor='postalCode' className='text-base font-medium mb-2'>
            Postcode
          </Label>
          <Input
            id='postalCode'
            {...register('postalCode', {
              required: 'Postcode is verplicht',
              pattern: {
                value: /^[1-9][0-9]{3}\s?[A-Z]{2}$/i,
                message: 'Ongeldig postcode formaat',
              },
            })}
            type='text'
            className='w-full'
            placeholder='270475'
          />
          {errors.postalCode && (
            <p className='text-destructive text-sm mt-1'>
              {errors.postalCode.message}
            </p>
          )}
        </div>

        {/* City */}
        <div>
          <Label htmlFor='city' className='text-base font-medium mb-2'>
            Plaats
          </Label>
          <Input
            id='city'
            {...register('city', {
              required: 'Plaats is verplicht',
            })}
            type='text'
            className='w-full'
            placeholder='Amsterdam'
          />
          {errors.city && (
            <p className='text-destructive text-sm mt-1'>
              {errors.city.message}
            </p>
          )}
        </div>

        {/* Website */}
        <div>
          <Label htmlFor='website' className='text-base font-medium mb-2'>
            Website
          </Label>
          <Input
            id='website'
            {...register('website')}
            type='text'
            className='w-full'
          />
          {errors.website && (
            <p className='text-destructive text-sm mt-1'>
              {errors.website.message}
            </p>
          )}
        </div>

        {/* Business ID (optional) */}
        <div>
          <Label htmlFor='businessId' className='text-base font-medium mb-2'>
            Bedrijfs ID (optioneel)
          </Label>
          <Input
            id='businessId'
            {...register('businessId')}
            type='text'
            className='w-full'
            placeholder='23726432'
          />
          {errors.businessId && (
            <p className='text-destructive text-sm mt-1'>
              {errors.businessId.message}
            </p>
          )}
        </div>

        {/* Action Buttons */}
        <div className='flex justify-end gap-3 pt-2'>
          <Button
            type='button'
            variant='outline'
            onClick={onClose}
            disabled={isSubmitting}
            className='border-gray-200 rounded-xl shadow-2xl lg:text-xl'
            size='default'
          >
            Annuleren
          </Button>
          <Button
            type='submit'
            disabled={isSubmitting}
            className='rounded-xl lg:text-xl'
            size='default'
          >
            {isSubmitting ? 'Opslaan...' : 'Opslaan'}
          </Button>
        </div>
      </form>
    </GlassyModal>
  );
}
