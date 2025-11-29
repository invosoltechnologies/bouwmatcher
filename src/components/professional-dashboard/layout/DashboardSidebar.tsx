'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { toast } from 'react-hot-toast';
import { dashboardNavigation } from '@/config/professional-dashboard';
import { cn } from '@/lib/utils';
import { useAccount } from '@/lib/hooks/professional/account/useAccount';
import SidebarLanguageSwitcher from './SidebarLanguageSwitcher';
import UserProfile from './UserProfile';

export default function DashboardSidebar() {
  const pathname = usePathname();
  const router = useRouter();
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

      toast.success('Succesvol uitgelogd');

      // Redirect to home page
      router.push('/');
      router.refresh();
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Kon niet uitloggen. Probeer het opnieuw.');
      setIsLoggingOut(false);
    }
  };

  const handleNavigation = (item: typeof dashboardNavigation[0]) => {
    if (item.type === 'action' && item.id === 'logout') {
      handleLogout();
    }
  };

  return (
    <aside className="lg:max-w-64 w-full bg-white border-r border-slate-200 flex flex-col h-screen sticky top-0">
      {/* Logo */}
      <div className="px-6 py-8.5">
        <Link href="/">
          <Image
            src="/images/logo.svg"
            alt="Bouwmatcher"
            width={140}
            height={40}
            className="h-10 w-auto"
          />
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-6 py-8.5">
        <ul className="space-y-2.5">
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
                      'w-full flex items-center gap-4 px-4 py-3 rounded-lg lg:text-base font-medium transition-colors cursor-pointer group',
                      'hover:bg-primary/5 text-muted-foreground hover:text-primary',
                      isLoggingOut && 'opacity-50 cursor-not-allowed'
                    )}
                  >
                    <Image
                      src={item.icon}
                      alt={item.label}
                      width={16}
                      height={16}
                      className="w-4 h-4 transition-all group-hover:[filter:brightness(0)_saturate(100%)_invert(16%)_sepia(97%)_saturate(2276%)_hue-rotate(213deg)_brightness(93%)_contrast(108%)]"
                    />
                    <span>{isLoggingOut ? 'Uitloggen...' : item.label}</span>
                  </button>
                </li>
              );
            }

            return (
              <li key={item.id}>
                <Link
                  href={item.href}
                  className={cn(
                    'flex items-center gap-4 px-4 py-3 rounded-lg text-sm lg:text-base font-medium transition-colors group',
                    isActive
                      ? 'bg-primary text-white'
                      : 'hover:bg-primary/5 text-muted-foreground hover:text-primary'
                  )}
                >
                  <Image
                    src={item.icon}
                    alt={item.label}
                    width={16}
                    height={16}
                    className={cn(
                      'w-4 h-4 transition-all',
                      isActive && 'brightness-0 invert',
                      !isActive && 'group-hover:[filter:brightness(0)_saturate(100%)_invert(16%)_sepia(97%)_saturate(2276%)_hue-rotate(213deg)_brightness(93%)_contrast(108%)]'
                    )}
                  />
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Bottom Section */}
      <div className="border-t border-neutral-200 py-4 px-4 space-y-4">
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
    </aside>
  );
}
