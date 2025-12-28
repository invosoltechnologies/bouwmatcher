'use client';

import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
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
            <h1 className="text-2xl leading-tight text-secondary-foreground">
              {pageTitle}
            </h1>
            <p className="text-base text-muted-foreground leading-normal font-montserrat">
              {pageDescription}
            </p>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu className="h-6 w-6" />
            <span className="sr-only">Open menu</span>
          </Button>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <MobileSidebar open={mobileMenuOpen} onOpenChange={setMobileMenuOpen} />
    </>
  );
}
