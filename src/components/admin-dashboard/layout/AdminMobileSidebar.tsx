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
  ShoppingCart,
  FileText,
  BookOpen,
} from 'lucide-react';
import { adminNavigation } from '@/config/admin-dashboard';
import { cn } from '@/lib/utils';
import {
  Sheet,
  SheetContent,
  SheetTitle,
} from '@/components/ui/sheet';
import SidebarLanguageSwitcher from '@/components/professional-dashboard/layout/SidebarLanguageSwitcher';

interface AdminMobileSidebarProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function AdminMobileSidebar({
  open,
  onOpenChange,
}: AdminMobileSidebarProps) {
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

      // Close the sheet
      onOpenChange(false);

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
    } else {
      // Close the sheet when navigating
      onOpenChange(false);
    }
  };

  const getNavigationLabel = (item: typeof adminNavigation[0]) => {
    if (item.id === 'logout' && isLoggingOut) {
      return t('common.loggingOut');
    }
    return t(`common.adminDashboard.navigation.${item.id}`, {
      defaultValue: item.label,
    });
  };

  const renderIcon = (item: typeof adminNavigation[0], isActive: boolean) => {
    const iconClass = cn(
      'w-4.5 h-4.5 transition-all',
      isActive ? 'text-white' : 'text-muted-foreground group-hover:text-primary'
    );

    // Map lucide icons
    const iconMap: Record<string, React.ComponentType<{ className?: string }>> =
      {
        LayoutDashboard,
        Users,
        Building2,
        ShieldCheck,
        Star,
        Briefcase,
        FolderTree,
        Home,
        LogOut,
        ShoppingCart,
        FileText,
        BookOpen,
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
        width={18}
        height={18}
        className={cn(
          'w-4.5 h-4.5 transition-all',
          isActive && 'brightness-0 invert',
          !isActive &&
            'group-hover:[filter:brightness(0)_saturate(100%)_invert(16%)_sepia(97%)_saturate(2276%)_hue-rotate(213deg)_brightness(93%)_contrast(108%)]'
        )}
      />
    );
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-[280px] p-0 flex flex-col"
        showCloseButton={true}
      >
        <SheetTitle className="sr-only">Admin Navigation Menu</SheetTitle>
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
        <nav className="flex-1 px-3 py-4 overflow-y-auto min-h-0">
          <ul className="space-y-1">
            {adminNavigation.map((item) => {
              // Check if pathname ends with the item href (to handle locale prefix)
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
                        'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer group',
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
                    onClick={() => handleNavigation(item)}
                    className={cn(
                      'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors group',
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
        <div className="border-t border-neutral-200 py-3 px-3 space-y-3">
          {/* Language Switcher */}
          <SidebarLanguageSwitcher />

          {/* Admin Badge */}
          <div className="px-3 py-2.5 bg-primary/5 rounded-lg">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">
                {t('common.adminDashboard.adminBadge', { defaultValue: 'Admin' })}
              </span>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
