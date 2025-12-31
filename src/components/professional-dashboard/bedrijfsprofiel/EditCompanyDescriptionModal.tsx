'use client';

import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useTranslations } from 'next-intl';
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
  const t = useTranslations('common.proDashboard.bedrijfsprofiel.modals.editDescription');

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
      toast.success(t('success'));
      onClose();
    },
    onError: (error) => {
      toast.error(error.message || t('error'));
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
      title={t('title')}
      className='max-w-sm sm:max-w-md lg:max-w-3xl'
    >
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-3 sm:space-y-4 p-4 sm:p-6'>
        {/* Description */}
        <div>
          <Label htmlFor='description' className='text-sm sm:text-base font-medium mb-2'>
            {t('label')}
          </Label>
          <Textarea
            id='description'
            {...register('description', {
              maxLength: {
                value: MAX_DESCRIPTION_LENGTH,
                message: t('maxLengthError'),
              },
            })}
            className='w-full min-h-[100px] sm:min-h-32 resize-none text-sm sm:text-base'
            placeholder={t('placeholder')}
          />
          <div className='flex justify-between items-center mt-2'>
            {errors.description && (
              <p className='text-destructive text-xs sm:text-sm'>
                {errors.description.message}
              </p>
            )}
            <p
              className={`text-xs sm:text-sm ml-auto ${
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
        <div className='flex flex-col sm:flex-row justify-end gap-3 pt-2'>
          <Button
            type='button'
            variant='outline'
            onClick={onClose}
            disabled={updateDescriptionMutation.isPending}
            className='w-full sm:w-auto border-gray-200 rounded-xl shadow-2xl text-sm sm:text-base lg:text-xl py-2.5 sm:py-3 px-4 sm:px-6'
          >
            {t('cancel')}
          </Button>
          <Button
            type='submit'
            disabled={updateDescriptionMutation.isPending}
            className='w-full sm:w-auto rounded-xl text-sm sm:text-base lg:text-xl py-2.5 sm:py-3 px-4 sm:px-6'
          >
            {updateDescriptionMutation.isPending ? t('saving') : t('save')}
          </Button>
        </div>
      </form>
    </GlassyModal>
  );
}
