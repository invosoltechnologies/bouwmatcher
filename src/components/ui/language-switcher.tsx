'use client';
import { useState } from 'react';

export default function LanguageSwitcher() {
  const [selectedLanguage, setSelectedLanguage] = useState('NL');

  return (
    <div className='flex items-center'>
      <div
        className='bg-[#F8F8F8] border border-gray-200 rounded-lg p-1 flex'
        style={{ borderRadius: '8px' }}
      >
        <button 
          onClick={() => setSelectedLanguage('NL')}
          className={`px-4 py-2 text-sm font-medium cursor-pointer transition-all ${
            selectedLanguage === 'NL' 
              ? 'bg-white text-primary border border-[#EFEFEF] rounded-md' 
              : 'text-gray-600'
          }`}
          style={{ 
            borderRadius: '6px',
            boxShadow: selectedLanguage === 'NL' ? '0px 1px 2px 0px #0000000D' : 'none'
          }}
        >
          NL
        </button>
        <button 
          onClick={() => setSelectedLanguage('EN')}
          className={`px-4 py-2 text-sm font-medium cursor-pointer transition-all ${
            selectedLanguage === 'EN' 
              ? 'bg-white text-primary border border-[#EFEFEF] rounded-md' 
              : 'text-gray-600'
          }`}
          style={{ 
            borderRadius: '6px',
            boxShadow: selectedLanguage === 'EN' ? '0px 1px 2px 0px #0000000D' : 'none'
          }}
        >
          EN
        </button>
      </div>
    </div>
  );
}