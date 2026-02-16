'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from '@/i18n/navigation';
import { User, LogOut, ChevronDown, BriefcaseBusiness, LayoutDashboard, Users, Building2, ShieldCheck, Star, Briefcase, FolderTree, Home, ShoppingCart, FileText, BookOpen } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { dashboardNavigation } from '@/config/professional-dashboard';
import { adminNavigation } from '@/config/admin-dashboard';
import { useAccount } from '@/lib/hooks/professional/account/useAccount';
import { useAdminStatus } from '@/lib/hooks/useAdminStatus';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';

// Map of Lucide icon names to components
const lucideIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  LayoutDashboard,
  Users,
  Building2,
  ShieldCheck,
  Star,
  Briefcase,
  FolderTree,
  Home,
  LogOut,
  BriefcaseBusiness,
  ShoppingCart,
  FileText,
  BookOpen,
};

export default function UserAvatarDropdown() {
  const router = useRouter();
  const t = useTranslations('common');
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [open, setOpen] = useState(false);
  const { data: adminStatusData, isLoading: isAdminLoading } = useAdminStatus();
  const isAdmin = adminStatusData?.isAdmin || false;
  const { data: professionalData, isLoading: isProfessionalLoading } = useAccount({
    enabled: !isAdminLoading && !isAdmin,
  });


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

      // Close the dropdown
      setOpen(false);

      // Redirect to home page and reload to clear auth state
      router.push('/');

      // Use window.location.reload() to ensure complete state reset
      setTimeout(() => {
        window.location.reload();
      }, 100);
    } catch (error) {
      console.error('Logout error:', error);
      toast.error(t('navbar.logoutError'));
      setIsLoggingOut(false);
    }
  };

  // Get user info based on user type
  const userName = isAdmin
    ? adminStatusData?.adminUser?.email?.split('@')[0] || 'Admin'
    : professionalData?.accountData
      ? `${professionalData.accountData.contactInfo.contactPerson || ''}`
      : undefined;

  const companyName = !isAdmin && professionalData?.accountData
    ? professionalData.accountData.companyInfo.companyName
    : undefined;

  const avatarUrl =
    !isAdmin && professionalData?.accountData && professionalData.accountData.profilePictureUrl
      ? professionalData.accountData.profilePictureUrl
      : undefined;

  // Select the appropriate navigation based on user type
  const navigation = isAdmin ? adminNavigation : dashboardNavigation;

  // Filter out the Home and Logout items from navigation as we'll handle them separately
  const dashboardLinks = navigation.filter(
    (item) => item.type === 'link' && item.id !== 'home' && item.id !== 'logout'
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button className='flex items-center gap-2 relative cursor-pointer rounded-full hover:opacity-80 transition-all'>
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
            {isProfessionalLoading && !isAdmin ? '...' : userName || 'User'}
          </p>
          {isAdmin && (
            <p className='text-xs text-muted-foreground mt-1'>
              {adminStatusData?.adminUser?.role || 'Admin'}
            </p>
          )}
          {companyName && (
            <p className='text-xs text-muted-foreground mt-1'>
              {isProfessionalLoading ? '...' : companyName}
            </p>
          )}
        </div>

        {/* Dashboard Links */}
        <div className='space-y-1'>
          {dashboardLinks.map((item) => {
            const IconComponent = item.iconType === 'lucide' && lucideIcons[item.icon];

            return (
              <Link
                key={item.id}
                href={item.href}
                onClick={() => setOpen(false)}
                className='group flex items-center gap-3 px-3 py-2 rounded-md hover:bg-accent transition-colors cursor-pointer'
              >
                {IconComponent ? (
                  <IconComponent className='w-4 h-4 group-hover:text-white transition-colors' />
                ) : (
                  <Image
                    src={item.icon}
                    alt={isAdmin ? item.label : t(`proDashboard.navigation.${item.id}`)}
                    width={16}
                    height={16}
                    className='w-4 h-4 group-hover:brightness-0 group-hover:invert transition-all'
                  />
                )}
                <span className='text-sm group-hover:text-white transition-colors'>
                  {isAdmin ? item.label : t(`proDashboard.navigation.${item.id}`)}
                </span>
              </Link>
            );
          })}
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
