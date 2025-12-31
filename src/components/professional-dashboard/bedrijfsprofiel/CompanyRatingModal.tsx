'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useTranslations } from 'next-intl';
import GlassyModal from '@/components/ui/glassy-modal';
import { Rating, RatingButton } from '@/components/ui/shadcn-io/rating';
import { Trash2 } from 'lucide-react';
import {
  useCreateCompanyRating,
  useDeleteCompanyRating,
} from '@/lib/hooks/professional/ratings';
import type { CompanyRating } from '@/lib/types/account';

interface CompanyRatingModalProps {
  isOpen: boolean;
  onClose: () => void;
  companyId: string;
  existingRating?: CompanyRating | null;
}

interface RatingFormData {
  rating: number;
  reviewText: string;
}

export default function CompanyRatingModal({
  isOpen,
  onClose,
  companyId,
  existingRating,
}: CompanyRatingModalProps) {
  const t = useTranslations('common.proDashboard.bedrijfsprofiel.modals.rating');
  const [selectedRating, setSelectedRating] = useState<number>(
    existingRating?.rating || 0
  );

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<RatingFormData>({
    defaultValues: {
      rating: existingRating?.rating || 0,
      reviewText: existingRating?.review_text || '',
    },
  });

  const reviewText = watch('reviewText');

  // Update form when existingRating changes
  useEffect(() => {
    if (existingRating) {
      setSelectedRating(existingRating.rating);
      setValue('rating', existingRating.rating);
      setValue('reviewText', existingRating.review_text || '');
    } else {
      setSelectedRating(0);
      reset();
    }
  }, [existingRating, setValue, reset]);

  const createRatingMutation = useCreateCompanyRating({
    onSuccess: () => {
      toast.success(
        existingRating ? t('updateSuccess') : t('createSuccess')
      );
      onClose();
    },
    onError: (error) => {
      toast.error(error.message || t('saveError'));
    },
  });

  const deleteRatingMutation = useDeleteCompanyRating({
    onSuccess: () => {
      toast.success(t('deleteSuccess'));
      onClose();
    },
    onError: (error) => {
      toast.error(error.message || t('deleteError'));
    },
  });

  const handleRatingChange = (value: number) => {
    setSelectedRating(value);
    setValue('rating', value);
  };

  const onSubmit = async (data: RatingFormData) => {
    if (selectedRating === 0) {
      toast.error(t('validationError'));
      return;
    }

    createRatingMutation.mutate({
      companyId,
      rating: selectedRating,
      reviewText: data.reviewText.trim() || null,
      ratingId: existingRating?.id,
    });
  };

  const handleDelete = () => {
    if (!existingRating?.id) return;

    if (confirm(t('deleteConfirm'))) {
      deleteRatingMutation.mutate({
        companyId,
        ratingId: existingRating.id,
      });
    }
  };

  const isLoading =
    createRatingMutation.isPending || deleteRatingMutation.isPending;

  return (
    <GlassyModal
      isOpen={isOpen}
      onClose={onClose}
      title={existingRating ? t('titleEdit') : t('titleNew')}
      className='max-w-sm sm:max-w-md lg:max-w-2xl'
    >
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-4 sm:space-y-6 p-4 sm:p-6'>
        {/* Rating Stars */}
        <div>
          <Label className='text-sm sm:text-base font-medium mb-3 block'>
            {t('ratingLabel')}
          </Label>
          <div className='flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4'>
            <Rating
              value={selectedRating}
              onValueChange={handleRatingChange}
            >
              {Array.from({ length: 5 }).map((_, index) => (
                <RatingButton
                  key={index}
                  className='text-yellow-500'
                  size={window.innerWidth < 640 ? 28 : 32}
                />
              ))}
            </Rating>
            <span className='text-base sm:text-lg font-medium'>
              {selectedRating > 0 ? `${selectedRating} / 5` : t('ratingPlaceholder')}
            </span>
          </div>
        </div>

        {/* Review Text */}
        <div>
          <Label htmlFor='reviewText' className='text-sm sm:text-base font-medium mb-2'>
            {t('experienceLabel')}
          </Label>
          <Textarea
            id='reviewText'
            {...register('reviewText')}
            className='w-full min-h-[100px] sm:min-h-[120px] resize-none text-sm sm:text-base'
            placeholder={t('experiencePlaceholder')}
          />
          {reviewText && (
            <p className='text-xs sm:text-sm text-muted-foreground mt-2'>
              {reviewText.length} {t('characters')}
            </p>
          )}
          {errors.reviewText && (
            <p className='text-destructive text-xs sm:text-sm mt-1'>
              {errors.reviewText.message}
            </p>
          )}
        </div>

        {/* Info Message */}
        <div className='bg-blue-50 p-3 sm:p-4 rounded-lg'>
          <p className='text-xs sm:text-sm text-blue-900'>
            <strong>{t('infoTitle')}</strong> {t('infoDescription')}
          </p>
        </div>

        {/* Action Buttons */}
        <div className='flex flex-col sm:flex-row justify-between gap-3 pt-2'>
          {existingRating && (
            <Button
              type='button'
              variant='destructive'
              onClick={handleDelete}
              disabled={isLoading}
              className='w-full sm:w-auto rounded-xl py-2.5 sm:py-3 px-4 sm:px-6 text-sm sm:text-base'
            >
              <Trash2 className='w-4 h-4 sm:w-5 sm:h-5 mr-2' />
              {t('delete')}
            </Button>
          )}

          <div className='flex flex-col sm:flex-row gap-3 sm:ml-auto'>
            <Button
              type='button'
              variant='outline'
              onClick={onClose}
              disabled={isLoading}
              className='w-full sm:w-auto border-gray-200 rounded-xl shadow-2xl text-sm sm:text-base lg:text-xl py-2.5 sm:py-3 px-4 sm:px-6'
            >
              {t('cancel')}
            </Button>
            <Button
              type='submit'
              disabled={isLoading || selectedRating === 0}
              className='w-full sm:w-auto rounded-xl text-sm sm:text-base lg:text-xl py-2.5 sm:py-3 px-4 sm:px-6'
            >
              {isLoading
                ? t('saving')
                : existingRating
                  ? t('update')
                  : t('submit')}
            </Button>
          </div>
        </div>
      </form>
    </GlassyModal>
  );
}
