'use client';

import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { dashboardNavigation } from '@/config/professional-dashboard';
import { cn } from '@/lib/utils';
import SidebarLanguageSwitcher from './SidebarLanguageSwitcher';
import UserProfile from './UserProfile';

export default function DashboardSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    // TODO: Implement logout logic
    console.log('Logout clicked');
    router.push('/');
  };

  const handleNavigation = (item: typeof dashboardNavigation[0]) => {
    if (item.type === 'action' && item.id === 'logout') {
      handleLogout();
    }
  };

  return (
    <aside className="w-[280px] bg-white border-r border-neutral-200 flex flex-col h-screen sticky top-0">
      {/* Logo */}
      <div className="px-6 py-8">
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
      <nav className="flex-1 px-4">
        <ul className="space-y-1">
          {dashboardNavigation.map((item) => {
            const isActive = pathname === item.href;
            const isActionItem = item.type === 'action';

            if (isActionItem) {
              return (
                <li key={item.id}>
                  <button
                    onClick={() => handleNavigation(item)}
                    className={cn(
                      'w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors',
                      'hover:bg-neutral-50 text-neutral-700 hover:text-neutral-900'
                    )}
                  >
                    <Image
                      src={item.icon}
                      alt={item.label}
                      width={20}
                      height={20}
                      className="w-5 h-5"
                    />
                    <span>{item.label}</span>
                  </button>
                </li>
              );
            }

            return (
              <li key={item.id}>
                <Link
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-primary text-white'
                      : 'hover:bg-neutral-50 text-neutral-700 hover:text-neutral-900'
                  )}
                >
                  <Image
                    src={item.icon}
                    alt={item.label}
                    width={20}
                    height={20}
                    className={cn('w-5 h-5', isActive && 'brightness-0 invert')}
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
        <UserProfile />
      </div>
    </aside>
  );
}
