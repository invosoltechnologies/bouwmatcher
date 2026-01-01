'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Star, MoreHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';

interface Professional {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  categories: string[];
  status: 'verified' | 'pending' | 'in_review' | 'unverified' | 'rejected';
  rating: number;
  reviewCount: number;
  registeredAt: string;
}

interface ProfessionalsTableProps {
  professionals: Professional[];
  onViewProfile?: (id: string) => void;
}

export default function ProfessionalsTable({
  professionals,
  onViewProfile,
}: ProfessionalsTableProps) {
  const t = useTranslations('common.adminDashboard');

  const getStatusColor = (
    status: Professional['status']
  ): { bg: string; text: string } => {
    switch (status) {
      case 'verified':
        return { bg: 'bg-green-100', text: 'text-green-700' };
      case 'pending':
        return { bg: 'bg-slate-100', text: 'text-slate-700' };
      case 'in_review':
        return { bg: 'bg-slate-100', text: 'text-slate-700' };
      case 'rejected':
        return { bg: 'bg-red-100', text: 'text-red-700' };
      default:
        return { bg: 'bg-slate-100', text: 'text-slate-700' };
    }
  };

  const getCategoryColor = (category: string, index: number) => {
    const colors = [
      { bg: 'bg-blue-100', text: 'text-blue-700' },
      { bg: 'bg-green-100', text: 'text-green-700' },
      { bg: 'bg-purple-100', text: 'text-purple-700' },
      { bg: 'bg-yellow-100', text: 'text-yellow-700' },
      { bg: 'bg-red-100', text: 'text-red-700' },
    ];
    return colors[index % colors.length];
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('nl-NL', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-900">
          {t('recentProfessionals', { defaultValue: 'Recente professionals' })}
        </h2>
        <Button
          variant="default"
          size="sm"
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          {t('viewAllProfessionals', {
            defaultValue: 'Bekijk alle professionals',
          })}
        </Button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50">
            <tr>
              <th className="text-left px-6 py-3 text-xs font-medium text-slate-600">
                {t('tableHeaders.professional', { defaultValue: 'Professioneel' })}
              </th>
              <th className="text-left px-6 py-3 text-xs font-medium text-slate-600">
                {t('tableHeaders.categories', { defaultValue: 'Categorieën' })}
              </th>
              <th className="text-left px-6 py-3 text-xs font-medium text-slate-600">
                {t('tableHeaders.status', { defaultValue: 'Status' })}
              </th>
              <th className="text-left px-6 py-3 text-xs font-medium text-slate-600">
                {t('tableHeaders.rating', { defaultValue: 'Beoordeling' })}
              </th>
              <th className="text-left px-6 py-3 text-xs font-medium text-slate-600">
                {t('tableHeaders.registered', { defaultValue: 'Aangesloten' })}
              </th>
              <th className="text-left px-6 py-3 text-xs font-medium text-slate-600">
                {t('tableHeaders.actions', { defaultValue: 'Acties' })}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {professionals.map((professional) => {
              const statusColors = getStatusColor(professional.status);
              return (
                <tr
                  key={professional.id}
                  className="hover:bg-slate-50 transition-colors"
                >
                  {/* Professional */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-200 flex-shrink-0">
                        {professional.avatar ? (
                          <Image
                            src={professional.avatar}
                            alt={professional.name}
                            width={40}
                            height={40}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-slate-500 font-medium">
                            {professional.name.charAt(0)}
                          </div>
                        )}
                      </div>
                      <div>
                        <div className="font-medium text-secondary-foreground">
                          {professional.name}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {professional.email}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Categories */}
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1.5">
                      {professional.categories.slice(0, 2).map((category, idx) => {
                        const categoryColor = getCategoryColor(category, idx);
                        return (
                          <Badge
                            key={idx}
                            className={cn(
                              'text-xs font-medium border-0 px-2.5 py-0.5',
                              categoryColor.bg,
                              categoryColor.text
                            )}
                          >
                            {category}
                          </Badge>
                        );
                      })}
                      {professional.categories.length > 2 && (
                        <Badge
                          className="text-xs font-medium border-0 px-2.5 py-0.5 bg-slate-100 text-slate-700"
                        >
                          +{professional.categories.length - 2}
                        </Badge>
                      )}
                    </div>
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4">
                    <Badge
                      className={cn(
                        'text-xs font-medium border-0 px-2.5 py-0.5',
                        statusColors.bg,
                        statusColors.text
                      )}
                    >
                      {t(`status.${professional.status}`, {
                        defaultValue: professional.status,
                      })}
                    </Badge>
                  </td>

                  {/* Rating */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={cn(
                            'w-4 h-4',
                            i < Math.floor(professional.rating)
                              ? 'text-yellow-400 fill-yellow-400'
                              : 'text-slate-300 fill-slate-300'
                          )}
                        />
                      ))}
                      <span className="ml-1 text-sm font-medium text-slate-900">
                        {professional.rating.toFixed(1)}
                      </span>
                      <span className="text-sm text-slate-500">
                        ({professional.reviewCount})
                      </span>
                    </div>
                  </td>

                  {/* Registered */}
                  <td className="px-6 py-4">
                    <span className="text-sm text-slate-600">
                      {formatDate(professional.registeredAt)}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        onClick={() => onViewProfile?.(professional.id)}
                        className="bg-green-600 hover:bg-green-700 text-white text-xs px-3"
                      >
                        {t('viewProfile', { defaultValue: 'Verifiëren' })}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="p-1 h-8 w-8"
                      >
                        <MoreHorizontal className="w-4 h-4 text-slate-600" />
                      </Button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
