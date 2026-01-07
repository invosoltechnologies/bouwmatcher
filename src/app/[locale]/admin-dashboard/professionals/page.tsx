'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, X } from 'lucide-react';
import ProfessionalsTable from '@/components/admin-dashboard/ProfessionalsTable';
import { useProfessionals } from '@/lib/hooks/admin/professionals';
import { useTranslations } from 'next-intl';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useDebounce } from '@/hooks/useDebounce';

export default function ProfessionalsPage() {
  const t = useTranslations('common.adminDashboard');
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedRating, setSelectedRating] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Debounce search query to prevent API calls on every keystroke
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  const { data, isLoading, error } = useProfessionals({
    limit: 50,
    sortBy: 'created_at',
    sortOrder: 'desc',
    search: debouncedSearchQuery || undefined,
    status: selectedStatus !== 'all' ? selectedStatus : undefined,
  });

  // Transform API response to table format and apply local filters
  const transformedProfessionals = useMemo(() => {
    if (!data?.professionals) return [];

    let filtered = data.professionals.map((professional) => ({
      id: professional.id,
      name: `${professional.first_name} ${professional.last_name}`,
      email: professional.email,
      avatar: professional.profile_picture_url && professional.profile_picture_url.trim() !== ''
        ? professional.profile_picture_url
        : undefined,
      categories: professional.categories?.map((cat) => cat.name) || [],
      status: professional.status,
      rating: professional.rating,
      reviewCount: professional.review_count,
      registeredAt: new Date(professional.created_at).toISOString().split('T')[0],
    }));

    // Apply category filter
    if (selectedCategory && selectedCategory !== 'all') {
      filtered = filtered.filter((p) =>
        p.categories.some((cat) => cat === selectedCategory)
      );
    }

    // Apply rating filter
    if (selectedRating && selectedRating !== 'all') {
      const [minRating, maxRating] = selectedRating.split('-').map(Number);
      filtered = filtered.filter((p) => {
        if (maxRating === undefined) {
          return p.rating >= minRating;
        }
        return p.rating >= minRating && p.rating < maxRating;
      });
    }

    return filtered;
  }, [data, selectedCategory, selectedRating]);

  // Get unique categories from data
  const uniqueCategories = useMemo(() => {
    if (!data?.professionals) return [];
    const categories = new Set<string>();
    data.professionals.forEach((p) => {
      p.categories?.forEach((cat) => {
        categories.add(cat.name);
      });
    });
    return Array.from(categories).sort();
  }, [data]);

  // Only show loading on initial load, not during refetches
  if (isLoading && !data) {
    return (
      <div className="space-y-6 p-6">
        <div className="text-center py-12">
          <p className="text-slate-500">Bezig met laden...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6 p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-700">Fout bij het laden van professionals</p>
        </div>
      </div>
    );
  }

  const hasActiveFilters = searchQuery || selectedStatus !== 'all' || selectedRating !== 'all' || selectedCategory !== 'all';

  return (
    <>
      {/* Filters Section */}
      <div className='bg-white rounded-t-lg border border-slate-200 border-b-0 p-6 space-y-4'>
        <div className='flex flex-col sm:flex-row gap-3 items-end'>
          {/* Search Input */}
          <div className='flex-1 relative'>
            <Search className='absolute left-3 top-2.5 w-4 h-4 text-slate-400' />
            <Input
              placeholder='Zoeken op naam of e-mail...'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className='pl-10 bg-slate-50 border-slate-300'
            />
          </div>

          {/* Status Filter */}
          <Select
            value={selectedStatus}
            onValueChange={setSelectedStatus}
          >
            <SelectTrigger className='w-full sm:w-[180px] bg-slate-50 border-slate-300' iconWidth={16} iconHeight={16}>
              <SelectValue placeholder='Status' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='all'>Alle statussen</SelectItem>
              <SelectItem value='verified'>Geverifieerd</SelectItem>
              <SelectItem value='pending'>In afwachting</SelectItem>
              <SelectItem value='in_review'>In review</SelectItem>
              <SelectItem value='rejected'>Afgewezen</SelectItem>
              <SelectItem value='suspended'>Geschorst</SelectItem>
              <SelectItem value='unverified'>Niet geverifieerd</SelectItem>
            </SelectContent>
          </Select>

          {/* Category Filter */}
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className='w-full sm:w-[180px] bg-slate-50 border-slate-300' iconWidth={16} iconHeight={16}>
              <SelectValue placeholder='Categorie' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='all'>Alle categorieën</SelectItem>
              {uniqueCategories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Rating Filter */}
          <Select value={selectedRating} onValueChange={setSelectedRating}>
            <SelectTrigger className='w-full sm:w-[180px] bg-slate-50 border-slate-300' iconWidth={16} iconHeight={16}>
              <SelectValue placeholder='Beoordeling' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='all'>Alle beoordelingen</SelectItem>
              <SelectItem value='4-5'>★★★★★ (4-5)</SelectItem>
              <SelectItem value='3-4'>★★★ (3-4)</SelectItem>
              <SelectItem value='2-3'>★★ (2-3)</SelectItem>
              <SelectItem value='1-2'>★ (1-2)</SelectItem>
              <SelectItem value='0-1'>(0-1)</SelectItem>
            </SelectContent>
          </Select>

          {/* Reset Filters Button */}
          {hasActiveFilters && (
            <Button
              variant='outline'
              onClick={() => {
                setSearchQuery('');
                setSelectedStatus('all');
                setSelectedRating('all');
                setSelectedCategory('all');
              }}
              className='h-9 gap-2 whitespace-nowrap'
            >
              <X className='w-4 h-4' />
              Reset
            </Button>
          )}
        </div>
      </div>

      <ProfessionalsTable
        professionals={transformedProfessionals}
        onViewProfile={(id) => console.log('View profile:', id)}
        showActionButton={false}
        showHeader={false}
      />
    </>
  );
}
