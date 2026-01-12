'use client';

import { useState, useEffect } from 'react';
import { useLocale } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { ChevronDown, ChevronUp, Plus, Trash2, GripVertical, Edit2, X, Loader2, Check } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import {
  useSaveServicePageFaq,
  useCreateFaqItem,
  useUpdateFaqItem,
  useDeleteFaqItem,
  useServicePageFaqItems,
} from '@/lib/hooks/admin/service-page-faqs';
import { ServicePageFaqDTO, ServicePageFaqItemDTO } from '@/lib/api/admin/service-page-faqs.api';

interface FaqSectionProps {
  servicePageId: string;
  initialFaq?: ServicePageFaqDTO | null;
}

export default function FaqSection({
  servicePageId,
  initialFaq,
}: FaqSectionProps) {
  const locale = useLocale();
  const [isExpanded, setIsExpanded] = useState(false);

  // Section fields
  const [headingNl, setHeadingNl] = useState(initialFaq?.heading_nl || '');
  const [headingEn, setHeadingEn] = useState(initialFaq?.heading_en || '');
  const [descriptionNl, setDescriptionNl] = useState(initialFaq?.description_nl || '');
  const [descriptionEn, setDescriptionEn] = useState(initialFaq?.description_en || '');

  // FAQ items management
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [editingItemId, setEditingItemId] = useState<string | null>(null);

  const saveSectionMutation = useSaveServicePageFaq();
  const createItemMutation = useCreateFaqItem();
  const updateItemMutation = useUpdateFaqItem();
  const deleteItemMutation = useDeleteFaqItem();

  // Fetch FAQ items if FAQ section exists
  const { data: faqItems = [] } = useServicePageFaqItems(initialFaq?.id || null);

  useEffect(() => {
    if (initialFaq) {
      setHeadingNl(initialFaq.heading_nl || '');
      setHeadingEn(initialFaq.heading_en || '');
      setDescriptionNl(initialFaq.description_nl || '');
      setDescriptionEn(initialFaq.description_en || '');
    }
  }, [initialFaq]);

  const handleSaveSection = async () => {
    try {
      await saveSectionMutation.mutateAsync({
        servicePageId,
        headingNl,
        headingEn,
        descriptionNl,
        descriptionEn,
      });
    } catch (error) {
      console.error('Error saving FAQ section:', error);
    }
  };

  const handleAddNewItem = () => {
    setIsAddingNew(true);
    setEditingItemId(null);
  };

  const handleDeleteItem = async (itemId: string) => {
    if (window.confirm(locale === 'nl' ? 'Weet je zeker dat je deze vraag wilt verwijderen?' : 'Are you sure you want to delete this question?')) {
      await deleteItemMutation.mutateAsync(itemId);
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
            <span className='text-lg'>❓</span>
          </div>
          <h3 className='text-lg font-semibold text-slate-900'>
            {locale === 'nl' ? 'FAQ Sectie' : 'FAQ Section'}
          </h3>
          {faqItems.length > 0 && (
            <span className='text-xs text-blue-600 font-medium px-2 py-1 bg-blue-50 rounded-full'>
              {faqItems.length} {locale === 'nl' ? 'vragen' : 'questions'}
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
        <div className='border-t border-slate-200 p-6 space-y-8 bg-gradient-to-b from-slate-50 to-white'>
          {/* Section Header Fields */}
          <div className='grid grid-cols-2 gap-6'>
            {/* Dutch (NL) Column */}
            <div className='space-y-4 p-5 bg-white rounded-xl border-2 border-slate-200 shadow-sm hover:border-primary/50 transition-colors'>
              <div className='flex items-center gap-2 pb-3 border-b border-slate-100'>
                <span className='text-xl'>🇳🇱</span>
                <h4 className='font-semibold text-slate-900 text-sm uppercase tracking-wide'>
                  Nederlands (NL)
                </h4>
              </div>

              {/* Heading NL */}
              <div className='space-y-2'>
                <label className='block text-sm font-medium text-slate-900'>
                  {locale === 'nl' ? 'Hoofdtitel' : 'Heading'}
                </label>
                <Input
                  placeholder='bijv. Veelgestelde Vragen'
                  value={headingNl}
                  onChange={(e) => setHeadingNl(e.target.value)}
                  className='bg-slate-50 border-slate-300'
                  maxLength={100}
                />
                <p className='text-xs text-slate-500'>
                  {headingNl.length}/100
                </p>
              </div>

              {/* Description NL */}
              <div className='space-y-2'>
                <label className='block text-sm font-medium text-slate-900'>
                  {locale === 'nl' ? 'Beschrijving' : 'Description'}
                </label>
                <Textarea
                  placeholder='Optionele beschrijving voor de FAQ sectie...'
                  value={descriptionNl}
                  onChange={(e) => setDescriptionNl(e.target.value)}
                  className='bg-slate-50 border-slate-300 min-h-[80px]'
                  maxLength={500}
                />
                <p className='text-xs text-slate-500'>
                  {descriptionNl.length}/500
                </p>
              </div>
            </div>

            {/* English (EN) Column */}
            <div className='space-y-4 p-5 bg-white rounded-xl border-2 border-slate-200 shadow-sm hover:border-primary/50 transition-colors'>
              <div className='flex items-center gap-2 pb-3 border-b border-slate-100'>
                <span className='text-xl'>🇬🇧</span>
                <h4 className='font-semibold text-slate-900 text-sm uppercase tracking-wide'>
                  English (EN)
                </h4>
              </div>

              {/* Heading EN */}
              <div className='space-y-2'>
                <label className='block text-sm font-medium text-slate-900'>
                  {locale === 'nl' ? 'Hoofdtitel' : 'Heading'}
                </label>
                <Input
                  placeholder='e.g. Frequently Asked Questions'
                  value={headingEn}
                  onChange={(e) => setHeadingEn(e.target.value)}
                  className='bg-slate-50 border-slate-300'
                  maxLength={100}
                />
                <p className='text-xs text-slate-500'>
                  {headingEn.length}/100
                </p>
              </div>

              {/* Description EN */}
              <div className='space-y-2'>
                <label className='block text-sm font-medium text-slate-900'>
                  {locale === 'nl' ? 'Beschrijving' : 'Description'}
                </label>
                <Textarea
                  placeholder='Optional description for the FAQ section...'
                  value={descriptionEn}
                  onChange={(e) => setDescriptionEn(e.target.value)}
                  className='bg-slate-50 border-slate-300 min-h-[80px]'
                  maxLength={500}
                />
                <p className='text-xs text-slate-500'>
                  {descriptionEn.length}/500
                </p>
              </div>
            </div>
          </div>

          {/* Save Section Button */}
          <div className='flex justify-end pt-6 border-t-2 border-slate-200'>
            <Button
              onClick={handleSaveSection}
              disabled={saveSectionMutation.isPending}
              className='gap-2 px-6 py-2.5 shadow-md hover:shadow-lg transition-all'
            >
              {saveSectionMutation.isPending ? (
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

          {/* FAQ Items Section */}
          {initialFaq && (
            <div className='space-y-6 pt-6 border-t-2 border-slate-300'>
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-3'>
                  <h4 className='text-lg font-semibold text-slate-900'>
                    {locale === 'nl' ? 'FAQ Vragen' : 'FAQ Questions'}
                  </h4>
                  <span className='text-sm text-slate-600 font-medium px-3 py-1 bg-slate-100 rounded-full'>
                    {faqItems.length}/15
                  </span>
                </div>
                <Button
                  onClick={handleAddNewItem}
                  disabled={faqItems.length >= 15 || isAddingNew}
                  className='gap-2 px-4 py-2 shadow-sm hover:shadow-md transition-all'
                  variant='outline'
                >
                  <Plus className='w-4 h-4' />
                  {locale === 'nl' ? 'Vraag Toevoegen' : 'Add Question'}
                </Button>
              </div>

              {/* Add New Item Form */}
              {isAddingNew && (
                <FaqItemForm
                  faqId={initialFaq.id}
                  onSave={() => setIsAddingNew(false)}
                  onCancel={() => setIsAddingNew(false)}
                  locale={locale}
                />
              )}

              {/* Existing FAQ Items */}
              <div className='space-y-3'>
                {faqItems.map((item) => (
                  <FaqItem
                    key={item.id}
                    item={item}
                    isEditing={editingItemId === item.id}
                    onEdit={() => setEditingItemId(item.id)}
                    onCancelEdit={() => setEditingItemId(null)}
                    onDelete={() => handleDeleteItem(item.id)}
                    locale={locale}
                  />
                ))}

                {faqItems.length === 0 && !isAddingNew && (
                  <div className='text-center py-12 text-slate-500 bg-white rounded-lg border-2 border-dashed border-slate-300 hover:border-slate-400 transition-colors'>
                    <p className='text-sm'>
                      {locale === 'nl'
                        ? '🔰 Nog geen vragen toegevoegd. Klik op "Vraag Toevoegen" om te beginnen.'
                        : '🔰 No questions added yet. Click "Add Question" to get started.'}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {!initialFaq && (
            <div className='bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-800'>
              {locale === 'nl'
                ? 'Sla eerst de FAQ sectie op voordat je vragen kunt toevoegen.'
                : 'Save the FAQ section first before adding questions.'}
            </div>
          )}
        </div>
      )}
    </Card>
  );
}

// FAQ Item Component
function FaqItem({
  item,
  isEditing,
  onEdit,
  onCancelEdit,
  onDelete,
  locale,
}: {
  item: ServicePageFaqItemDTO;
  isEditing: boolean;
  onEdit: () => void;
  onCancelEdit: () => void;
  onDelete: () => void;
  locale: string;
}) {
  const updateItemMutation = useUpdateFaqItem();

  const [questionNl, setQuestionNl] = useState(item.question_nl);
  const [questionEn, setQuestionEn] = useState(item.question_en);
  const [answerNl, setAnswerNl] = useState(item.answer_nl);
  const [answerEn, setAnswerEn] = useState(item.answer_en);

  const handleSave = async () => {
    if (!questionNl.trim() || !questionEn.trim() || !answerNl.trim() || !answerEn.trim()) {
      alert(locale === 'nl' ? 'Vul alle velden in' : 'Please fill all fields');
      return;
    }

    await updateItemMutation.mutateAsync({
      id: item.id,
      questionNl,
      questionEn,
      answerNl,
      answerEn,
    });
    onCancelEdit();
  };

  if (isEditing) {
    return (
      <Card className='p-5 bg-white border-2 border-blue-400 shadow-md rounded-lg'>
        <div className='mb-4'>
          <h5 className='font-semibold text-slate-900'>
            {locale === 'nl' ? 'Vraag Bewerken' : 'Edit Question'}
          </h5>
        </div>
        <div className='grid grid-cols-2 gap-6'>
          {/* NL Column */}
          <div className='space-y-4'>
            <div className='flex items-center gap-2 pb-2 border-b border-slate-100'>
              <span className='text-lg'>🇳🇱</span>
              <h5 className='font-semibold text-xs uppercase text-slate-700'>Nederlands (NL)</h5>
            </div>
            <div>
              <label className='block text-sm font-medium text-slate-700 mb-1'>Vraag</label>
              <Input
                value={questionNl}
                onChange={(e) => setQuestionNl(e.target.value)}
                className='bg-slate-50'
                maxLength={200}
              />
            </div>
            <div>
              <label className='block text-sm font-medium text-slate-700 mb-1'>Antwoord</label>
              <Textarea
                value={answerNl}
                onChange={(e) => setAnswerNl(e.target.value)}
                className='bg-slate-50 min-h-[100px]'
                maxLength={1000}
              />
            </div>
          </div>

          {/* EN Column */}
          <div className='space-y-4'>
            <div className='flex items-center gap-2 pb-2 border-b border-slate-100'>
              <span className='text-lg'>🇬🇧</span>
              <h5 className='font-semibold text-xs uppercase text-slate-700'>English (EN)</h5>
            </div>
            <div>
              <label className='block text-sm font-medium text-slate-700 mb-1'>Question</label>
              <Input
                value={questionEn}
                onChange={(e) => setQuestionEn(e.target.value)}
                className='bg-slate-50'
                maxLength={200}
              />
            </div>
            <div>
              <label className='block text-sm font-medium text-slate-700 mb-1'>Answer</label>
              <Textarea
                value={answerEn}
                onChange={(e) => setAnswerEn(e.target.value)}
                className='bg-slate-50 min-h-[100px]'
                maxLength={1000}
              />
            </div>
          </div>
        </div>

        <div className='flex justify-end gap-2 mt-6 pt-4 border-t-2 border-slate-200'>
          <Button onClick={onCancelEdit} variant='outline' className='gap-2 px-4 py-2'>
            <X className='w-4 h-4' />
            {locale === 'nl' ? 'Annuleren' : 'Cancel'}
          </Button>
          <Button onClick={handleSave} disabled={updateItemMutation.isPending} className='gap-2 px-4 py-2 shadow-md hover:shadow-lg transition-all'>
            {updateItemMutation.isPending ? (
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
      </Card>
    );
  }

  return (
    <Card className='p-4 bg-white border border-slate-200 hover:shadow-md hover:border-primary/50 transition-all rounded-lg'>
      <div className='flex items-start gap-3'>
        <div className='flex-shrink-0 mt-1 cursor-move text-slate-400 hover:text-primary transition-colors'>
          <GripVertical className='w-5 h-5' />
        </div>
        <div className='flex-1 min-w-0'>
          <div className='flex items-start justify-between gap-3 mb-2'>
            <h5 className='font-semibold text-slate-900 leading-tight'>
              {locale === 'nl' ? item.question_nl : item.question_en}
            </h5>
            <div className='flex gap-1 flex-shrink-0'>
              <Button onClick={onEdit} variant='ghost' className='h-8 w-8 p-0 hover:bg-blue-50'>
                <Edit2 className='w-4 h-4 text-blue-600 hover:text-blue-700' />
              </Button>
              <Button onClick={onDelete} variant='ghost' className='h-8 w-8 p-0 hover:bg-red-50'>
                <Trash2 className='w-4 h-4 text-red-600 hover:text-red-700' />
              </Button>
            </div>
          </div>
          <p className='text-sm text-slate-600 line-clamp-2'>
            {locale === 'nl' ? item.answer_nl : item.answer_en}
          </p>
        </div>
      </div>
    </Card>
  );
}

// FAQ Item Form Component (for adding new items)
function FaqItemForm({
  faqId,
  onSave,
  onCancel,
  locale,
}: {
  faqId: string;
  onSave: () => void;
  onCancel: () => void;
  locale: string;
}) {
  const createItemMutation = useCreateFaqItem();

  const [questionNl, setQuestionNl] = useState('');
  const [questionEn, setQuestionEn] = useState('');
  const [answerNl, setAnswerNl] = useState('');
  const [answerEn, setAnswerEn] = useState('');

  const handleSave = async () => {
    if (!questionNl.trim() || !questionEn.trim() || !answerNl.trim() || !answerEn.trim()) {
      alert(locale === 'nl' ? 'Vul alle velden in' : 'Please fill all fields');
      return;
    }

    await createItemMutation.mutateAsync({
      faqId,
      questionNl,
      questionEn,
      answerNl,
      answerEn,
    });
    onSave();
  };

  return (
    <Card className='p-5 bg-white border-2 border-green-400 shadow-md rounded-lg'>
      <div className='mb-4'>
        <h5 className='font-semibold text-slate-900'>
          {locale === 'nl' ? 'Nieuwe Vraag Toevoegen' : 'Add New Question'}
        </h5>
      </div>
      <div className='grid grid-cols-2 gap-6'>
        {/* NL Column */}
        <div className='space-y-4'>
          <div className='flex items-center gap-2 pb-2 border-b border-slate-100'>
            <span className='text-lg'>🇳🇱</span>
            <h5 className='font-semibold text-xs uppercase text-slate-700'>Nederlands (NL)</h5>
          </div>
          <div>
            <label className='block text-sm font-medium text-slate-700 mb-1'>
              Vraag <span className='text-red-500'>*</span>
            </label>
            <Input
              value={questionNl}
              onChange={(e) => setQuestionNl(e.target.value)}
              placeholder='Wat kost een architect gemiddeld?'
              className='bg-slate-50'
              maxLength={200}
            />
            <p className='text-xs text-slate-500 mt-1'>{questionNl.length}/200</p>
          </div>
          <div>
            <label className='block text-sm font-medium text-slate-700 mb-1'>
              Antwoord <span className='text-red-500'>*</span>
            </label>
            <Textarea
              value={answerNl}
              onChange={(e) => setAnswerNl(e.target.value)}
              placeholder='De kosten variëren afhankelijk van...'
              className='bg-slate-50 min-h-[100px]'
              maxLength={1000}
            />
            <p className='text-xs text-slate-500 mt-1'>{answerNl.length}/1000</p>
          </div>
        </div>

        {/* EN Column */}
        <div className='space-y-4'>
          <div className='flex items-center gap-2 pb-2 border-b border-slate-100'>
            <span className='text-lg'>🇬🇧</span>
            <h5 className='font-semibold text-xs uppercase text-slate-700'>English (EN)</h5>
          </div>
          <div>
            <label className='block text-sm font-medium text-slate-700 mb-1'>
              Question <span className='text-red-500'>*</span>
            </label>
            <Input
              value={questionEn}
              onChange={(e) => setQuestionEn(e.target.value)}
              placeholder='What does an architect cost on average?'
              className='bg-slate-50'
              maxLength={200}
            />
            <p className='text-xs text-slate-500 mt-1'>{questionEn.length}/200</p>
          </div>
          <div>
            <label className='block text-sm font-medium text-slate-700 mb-1'>
              Answer <span className='text-red-500'>*</span>
            </label>
            <Textarea
              value={answerEn}
              onChange={(e) => setAnswerEn(e.target.value)}
              placeholder='The costs vary depending on...'
              className='bg-slate-50 min-h-[100px]'
              maxLength={1000}
            />
            <p className='text-xs text-slate-500 mt-1'>{answerEn.length}/1000</p>
          </div>
        </div>
      </div>

      <div className='flex justify-end gap-2 mt-6 pt-4 border-t-2 border-slate-200'>
        <Button onClick={onCancel} variant='outline' className='gap-2 px-4 py-2'>
          <X className='w-4 h-4' />
          {locale === 'nl' ? 'Annuleren' : 'Cancel'}
        </Button>
        <Button onClick={handleSave} disabled={createItemMutation.isPending} className='gap-2 px-4 py-2 shadow-md hover:shadow-lg transition-all'>
          {createItemMutation.isPending ? (
            <>
              <Loader2 className='w-4 h-4 animate-spin' />
              {locale === 'nl' ? 'Toevoegen...' : 'Adding...'}
            </>
          ) : (
            <>
              <Plus className='w-4 h-4' />
              {locale === 'nl' ? 'Toevoegen' : 'Add'}
            </>
          )}
        </Button>
      </div>
    </Card>
  );
}
