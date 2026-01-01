'use client';

import {
  HardDrive,
  CheckCircle2,
  Star,
  UserRoundX,
  Clock,
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
      <div className="flex flex-wrap gap-6">
        <StatsCard
          icon={HardDrive}
          iconColor="text-blue-600"
          iconBgColor="bg-blue-50"
          value={mockStats.totalProfessionals}
          label={t('stats.newLeads', { defaultValue: 'Nieuwe leads (30d)' })}
          change={{
            value: '12%',
            isPositive: true,
          }}
          bottomText={t('stats.newLeadsChange', {
            defaultValue: '+23 versus vorige maand',
          })}
          bottomTextColor="text-green-600"
        />

        <StatsCard
          icon={CheckCircle2}
          iconColor="text-green-600"
          iconBgColor="bg-green-50"
          value={`${mockStats.verificationRate}%`}
          label={t('stats.verificationRate', {
            defaultValue: 'Verificatiepercentage',
          })}
          change={{
            value: '8%',
            isPositive: true,
          }}
          bottomText={t('stats.verificationRateDetails', {
            defaultValue: '150 van 175 goedgekeurd',
          })}
          bottomTextColor="text-green-600"
        />

        <StatsCard
          icon={Star}
          iconColor="text-yellow-600"
          iconBgColor="bg-yellow-50"
          value={mockStats.averageRating}
          label={t('stats.averageRating', {
            defaultValue: 'Gemiddelde beoordeling',
          })}
          change={{
            value: '3%',
            isPositive: true,
          }}
          bottomText={t('stats.averageRatingDetails', {
            defaultValue: 'Uit 1.234 beoordelingen',
          })}
          bottomTextColor="text-amber-600"
        />

        <StatsCard
          icon={UserRoundX}
          iconColor="text-red-600"
          iconBgColor="bg-red-50"
          value={mockStats.activeProjects}
          label={t('stats.blockedProfessionals', {
            defaultValue: 'Geblokkeerde professionals',
          })}
          change={{
            value: '2%',
            isPositive: true,
          }}
          bottomText={t('stats.blockedProfessionalsChange', {
            defaultValue: '+1 deze week',
          })}
          bottomTextColor="text-green-600"
        />

        <StatsCard
          icon={Clock}
          iconColor="text-cyan-600"
          iconBgColor="bg-cyan-50"
          value={mockStats.pendingVerifications}
          label={t('stats.moderationQueue', {
            defaultValue: 'Moderatiewachtrij',
          })}
          change={{
            value: '5%',
            isPositive: true,
          }}
          bottomText={t('stats.moderationQueueDetails', {
            defaultValue: 'Heeft aandacht nodig',
          })}
          bottomTextColor="text-red-600"
        />
      </div>

      {/* Recent Professionals Table - Full Width */}
      <ProfessionalsTable
        professionals={mockProfessionals}
        onViewProfile={(id) => console.log('View profile:', id)}
      />

      {/* Bottom Grid - Reviews and Service Categories */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Reviews - Left Column */}
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

          <div className="space-y-4">
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

        {/* Service Categories - Right Column */}
        <ServiceCategoriesList />
      </div>
    </div>
  );
}
