'use client';

import { useTranslations } from 'next-intl';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardAction,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface ContactInfo {
  contactPerson: string;
  quotesEmail: string;
  invoicesEmail: string;
  generalEmail: string;
  phoneNumber: string;
}

interface ContactInfoCardProps {
  contactInfo: ContactInfo;
  onEdit?: () => void;
}

export default function ContactInfoCard({
  contactInfo,
  onEdit,
}: ContactInfoCardProps) {
  const t = useTranslations('common.proDashboard.account.contactInfo');

  const fields = [
    { label: t('contactPerson'), value: contactInfo.contactPerson },
    { label: t('quotesEmail'), value: contactInfo.quotesEmail },
    { label: t('invoicesEmail'), value: contactInfo.invoicesEmail },
    { label: t('generalEmail'), value: contactInfo.generalEmail },
    { label: t('phoneNumber'), value: contactInfo.phoneNumber },
  ];

  return (
    <Card className='px-6 py-5 gap-5'>
      <CardHeader className='p-0 gap-0'>
        <CardTitle className='text-xl font-medium leading-normal'>
          {t('title')}
        </CardTitle>
        {onEdit && (
          <CardAction>
            <Button
              variant='outline'
              size='default'
              onClick={onEdit}
              className='text-primary border-primary font-medium text-base rounded-xl px-6'
            >
              {t('edit')}
            </Button>
          </CardAction>
        )}
      </CardHeader>
      <CardContent className='p-0'>
        <div className='space-y-4'>
          {fields.map((field, index) => (
            <div
              key={field.label}
              className={`flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1 sm:gap-4 py-3 ${
                index !== fields.length - 1 ? 'border-b border-b-slate-200' : ''
              }`}
            >
              <span className='text-muted-foreground text-base leading-normal font-medium min-w-fit'>
                {field.label}
              </span>
              <span className='text-secondary-foreground text-base leading-normal text-left sm:text-right break-all'>
                {field.value}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}