'use client';

import { Lock, Unlock, Clock } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface FilterTabsProps {
  activeTab: 'vergrendeld' | 'ontgrendeld' | 'laatste10';
  onTabChange: (tab: 'vergrendeld' | 'ontgrendeld' | 'laatste10') => void;
}

export default function FilterTabs({ activeTab, onTabChange }: FilterTabsProps) {
  const t = useTranslations('common.proDashboard.offerteaanvragen.filterTabs');

  const tabs = [
    { id: 'vergrendeld' as const, label: t('locked'), icon: Lock },
    { id: 'ontgrendeld' as const, label: t('unlocked'), icon: Unlock },
    { id: 'laatste10' as const, label: t('last10'), icon: Clock },
  ];

  return (
    <div className="flex flex-wrap gap-2 sm:gap-3 mb-4 sm:mb-5">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 sm:py-2.5 rounded-full font-medium text-xs sm:text-sm transition-all ${
              isActive
                ? 'bg-primary text-white'
                : 'bg-white text-foreground hover:bg-gray-50 border border-gray-300'
            }`}
          >
            <Icon className="w-3 h-3 sm:w-4 sm:h-4" />
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
