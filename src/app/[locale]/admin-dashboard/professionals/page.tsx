'use client';

import ProfessionalsTable from '@/components/admin-dashboard/ProfessionalsTable';
import { useTranslations } from 'next-intl';

// Dummy data for the professionals table
const mockProfessionals = [
  {
    id: '1',
    name: 'Johannes Smit',
    email: 'john.smith@email.com',
    avatar: undefined, // Will use initial fallback
    categories: ['Sanitair', 'HVAC'],
    status: 'verified' as const,
    rating: 4.9,
    reviewCount: 23,
    registeredAt: '2024-03-15',
  },
  {
    id: '2',
    name: 'Sara Johnson',
    email: 'sarah.j@email.com',
    avatar: undefined,
    categories: ['Interieurontwerp'],
    status: 'unverified' as const,
    rating: 4.2,
    reviewCount: 8,
    registeredAt: '2024-03-18',
  },
  {
    id: '3',
    name: 'Mike Wilson',
    email: 'mike.w@email.com',
    avatar: undefined,
    categories: ['Elektrisch', 'Zonne'],
    status: 'unverified' as const,
    rating: 3.1,
    reviewCount: 15,
    registeredAt: '2024-03-10',
  },
  {
    id: '4',
    name: 'Mike Wilson',
    email: 'mike.w@email.com',
    avatar: undefined,
    categories: ['Elektrisch', 'Zonne'],
    status: 'in_review' as const,
    rating: 3.1,
    reviewCount: 15,
    registeredAt: '2024-03-10',
  },
  {
    id: '5',
    name: 'Mike Wilson',
    email: 'mike.w@email.com',
    avatar: undefined,
    categories: ['Elektrisch', 'Zonne'],
    status: 'verified' as const,
    rating: 3.1,
    reviewCount: 15,
    registeredAt: '2024-03-10',
  },
   {
    id: '6',
    name: 'Mike Wilson',
    email: 'mike.w@email.com',
    avatar: undefined,
    categories: ['Elektrisch', 'Zonne'],
    status: 'unverified' as const,
    rating: 3.1,
    reviewCount: 15,
    registeredAt: '2024-03-10',
  },
   {
    id: '7',
    name: 'Mike Wilson',
    email: 'mike.w@email.com',
    avatar: undefined,
    categories: ['Elektrisch', 'Zonne'],
    status: 'verified' as const,
    rating: 3.1,
    reviewCount: 15,
    registeredAt: '2024-03-10',
  },
   {
    id: '8',
    name: 'Mike Wilson',
    email: 'mike.w@email.com',
    avatar: undefined,
    categories: ['Elektrisch', 'Zonne'],
    status: 'verified' as const,
    rating: 3.1,
    reviewCount: 15,
    registeredAt: '2024-03-10',
  },
   {
    id: '9',
    name: 'Mike Wilson',
    email: 'mike.w@email.com',
    avatar: undefined,
    categories: ['Elektrisch', 'Zonne'],
    status: 'unverified' as const,
    rating: 3.1,
    reviewCount: 15,
    registeredAt: '2024-03-10',
  },
   {
    id: '10',
    name: 'Mike Wilson',
    email: 'mike.w@email.com',
    avatar: undefined,
    categories: ['Elektrisch', 'Zonne'],
    status: 'verified' as const,
    rating: 3.1,
    reviewCount: 15,
    registeredAt: '2024-03-10',
  },
   {
    id: '11',
    name: 'Mike Wilson',
    email: 'mike.w@email.com',
    avatar: undefined,
    categories: ['Elektrisch', 'Zonne'],
    status: 'unverified' as const,
    rating: 3.1,
    reviewCount: 15,
    registeredAt: '2024-03-10',
  },
   {
    id: '12',
    name: 'Mike Wilson',
    email: 'mike.w@email.com',
    avatar: undefined,
    categories: ['Elektrisch', 'Zonne'],
    status: 'verified' as const,
    rating: 3.1,
    reviewCount: 15,
    registeredAt: '2024-03-10',
  },
];

export default function ProfessionalsPage() {
  const t = useTranslations('common.adminDashboard');

  return (
    <div className="space-y-6 p-6">
      <ProfessionalsTable
        professionals={mockProfessionals}
        onViewProfile={(id) => console.log('View profile:', id)}
      />
    </div>
  );
}
