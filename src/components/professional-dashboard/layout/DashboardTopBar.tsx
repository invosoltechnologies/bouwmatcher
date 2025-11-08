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
    <div className="bg-white border-b border-neutral-200 px-8 py-6">
      <h1 className="text-2xl font-semibold text-slate-900 mb-1">
        {pageConfig.title}
      </h1>
      <p className="text-base text-neutral-600">
        {pageConfig.description}
      </p>
    </div>
  );
}
