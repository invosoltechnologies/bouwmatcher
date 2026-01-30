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

interface CompanyInfo {
  companyName: string;
  address: string;
  postalCode: string;
  city: string;
  website: string;
  businessId: string;
}

interface CompanyInfoCardProps {
  companyInfo: CompanyInfo;
  onEdit?: () => void;
}

export default function CompanyInfoCard({
  companyInfo,
  onEdit,
}: CompanyInfoCardProps) {
  const t = useTranslations('common.proDashboard.account.companyInfo');

  const fields = [
    { label: t('companyName'), value: companyInfo.companyName },
    { label: t('address'), value: companyInfo.address },
    { label: t('postalCode'), value: companyInfo.postalCode },
    { label: t('city'), value: companyInfo.city },
    { label: t('website'), value: companyInfo.website },
    { label: t('businessId'), value: companyInfo.businessId },
  ];

  return (
    <Card className='px-5 gap-4'>
      <CardHeader className='p-0 gap-0'>
        <CardTitle className='text-xl leading-normal'>
          {t('title')}
        </CardTitle>
        {onEdit && (
          <CardAction>
            <Button
              variant='outline'
              size='default'
              onClick={onEdit}
              className='text-primary border-primary font-noramal text-base rounded-xl'
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
              className={`flex justify-between items-start py-2.5 ${
                index !== fields.length - 1 ? 'border-b border-b-slate-200' : ''
              }`}
            >
              <span className='text-muted-foreground text-sm leading-normal font-medium'>
                {field.label}
              </span>
              <span className='text-secondary-foreground text-sm leading-normal text-right'>
                {field.value}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}