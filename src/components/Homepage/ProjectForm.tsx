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
    <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
      <div className="flex flex-col lg:flex-row gap-6 items-start">
        {/* Category Dropdown */}
        <div className="flex-1 space-y-3">
          <div className="flex items-center gap-2">
            <Image src="/icons/stack-icon.svg" width={20} height={20} alt="Category" />
            <label className="text-foreground font-medium text-base">Categorie</label>
          </div>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="h-14 px-4 py-[22px] bg-white border-gray-200 rounded-xl text-base [&_svg]:text-black [&_svg]:w-[19px] [&_svg]:h-[11px]">
              <SelectValue placeholder="Selecteer categorie" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Postcode Input */}
        <div className="flex-1 space-y-3">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-primary" />
            <label className="text-foreground font-medium text-base">Postcode</label>
          </div>
          <Input
            type="text"
            placeholder="1000 AB"
            value={postcode}
            onChange={(e) => setPostcode(e.target.value)}
            className="h-14 px-4 py-[22px] bg-white border-gray-200 rounded-xl text-base"
          />
        </div>

        {/* Execution Date Dropdown */}
        <div className="flex-1 space-y-3">
          <div className="flex items-center gap-2">
            <Image src="/icons/clock-icon.svg" width={20} height={20} alt="Date" />
            <label className="text-foreground font-medium text-base">Uitvoerdatum</label>
          </div>
          <Select value={executionDate} onValueChange={setExecutionDate}>
            <SelectTrigger className="h-14 px-4 py-[22px] bg-white border-gray-200 rounded-xl text-base [&_svg]:text-black [&_svg]:w-[19px] [&_svg]:h-[11px]">
              <SelectValue placeholder="Zo snel mogelijk" />
            </SelectTrigger>
            <SelectContent>
              {executionDates.map((date) => (
                <SelectItem key={date} value={date}>
                  {date}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Submit Button */}
        <div className="flex-shrink-0">
          <Button 
            className="bg-accent hover:bg-accent/90 text-white px-8 py-4 h-14 rounded-xl font-medium text-base flex items-center gap-3"
          >
            <Search className="w-6 h-6" />
            Project starten
          </Button>
        </div>
      </div>
    </div>
  );
}