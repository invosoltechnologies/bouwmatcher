'use client';

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
  const fields = [
    { label: 'Bedrijfsnaam', value: companyInfo.companyName },
    { label: 'Adres', value: companyInfo.address },
    { label: 'Postcode', value: companyInfo.postalCode },
    { label: 'Plaats', value: companyInfo.city },
    { label: 'Website', value: companyInfo.website },
    { label: 'Bedrijfs ID', value: companyInfo.businessId },
  ];

  return (
    <Card className='px-5 gap-4'>
      <CardHeader className='p-0 gap-0'>
        <CardTitle className='text-xl leading-normal'>
          Bedrijfsgegevens
        </CardTitle>
        <CardAction>
          <Button
            variant='outline'
            size='default'
            onClick={onEdit}
            className='text-primary border-primary font-noramal text-base rounded-xl'
          >
            Wijzig
          </Button>
        </CardAction>
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