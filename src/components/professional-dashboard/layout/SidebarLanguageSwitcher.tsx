'use client';

import { useState } from 'react';

export default function SidebarLanguageSwitcher() {
  const [selectedLanguage, setSelectedLanguage] = useState('NL');

  return (
    <div className="flex items-center justify-center">
      <div
        className="bg-slate-50 border border-slate-200 rounded-full p-1 flex gap-1"
      >
        <button
          onClick={() => setSelectedLanguage('NL')}
          className={`px-4 py-2 text-sm font-medium rounded-full transition-all ${
            selectedLanguage === 'NL'
              ? 'bg-white text-primary shadow-sm'
              : 'text-neutral-600 hover:text-neutral-900'
          }`}
        >
          NL
        </button>
        <button
          onClick={() => setSelectedLanguage('EN')}
          className={`px-4 py-2 text-sm font-medium rounded-full transition-all ${
            selectedLanguage === 'EN'
              ? 'bg-white text-primary shadow-sm'
              : 'text-neutral-600 hover:text-neutral-900'
          }`}
        >
          EN
        </button>
      </div>
    </div>
  );
}
