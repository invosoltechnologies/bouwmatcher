'use client';

import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import GlassyModal from '@/components/ui/glassy-modal';
import { useUpdateCompany } from '@/lib/hooks/professional/account';
import type { CompanyInfoData } from '@/lib/types/account';

interface EditCompanyModalProps {
  isOpen: boolean;
  onClose: () => void;
  companyInfo: CompanyInfoData;
  roleInCompany?: string | null;
}

interface CompanyFormData {
  companyName: string;
  address: string;
  postalCode: string;
  city: string;
  website: string;
  businessId: string;
  businessEmail: string;
  businessPhone: string;
}

export default function EditCompanyModal({
  isOpen,
  onClose,
  companyInfo,
  roleInCompany,
}: EditCompanyModalProps) {
  const isOwner = roleInCompany === 'owner';

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CompanyFormData>({
    defaultValues: {
      companyName: companyInfo.companyName,
      address: companyInfo.address,
      postalCode: companyInfo.postalCode,
      city: companyInfo.city,
      website: companyInfo.website,
      businessId: companyInfo.businessId,
      businessEmail: companyInfo.businessEmail,
      businessPhone: companyInfo.businessPhone,
    },
  });

  const updateCompanyMutation = useUpdateCompany({
    onSuccess: () => {
      toast.success('Bedrijfsgegevens succesvol bijgewerkt');
      onClose();
    },
    onError: (error) => {
      toast.error(error.message || 'Kon bedrijfsgegevens niet bijwerken');
    },
  });

  const onSubmit = async (data: CompanyFormData) => {
    updateCompanyMutation.mutate({
      companyName: data.companyName,
      address: data.address,
      postalCode: data.postalCode,
      city: data.city,
      website: data.website || null,
      businessId: data.businessId || null,
      businessEmail: data.businessEmail || null,
      businessPhone: data.businessPhone || null,
    });
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
            disabled={!isOwner}
          />
          {errors.website && (
            <p className='text-destructive text-sm mt-1'>
              {errors.website.message}
            </p>
          )}
        </div>

        {/* Business Email (owner only) */}
        <div>
          <Label htmlFor='businessEmail' className='text-base font-medium mb-2'>
            Bedrijfs E-mail {!isOwner && '(alleen eigenaar kan bewerken)'}
          </Label>
          <Input
            id='businessEmail'
            {...register('businessEmail', {
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Ongeldig e-mailadres',
              },
            })}
            type='email'
            className='w-full'
            placeholder='info@bedrijf.nl'
            disabled={!isOwner}
          />
          {errors.businessEmail && (
            <p className='text-destructive text-sm mt-1'>
              {errors.businessEmail.message}
            </p>
          )}
        </div>

        {/* Business Phone (owner only) */}
        <div>
          <Label htmlFor='businessPhone' className='text-base font-medium mb-2'>
            Bedrijfs Telefoon {!isOwner && '(alleen eigenaar kan bewerken)'}
          </Label>
          <Input
            id='businessPhone'
            {...register('businessPhone')}
            type='tel'
            className='w-full'
            placeholder='+31 6 12345678'
            disabled={!isOwner}
          />
          {errors.businessPhone && (
            <p className='text-destructive text-sm mt-1'>
              {errors.businessPhone.message}
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
            disabled={updateCompanyMutation.isPending}
            className='border-gray-200 rounded-xl shadow-2xl lg:text-xl'
            size='default'
          >
            Annuleren
          </Button>
          <Button
            type='submit'
            disabled={updateCompanyMutation.isPending}
            className='rounded-xl lg:text-xl'
            size='default'
          >
            {updateCompanyMutation.isPending ? 'Opslaan...' : 'Opslaan'}
          </Button>
        </div>
      </form>
    </GlassyModal>
  );
}
