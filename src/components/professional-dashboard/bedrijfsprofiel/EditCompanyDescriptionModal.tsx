'use client';

import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import GlassyModal from '@/components/ui/glassy-modal';
import { useUpdateCompanyDescription } from '@/lib/hooks/professional/account';

interface EditCompanyDescriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentDescription: string;
}

interface DescriptionFormData {
  description: string;
}

const MAX_DESCRIPTION_LENGTH = 360;

export default function EditCompanyDescriptionModal({
  isOpen,
  onClose,
  currentDescription,
}: EditCompanyDescriptionModalProps) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<DescriptionFormData>({
    defaultValues: {
      description: currentDescription === '-' ? '' : currentDescription,
    },
  });

  const description = watch('description');
  const characterCount = description?.length || 0;

  const updateDescriptionMutation = useUpdateCompanyDescription({
    onSuccess: () => {
      toast.success('Bedrijfsomschrijving succesvol bijgewerkt');
      onClose();
    },
    onError: (error) => {
      toast.error(error.message || 'Kon bedrijfsomschrijving niet bijwerken');
    },
  });

  const onSubmit = async (data: DescriptionFormData) => {
    updateDescriptionMutation.mutate({
      description: data.description.trim(),
    });
  };

  return (
    <GlassyModal
      isOpen={isOpen}
      onClose={onClose}
      title='Pas bedrijfsomschrijving aan'
      className='lg:max-w-3xl'
    >
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
        {/* Description */}
        <div>
          <Label htmlFor='description' className='text-base font-medium mb-2'>
            Bedrijfsomschrijving
          </Label>
          <Textarea
            id='description'
            {...register('description', {
              maxLength: {
                value: MAX_DESCRIPTION_LENGTH,
                message: `Bedrijfsomschrijving mag maximaal ${MAX_DESCRIPTION_LENGTH} karakters bevatten`,
              },
            })}
            className='w-full min-h-32 resize-none'
            placeholder='Beschrijf uw bedrijf, diensten en specialiteiten...'
          />
          <div className='flex justify-between items-center mt-2'>
            {errors.description && (
              <p className='text-destructive text-sm'>
                {errors.description.message}
              </p>
            )}
            <p
              className={`text-sm ml-auto ${
                characterCount > MAX_DESCRIPTION_LENGTH
                  ? 'text-destructive'
                  : 'text-muted-foreground'
              }`}
            >
              {characterCount} / {MAX_DESCRIPTION_LENGTH}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className='flex justify-end gap-3 pt-2'>
          <Button
            type='button'
            variant='outline'
            onClick={onClose}
            disabled={updateDescriptionMutation.isPending}
            className='border-gray-200 rounded-xl shadow-2xl lg:text-xl'
            size='default'
          >
            Annuleren
          </Button>
          <Button
            type='submit'
            disabled={updateDescriptionMutation.isPending}
            className='rounded-xl lg:text-xl'
            size='default'
          >
            {updateDescriptionMutation.isPending ? 'Opslaan...' : 'Opslaan'}
          </Button>
        </div>
      </form>
    </GlassyModal>
  );
}
