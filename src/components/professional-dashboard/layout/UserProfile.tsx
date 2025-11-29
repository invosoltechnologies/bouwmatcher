'use client';

import { useState } from 'react';
import Image from 'next/image';
import { User, Edit } from 'lucide-react';
import ProfilePictureUploadModal from '@/components/professional-dashboard/bedrijfsprofiel/ProfilePictureUploadModal';

interface UserProfileProps {
  userName?: string;
  companyName?: string;
  avatarUrl?: string;
  isLoading?: boolean;
}

export default function UserProfile({
  userName = 'Jan Janssen',
  companyName = 'Company Name',
  avatarUrl,
  isLoading = false,
}: UserProfileProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className='bg-slate-50 flex items-center gap-3 p-4 rounded-2xl'>
        {/* Avatar with Edit Overlay */}
        <div
          onClick={() => setIsModalOpen(true)}
          className='relative w-10 h-10 rounded-full bg-primary flex items-center justify-center shrink-0 overflow-hidden cursor-pointer group'
        >
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

          {/* Edit Overlay */}
          <div className='absolute inset-0 bg-black/0 group-hover:bg-blue-600/80 flex items-center justify-center transition-all opacity-0 group-hover:opacity-100'>
            <Edit className='w-4 h-4 text-white' />
          </div>
        </div>

        {/* User Info */}
        <div className='flex-1 min-w-0'>
          <p className='text-sm lg:text-base font-semibold text-secondary-foreground truncate'>
            {isLoading ? '...' : userName}
          </p>
          <p className='text-xs lg:text-sm text-muted-foreground truncate'>
            {isLoading ? '...' : companyName}
          </p>
        </div>
      </div>

      {/* Profile Picture Upload Modal */}
      <ProfilePictureUploadModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        currentPictureUrl={avatarUrl}
      />
    </>
  );
}
