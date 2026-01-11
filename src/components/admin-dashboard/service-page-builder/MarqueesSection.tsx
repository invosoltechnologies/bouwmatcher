'use client';

import { useState, useEffect } from 'react';
import { useLocale } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { ChevronDown, ChevronUp, Trash2, Plus } from 'lucide-react';
import { MultiSelect } from '@/components/ui/multi-select';
import {
  useSaveServicePageMarquees,
  useServicePageMarquees,
} from '@/lib/hooks/admin/service-page-marquees';
import { ServicePageMarqueeDTO } from '@/lib/api/admin/service-page-marquees.api';

const SECTION_OPTIONS = [
  { label: 'Banner', value: 'banner' },
  { label: 'Intro', value: 'intro' },
  { label: 'FAQ', value: 'faq' },
  { label: 'Comparison Table', value: 'comparison_table' },
  { label: 'Tips', value: 'tips' },
  { label: 'Overview Table', value: 'overview_table' },
  { label: 'SEO Content', value: 'seo_content' },
  { label: 'Process', value: 'process' },
  { label: 'Values', value: 'values' },
  { label: 'CTA', value: 'cta' },
  { label: 'Types', value: 'types' },
  { label: 'Reviews', value: 'reviews' },
];

interface MarqueeItem {
  text_nl: string;
  text_en: string;
  display_order: number;
}

interface MarqueesSectionProps {
  servicePageId: string;
  initialData?: ServicePageMarqueeDTO | null;
}

