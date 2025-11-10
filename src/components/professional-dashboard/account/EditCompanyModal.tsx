'use client';

import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
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
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Bedrijfsgegevens wijzigen</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Company Name */}
          <div>
            <label
              htmlFor="companyName"
              className="block text-sm font-medium text-secondary-foreground mb-1.5"
            >
              Bedrijfsnaam *
            </label>
            <Input
              id="companyName"
              {...register('companyName', {
                required: 'Bedrijfsnaam is verplicht',
              })}
              type="text"
              className="w-full"
            />
            {errors.companyName && (
              <p className="text-destructive text-sm mt-1">
                {errors.companyName.message}
              </p>
            )}
          </div>

          {/* Address */}
          <div>
            <label
              htmlFor="address"
              className="block text-sm font-medium text-secondary-foreground mb-1.5"
            >
              Adres *
            </label>
            <Input
              id="address"
              {...register('address', {
                required: 'Adres is verplicht',
              })}
              type="text"
              className="w-full"
            />
            {errors.address && (
              <p className="text-destructive text-sm mt-1">
                {errors.address.message}
              </p>
            )}
          </div>

          {/* Postal Code and City */}
          <div className="flex gap-4">
            <div className="flex-1">
              <label
                htmlFor="postalCode"
                className="block text-sm font-medium text-secondary-foreground mb-1.5"
              >
                Postcode *
              </label>
              <Input
                id="postalCode"
                {...register('postalCode', {
                  required: 'Postcode is verplicht',
                  pattern: {
                    value: /^[1-9][0-9]{3}\s?[A-Z]{2}$/i,
                    message: 'Ongeldig postcode formaat',
                  },
                })}
                type="text"
                className="w-full"
                placeholder="1234 AB"
              />
              {errors.postalCode && (
                <p className="text-destructive text-sm mt-1">
                  {errors.postalCode.message}
                </p>
              )}
            </div>

            <div className="flex-1">
              <label
                htmlFor="city"
                className="block text-sm font-medium text-secondary-foreground mb-1.5"
              >
                Plaats *
              </label>
              <Input
                id="city"
                {...register('city', {
                  required: 'Plaats is verplicht',
                })}
                type="text"
                className="w-full"
              />
              {errors.city && (
                <p className="text-destructive text-sm mt-1">
                  {errors.city.message}
                </p>
              )}
            </div>
          </div>

          {/* Website */}
          <div>
            <label
              htmlFor="website"
              className="block text-sm font-medium text-secondary-foreground mb-1.5"
            >
              Website
            </label>
            <Input
              id="website"
              {...register('website', {
                pattern: {
                  value: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/i,
                  message: 'Ongeldig website formaat',
                },
              })}
              type="text"
              className="w-full"
              placeholder="https://example.com"
            />
            {errors.website && (
              <p className="text-destructive text-sm mt-1">
                {errors.website.message}
              </p>
            )}
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Annuleren
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Opslaan...' : 'Opslaan'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
