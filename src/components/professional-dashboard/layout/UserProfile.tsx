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
    <div className="flex items-center gap-3 px-4 py-3">
      {/* Avatar */}
      <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center shrink-0 overflow-hidden">
        {avatarUrl ? (
          <Image
            src={avatarUrl}
            alt={userName}
            width={48}
            height={48}
            className="w-full h-full object-cover"
          />
        ) : (
          <User className="w-6 h-6 text-white" />
        )}
      </div>

      {/* User Info */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-slate-900 truncate">
          {userName}
        </p>
        <p className="text-xs text-neutral-600 truncate">
          {companyName}
        </p>
      </div>
    </div>
  );
}