export default function MarqueesSection({
  servicePageId,
  initialData,
}: MarqueesSectionProps) {
  const locale = useLocale();
  const [isExpanded, setIsExpanded] = useState(false);

  // Section fields
  const [isEnabled, setIsEnabled] = useState(initialData?.is_enabled ?? true);
  const [afterSections, setAfterSections] = useState<string[]>(
    initialData?.after_sections || []
  );
  const [items, setItems] = useState<MarqueeItem[]>([]);

  const saveMutation = useSaveServicePageMarquees();

  // Initialize items
  useEffect(() => {
    if (initialData?.items && initialData.items.length > 0) {
      const mappedItems = initialData.items.map((item) => ({
        text_nl: item.text_nl,
        text_en: item.text_en,
        display_order: item.display_order,
      }));
      setItems(mappedItems);
      setIsEnabled(initialData.is_enabled ?? true);
      setAfterSections(initialData.after_sections || []);
    } else {
      // Initialize with 3 empty items
      setItems(
        Array.from({ length: 3 }, (_, i) => ({
          text_nl: '',
          text_en: '',
          display_order: i,
        }))
      );
    }
  }, [initialData]);

  const handleAddItem = () => {
    if (items.length < 6) {
      setItems([
        ...items,
        {
          text_nl: '',
          text_en: '',
          display_order: items.length,
        },
      ]);
    }
  };

  const handleDeleteItem = (index: number) => {
    if (items.length > 3) {
      setItems(items.filter((_, i) => i !== index).map((item, i) => ({ ...item, display_order: i })));
    }
  };

  const handleItemChange = (index: number, field: 'text_nl' | 'text_en', value: string) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: value };
    setItems(newItems);
  };

  const handleSave = async () => {
    // Validate items count
    if (items.length < 3 || items.length > 6) {
      alert(
        locale === 'nl'
          ? 'Marquee moet tussen 3 en 6 items hebben'
          : 'Marquee must have between 3 and 6 items'
      );
      return;
    }

    // Validate all items have text
    const allItemsValid = items.every((item) => item.text_nl && item.text_en);
    if (!allItemsValid) {
      alert(
        locale === 'nl'
          ? 'Alle items moeten Nederlandse en Engelse tekst hebben'
          : 'All items must have Dutch and English text'
      );
      return;
    }

    // Validate after sections are selected
    if (afterSections.length === 0) {
      alert(
        locale === 'nl'
          ? 'Selecteer minstens één sectie voor "Na Sectie"'
          : 'Select at least one section for "After Section"'
      );
      return;
    }

    try {
      await saveMutation.mutateAsync({
        servicePageId,
        isEnabled,
        afterSections,
        items: items.map((item) => ({
          text_nl: item.text_nl,
          text_en: item.text_en,
          display_order: item.display_order,
        })),
      });
    } catch (error) {
      console.error('Error saving Marquees section:', error);
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
          {locale === 'nl' ? 'Marquee Sectie' : 'Marquee Section'}
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
          {/* Enable/Disable Toggle */}
          <div className='flex items-center gap-4'>
            <label className='flex items-center gap-2 cursor-pointer'>
              <input
                type='checkbox'
                checked={isEnabled}
                onChange={(e) => setIsEnabled(e.target.checked)}
                className='w-4 h-4'
              />
              <span className='text-sm font-medium text-slate-900'>
                {locale === 'nl' ? 'Marquee inschakelen' : 'Enable Marquee'}
              </span>
            </label>
          </div>

          {/* After Section Multi-Select */}
          <div className='space-y-2'>
            <label className='block text-sm font-medium text-slate-900'>
              {locale === 'nl' ? 'Na Sectie:' : 'After Section:'}
            </label>
            <MultiSelect
              options={SECTION_OPTIONS}
              onValueChange={setAfterSections}
              defaultValue={afterSections}
              placeholder={
                locale === 'nl'
                  ? 'Selecteer secties...'
                  : 'Select sections...'
              }
              modalPopover={false}
            />
            <p className='text-xs text-slate-500'>
              {locale === 'nl'
                ? 'Selecteer na welke secties de marquee moet verschijnen'
                : 'Select after which sections the marquee should appear'}
            </p>
          </div>

          {/* Items Section */}
          <div className='space-y-4'>
            <div className='flex items-center justify-between'>
              <h4 className='font-semibold text-slate-900'>
                {locale === 'nl' ? 'Marquee Items' : 'Marquee Items'}
                <span className='text-sm font-normal text-slate-600 ml-2'>
                  ({items.length}/6)
                </span>
              </h4>
            </div>

            {items.map((item, index) => (
              <div
                key={index}
                className='grid grid-cols-2 gap-6 p-4 bg-white rounded-lg border border-slate-200'
              >
                {/* Dutch (NL) */}
                <div className='space-y-2'>
                  <label className='block text-sm font-medium text-slate-900'>
                    Nederlands (NL)
                  </label>
                  <Input
                    placeholder='Voer tekst in...'
                    value={item.text_nl}
                    onChange={(e) =>
                      handleItemChange(index, 'text_nl', e.target.value.slice(0, 255))
                    }
                    className='bg-slate-50 border-slate-300'
                    maxLength={255}
                  />
                  <p className='text-xs text-slate-500'>
                    {item.text_nl.length}/255
                  </p>
                </div>

                {/* English (EN) */}
                <div className='space-y-2'>
                  <label className='block text-sm font-medium text-slate-900'>
                    English (EN)
                  </label>
                  <Input
                    placeholder='Enter text...'
                    value={item.text_en}
                    onChange={(e) =>
                      handleItemChange(index, 'text_en', e.target.value.slice(0, 255))
                    }
                    className='bg-slate-50 border-slate-300'
                    maxLength={255}
                  />
                  <p className='text-xs text-slate-500'>
                    {item.text_en.length}/255
                  </p>
                </div>

                {/* Delete Button */}
                {items.length > 3 && (
                  <div className='col-span-2 flex justify-end'>
                    <Button
                      variant='ghost'
                      size='sm'
                      onClick={() => handleDeleteItem(index)}
                      className='text-red-600 hover:text-red-700 hover:bg-red-50'
                    >
                      <Trash2 className='w-4 h-4 mr-2' />
                      {locale === 'nl' ? 'Verwijderen' : 'Delete'}
                    </Button>
                  </div>
                )}
              </div>
            ))}

            {/* Add Item Button */}
            {items.length < 6 && (
              <Button
                onClick={handleAddItem}
              >
                <Plus className='w-4 h-4 mr-2' />
                {locale === 'nl' ? 'Item toevoegen' : 'Add Item'}
              </Button>
            )}
          </div>

          {/* Save Button */}
          <div className='flex justify-end pt-4 border-t border-slate-200'>
            <Button
              onClick={handleSave}
              disabled={
                saveMutation.isPending ||
                items.length < 3 ||
                items.length > 6 ||
                !items.every((item) => item.text_nl && item.text_en) ||
                afterSections.length === 0
              }
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
