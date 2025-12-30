'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar } from 'lucide-react';
import { format } from 'date-fns';
import { nl } from 'date-fns/locale';
import { useTranslations } from 'next-intl';

interface MoreInfoCardProps {
  registrationStatus: string;
  businessId: string | null;
  memberSince?: string;
}

export default function MoreInfoCard({
  registrationStatus,
  businessId,
  memberSince,
}: MoreInfoCardProps) {
  const t = useTranslations('common.proDashboard.bedrijfsprofiel.moreInfo');

  // Format member since date
  const formatMemberSince = (dateString?: string) => {
    if (!dateString) return t('defaultDate');
    try {
      const date = new Date(dateString);
      return format(date, 'MMMM yyyy', { locale: nl });
    } catch {
      return t('defaultDate');
    }
  };

  // Get status badge props
  const getStatusBadgeProps = () => {
    switch (registrationStatus) {
      case 'verified':
        return {
          text: t('verified'),
          className: 'bg-accent text-white',
        };
      case 'pending':
      case 'in_review':
        return {
          text: t('pending'),
          className: 'bg-orange-500 text-white',
        };
      default:
        return {
          text: t('notVerified'),
          className: 'bg-destructive text-white',
        };
    }
  };

  const statusBadge = getStatusBadgeProps();

  return (
    <Card className='p-4 sm:p-5'>
      <CardHeader className='p-0 mb-3 sm:mb-4'>
        <CardTitle className='text-base sm:text-lg font-semibold'>{t('title')}</CardTitle>
      </CardHeader>
      <CardContent className='p-0 space-y-3 sm:space-y-4'>
        {/* Registration Status */}
        <div className='flex items-center justify-between pb-2.5 sm:pb-3 border-b gap-2'>
          <span className='text-xs sm:text-sm text-muted-foreground'>{t('registrationStatus')}</span>
          <Badge className={`${statusBadge.className} rounded-md px-2 py-1 text-xs flex-shrink-0`}>
            {statusBadge.text}
          </Badge>
        </div>

        {/* Number of Employees */}
        <div className='flex items-center justify-between pb-2.5 sm:pb-3 border-b gap-2'>
          <span className='text-xs sm:text-sm text-muted-foreground'>{t('employees')}</span>
          <span className='text-xs sm:text-sm font-semibold'>7</span>
        </div>

        {/* Business ID */}
        <div className='flex items-center justify-between pb-2.5 sm:pb-3 border-b gap-2'>
          <span className='text-xs sm:text-sm text-muted-foreground'>{t('businessId')}</span>
          <span className='text-xs sm:text-sm font-semibold truncate'>{businessId || '70123457'}</span>
        </div>

        {/* Member Since */}
        <div className='flex items-center justify-between gap-2'>
          <span className='text-xs sm:text-sm text-muted-foreground'>{t('memberSince')}</span>
          <div className='flex items-center gap-1 flex-shrink-0'>
            <Calendar className='w-3.5 h-3.5 sm:w-4 sm:h-4 text-muted-foreground' />
            <span className='text-xs sm:text-sm font-semibold'>
              {formatMemberSince(memberSince)}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
