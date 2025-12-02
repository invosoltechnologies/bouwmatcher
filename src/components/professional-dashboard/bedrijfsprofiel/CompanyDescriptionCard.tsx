'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import Image from 'next/image';

interface CompanyDescriptionCardProps {
  description: string;
  roleInCompany: string | null;
  onEditClick: () => void;
}

export default function CompanyDescriptionCard({
  description,
  roleInCompany,
  onEditClick,
}: CompanyDescriptionCardProps) {
  const isOwner = roleInCompany === 'owner';

  return (
    <Card className='px-5 gap-4'>
      <CardHeader className='p-0'>
        <div className='flex items-center justify-between'>
          <CardTitle className='text-lg font-semibold'>
            Bedrijfsomschrijving
          </CardTitle>
          {isOwner && (
            <button
              onClick={onEditClick}
              className='text-muted-foreground hover:text-primary transition-colors cursor-pointer group'
              aria-label='Bewerken'
            >
              <Image
                src='/icons/edit-pencil.svg'
                className='mb-1 transition-all group-hover:[filter:brightness(0)_saturate(100%)_invert(15%)_sepia(91%)_saturate(2528%)_hue-rotate(214deg)_brightness(94%)_contrast(107%)]'
                alt='Bewerken'
                width={16}
                height={16}
              />
            </button>
          )}
        </div>
      </CardHeader>
      <CardContent className='p-0'>
        <p className='text-sm text-secondary-foreground leading-relaxed'>
          {description && description !== '-'
            ? description
            : 'Geen bedrijfsomschrijving beschikbaar. Klik op het potlood pictogram om een omschrijving toe te voegen.'}
        </p>
      </CardContent>
    </Card>
  );
}
