'use client';

import { usePathname } from 'next/navigation';
import { pageConfigs } from '@/config/professional-dashboard';

export default function DashboardTopBar() {
  const pathname = usePathname();

  // Extract the section from pathname (e.g., /pro-dashboard/account -> account)
  const section = pathname.split('/').pop() || 'account';
  const pageConfig = pageConfigs[section];

  if (!pageConfig) {
    return null;
  }

  return (
    <div className="bg-white border-b border-slate-200 px-6 py-4">
      <h1 className="text-2xl leading-tight text-secondary-foreground">
        {pageConfig.title}
      </h1>
      <p className="text-base text-muted-foreground leading-normal font-montserrat">
        {pageConfig.description}
      </p>
    </div>
  );
}
