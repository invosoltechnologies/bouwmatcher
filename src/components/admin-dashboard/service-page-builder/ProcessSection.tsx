'use client';

import { useState, useEffect } from 'react';
import { useLocale } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { ChevronDown, ChevronUp, Trash2, Upload, Plus, Loader2, Check } from 'lucide-react';
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
    <Card className='border py-0 border-slate-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow'>
      {/* Header - Collapsible */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className='w-full flex items-center justify-between p-5 hover:bg-gradient-to-r hover:from-slate-50 hover:to-white transition-all group'
      >
        <div className='flex items-center gap-3'>
          <div className='w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors'>
            <span className='text-lg'>🔄</span>
          </div>
          <h3 className='text-lg font-semibold text-slate-900'>
            {locale === 'nl' ? 'Proces Sectie' : 'Process Section'}
          </h3>
          {steps.length > 0 && (
            <span className='text-xs text-green-600 font-medium px-2 py-1 bg-green-50 rounded-full'>
              ✓ {steps.length} {locale === 'nl' ? 'stappen' : 'steps'}
            </span>
          )}
        </div>
        <div className='flex items-center gap-2'>
          {isExpanded ? (
            <ChevronUp className='w-5 h-5 text-slate-600 group-hover:text-primary transition-colors' />
          ) : (
            <ChevronDown className='w-5 h-5 text-slate-600 group-hover:text-primary transition-colors' />
          )}
        </div>
      </button>

      {/* Content - Expandable */}
      {isExpanded && (
        <div className='border-t border-slate-200 p-8 space-y-8 bg-gradient-to-b from-slate-50 to-white'>
          {/* Section Header */}
          <div className='grid grid-cols-2 gap-6'>
            {/* Dutch (NL) */}
            <div className='space-y-4 p-5 bg-white rounded-xl border-2 border-slate-200 shadow-sm hover:border-primary/50 transition-colors'>
              <div className='flex items-center gap-2 pb-3 border-b border-slate-100'>
                <span className='text-xl'>🇳🇱</span>
                <h4 className='font-semibold text-slate-900 text-sm uppercase tracking-wide'>
                  Nederlands (NL)
                </h4>
              </div>

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
            <div className='space-y-4 p-5 bg-white rounded-xl border-2 border-slate-200 shadow-sm hover:border-primary/50 transition-colors'>
              <div className='flex items-center gap-2 pb-3 border-b border-slate-100'>
                <span className='text-xl'>🇬🇧</span>
                <h4 className='font-semibold text-slate-900 text-sm uppercase tracking-wide'>
                  English (EN)
                </h4>
              </div>

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
          <div className='space-y-6 pt-6 border-t-2 border-slate-300'>
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-3'>
                <h4 className='text-lg font-semibold text-slate-900'>
                  {locale === 'nl' ? 'Processtappen' : 'Process Steps'}
                </h4>
                <span className='text-sm text-slate-600 font-medium px-3 py-1 bg-slate-100 rounded-full'>
                  {steps.length}/8
                </span>
              </div>
              <Button
                onClick={handleAddStep}
                disabled={steps.length >= 8}
                className='gap-2 px-4 py-2 shadow-sm hover:shadow-md transition-all'
                variant='outline'
              >
                <Plus className='w-4 h-4' />
                {locale === 'nl' ? 'Stap Toevoegen' : 'Add Step'}
              </Button>
            </div>

            {/* Steps List */}
            <div className='space-y-3'>
              {steps.map((step, index) => (
                <div
                  key={index}
                  className='p-4 bg-white rounded-lg border border-slate-200 hover:shadow-md hover:border-primary/50 transition-all space-y-4'
                >
                  {/* Step Number Header */}
                  <div className='flex items-start justify-between gap-3 mb-4'>
                    <div className='flex items-start gap-3'>
                      <div className='flex-shrink-0 w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center font-semibold text-sm text-slate-700'>
                        {index + 1}
                      </div>
                      <div>
                        <h5 className='font-semibold text-slate-900'>
                          {locale === 'nl' ? 'Stap' : 'Step'} {index + 1}
                        </h5>
                        <p className='text-xs text-slate-500 mt-0.5'>
                          {step.heading_nl && step.heading_en
                            ? `${step.heading_nl} / ${step.heading_en}`
                            : locale === 'nl'
                            ? 'Voer gegevens in'
                            : 'Enter details'}
                        </p>
                      </div>
                    </div>
                    <Button
                      onClick={() => handleDeleteStep(index)}
                      disabled={steps.length <= 4}
                      variant='ghost'
                      className='h-8 w-8 p-0 hover:bg-red-50'
                    >
                      <Trash2 className='w-4 h-4 text-red-600 hover:text-red-700' />
                    </Button>
                  </div>

                  {/* Two Column Layout NL/EN */}
                  <div className='grid grid-cols-2 gap-6'>
                    {/* Dutch (NL) */}
                    <div className='space-y-4'>
                      <div className='flex items-center gap-2 pb-3 border-b border-slate-100'>
                        <span className='text-xl'>🇳🇱</span>
                        <h5 className='font-semibold text-xs uppercase text-slate-700'>Nederlands (NL)</h5>
                      </div>
                      <div className='space-y-2'>
                        <label className='block text-sm font-medium text-slate-900'>
                          {locale === 'nl' ? 'Titel' : 'Title'}
                        </label>
                        <Input
                          placeholder='bijv. Beschrijf je project'
                          value={step.heading_nl}
                          onChange={(e) => handleStepChange(index, 'heading_nl', e.target.value)}
                          className='bg-white border-slate-300'
                          maxLength={80}
                        />
                        <p className='text-xs text-slate-500'>{step.heading_nl.length}/80</p>
                      </div>

                      <div className='space-y-2'>
                        <label className='block text-sm font-medium text-slate-900'>
                          {locale === 'nl' ? 'Beschrijving' : 'Description'}
                        </label>
                        <Textarea
                          placeholder='Voer beschrijving in...'
                          value={step.description_nl}
                          onChange={(e) => handleStepChange(index, 'description_nl', e.target.value)}
                          className='bg-white border-slate-300 min-h-[80px]'
                          maxLength={300}
                        />
                        <p className='text-xs text-slate-500'>{step.description_nl.length}/300</p>
                      </div>
                    </div>

                    {/* English (EN) */}
                    <div className='space-y-4'>
                      <div className='flex items-center gap-2 pb-3 border-b border-slate-100'>
                        <span className='text-xl'>🇬🇧</span>
                        <h5 className='font-semibold text-xs uppercase text-slate-700'>English (EN)</h5>
                      </div>
                      <div className='space-y-2'>
                        <label className='block text-sm font-medium text-slate-900'>
                          {locale === 'nl' ? 'Titel' : 'Title'}
                        </label>
                        <Input
                          placeholder='e.g. Describe your project'
                          value={step.heading_en}
                          onChange={(e) => handleStepChange(index, 'heading_en', e.target.value)}
                          className='bg-white border-slate-300'
                          maxLength={80}
                        />
                        <p className='text-xs text-slate-500'>{step.heading_en.length}/80</p>
                      </div>

                      <div className='space-y-2'>
                        <label className='block text-sm font-medium text-slate-900'>
                          {locale === 'nl' ? 'Beschrijving' : 'Description'}
                        </label>
                        <Textarea
                          placeholder='Enter description...'
                          value={step.description_en}
                          onChange={(e) => handleStepChange(index, 'description_en', e.target.value)}
                          className='bg-white border-slate-300 min-h-[80px]'
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
          <div className='flex justify-end pt-6 border-t-2 border-slate-200'>
            <Button
              onClick={handleSave}
              disabled={saveMutation.isPending || steps.length < 4 || steps.length > 8}
              className='gap-2 px-6 py-2.5 shadow-md hover:shadow-lg transition-all'
            >
              {saveMutation.isPending ? (
                <>
                  <Loader2 className='w-4 h-4 animate-spin' />
                  {locale === 'nl' ? 'Opslaan...' : 'Saving...'}
                </>
              ) : (
                <>
                  <Check className='w-4 h-4' />
                  {locale === 'nl' ? 'Opslaan' : 'Save'}
                </>
              )}
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
}
