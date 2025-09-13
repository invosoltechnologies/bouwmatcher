'use client';
import { useState } from 'react';
import { MapPin, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Image from 'next/image';

export default function ProjectForm() {
  const [category, setCategory] = useState('');
  const [postcode, setPostcode] = useState('');
  const [executionDate, setExecutionDate] = useState('');

  const categories = [
    'Badkamer renovatie',
    'Keuken installatie', 
    'Vloer leggen',
    'Schilderwerk',
    'Dakwerken',
    'Elektriciteit',
    'Loodgieterij',
    'Tuinwerken'
  ];

  const executionDates = [
    'Zo snel mogelijk',
    'Binnen 1 maand',
    'Binnen 3 maanden', 
    'Binnen 6 maanden',
    'Over meer dan 6 maanden',
    'Nog niet beslist'
  ];

  return (
    <div
      className='bg-white/90 rounded-3xl shadow-lg p-8 border border-white/50'
      style={{ boxShadow: '0px 15px 35px 0px #00000040' }}
    >
      <div className='w-full flex justify-between items-end gap-6'>
        {/* Form inputs div */}
        <div className='w-full flex items-start justify-start gap-6'>
          {/* Category Dropdown */}
          <div className='w-full'>
            <div className='flex items-center gap-2 mb-3'>
              <Image
                src='/icons/stack-icon.svg'
                width={20}
                height={20}
                alt='Category'
              />
              <label className='text-foreground font-medium text-base'>
                Categorie
              </label>
            </div>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className=' min-w-[253px] font-montserrat cursor-pointer min-h-14 px-3 py-[22px] bg-white border-gray-200 rounded-[12px] text-base'>
                <SelectValue placeholder='Selecteer categorie' />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat} className='font-montserrat'>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Postcode Input */}
          <div className='w-full'>
            <div className='flex items-center gap-2 mb-3'>
              <MapPin className='w-5 h-5 text-primary' />
              <label className='text-foreground font-medium text-base'>
                Postcode
              </label>
            </div>
            <Input
              type='text'
              placeholder='1000 AB'
              value={postcode}
              onChange={(e) => setPostcode(e.target.value)}
              className='font-montserrat min-w-[253px] min-h-14 px-4 py-[22px] bg-white border-gray-200 rounded-xl text-base'
            />
          </div>

          {/* Execution Date Dropdown */}
          <div className='w-full'>
            <div className='flex items-center gap-2 mb-3'>
              <Image
                src='/icons/clock-icon.svg'
                width={20}
                height={20}
                alt='Date'
              />
              <label className='text-foreground font-medium text-base'>
                Uitvoerdatum
              </label>
            </div>
            <Select value={executionDate} onValueChange={setExecutionDate}>
              <SelectTrigger className='font-montserrat min-w-[253px] min-h-14  px-4 py-[22px] bg-white border-gray-200 rounded-xl text-base'>
                <SelectValue placeholder='Zo snel mogelijk' />
              </SelectTrigger>
              <SelectContent>
                {executionDates.map((date) => (
                  <SelectItem
                    key={date}
                    value={date}
                    className='font-montserrat'
                  >
                    {date}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Button div */}
        <div className='w-full flex justify-center'>
          <Button className='bg-accent hover:bg-accent/90 text-white px-14 py-4 min-w-64 h-14 rounded-[12px] font-medium text-base flex items-center gap-3'>
            <Search className='w-6 h-6' />
            Project starten
          </Button>
        </div>
      </div>
    </div>
  );
}