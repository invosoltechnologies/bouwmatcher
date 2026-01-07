'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Star, MoreHorizontal, ArrowUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';
import { ColumnDef } from "@tanstack/react-table"
import { DataTable } from "@/components/ui/data-table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface Professional {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  categories: string[];
  status: 'verified' | 'pending' | 'in_review' | 'unverified' | 'rejected' | 'suspended';
  rating: number;
  reviewCount: number;
  registeredAt: string;
}

interface ProfessionalsTableProps {
  professionals: Professional[];
  onViewProfile?: (id: string) => void;
  showActionButton?: boolean;
  showHeader?: boolean;
  onViewAll?: () => void;
}

export default function ProfessionalsTable({
  professionals,
  onViewProfile,
  showActionButton = true,
  showHeader = true,
  onViewAll,
}: ProfessionalsTableProps) {
  const t = useTranslations('common.adminDashboard');

  const getStatusColor = (
    status: Professional['status']
  ): { bg: string; text: string; border: string } => {
    switch (status) {
      case 'verified':
        return { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200' };
      case 'pending':
        return { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200' };
      case 'in_review':
        return { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' };
      case 'rejected':
        return { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200' };
      case 'suspended':
        return { bg: 'bg-red-100', text: 'text-red-800', border: 'border-red-300' };
      case 'unverified':
        return { bg: 'bg-slate-100', text: 'text-slate-600', border: 'border-slate-200' };
      default:
        return { bg: 'bg-slate-50', text: 'text-slate-700', border: 'border-slate-200' };
    }
  };

  const getCategoryColor = (category: string, index: number) => {
    const colors = [
      { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' },
      { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200' },
      { bg: 'bg-indigo-50', text: 'text-indigo-700', border: 'border-indigo-200' },
      { bg: 'bg-pink-50', text: 'text-pink-700', border: 'border-pink-200' },
    ];
    return colors[index % colors.length];
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('nl-NL', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const columns: ColumnDef<Professional>[] = [
    {
      id: "index",
      header: "#",
      cell: ({ row }) => (
        <span className="text-sm font-medium text-slate-600">
          {row.index + 1}
        </span>
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "name",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="-ml-4"
          >
            {t('tableHeaders.professional', { defaultValue: 'Professioneel' })}
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => {
        const professional = row.original;
        return (
          <div className='flex items-center gap-4'>
            <div className='w-10 h-10 rounded-full overflow-hidden bg-primary/80 border border-primary flex-shrink-0 relative'>
              {professional.avatar ? (
                <Image
                  src={professional.avatar}
                  alt={professional.name}
                  fill
                  className='object-cover'
                />
              ) : (
                <div className='w-full h-full flex items-center justify-center text-white capitalize font-semibold text-sm bg-primary/80'>
                  {professional.name.charAt(0)}
                </div>
              )}
            </div>
            <div>
              <div className='font-medium text-slate-900'>
                {professional.name}
              </div>
              <div className='text-sm text-slate-500'>{professional.email}</div>
            </div>
          </div>
        );
      }
    },
    {
      accessorKey: "categories",
      header: t('tableHeaders.categories', { defaultValue: 'Categorieën' }),
      cell: ({ row }) => {
        const categories = row.getValue("categories") as string[];
        return (
          <div className="flex flex-wrap gap-2">
            {categories.slice(0, 2).map((category, idx) => {
              const categoryColor = getCategoryColor(category, idx);
              return (
                <Badge
                  key={idx}
                  variant="secondary"
                  className={cn(
                    'text-xs font-medium border px-2.5 py-0.5 rounded-full',
                    categoryColor.bg,
                    categoryColor.text,
                    categoryColor.border
                  )}
                >
                  {category}
                </Badge>
              );
            })}
            {categories.length > 2 && (
              <Badge
                variant="secondary"
                className="text-xs font-medium border px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 border-slate-200"
              >
                +{categories.length - 2}
              </Badge>
            )}
          </div>
        )
      }
    },
    {
      accessorKey: "status",
      header: t('tableHeaders.status', { defaultValue: 'Status' }),
      cell: ({ row }) => {
        const status = row.getValue("status") as Professional['status'];
        const statusColors = getStatusColor(status);
        return (
          <Badge
            variant="outline"
            className={cn(
              'text-xs font-medium border px-2.5 py-0.5 rounded-full capitalize',
              statusColors.bg,
              statusColors.text,
              statusColors.border
            )}
          >
            {t(`status.${status}`, {
              defaultValue: status.replace('_', ' '),
            })}
          </Badge>
        )
      }
    },
    {
      accessorKey: "rating",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="-ml-4"
          >
            {t('tableHeaders.rating', { defaultValue: 'Beoordeling' })}
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => {
        const rating = row.getValue("rating") as number;
        const reviewCount = row.original.reviewCount;
        return (
          <div className="flex items-center gap-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    'w-4 h-4',
                    i < Math.floor(rating)
                      ? 'text-yellow-400 fill-yellow-400'
                      : 'text-slate-200 fill-slate-200'
                  )}
                />
              ))}
            </div>
            <span className="text-sm font-medium text-slate-900">
              {rating.toFixed(1)}
            </span>
            <span className="text-sm text-slate-500">
              ({reviewCount})
            </span>
          </div>
        )
      }
    },
    {
      accessorKey: "registeredAt",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="-ml-4"
          >
            {t('tableHeaders.registered', { defaultValue: 'Aangesloten' })}
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => {
        return (
          <span className="text-sm text-slate-600 whitespace-nowrap">
            {formatDate(row.getValue("registeredAt"))}
          </span>
        )
      }
    },
    ...(showActionButton
      ? [
          {
            id: "actions",
            header: () => (
              <div className="text-right">{t('tableHeaders.actions', { defaultValue: 'Acties' })}</div>
            ),
            cell: ({ row }) => {
              const professional = row.original;
              return (
                <div className="flex items-center justify-end gap-2">
                  <Button
                    size="sm"
                    onClick={() => onViewProfile?.(professional.id)}
                    className="bg-green-600 hover:bg-green-700 text-white text-xs px-4 h-8 font-medium shadow-sm"
                  >
                    {t('verify', { defaultValue: 'Verifiëren' })}
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem
                        onClick={() => navigator.clipboard.writeText(professional.id)}
                      >
                        Copy ID
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onViewProfile?.(professional.id)}>
                        View Details
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              );
            },
          } as ColumnDef<Professional>,
        ]
      : []),
  ]

  return (
    <div className="bg-white rounded-b-xl border border-slate-200 border-t-0 shadow-sm overflow-hidden">
      {/* Header */}
      {showHeader && (
        <div className="p-6 border-b border-slate-200 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h2 className="text-lg font-semibold text-slate-900">
              {t('recentProfessionals', { defaultValue: 'Recente professionals' })}
            </h2>
            <Button
              variant="default"
              onClick={onViewAll}
            >
              {t('viewAllProfessionals', {
                defaultValue: 'Bekijk alle professionals',
              })}
            </Button>
          </div>
        </div>
      )}

      <div className={showHeader ? 'p-6 pt-0' : 'p-0'}>
        <DataTable
          columns={columns}
          data={professionals}
          searchKey="name"
          searchPlaceholder={t('tableHeaders.searchPlaceholder', { defaultValue: 'Zoeken...' })}
        />
      </div>
    </div>
  );
}
