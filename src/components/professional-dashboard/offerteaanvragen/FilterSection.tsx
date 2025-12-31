'use client';

import { useState } from 'react';
import { format } from 'date-fns';
import { nl, enUS } from 'date-fns/locale';
import { useTranslations, useLocale } from 'next-intl';
import { Calendar as CalendarIcon, Search } from 'lucide-react';
import { DateRange } from 'react-day-picker';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { useSubcategories } from '@/lib/hooks/professional/subcategories';

interface FilterSectionProps {
  projectType: string;
  searchQuery: string;
  onProjectTypeChange: (value: string) => void;
  onSearchQueryChange: (value: string) => void;
  onSearch: () => void;
  onDateRangeChange?: (range: DateRange | undefined) => void;
}

export default function FilterSection({
  projectType,
  searchQuery,
  onProjectTypeChange,
  onSearchQueryChange,
  onSearch,
  onDateRangeChange,
}: FilterSectionProps) {
  const t = useTranslations('common.proDashboard.offerteaanvragen.filterSection');
  const locale = useLocale();
  const dateLocale = locale === 'en' ? enUS : nl;

  const [date, setDate] = useState<DateRange | undefined>();

  // Fetch professional's selected subcategories
  const { data: subcategoriesData, isLoading: isLoadingSubcategories } = useSubcategories();

  const handleDateSelect = (selectedDate: DateRange | undefined) => {
    setDate(selectedDate);
    onDateRangeChange?.(selectedDate);
  };

  return (
    <div
      className="bg-white rounded-lg p-3 sm:p-4 mb-4 sm:mb-6"
      style={{ boxShadow: '0px 5.5px 16.5px 0px #023AA214' }}
    >
      <div className="flex flex-col lg:flex-row items-stretch lg:items-end gap-3">
        {/* Date Range */}
        <div className="flex-1">
          <Label className="mb-1.5 text-sm sm:text-base text-secondary-foreground">
            {t('dateFromLabel')}
          </Label>
          <Popover>
            <PopoverTrigger asChild>
              <button
                className={cn(
                  'w-full px-3 sm:px-4 py-2 flex items-center justify-start gap-2 text-left font-normal border border-gray-300 rounded-lg bg-white hover:ring-2 hover:ring-primary hover:border-primary transition-all outline-none',
                  !date && 'text-muted-foreground'
                )}
              >
                <CalendarIcon className="h-3 w-3 sm:h-4 sm:w-4 text-foreground flex-shrink-0" />
                <span className="text-xs sm:text-sm">
                  {date?.from ? (
                    date.to ? (
                      <>
                        {format(date.from, 'dd/MM/yyyy', { locale: dateLocale })} -{' '}
                        {format(date.to, 'dd/MM/yyyy', { locale: dateLocale })}
                      </>
                    ) : (
                      format(date.from, 'dd/MM/yyyy', { locale: dateLocale })
                    )
                  ) : (
                    t('datePlaceholder')
                  )}
                </span>
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="range"
                selected={date}
                onSelect={handleDateSelect}
                disabled={(date) => date > new Date()}
                numberOfMonths={2}
                classNames={{
                  today: cn(
                    'border border-accent text-accent-foreground rounded-full'
                  ),
                  range_start: cn('rounded-l-md bg-primary text-white'),
                  range_end: cn('rounded-r-md bg-primary text-white'),
                  range_middle: cn('rounded-none bg-primary/40'),
                  day_button: cn(
                    'data-[selected-single=true]:bg-primary data-[selected-single=true]:text-white'
                  ),
                }}
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Project Type - Dynamic Subcategories */}
        <div className="flex-1">
          <Label className="mb-1.5 text-sm sm:text-base text-secondary-foreground">
            {t('projectTypeLabel')}
          </Label>
          <Select
            value={projectType}
            onValueChange={onProjectTypeChange}
            disabled={isLoadingSubcategories}
          >
            <SelectTrigger
              className="w-full px-3 sm:px-4 py-2 bg-white border-gray-300 rounded-lg text-xs sm:text-sm"
              iconWidth={10}
              iconHeight={10}
            >
              <SelectValue placeholder={t('projectTypePlaceholder')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t('allProjects')}</SelectItem>
              {subcategoriesData?.subcategories?.map((subcategory) => {
                const subcategoryName = locale === 'en'
                  ? subcategory.service_subcategories.name_en
                  : subcategory.service_subcategories.name_nl;

                return (
                  <SelectItem
                    key={subcategory.id}
                    value={subcategory.subcategory_id.toString()}
                  >
                    {subcategoryName}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>

        {/* Search Input */}
        <div className="flex-1 relative">
          <Label className="mb-1.5 text-sm sm:text-base text-secondary-foreground">
            {t('searchLabel')}
          </Label>
          <div className="relative">
            <Search className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder={t('searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => onSearchQueryChange(e.target.value)}
              className="w-full pl-8 sm:pl-10 py-2 border-gray-300 rounded-lg text-xs sm:text-sm"
            />
          </div>
        </div>

        {/* Search Button */}
        <div className="w-full lg:w-auto lg:flex-shrink-0">
          <Button onClick={onSearch} className="w-full lg:w-auto px-6 sm:px-8 rounded-lg font-medium text-sm sm:text-base">
            {t('searchButton')}
          </Button>
        </div>
      </div>
    </div>
  );
}
