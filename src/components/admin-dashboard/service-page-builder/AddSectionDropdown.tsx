'use client';

import { useState } from 'react';
import { useLocale } from 'next-intl';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Plus } from 'lucide-react';

const SECTION_LABELS: Record<string, { nl: string; en: string }> = {
  intro: { nl: 'Intro Sectie', en: 'Intro Section' },
  faq: { nl: 'FAQ Sectie', en: 'FAQ Section' },
  comparison_table: { nl: 'Vergelijkingtabel', en: 'Comparison Table' },
  tips: { nl: 'Tips Sectie', en: 'Tips Section' },
  overview_table: { nl: 'Overzichtstabel', en: 'Overview Table' },
  seo_content: { nl: 'SEO Inhoud', en: 'SEO Content' },
  process: { nl: 'Proces Sectie', en: 'Process Section' },
  values: { nl: 'Waarden Sectie', en: 'Values Section' },
  cta: { nl: 'CTA Sectie', en: 'CTA Section' },
  types: { nl: 'Types Sectie', en: 'Types Section' },
  reviews: { nl: 'Reviews Sectie', en: 'Reviews Section' },
  marquees: { nl: 'Marquee Sectie', en: 'Marquee Section' },
};

interface AddSectionDropdownProps {
  availableSections: string[];
  onAdd: (sectionKey: string) => Promise<void>;
  isAdding: boolean;
}

export default function AddSectionDropdown({
  availableSections,
  onAdd,
  isAdding,
}: AddSectionDropdownProps) {
  const locale = useLocale();
  const [selectedSection, setSelectedSection] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleAdd = async () => {
    if (!selectedSection) return;

    setIsProcessing(true);
    try {
      await onAdd(selectedSection);
      setSelectedSection('');
    } catch (error) {
      console.error('Error adding section:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className='bg-white rounded-lg border border-slate-200 p-6 space-y-4'>
      <h3 className='font-semibold text-slate-900'>
        {locale === 'nl' ? 'Voeg Sectie Toe' : 'Add New Section'}
      </h3>

      <div className='flex gap-4'>
        <div className='flex-1'>
          <Select value={selectedSection} onValueChange={setSelectedSection}>
            <SelectTrigger className='bg-slate-50 border-slate-300' iconWidth={14} iconHeight={14}>
              <SelectValue
                placeholder={
                  locale === 'nl'
                    ? 'Selecteer een sectie...'
                    : 'Select a section...'
                }
              />
            </SelectTrigger>
            <SelectContent>
              {availableSections.length === 0 ? (
                <div className='p-2 text-sm text-slate-600'>
                  {locale === 'nl'
                    ? 'Alle secties zijn al toegevoegd'
                    : 'All sections already added'}
                </div>
              ) : (
                availableSections.map((sectionKey) => (
                  <SelectItem key={sectionKey} value={sectionKey}>
                    {SECTION_LABELS[sectionKey as keyof typeof SECTION_LABELS]?.[locale as 'nl' | 'en'] || sectionKey}
                  </SelectItem>
                ))
              )}
            </SelectContent>
          </Select>
        </div>

        <Button
          onClick={handleAdd}
          disabled={!selectedSection || isProcessing || isAdding}
          className='gap-2'
        >
          <Plus className='w-4 h-4' />
          {isProcessing || isAdding
            ? locale === 'nl'
              ? 'Toevoegen...'
              : 'Adding...'
            : locale === 'nl'
            ? 'Toevoegen'
            : 'Add'}
        </Button>
      </div>
    </div>
  );
}
