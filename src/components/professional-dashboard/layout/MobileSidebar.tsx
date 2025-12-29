'use client';

import { usePathname } from 'next/navigation';
import { useRouter } from '@/i18n/navigation';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { toast } from 'react-hot-toast';
import { useTranslations } from 'next-intl';
import { dashboardNavigation } from '@/config/professional-dashboard';
import { cn } from '@/lib/utils';
import { useAccount } from '@/lib/hooks/professional/account/useAccount';
import {
  Sheet,
  SheetContent,
  SheetClose,
  SheetTitle,
} from '@/components/ui/sheet';
import SidebarLanguageSwitcher from './SidebarLanguageSwitcher';
import UserProfile from './UserProfile';

interface MobileSidebarProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function MobileSidebar({ open, onOpenChange }: MobileSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
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

      toast.success(t('auth.logoutSuccess'));

      // Close the sheet
      onOpenChange(false);

      // Redirect to home page
      router.push('/');
      router.refresh();
    } catch (error) {
      console.error('Logout error:', error);
      toast.error(t('auth.logoutError'));
      setIsLoggingOut(false);
    }
  };

  const handleNavigation = (item: typeof dashboardNavigation[0]) => {
    if (item.type === 'action' && item.id === 'logout') {
      handleLogout();
    } else {
      // Close the sheet when navigating
      onOpenChange(false);
    }
  };

  const getNavigationLabel = (item: typeof dashboardNavigation[0]) => {
    if (item.id === 'logout' && isLoggingOut) {
      return t('auth.loggingOut');
    }
    return t(`common.proDashboard.navigation.${item.id}` as any);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-[280px] p-0 flex flex-col" showCloseButton={true}>
        <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
        {/* Logo */}
        <div className="px-4 py-4 border-b border-slate-200">
          <Link href="/" onClick={() => onOpenChange(false)}>
            <Image
              src="/images/logo.svg"
              alt="Bouwmatcher"
              width={120}
              height={32}
              className="h-8 w-auto"
            />
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 overflow-y-auto">
          <ul className="space-y-1">
            {dashboardNavigation.map((item) => {
              const isActive = pathname === item.href;
              const isActionItem = item.type === 'action';

              if (isActionItem) {
                return (
                  <li key={item.id}>
                    <button
                      onClick={() => handleNavigation(item)}
                      disabled={isLoggingOut}
                      className={cn(
                        'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer group',
                        'hover:bg-primary/5 text-muted-foreground hover:text-primary',
                        isLoggingOut && 'opacity-50 cursor-not-allowed'
                      )}
                    >
                      <Image
                        src={item.icon}
                        alt={getNavigationLabel(item)}
                        width={18}
                        height={18}
                        className="w-4.5 h-4.5 transition-all group-hover:[filter:brightness(0)_saturate(100%)_invert(16%)_sepia(97%)_saturate(2276%)_hue-rotate(213deg)_brightness(93%)_contrast(108%)]"
                      />
                      <span>{getNavigationLabel(item)}</span>
                    </button>
                  </li>
                );
              }

              return (
                <li key={item.id}>
                  <Link
                    href={item.href}
                    onClick={() => handleNavigation(item)}
                    className={cn(
                      'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors group',
                      isActive
                        ? 'bg-primary text-white'
                        : 'hover:bg-primary/5 text-muted-foreground hover:text-primary'
                    )}
                  >
                    <Image
                      src={item.icon}
                      alt={getNavigationLabel(item)}
                      width={18}
                      height={18}
                      className={cn(
                        'w-4.5 h-4.5 transition-all',
                        isActive && 'brightness-0 invert',
                        !isActive && 'group-hover:[filter:brightness(0)_saturate(100%)_invert(16%)_sepia(97%)_saturate(2276%)_hue-rotate(213deg)_brightness(93%)_contrast(108%)]'
                      )}
                    />
                    <span>{getNavigationLabel(item)}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Bottom Section */}
        <div className="border-t border-neutral-200 py-3 px-3 space-y-3">
          {/* Language Switcher */}
          <SidebarLanguageSwitcher />

          {/* User Profile */}
          <UserProfile
            userName={
              data?.accountData
                ? `${data.accountData.contactInfo.contactPerson || ''}`
                : undefined
            }
            companyName={
              data?.accountData ? data.accountData.companyInfo.companyName : undefined
            }
            avatarUrl={
              data?.accountData && data.accountData.profilePictureUrl
                ? data.accountData.profilePictureUrl
                : undefined
            }
            isLoading={isLoading}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}
