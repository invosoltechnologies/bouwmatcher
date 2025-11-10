'use client';

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardAction,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface ContactInfo {
  contactpersoon: string;
  offertesEmail: string;
  facturenEmail: string;
  algemeenEmail: string;
  telefoonnummer: string;
}

interface ContactInfoCardProps {
  contactInfo: ContactInfo;
  onEdit?: () => void;
}

export default function ContactInfoCard({
  contactInfo,
  onEdit,
}: ContactInfoCardProps) {
  const fields = [
    { label: 'Contactpersoon', value: contactInfo.contactpersoon },
    { label: 'E-mailadres (offertesaanvragen)', value: contactInfo.offertesEmail },
    { label: 'E-mailadres (facturering)', value: contactInfo.facturenEmail },
    { label: 'E-mailadres (algemeen)', value: contactInfo.algemeenEmail },
    { label: 'Telefoonnummer', value: contactInfo.telefoonnummer },
  ];

  return (
    <Card className='px-5 gap-4'>
      <CardHeader className='p-0 gap-0'>
        <CardTitle className='text-xl leading-normal'>
          Contactgegevens
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