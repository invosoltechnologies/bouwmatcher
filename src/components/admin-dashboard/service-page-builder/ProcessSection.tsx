'use client';

import { useState, useEffect } from 'react';
import { useLocale } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { ChevronDown, ChevronUp, Trash2, Upload } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import {
  useSaveServicePageProcess,
  useUploadProcessImage,
  useUploadProcessIcon,
} from '@/lib/hooks/admin/service-page-process';
import {
  ServicePageProcessDTO,
  ServicePageProcessStepDTO,
  SaveProcessStepDTO,
} from '@/lib/api/admin/service-page-process.api';

interface ProcessSectionProps {
  servicePageId: string;
  initialData?: ServicePageProcessDTO | null;
}

export default function ProcessSection({
  servicePageId,
  initialData,
}: ProcessSectionProps) {
  const locale = useLocale();
  const [isExpanded, setIsExpanded] = useState(false);

  // Section fields
  const [headingNl, setHeadingNl] = useState(initialData?.heading_nl || '');
  const [headingEn, setHeadingEn] = useState(initialData?.heading_en || '');
  const [descriptionNl, setDescriptionNl] = useState(initialData?.description_nl || '');
  const [descriptionEn, setDescriptionEn] = useState(initialData?.description_en || '');
  const [steps, setSteps] = useState<SaveProcessStepDTO[]>([]);
  const [uploadingStepId, setUploadingStepId] = useState<string | null>(null);

  const saveMutation = useSaveServicePageProcess();
  const uploadImageMutation = useUploadProcessImage();
  const uploadIconMutation = useUploadProcessIcon();

  // Initialize steps
  useEffect(() => {
    if (initialData) {
      setHeadingNl(initialData.heading_nl || '');
      setHeadingEn(initialData.heading_en || '');
      setDescriptionNl(initialData.description_nl || '');
      setDescriptionEn(initialData.description_en || '');
      const mappedSteps = initialData.steps.map((step) => ({
        id: step.id,
        heading_nl: step.heading_nl,
        heading_en: step.heading_en,
        description_nl: step.description_nl,
        description_en: step.description_en,
        image_url: step.image_url,
        icon_url: step.icon_url,
        step_order: step.step_order,
      }));
      setSteps(mappedSteps);
    } else {
      // Initialize with 4 empty steps
      setSteps(
        Array.from({ length: 4 }, (_, i) => ({
          heading_nl: '',
          heading_en: '',
          description_nl: '',
          description_en: '',
          image_url: null,
          icon_url: null,
          step_order: i,
        }))
      );
    }
  }, [initialData]);

  const handleAddStep = () => {
    if (steps.length < 8) {
      setSteps([
        ...steps,
        {
          heading_nl: '',
          heading_en: '',
          description_nl: '',
          description_en: '',
          image_url: null,
          icon_url: null,
          step_order: steps.length,
        },
      ]);
    }
  };

  const handleDeleteStep = (index: number) => {
    if (steps.length > 4) {
      setSteps(steps.filter((_, i) => i !== index).map((s, i) => ({ ...s, step_order: i })));
    }
  };

  const handleStepChange = (index: number, field: string, value: any) => {
    const newSteps = [...steps];
    newSteps[index] = { ...newSteps[index], [field]: value };
    setSteps(newSteps);
  };

  const handleImageUpload = async (index: number, file: File) => {
    try {
      setUploadingStepId(`image-${index}`);
      const result = await uploadImageMutation.mutateAsync({ file });
      handleStepChange(index, 'image_url', result.url);
    } catch (error) {
      console.error('Image upload error:', error);
    } finally {
      setUploadingStepId(null);
    }
  };

  const handleIconUpload = async (index: number, file: File) => {
    try {
      setUploadingStepId(`icon-${index}`);
      const result = await uploadIconMutation.mutateAsync({ file });
      handleStepChange(index, 'icon_url', result.url);
    } catch (error) {
      console.error('Icon upload error:', error);
    } finally {
      setUploadingStepId(null);
    }
  };

  const handleSave = async () => {
    try {
      await saveMutation.mutateAsync({
        servicePageId,
        headingNl,
        headingEn,
        descriptionNl,
        descriptionEn,
        steps,
      });
    } catch (error) {
      console.error('Error saving process section:', error);
    }
  };

  return (
    <Card className='py-0 border border-slate-200 rounded-lg overflow-hidden'>
      {/* Header - Collapsible */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className='w-full flex items-center justify-between p-4 hover:bg-slate-50 transition-colors'
      >
        <h3 className='text-lg font-semibold text-slate-900'>
          {locale === 'nl' ? 'Proces Sectie' : 'Process Section'}
        </h3>
        {isExpanded ? (
          <ChevronUp className='w-5 h-5 text-slate-600' />
        ) : (
          <ChevronDown className='w-5 h-5 text-slate-600' />
        )}
      </button>

      {/* Content - Expandable */}
      {isExpanded && (
        <div className='border-t border-slate-200 p-6 space-y-6 bg-slate-50'>
          {/* Section Header */}
          <div className='grid grid-cols-2 gap-6'>
            {/* Dutch (NL) */}
            <div className='space-y-4 p-4 bg-white rounded-lg border border-slate-200'>
              <h4 className='font-semibold text-slate-900 text-sm uppercase tracking-wide'>
                Nederlands (NL)
              </h4>

              <div className='space-y-2'>
                <label className='block text-sm font-medium text-slate-900'>
                  {locale === 'nl' ? 'Hoofdtitel' : 'Heading'}
                </label>
                <Input
                  placeholder='bijv. Hoe werkt Bouwmatcher'
                  value={headingNl}
                  onChange={(e) => setHeadingNl(e.target.value)}
                  className='bg-slate-50 border-slate-300'
                  maxLength={100}
                />
                <p className='text-xs text-slate-500'>{headingNl.length}/100</p>
              </div>

              <div className='space-y-2'>
                <label className='block text-sm font-medium text-slate-900'>
                  {locale === 'nl' ? 'Beschrijving' : 'Description'}
                </label>
                <Textarea
                  placeholder='Optionele beschrijving...'
                  value={descriptionNl}
                  onChange={(e) => setDescriptionNl(e.target.value)}
                  className='bg-slate-50 border-slate-300 min-h-[80px]'
                  maxLength={500}
                />
                <p className='text-xs text-slate-500'>{descriptionNl.length}/500</p>
              </div>
            </div>

            {/* English (EN) */}
            <div className='space-y-4 p-4 bg-white rounded-lg border border-slate-200'>
              <h4 className='font-semibold text-slate-900 text-sm uppercase tracking-wide'>
                English (EN)
              </h4>

              <div className='space-y-2'>
                <label className='block text-sm font-medium text-slate-900'>
                  {locale === 'nl' ? 'Hoofdtitel' : 'Heading'}
                </label>
                <Input
                  placeholder='e.g. How Bouwmatcher Works'
                  value={headingEn}
                  onChange={(e) => setHeadingEn(e.target.value)}
                  className='bg-slate-50 border-slate-300'
                  maxLength={100}
                />
                <p className='text-xs text-slate-500'>{headingEn.length}/100</p>
              </div>

              <div className='space-y-2'>
                <label className='block text-sm font-medium text-slate-900'>
                  {locale === 'nl' ? 'Beschrijving' : 'Description'}
                </label>
                <Textarea
                  placeholder='Optional description...'
                  value={descriptionEn}
                  onChange={(e) => setDescriptionEn(e.target.value)}
                  className='bg-slate-50 border-slate-300 min-h-[80px]'
                  maxLength={500}
                />
                <p className='text-xs text-slate-500'>{descriptionEn.length}/500</p>
              </div>
            </div>
          </div>

          {/* Process Steps */}
          <div className='space-y-4'>
            <div className='flex items-center justify-between'>
              <h4 className='font-semibold text-slate-900'>
                {locale === 'nl' ? 'Processtappen' : 'Process Steps'}
                <span className='text-sm font-normal text-slate-500 ml-2'>
                  ({steps.length}/8)
                </span>
              </h4>
              <Button
                onClick={handleAddStep}
                disabled={steps.length >= 8}
                variant='outline'
                size='sm'
              >
                {locale === 'nl' ? 'Stap Toevoegen' : 'Add Step'}
              </Button>
            </div>

            {/* Steps List */}
            <div className='space-y-4'>
              {steps.map((step, index) => (
                <div
                  key={index}
                  className='p-4 bg-white rounded-lg border border-slate-200 space-y-4'
                >
                  {/* Step Number */}
                  <div className='flex items-center justify-between'>
                    <h5 className='font-semibold text-slate-900'>
                      {locale === 'nl' ? 'Stap' : 'Step'} {index + 1}
                    </h5>
                    <Button
                      onClick={() => handleDeleteStep(index)}
                      disabled={steps.length <= 4}
                      variant='ghost'
                      size='sm'
                      className='text-red-600 hover:text-red-700'
                    >
                      <Trash2 className='w-4 h-4' />
                    </Button>
                  </div>

                  {/* Two Column Layout NL/EN */}
                  <div className='grid grid-cols-2 gap-4'>
                    {/* Dutch (NL) */}
                    <div className='space-y-3'>
                      <div className='space-y-2'>
                        <label className='block text-sm font-medium text-slate-900'>
                          {locale === 'nl' ? 'Titel (NL)' : 'Title (NL)'}
                        </label>
                        <Input
                          placeholder='bijv. Beschrijf je project'
                          value={step.heading_nl}
                          onChange={(e) => handleStepChange(index, 'heading_nl', e.target.value)}
                          className='bg-slate-50 border-slate-300'
                          maxLength={80}
                        />
                        <p className='text-xs text-slate-500'>{step.heading_nl.length}/80</p>
                      </div>

                      <div className='space-y-2'>
                        <label className='block text-sm font-medium text-slate-900'>
                          {locale === 'nl' ? 'Beschrijving (NL)' : 'Description (NL)'}
                        </label>
                        <Textarea
                          placeholder='Voer beschrijving in...'
                          value={step.description_nl}
                          onChange={(e) => handleStepChange(index, 'description_nl', e.target.value)}
                          className='bg-slate-50 border-slate-300 min-h-[60px]'
                          maxLength={300}
                        />
                        <p className='text-xs text-slate-500'>{step.description_nl.length}/300</p>
                      </div>
                    </div>

                    {/* English (EN) */}
                    <div className='space-y-3'>
                      <div className='space-y-2'>
                        <label className='block text-sm font-medium text-slate-900'>
                          {locale === 'nl' ? 'Titel (EN)' : 'Title (EN)'}
                        </label>
                        <Input
                          placeholder='e.g. Describe your project'
                          value={step.heading_en}
                          onChange={(e) => handleStepChange(index, 'heading_en', e.target.value)}
                          className='bg-slate-50 border-slate-300'
                          maxLength={80}
                        />
                        <p className='text-xs text-slate-500'>{step.heading_en.length}/80</p>
                      </div>

                      <div className='space-y-2'>
                        <label className='block text-sm font-medium text-slate-900'>
                          {locale === 'nl' ? 'Beschrijving (EN)' : 'Description (EN)'}
                        </label>
                        <Textarea
                          placeholder='Enter description...'
                          value={step.description_en}
                          onChange={(e) => handleStepChange(index, 'description_en', e.target.value)}
                          className='bg-slate-50 border-slate-300 min-h-[60px]'
                          maxLength={300}
                        />
                        <p className='text-xs text-slate-500'>{step.description_en.length}/300</p>
                      </div>
                    </div>
                  </div>

                  {/* Image and Icon Upload */}
                  <div className='grid grid-cols-2 gap-4 pt-2 border-t border-slate-200'>
                    {/* Image Upload */}
                    <div className='space-y-2'>
                      <label className='block text-sm font-medium text-slate-900'>
                        {locale === 'nl' ? 'Afbeelding' : 'Image'}
                      </label>
                      {step.image_url && (
                        <div className='relative w-full h-24 rounded-lg overflow-hidden border border-slate-300'>
                          <img
                            src={step.image_url}
                            alt='Step'
                            className='w-full h-full object-cover'
                          />
                        </div>
                      )}
                      <label className='cursor-pointer'>
                        <div className='flex items-center justify-center w-full px-3 py-2 border-2 border-dashed border-slate-300 rounded-lg hover:border-slate-400 transition-colors'>
                          <div className='flex flex-col items-center gap-1'>
                            <Upload className='w-4 h-4 text-slate-600' />
                            <span className='text-xs text-slate-600'>
                              {locale === 'nl' ? 'Upload' : 'Upload'}
                            </span>
                          </div>
                        </div>
                        <input
                          type='file'
                          accept='image/*'
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleImageUpload(index, file);
                          }}
                          disabled={uploadingStepId === `image-${index}`}
                          className='hidden'
                        />
                      </label>
                    </div>

                    {/* Icon Upload */}
                    <div className='space-y-2'>
                      <label className='block text-sm font-medium text-slate-900'>
                        {locale === 'nl' ? 'Pictogram' : 'Icon'}
                      </label>
                      {step.icon_url && (
                        <div className='relative w-full h-24 rounded-lg overflow-hidden border border-slate-300 bg-white flex items-center justify-center'>
                          <img
                            src={step.icon_url}
                            alt='Icon'
                            className='w-12 h-12'
                          />
                        </div>
                      )}
                      <label className='cursor-pointer'>
                        <div className='flex items-center justify-center w-full px-3 py-2 border-2 border-dashed border-slate-300 rounded-lg hover:border-slate-400 transition-colors'>
                          <div className='flex flex-col items-center gap-1'>
                            <Upload className='w-4 h-4 text-slate-600' />
                            <span className='text-xs text-slate-600'>
                              {locale === 'nl' ? 'Upload' : 'Upload'}
                            </span>
                          </div>
                        </div>
                        <input
                          type='file'
                          accept='image/*'
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleIconUpload(index, file);
                          }}
                          disabled={uploadingStepId === `icon-${index}`}
                          className='hidden'
                        />
                      </label>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Save Button */}
          <div className='flex justify-end pt-4 border-t border-slate-200'>
            <Button
              onClick={handleSave}
              disabled={saveMutation.isPending || steps.length < 4 || steps.length > 8}
              className='gap-2'
            >
              {saveMutation.isPending
                ? locale === 'nl'
                  ? 'Opslaan...'
                  : 'Saving...'
                : locale === 'nl'
                ? 'Opslaan'
                : 'Save'}
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
}
