'use client';

import { useState } from 'react';
import { DateRange } from 'react-day-picker';
import VerificationBanner from './VerificationBanner';
import FilterSection from './FilterSection';
import FilterTabs from './FilterTabs';
import QuotationRequestCard from './QuotationRequestCard';
import QuotationSidebar from './QuotationSidebar';

export default function OfferteaanvragenPageClient() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [projectType, setProjectType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'vergrendeld' | 'ontgrendeld' | 'laatste10'>('vergrendeld');

  const handleSearch = () => {
    // TODO: Implement search functionality
    console.log('Search:', { dateRange, projectType, searchQuery });
  };

  const handleDateRangeChange = (range: DateRange | undefined) => {
    setDateRange(range);
  };

  // Mock data - Replace with actual data from API
  const quotationRequests = [
    {
      id: 1,
      title: 'Graffiti, verf of coating verwijderen in Amsterdam',
      author: 'E. Goudriaan',
      date: '27 sep',
      isLocked: true,
      hasPhotos: true,
      photoCount: 3,
      isAvailable: true,
    },
    {
      id: 2,
      title: 'Gevelrenovatie of voegrenoatie in Amstelveen',
      author: 'E. van der Laan',
      date: '27 sep',
      isLocked: true,
      hasPhotos: false,
      isAvailable: false,
    },
    {
      id: 3,
      title: 'Graffiti, verf of coating verwijderen in Amsterdam',
      author: 'A. Rabhi',
      date: '26 sep',
      isLocked: true,
      hasPhotos: true,
      photoCount: 3,
      isAvailable: true,
    },
    {
      id: 4,
      title: 'Asbest verwijderen in Amsterdam',
      author: 'N. Boermans',
      date: '26 sep',
      isLocked: true,
      hasPhotos: true,
      photoCount: 3,
      isAvailable: true,
    },
    {
      id: 5,
      title: 'Asbest verwijderen in Amsterdam',
      author: 'X. Buskap',
      date: '26 sep',
      isLocked: true,
      hasPhotos: false,
      isAvailable: false,
    },
    {
      id: 6,
      title: 'Asbest verwijderen in Amsterdam',
      author: 'X. Buskap',
      date: '26 sep',
      isLocked: true,
      hasPhotos: false,
      isAvailable: false,
    },
  ];

  return (
    <div className="w-full">
      <div className="flex gap-6">
        {/* Main Content */}
        <div className="flex-1">
          {/* Verification Banner */}
          <VerificationBanner />

          {/* Filter Section */}
          <FilterSection
            projectType={projectType}
            searchQuery={searchQuery}
            onProjectTypeChange={setProjectType}
            onSearchQueryChange={setSearchQuery}
            onSearch={handleSearch}
            onDateRangeChange={handleDateRangeChange}
          />

          {/* Parent Card for Filter Tabs and Quotation Cards */}
          <div
            className="bg-white rounded-xl p-5"
            style={{ boxShadow: '0px 5.5px 16.5px 0px #023AA214' }}
          >
            {/* Filter Tabs */}
            <FilterTabs activeTab={activeTab} onTabChange={setActiveTab} />

            {/* Quotation Request Cards */}
            <div className="space-y-3">
              {quotationRequests.map((request) => (
                <QuotationRequestCard
                  key={request.id}
                  title={request.title}
                  author={request.author}
                  date={request.date}
                  isLocked={request.isLocked}
                  hasPhotos={request.hasPhotos}
                  photoCount={request.photoCount}
                  isAvailable={request.isAvailable}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <QuotationSidebar
          accountName="Alex Militaru"
          location="Hotspot Amsterdam Noord"
          accountStatus="Verificatie vereist"
          workArea="Radius 15 km vanuit Markerplein 1, 1011 MV Amsterdam, Nederland"
        />
      </div>
    </div>
  );
}
