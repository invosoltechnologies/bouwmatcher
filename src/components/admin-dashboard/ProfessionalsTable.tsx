'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Star, Eye } from 'lucide-react';
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
        return { bg: 'bg-green-50', text: 'text-green-700' };
      case 'pending':
        return { bg: 'bg-yellow-50', text: 'text-yellow-700' };
      case 'in_review':
        return { bg: 'bg-blue-50', text: 'text-blue-700' };
      case 'rejected':
        return { bg: 'bg-red-50', text: 'text-red-700' };
      default:
        return { bg: 'bg-gray-50', text: 'text-gray-700' };
    }
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
    <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-slate-200">
        <h2 className="text-lg md:text-xl font-semibold text-secondary-foreground">
          {t('recentProfessionals', { defaultValue: 'Recente professionals' })}
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          {t('recentProfessionalsDesc', {
            defaultValue: 'Laatst geregistreerde professionals',
          })}
        </p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                {t('tableHeaders.professional', { defaultValue: 'Professional' })}
              </th>
              <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                {t('tableHeaders.categories', { defaultValue: 'Categorieën' })}
              </th>
              <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                {t('tableHeaders.status', { defaultValue: 'Status' })}
              </th>
              <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                {t('tableHeaders.rating', { defaultValue: 'Beoordeling' })}
              </th>
              <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                {t('tableHeaders.registered', { defaultValue: 'Aangemeld' })}
              </th>
              <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
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
                    <div className="flex flex-wrap gap-1">
                      {professional.categories.slice(0, 2).map((category, idx) => (
                        <Badge
                          key={idx}
                          variant="secondary"
                          className="text-xs"
                        >
                          {category}
                        </Badge>
                      ))}
                      {professional.categories.length > 2 && (
                        <Badge variant="secondary" className="text-xs">
                          +{professional.categories.length - 2}
                        </Badge>
                      )}
                    </div>
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4">
                    <Badge
                      className={cn(
                        'capitalize',
                        statusColors.bg,
                        statusColors.text,
                        'border-0'
                      )}
                    >
                      {t(`status.${professional.status}`, {
                        defaultValue: professional.status,
                      })}
                    </Badge>
                  </td>

                  {/* Rating */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        <span className="ml-1 font-medium text-secondary-foreground">
                          {professional.rating.toFixed(1)}
                        </span>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        ({professional.reviewCount})
                      </span>
                    </div>
                  </td>

                  {/* Registered */}
                  <td className="px-6 py-4">
                    <span className="text-sm text-muted-foreground">
                      {formatDate(professional.registeredAt)}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onViewProfile?.(professional.id)}
                      className="flex items-center gap-2"
                    >
                      <Eye className="w-4 h-4" />
                      <span className="hidden md:inline">
                        {t('viewProfile', { defaultValue: 'Bekijken' })}
                      </span>
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Show all link */}
      <div className="px-6 py-4 border-t border-slate-200 text-center">
        <Button variant="link" className="text-primary font-medium">
          {t('viewAllProfessionals', {
            defaultValue: 'Bekijk alle professionals',
          })}
        </Button>
      </div>
    </div>
  );
}
