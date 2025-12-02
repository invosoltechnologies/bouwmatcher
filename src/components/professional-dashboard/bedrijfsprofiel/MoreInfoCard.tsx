'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar } from 'lucide-react';
import { format } from 'date-fns';
import { nl } from 'date-fns/locale';

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
  // Format member since date
  const formatMemberSince = (dateString?: string) => {
    if (!dateString) return 'December 2024';
    try {
      const date = new Date(dateString);
      return format(date, 'MMMM yyyy', { locale: nl });
    } catch {
      return 'December 2024';
    }
  };

  // Get status badge props
  const getStatusBadgeProps = () => {
    switch (registrationStatus) {
      case 'verified':
        return {
          text: 'Geverifieerd',
          className: 'bg-accent text-white',
        };
      case 'pending':
      case 'in_review':
        return {
          text: 'In behandeling',
          className: 'bg-orange-500 text-white',
        };
      default:
        return {
          text: 'Niet geverifieerd',
          className: 'bg-destructive text-white',
        };
    }
  };

  const statusBadge = getStatusBadgeProps();

  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-base font-semibold'>Meer informatie</CardTitle>
      </CardHeader>
      <CardContent className='space-y-4'>
        {/* Registration Status */}
        <div className='flex items-center justify-between pb-3 border-b'>
          <span className='text-sm text-muted-foreground'>Registratiestatus</span>
          <Badge className={`${statusBadge.className} rounded-md px-2 py-1 text-xs`}>
            {statusBadge.text}
          </Badge>
        </div>

        {/* Number of Employees */}
        <div className='flex items-center justify-between pb-3 border-b'>
          <span className='text-sm text-muted-foreground'>Aantal medewerkers</span>
          <span className='text-sm font-semibold'>7</span>
        </div>

        {/* Business ID */}
        <div className='flex items-center justify-between pb-3 border-b'>
          <span className='text-sm text-muted-foreground'>Bedrijfs ID</span>
          <span className='text-sm font-semibold'>{businessId || '70123457'}</span>
        </div>

        {/* Member Since */}
        <div className='flex items-center justify-between'>
          <span className='text-sm text-muted-foreground'>Lid sinds</span>
          <div className='flex items-center gap-1'>
            <Calendar className='w-4 h-4 text-muted-foreground' />
            <span className='text-sm font-semibold'>
              {formatMemberSince(memberSince)}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
