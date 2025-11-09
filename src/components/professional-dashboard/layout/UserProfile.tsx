'use client';

import Image from 'next/image';
import { User } from 'lucide-react';

interface UserProfileProps {
  userName?: string;
  companyName?: string;
  avatarUrl?: string;
}

export default function UserProfile({
  userName = 'Jan Janssen',
  companyName = 'Company Name',
  avatarUrl,
}: UserProfileProps) {
  return (
    <div className=' bg-slate-50 flex items-center gap-3 p-4 rounded-2xl'>
      {/* Avatar */}
      <div className='w-10 h-10 rounded-full bg-primary flex items-center justify-center shrink-0 overflow-hidden'>
        {avatarUrl ? (
          <Image
            src={avatarUrl}
            alt={userName}
            width={40}
            height={40}
            className='w-full h-full object-cover'
          />
        ) : (
          <User className='w-6 h-6 text-white' />
        )}
      </div>

      {/* User Info */}
      <div className='flex-1 min-w-0'>
        <p className='text-sm lg:text-base font-semibold text-secondary-foreground truncate'>
          {userName}
        </p>
        <p className='text-xs lg:text-sm text-muted-foreground truncate'>
          {companyName}
        </p>
      </div>
    </div>
  );
}
