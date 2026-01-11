'use client';

import { useState, useEffect } from 'react';
import { useLocale } from 'next-intl';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { SortableItem } from './SortableItem';
import { GripVertical } from 'lucide-react';

const SECTION_LABELS: Record<string, { nl: string; en: string }> = {
  banner: { nl: 'Banner', en: 'Banner' },
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

interface ReorderModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  sections: string[];
  onReorder: (order: string[]) => Promise<void>;
  isReordering: boolean;
}

export default function ReorderModal({
  open,
  onOpenChange,
  sections,
  onReorder,
  isReordering,
}: ReorderModalProps) {
  const locale = useLocale();
  const [items, setItems] = useState<string[]>(sections);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    setItems(sections);
  }, [sections, open]);

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.indexOf(active.id);
        const newIndex = items.indexOf(over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const handleSave = async () => {
    await onReorder(items);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-[500px]'>
        <DialogHeader>
          <DialogTitle>
            {locale === 'nl'
              ? 'Wijzig Sectie Volgorde'
              : 'Change Sections Order'}
          </DialogTitle>
          <DialogDescription>
            {locale === 'nl'
              ? 'Sleep secties om de volgorde te wijzigen. Banner blijft altijd bovenaan.'
              : 'Drag sections to change the order. Banner will always remain at the top.'}
          </DialogDescription>
        </DialogHeader>

        <div className='space-y-3 py-4'>
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={items}
              strategy={verticalListSortingStrategy}
            >
              <div className='space-y-2'>
                {items.map((sectionKey, index) => (
                  <div
                    key={sectionKey}
                    className='flex items-center gap-3 p-3 bg-white border border-slate-200 rounded-lg'
                  >
                    {index > 0 ? (
                      <SortableItem id={sectionKey}>
                        <GripVertical className='w-5 h-5 text-slate-400 cursor-grab active:cursor-grabbing' />
                      </SortableItem>
                    ) : (
                      <div className='w-5 h-5' />
                    )}

                    <span className='font-medium text-slate-900'>
                      {index + 1}.
                    </span>
                    <span className='flex-1 text-slate-700'>
                      {SECTION_LABELS[sectionKey as keyof typeof SECTION_LABELS]?.[locale as 'nl' | 'en'] || sectionKey}
                    </span>
                    {index === 0 && (
                      <span className='text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded'>
                        {locale === 'nl' ? 'Vast' : 'Fixed'}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </SortableContext>
          </DndContext>
        </div>

        <DialogFooter>
          <Button
            variant='outline'
            onClick={() => onOpenChange(false)}
            disabled={isReordering}
          >
            {locale === 'nl' ? 'Annuleren' : 'Cancel'}
          </Button>
          <Button
            onClick={handleSave}
            disabled={isReordering}
            className='gap-2'
          >
            {isReordering
              ? locale === 'nl'
                ? 'Opslaan...'
                : 'Saving...'
              : locale === 'nl'
              ? 'Opslaan'
              : 'Save'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
