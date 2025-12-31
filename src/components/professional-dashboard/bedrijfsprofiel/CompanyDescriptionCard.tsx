'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

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
  const t = useTranslations('common.proDashboard.bedrijfsprofiel.description');
  const isOwner = roleInCompany === 'owner';

  return (
    <Card className='px-4 sm:px-5 gap-3 sm:gap-4'>
      <CardHeader className='p-0'>
        <div className='flex items-center justify-between'>
          <CardTitle className='text-base sm:text-lg lg:text-xl font-semibold'>
            {t('title')}
          </CardTitle>
          {isOwner && (
            <button
              onClick={onEditClick}
              className='text-muted-foreground hover:text-primary transition-colors cursor-pointer group flex-shrink-0'
              aria-label={t('edit')}
            >
              <Image
                src='/icons/edit-pencil.svg'
                className='mb-1 transition-all group-hover:[filter:brightness(0)_saturate(100%)_invert(15%)_sepia(91%)_saturate(2528%)_hue-rotate(214deg)_brightness(94%)_contrast(107%)]'
                alt={t('edit')}
                width={16}
                height={16}
              />
            </button>
          )}
        </div>
      </CardHeader>
      <CardContent className='p-0'>
        <p className='text-sm sm:text-base text-secondary-foreground leading-relaxed'>
          {description && description !== '-'
            ? description
            : t('emptyState')}
        </p>
      </CardContent>
    </Card>
  );
}
