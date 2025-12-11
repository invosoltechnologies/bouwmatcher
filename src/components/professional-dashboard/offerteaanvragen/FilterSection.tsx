'use client';

import { useState } from 'react';
import { format } from 'date-fns';
import { nl } from 'date-fns/locale';
import { Calendar as CalendarIcon, Search } from 'lucide-react';
import { DateRange } from 'react-day-picker';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';

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
  const [date, setDate] = useState<DateRange | undefined>();

  const handleDateSelect = (selectedDate: DateRange | undefined) => {
    setDate(selectedDate);
    onDateRangeChange?.(selectedDate);
  };

  return (
    <div
      className="bg-white rounded-lg p-4 mb-6"
      style={{ boxShadow: '0px 5.5px 16.5px 0px #023AA214' }}
    >
      <div className="flex items-end gap-3">
        {/* Date Range */}
        <div className="flex-1">
          <Label className="mb-1.5 text-base text-secondary-foreground">
            Datum vanaf
          </Label>
          <Popover>
            <PopoverTrigger asChild>
              <button
                className={cn(
                  'w-full px-4 py-2 flex items-center justify-start gap-2 text-left font-normal border border-gray-300 rounded-lg bg-white hover:ring-2 hover:ring-primary hover:border-primary transition-all outline-none',
                  !date && 'text-muted-foreground'
                )}
              >
                <CalendarIcon className="h-4 w-4 text-foreground flex-shrink-0" />
                <span className="text-sm">
                  {date?.from ? (
                    date.to ? (
                      <>
                        {format(date.from, 'dd/MM/yyyy', { locale: nl })} -{' '}
                        {format(date.to, 'dd/MM/yyyy', { locale: nl })}
                      </>
                    ) : (
                      format(date.from, 'dd/MM/yyyy', { locale: nl })
                    )
                  ) : (
                    'mm/dd/yyyy'
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

        {/* Project Type */}
        <div className="flex-1">
          <Label className="mb-1.5 text-base text-secondary-foreground">
            Projecttype
          </Label>
          <Select value={projectType} onValueChange={onProjectTypeChange}>
            <SelectTrigger
              className="w-full px-4 py-2 bg-white border-gray-300 rounded-lg text-sm"
              iconWidth={10}
              iconHeight={10}
            >
              <SelectValue placeholder="Alle projecten" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Alle projecten</SelectItem>
              <SelectItem value="graffiti">Graffiti verwijdering</SelectItem>
              <SelectItem value="verf">Verf/coating verwijdering</SelectItem>
              <SelectItem value="gevel">Gevelrenovatie</SelectItem>
              <SelectItem value="asbest">Asbest verwijdering</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Search Input */}
        <div className="flex-1 relative">
          <Label className="mb-1.5 text-base text-secondary-foreground">
            Zoek op naam
          </Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Bijv. Peter"
              value={searchQuery}
              onChange={(e) => onSearchQueryChange(e.target.value)}
              className="w-full pl-10 py-2 border-gray-300 rounded-lg text-sm"
            />
          </div>
        </div>

        {/* Search Button */}
        <div className="flex-shrink-0">
          <Button onClick={onSearch} className="px-8 rounded-lg font-medium">
            Zoek
          </Button>
        </div>
      </div>
    </div>
  );
}
