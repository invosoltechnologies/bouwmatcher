'use client';

import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Menu } from 'lucide-react';
import MobileSidebar from './MobileSidebar';

export default function DashboardTopBar() {
  const pathname = usePathname();
  const t = useTranslations('common.proDashboard.pages');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Extract the section from pathname (e.g., /pro-dashboard/account -> account)
  const section = pathname.split('/').pop() || 'account';

  // Check if translation exists for this section
  const pageTitle = t(`${section}.title` as any);
  const pageDescription = t(`${section}.description` as any);

  if (!pageTitle) {
    return null;
  }

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
      <MobileSidebar open={mobileMenuOpen} onOpenChange={setMobileMenuOpen} />
    </>
  );
}
