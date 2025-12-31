'use client';

import { useQuery } from '@tanstack/react-query';
import {
  Users,
  CheckCircle2,
  Star,
  Briefcase,
  AlertCircle,
  FolderTree,
} from 'lucide-react';
import StatsCard from '@/components/admin-dashboard/StatsCard';
import ProfessionalsTable from '@/components/admin-dashboard/ProfessionalsTable';
import ReviewCard from '@/components/admin-dashboard/ReviewCard';
import ServiceCategoriesList from '@/components/admin-dashboard/ServiceCategoriesList';
import { useTranslations } from 'next-intl';

// Temporary mock data - will be replaced with API call
const mockStats = {
  totalProfessionals: 247,
  professionalsGrowth: '+12%',
  verificationRate: 89.2,
  verificationGrowth: '+3.5%',
  averageRating: 4.7,
  totalReviews: 534,
  activeProjects: 12,
  projectsGrowth: '+3.2%',
  pendingVerifications: 18,
  verificationsChange: '+5.5%',
  serviceCategories: 24,
};

const mockProfessionals = [
  {
    id: '1',
    name: 'Jan Janssen',
    email: 'jan@example.com',
    avatar: undefined,
    categories: ['Schilder', 'Stukadoor'],
    status: 'verified' as const,
    rating: 4.8,
    reviewCount: 23,
    registeredAt: '2024-12-15',
  },
  {
    id: '2',
    name: 'Sara Johnson',
    email: 'sara@example.com',
    avatar: undefined,
    categories: ['Installatiewerk', 'Loodgieter'],
    status: 'pending' as const,
    rating: 4.2,
    reviewCount: 8,
    registeredAt: '2024-12-18',
  },
  {
    id: '3',
    name: 'Mike Wilson',
    email: 'mike@example.com',
    avatar: undefined,
    categories: ['Loodgieter', 'Riool'],
    status: 'in_review' as const,
    rating: 3.1,
    reviewCount: 15,
    registeredAt: '2024-12-20',
  },
];

const mockReviews = [
  {
    rating: 5,
    reviewText:
      'Uitstekend loodgieterswerk! John was professioneel, op tijd en heeft het gebruik van het nieuwe systeem aan mij uitgelegd. Een echte top!',
    reviewerName: 'Emily Davis',
    professionalName: 'John Smith',
    date: '2024-12-28',
    status: 'approved' as const,
  },
  {
    rating: 1,
    reviewText:
      'Over het algemeen tevreden. Het duurde iets langer dan verwacht maar het resultaat was de moeite waard.',
    professionalName: 'Jane Pro',
    reviewerName: 'Mike Anderson',
    date: '2024-12-25',
    status: 'pending' as const,
  },
  {
    rating: 4,
    reviewText:
      'Over het algemeen tevreden. Het duurde iets langer dan verwacht maar het resultaat was de moeite waard.',
    reviewerName: 'Lisa Andrews',
    professionalName: 'Bob Builder',
    date: '2024-12-23',
    status: 'approved' as const,
  },
];

const mockCategories = [
  {
    id: '1',
    name: 'Schilder',
    professionalCount: 45,
    isActive: true,
  },
  {
    id: '2',
    name: 'Elektricien',
    professionalCount: 32,
    isActive: true,
  },
  {
    id: '3',
    name: 'Loodgieter',
    professionalCount: 28,
    isActive: true,
  },
  {
    id: '4',
    name: 'Aannemer',
    professionalCount: 15,
    isActive: true,
  },
  {
    id: '5',
    name: 'Interieurarchitect',
    professionalCount: 8,
    isActive: false,
  },
];

export default function AdminDashboardPage() {
  const t = useTranslations('common.adminDashboard');

  // In the future, this will fetch real data from the API
  // const { data: stats, isLoading } = useQuery({
  //   queryKey: ['admin-stats'],
  //   queryFn: () => fetch('/api/admin/stats').then(res => res.json()),
  // });

  return (
    <div className="space-y-6">
      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        <StatsCard
          icon={Users}
          iconColor="text-blue-600"
          iconBgColor="bg-blue-50"
          value={mockStats.totalProfessionals}
          label={t('stats.totalProfessionals', {
            defaultValue: 'Totaal professionals',
          })}
          change={{
            value: mockStats.professionalsGrowth,
            isPositive: true,
          }}
        />

        <StatsCard
          icon={CheckCircle2}
          iconColor="text-green-600"
          iconBgColor="bg-green-50"
          value={mockStats.verificationRate}
          label={t('stats.verificationRate', {
            defaultValue: 'Verificatiepercentage',
          })}
          suffix="%"
          change={{
            value: mockStats.verificationGrowth,
            isPositive: true,
          }}
        />

        <StatsCard
          icon={Star}
          iconColor="text-yellow-600"
          iconBgColor="bg-yellow-50"
          value={mockStats.averageRating}
          label={t('stats.averageRating', {
            defaultValue: 'Gemiddelde beoordeling',
          })}
          suffix={`(${mockStats.totalReviews} beoordelingen)`}
        />

        <StatsCard
          icon={Briefcase}
          iconColor="text-purple-600"
          iconBgColor="bg-purple-50"
          value={mockStats.activeProjects}
          label={t('stats.activeProjects', {
            defaultValue: 'Huidige week',
          })}
          change={{
            value: mockStats.projectsGrowth,
            isPositive: true,
          }}
        />

        <StatsCard
          icon={AlertCircle}
          iconColor="text-orange-600"
          iconBgColor="bg-orange-50"
          value={mockStats.pendingVerifications}
          label={t('stats.pendingVerifications', {
            defaultValue: 'Huurt aanvullingsverzoek',
          })}
          change={{
            value: mockStats.verificationsChange,
            isPositive: true,
          }}
        />

        <StatsCard
          icon={FolderTree}
          iconColor="text-teal-600"
          iconBgColor="bg-teal-50"
          value={mockStats.serviceCategories}
          label={t('stats.serviceCategories', {
            defaultValue: 'Vacatureaanvraagactiviteit',
          })}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Takes 2/3 width */}
        <div className="lg:col-span-2 space-y-6">
          {/* Recent Professionals Table */}
          <ProfessionalsTable
            professionals={mockProfessionals}
            onViewProfile={(id) => console.log('View profile:', id)}
          />

          {/* Recent Reviews */}
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <div className="mb-4">
              <h2 className="text-lg md:text-xl font-semibold text-secondary-foreground">
                {t('recentReviews', { defaultValue: 'Recente beoordelingen' })}
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                {t('recentReviewsDesc', {
                  defaultValue: 'Laatst toegevoegde reviews',
                })}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {mockReviews.map((review, idx) => (
                <ReviewCard key={idx} {...review} />
              ))}
            </div>

            {/* Show all link */}
            <div className="mt-4 pt-4 border-t border-slate-200 text-center">
              <button className="text-primary font-medium hover:underline">
                {t('viewAllReviews', { defaultValue: 'Bekijk alles' })}
              </button>
            </div>
          </div>
        </div>

        {/* Right Column - Takes 1/3 width */}
        <div className="lg:col-span-1">
          <ServiceCategoriesList
            categories={mockCategories}
            onViewAll={(categoryId) =>
              console.log('View all for category:', categoryId)
            }
          />
        </div>
      </div>
    </div>
  );
}
