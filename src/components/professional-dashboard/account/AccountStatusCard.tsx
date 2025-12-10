'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import PulsingDot from '@/components/ui/pulsing-dot';
import { HardDriveUpload } from 'lucide-react';

interface AccountStatusCardProps {
  status: string;
  description: string;
  statusCode: -1 | 1 | 2; // -1: inactive/blocked, 1: verified, 2: in process
  documentRequired?: boolean;
  onDocumentClick?: () => void;
}

export default function AccountStatusCard({
  status,
  description,
  statusCode,
  documentRequired = false,
  onDocumentClick,
}: AccountStatusCardProps) {
  // Determine pill color based on status code
  const getPillColor = () => {
    switch (statusCode) {
      case -1:
        return '#dc3545'; // destructive for inactive/blocked
      case 1:
        return '#0AB27E'; // accent for verified
      case 2:
        return '#FF9500'; // orange for in process
      default:
        return '#FF9500';
    }
  };

  return (
    <Card className='px-5 gap-4'>
      <CardHeader className='p-0 gap-0'>
        <CardTitle className='text-xl leading-normal'>Accountstatus</CardTitle>
      </CardHeader>
      <CardContent className='p-0 space-y-4'>
        <div className='flex items-start gap-2'>
          <PulsingDot
            color={getPillColor()}
            showAnimation={true}
            containerClassName='w-4.5 h-4.5'
            dotClassName='w-2.5 h-2.5'
          />
          <div>
            <p className='text-muted-foreground font-medium text-sm'>
              {status}
            </p>
            <p className='text-muted-foreground text-sm mt-2.5'>
              {description}
            </p>
          </div>
        </div>
        {/* {documentRequired && (
          <button
            onClick={onDocumentClick}
            className='flex items-end gap-2 cursor-pointer text-primary text-sm font-medium hover:underline'
          >
            <HardDriveUpload className='w-4.5 h-4.5' />
            <span className='leading-2.5'>Documentatie aanleveren</span>
          </button>
        )} */}
      </CardContent>
    </Card>
  );
}