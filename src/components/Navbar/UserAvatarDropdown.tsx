'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from '@/i18n/navigation';
import { User, LogOut, ChevronDown } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { dashboardNavigation } from '@/config/professional-dashboard';
import { useAccount } from '@/lib/hooks/professional/account/useAccount';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';

export default function UserAvatarDropdown() {
  const router = useRouter();
  const t = useTranslations('common');
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [open, setOpen] = useState(false);
  const { data, isLoading } = useAccount();

  const handleLogout = async () => {
    if (isLoggingOut) return;

    try {
      setIsLoggingOut(true);

      const response = await fetch('/api/auth/logout', {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error('Failed to logout');
      }

      toast.success(t('navbar.logoutSuccess'));

      // Redirect to home page
      router.push('/');
      router.refresh();
    } catch (error) {
      console.error('Logout error:', error);
      toast.error(t('navbar.logoutError'));
      setIsLoggingOut(false);
    }
  };

  const userName = data?.accountData
    ? `${data.accountData.contactInfo.contactPerson || ''}`
    : undefined;

  const companyName = data?.accountData
    ? data.accountData.companyInfo.companyName
    : undefined;

  const avatarUrl =
    data?.accountData && data.accountData.profilePictureUrl
      ? data.accountData.profilePictureUrl
      : undefined;

  // Filter out the Home and Logout items from navigation as we'll handle them separately
  const dashboardLinks = dashboardNavigation.filter(
    (item) => item.type === 'link' && item.id !== 'home' && item.id !== 'logout'
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button className='flex items-center gap-2 relative rounded-full hover:opacity-80 transition-all'>
          <div className='w-10 h-10 rounded-full bg-primary flex items-center justify-center shrink-0 overflow-hidden'>
            {avatarUrl ? (
              <Image
                src={avatarUrl}
                alt={userName || 'User'}
                width={40}
                height={40}
                className='w-full h-full object-cover'
              />
            ) : (
              <User className='w-6 h-6 text-white' />
            )}
          </div>
          <ChevronDown className='w-4 h-4 text-muted-foreground' />
        </button>
      </PopoverTrigger>
      <PopoverContent align='end' className='w-64 p-2'>
        {/* User Info Header */}
        <div className='px-3 py-2 mb-2 border-b border-gray-200'>
          <p className='text-sm font-semibold leading-none text-secondary-foreground'>
            {isLoading ? '...' : userName || 'User'}
          </p>
          {companyName && (
            <p className='text-xs text-muted-foreground mt-1'>
              {isLoading ? '...' : companyName}
            </p>
          )}
        </div>

        {/* Dashboard Links */}
        <div className='space-y-1'>
          {dashboardLinks.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              onClick={() => setOpen(false)}
              className='group flex items-center gap-3 px-3 py-2 rounded-md hover:bg-accent transition-colors cursor-pointer'
            >
              <Image
                src={item.icon}
                alt={t(`proDashboard.navigation.${item.id}`)}
                width={16}
                height={16}
                className='w-4 h-4 group-hover:brightness-0 group-hover:invert transition-all'
              />
              <span className='text-sm group-hover:text-white transition-colors'>
                {t(`proDashboard.navigation.${item.id}`)}
              </span>
            </Link>
          ))}
        </div>

        {/* Separator */}
        <div className='h-px bg-gray-200 my-2' />

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          disabled={isLoggingOut}
          className={cn(
            'w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors cursor-pointer',
            isLoggingOut
              ? 'opacity-50 cursor-not-allowed'
              : 'hover:bg-destructive/10 text-destructive'
          )}
        >
          <LogOut className='w-4 h-4' />
          <span>{isLoggingOut ? t('navbar.loggingOut') : t('navbar.logout')}</span>
        </button>
      </PopoverContent>
    </Popover>
  );
}