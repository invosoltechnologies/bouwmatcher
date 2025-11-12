'use client';

import { Lock, Unlock, Clock } from 'lucide-react';

interface FilterTabsProps {
  activeTab: 'vergrendeld' | 'ontgrendeld' | 'laatste10';
  onTabChange: (tab: 'vergrendeld' | 'ontgrendeld' | 'laatste10') => void;
}

export default function FilterTabs({ activeTab, onTabChange }: FilterTabsProps) {
  const tabs = [
    { id: 'vergrendeld' as const, label: 'Vergrendeld', icon: Lock },
    { id: 'ontgrendeld' as const, label: 'Ontgrendeld', icon: Unlock },
    { id: 'laatste10' as const, label: 'Laatste 10', icon: Clock },
  ];

  return (
    <div className="flex gap-3 mb-5">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-medium text-sm transition-all ${
              isActive
                ? 'bg-primary text-white'
                : 'bg-white text-foreground hover:bg-gray-50 border border-gray-300'
            }`}
          >
            <Icon className="w-4 h-4" />
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
