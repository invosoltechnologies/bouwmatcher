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
import type { ContactInfoData } from '@/lib/types/account';

interface EditContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  contactInfo: ContactInfoData;
  onSuccess: () => void;
}

interface ContactFormData {
  contactPerson: string;
  quotesEmail: string;
  invoicesEmail: string;
  generalEmail: string;
  phoneNumber: string;
}

export default function EditContactModal({
  isOpen,
  onClose,
  contactInfo,
  onSuccess,
}: EditContactModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    defaultValues: {
      contactPerson: contactInfo.contactPerson,
      quotesEmail: contactInfo.quotesEmail,
      invoicesEmail: contactInfo.invoicesEmail,
      generalEmail: contactInfo.generalEmail,
      phoneNumber: contactInfo.phoneNumber,
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      const response = await fetch('/api/account/contact', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to update contact info');
      }

      toast.success('Contactgegevens succesvol bijgewerkt');
      onSuccess();
      onClose();
    } catch (error) {
      console.error('Error updating contact info:', error);
      toast.error(
        error instanceof Error
          ? error.message
          : 'Kon contactgegevens niet bijwerken'
      );
    }
  };

  const emailValidation = {
    required: 'E-mailadres is verplicht',
    pattern: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: 'Ongeldig e-mailadres',
    },
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Contactgegevens wijzigen</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Contact Person */}
          <div>
            <label
              htmlFor="contactPerson"
              className="block text-sm font-medium text-secondary-foreground mb-1.5"
            >
              Contactpersoon *
            </label>
            <Input
              id="contactPerson"
              {...register('contactPerson', {
                required: 'Contactpersoon is verplicht',
              })}
              type="text"
              className="w-full"
            />
            {errors.contactPerson && (
              <p className="text-destructive text-sm mt-1">
                {errors.contactPerson.message}
              </p>
            )}
          </div>

          {/* Quotes Email */}
          <div>
            <label
              htmlFor="quotesEmail"
              className="block text-sm font-medium text-secondary-foreground mb-1.5"
            >
              E-mailadres (offertesaanvragen) *
            </label>
            <Input
              id="quotesEmail"
              {...register('quotesEmail', emailValidation)}
              type="email"
              className="w-full"
            />
            {errors.quotesEmail && (
              <p className="text-destructive text-sm mt-1">
                {errors.quotesEmail.message}
              </p>
            )}
          </div>

          {/* Invoices Email */}
          <div>
            <label
              htmlFor="invoicesEmail"
              className="block text-sm font-medium text-secondary-foreground mb-1.5"
            >
              E-mailadres (facturering) *
            </label>
            <Input
              id="invoicesEmail"
              {...register('invoicesEmail', emailValidation)}
              type="email"
              className="w-full"
            />
            {errors.invoicesEmail && (
              <p className="text-destructive text-sm mt-1">
                {errors.invoicesEmail.message}
              </p>
            )}
          </div>

          {/* General Email */}
          <div>
            <label
              htmlFor="generalEmail"
              className="block text-sm font-medium text-secondary-foreground mb-1.5"
            >
              E-mailadres (algemeen) *
            </label>
            <Input
              id="generalEmail"
              {...register('generalEmail', emailValidation)}
              type="email"
              className="w-full"
            />
            {errors.generalEmail && (
              <p className="text-destructive text-sm mt-1">
                {errors.generalEmail.message}
              </p>
            )}
          </div>

          {/* Phone Number */}
          <div>
            <label
              htmlFor="phoneNumber"
              className="block text-sm font-medium text-secondary-foreground mb-1.5"
            >
              Telefoonnummer *
            </label>
            <Input
              id="phoneNumber"
              {...register('phoneNumber', {
                required: 'Telefoonnummer is verplicht',
                pattern: {
                  value: /^[+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,9}$/,
                  message: 'Ongeldig telefoonnummer',
                },
              })}
              type="tel"
              className="w-full"
              placeholder="+31 6 12345678"
            />
            {errors.phoneNumber && (
              <p className="text-destructive text-sm mt-1">
                {errors.phoneNumber.message}
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
