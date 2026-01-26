'use client';

import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Menu } from 'lucide-react';
import AdminMobileSidebar from './AdminMobileSidebar';
import { adminPageConfigs } from '@/config/admin-dashboard';

export default function AdminTopBar() {
  const pathname = usePathname();
  const t = useTranslations('common.adminDashboard.pages');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Extract the section from pathname (e.g., /admin-dashboard/professionals -> professionals)
  const pathParts = pathname.split('/').filter(Boolean);
  const adminDashboardIndex = pathParts.findIndex(part => part === 'admin-dashboard');
  let section = pathParts[adminDashboardIndex + 1] || 'dashboard';

  // Handle root admin-dashboard path
  if (section === 'admin-dashboard' || pathname.endsWith('/admin-dashboard')) {
    section = 'dashboard';
  }

  // Handle nested routes (e.g., /admin-dashboard/service-categories/form)
  if (pathname.includes('/service-categories/form')) {
    section = 'service-categories-form';
  }

  // Handle detail pages with IDs (e.g., /admin-dashboard/professionals/[id])
  // Check if the section looks like a UUID or ID (contains hyphens and numbers/letters)
  const nextPart = pathParts[adminDashboardIndex + 2];
  if (nextPart && /^[a-f0-9-]{36}$/i.test(nextPart)) {
    // This is a detail page, keep the section name (professionals, not the UUID)
    section = pathParts[adminDashboardIndex + 1];
  }

  // Get page config - use translation with fallback to config
  const config = adminPageConfigs[section];
  const pageTitle = t(`${section}.title` as any, {
    defaultValue: config?.title || 'Admin Dashboard',
  });
  const pageDescription = t(`${section}.description` as any, {
    defaultValue: config?.description || 'Manage your platform',
  });

  return (
    <>
      <div className="bg-white border-b border-slate-200 px-6 py-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1">
            <h1 className="text-base md:text-2xl leading-tight text-secondary-foreground">
              {pageTitle}
            </h1>
            <p className="text-xs md:text-base text-muted-foreground leading-normal font-montserrat">
              {pageDescription}
            </p>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="lg:hidden p-2 text-primary hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <AdminMobileSidebar
        open={mobileMenuOpen}
        onOpenChange={setMobileMenuOpen}
      />
    </>
  );
}
