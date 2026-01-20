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
  ChevronLeft,
  ChevronRight,
  FileText,
  ShoppingCart,
  BookOpen,
} from 'lucide-react';
import { adminNavigation } from '@/config/admin-dashboard';
import { cn } from '@/lib/utils';
import SidebarLanguageSwitcher from '@/components/professional-dashboard/layout/SidebarLanguageSwitcher';

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

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

      toast.success(t('common.navbar.logoutSuccess'));

      // Redirect to home page
      router.push('/');
      router.refresh();
    } catch (error) {
      console.error('Logout error:', error);
      toast.error(t('common.navbar.logoutError'));
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
      return t('common.navbar.loggingOut');
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
      FileText,
      ShoppingCart,
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
    <aside
      className={cn(
        'hidden lg:flex bg-white border-r border-slate-200 flex-col h-screen sticky top-0 transition-all duration-300',
        isCollapsed ? 'w-24' : 'max-w-64 w-full'
      )}
    >
      {/* Logo & Toggle */}
      <div className="px-6 py-8.5 flex items-center justify-between">
        {!isCollapsed && (
          <Link href="/">
            <Image
              src="/images/logo.svg"
              alt="Bouwmatcher"
              width={140}
              height={40}
              className="h-10 w-auto"
            />
          </Link>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={cn(
            'p-1.5 hover:bg-slate-100 rounded-lg transition-colors',
            isCollapsed && 'w-full flex justify-center'
          )}
          title={isCollapsed ? 'Expand' : 'Collapse'}
        >
          {isCollapsed ? (
            <ChevronRight className="w-4 h-4 text-slate-600" />
          ) : (
            <ChevronLeft className="w-4 h-4 text-slate-600" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-8.5">
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
                      isCollapsed && 'justify-center',
                      'hover:bg-primary/5 text-muted-foreground hover:text-primary',
                      isLoggingOut && 'opacity-50 cursor-not-allowed'
                    )}
                    title={isCollapsed ? getNavigationLabel(item) : undefined}
                  >
                    {renderIcon(item, false)}
                    {!isCollapsed && <span>{getNavigationLabel(item)}</span>}
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
                    isCollapsed && 'justify-center',
                    isActive
                      ? 'bg-primary text-white'
                      : 'hover:bg-primary/5 text-muted-foreground hover:text-primary'
                  )}
                  title={isCollapsed ? getNavigationLabel(item) : undefined}
                >
                  {renderIcon(item, isActive)}
                  {!isCollapsed && <span>{getNavigationLabel(item)}</span>}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Bottom Section */}
      <div className={cn('border-t border-neutral-200 py-4 px-4 space-y-4', isCollapsed && 'px-2')}>
        {/* Language Switcher */}
        {!isCollapsed && <SidebarLanguageSwitcher />}

        {/* Admin Badge */}
        {!isCollapsed && (
          <div className="px-4 py-3 bg-primary/5 rounded-lg">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">
                {t('common.adminDashboard.adminBadge', { defaultValue: 'Admin' })}
              </span>
            </div>
          </div>
        )}

        {isCollapsed && (
          <div className="flex justify-center">
            <div className="w-8 h-8 bg-primary/5 rounded-lg flex items-center justify-center">
              <ShieldCheck className="w-4 h-4 text-primary" />
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
