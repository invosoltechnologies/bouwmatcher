'use client';

import { usePathname } from 'next/navigation';
import { useRouter, Link } from '@/i18n/navigation';
import { useState } from 'react';
import Image from 'next/image';
import { toast } from 'react-hot-toast';
import { useTranslations } from 'next-intl';
import {
  LayoutDashboard,
  Users,
  Building2,
  ShieldCheck,
  Star,
  Briefcase,
  FolderTree,
  Home,
  LogOut,
} from 'lucide-react';
import { adminNavigation } from '@/config/admin-dashboard';
import { cn } from '@/lib/utils';
import SidebarLanguageSwitcher from '@/components/professional-dashboard/layout/SidebarLanguageSwitcher';

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

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

      toast.success(t('common.logoutSuccess'));

      // Redirect to home page
      router.push('/');
      router.refresh();
    } catch (error) {
      console.error('Logout error:', error);
      toast.error(t('common.logoutError'));
      setIsLoggingOut(false);
    }
  };

  const handleNavigation = (item: typeof adminNavigation[0]) => {
    if (item.type === 'action' && item.id === 'logout') {
      handleLogout();
    }
  };

  const getNavigationLabel = (item: typeof adminNavigation[0]) => {
    if (item.id === 'logout' && isLoggingOut) {
      return t('common.loggingOut');
    }
    // Use admin-specific translation keys
    return t(`common.adminDashboard.navigation.${item.id}` as any, {
      defaultValue: item.label,
    });
  };

  const renderIcon = (item: typeof adminNavigation[0], isActive: boolean) => {
    const iconClass = cn(
      'w-4 h-4 transition-all',
      isActive ? 'text-white' : 'text-muted-foreground group-hover:text-primary'
    );

    // Map lucide icons
    const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
      LayoutDashboard,
      Users,
      Building2,
      ShieldCheck,
      Star,
      Briefcase,
      FolderTree,
      Home,
      LogOut,
    };

    if (item.iconType === 'lucide' && iconMap[item.icon]) {
      const Icon = iconMap[item.icon];
      return <Icon className={iconClass} />;
    }

    // Fallback to SVG image
    return (
      <Image
        src={item.icon}
        alt={getNavigationLabel(item)}
        width={16}
        height={16}
        className={cn(
          'w-4 h-4 transition-all',
          isActive && 'brightness-0 invert',
          !isActive &&
            'group-hover:[filter:brightness(0)_saturate(100%)_invert(16%)_sepia(97%)_saturate(2276%)_hue-rotate(213deg)_brightness(93%)_contrast(108%)]'
        )}
      />
    );
  };

  return (
    <aside className="hidden lg:flex lg:max-w-64 w-full bg-white border-r border-slate-200 flex-col h-screen sticky top-0">
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
          {adminNavigation.map((item) => {
            // Check if pathname ends with the item href (to handle locale prefix like /en/admin-dashboard)
            const isActive =
              pathname === item.href ||
              pathname.endsWith(item.href) ||
              (item.href === '/admin-dashboard' &&
                (pathname === '/admin-dashboard' ||
                  pathname.endsWith('/admin-dashboard')));
            const isActionItem = item.type === 'action';

            if (isActionItem) {
              return (
                <li key={item.id}>
                  <button
                    onClick={() => handleNavigation(item)}
                    disabled={isLoggingOut}
                    className={cn(
                      'w-full flex items-center gap-4 px-4 py-3 rounded-lg text-base font-medium transition-colors cursor-pointer group',
                      'hover:bg-primary/5 text-muted-foreground hover:text-primary',
                      isLoggingOut && 'opacity-50 cursor-not-allowed'
                    )}
                  >
                    {renderIcon(item, false)}
                    <span>{getNavigationLabel(item)}</span>
                  </button>
                </li>
              );
            }

            return (
              <li key={item.id}>
                <Link
                  href={item.href}
                  className={cn(
                    'flex items-center gap-4 px-4 py-3 rounded-lg text-base font-medium transition-colors group',
                    isActive
                      ? 'bg-primary text-white'
                      : 'hover:bg-primary/5 text-muted-foreground hover:text-primary'
                  )}
                >
                  {renderIcon(item, isActive)}
                  <span>{getNavigationLabel(item)}</span>
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

        {/* Admin Badge */}
        <div className="px-4 py-3 bg-primary/5 rounded-lg">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">
              {t('common.adminDashboard.adminBadge', { defaultValue: 'Admin' })}
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}
