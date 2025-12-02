'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
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
        existingRating ? 'Review succesvol bijgewerkt' : 'Review succesvol toegevoegd'
      );
      onClose();
    },
    onError: (error) => {
      toast.error(error.message || 'Kon review niet opslaan');
    },
  });

  const deleteRatingMutation = useDeleteCompanyRating({
    onSuccess: () => {
      toast.success('Review succesvol verwijderd');
      onClose();
    },
    onError: (error) => {
      toast.error(error.message || 'Kon review niet verwijderen');
    },
  });

  const handleRatingChange = (value: number) => {
    setSelectedRating(value);
    setValue('rating', value);
  };

  const onSubmit = async (data: RatingFormData) => {
    if (selectedRating === 0) {
      toast.error('Selecteer een beoordeling');
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

    if (confirm('Weet je zeker dat je deze review wilt verwijderen?')) {
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
      title={existingRating ? 'Review bewerken' : 'Bedrijf beoordelen'}
      className='lg:max-w-2xl'
    >
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
        {/* Rating Stars */}
        <div>
          <Label className='text-base font-medium mb-3 block'>
            Beoordeling *
          </Label>
          <div className='flex items-center gap-4'>
            <Rating
              value={selectedRating}
              onValueChange={handleRatingChange}
            >
              {Array.from({ length: 5 }).map((_, index) => (
                <RatingButton
                  key={index}
                  className='text-yellow-500'
                  size={32}
                />
              ))}
            </Rating>
            <span className='text-lg font-medium'>
              {selectedRating > 0 ? `${selectedRating} / 5` : 'Selecteer beoordeling'}
            </span>
          </div>
        </div>

        {/* Review Text */}
        <div>
          <Label htmlFor='reviewText' className='text-base font-medium mb-2'>
            Uw ervaring (optioneel)
          </Label>
          <Textarea
            id='reviewText'
            {...register('reviewText')}
            className='w-full min-h-32 resize-none'
            placeholder='Deel uw ervaring met dit bedrijf...'
          />
          {reviewText && (
            <p className='text-sm text-muted-foreground mt-2'>
              {reviewText.length} karakters
            </p>
          )}
          {errors.reviewText && (
            <p className='text-destructive text-sm mt-1'>
              {errors.reviewText.message}
            </p>
          )}
        </div>

        {/* Info Message */}
        <div className='bg-blue-50 p-4 rounded-lg'>
          <p className='text-sm text-blue-900'>
            <strong>Let op:</strong> Uw beoordeling wordt gekoppeld aan uw
            profiel en is zichtbaar voor andere gebruikers.
          </p>
        </div>

        {/* Action Buttons */}
        <div className='flex justify-between gap-3 pt-2'>
          {existingRating && (
            <Button
              type='button'
              variant='destructive'
              onClick={handleDelete}
              disabled={isLoading}
              className='rounded-xl'
            >
              <Trash2 className='w-4 h-4 mr-2' />
              Verwijderen
            </Button>
          )}

          <div className='flex gap-3 ml-auto'>
            <Button
              type='button'
              variant='outline'
              onClick={onClose}
              disabled={isLoading}
              className='border-gray-200 rounded-xl shadow-2xl lg:text-xl'
              size='default'
            >
              Annuleren
            </Button>
            <Button
              type='submit'
              disabled={isLoading || selectedRating === 0}
              className='rounded-xl lg:text-xl'
              size='default'
            >
              {isLoading
                ? 'Opslaan...'
                : existingRating
                  ? 'Bijwerken'
                  : 'Review plaatsen'}
            </Button>
          </div>
        </div>
      </form>
    </GlassyModal>
  );
}
