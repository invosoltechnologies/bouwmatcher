'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Star, MoreHorizontal, ArrowUpDown, Copy } from 'lucide-react';
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
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ContactProfessionalModal } from './ContactProfessionalModal';
import toast from 'react-hot-toast';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Professional {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
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
  showHeader?: boolean;
  onViewAll?: () => void;
}

export default function ProfessionalsTable({
  professionals,
  onViewProfile,
  showHeader = true,
  onViewAll,
}: ProfessionalsTableProps) {
  const t = useTranslations('common.adminDashboard');
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [selectedProfessional, setSelectedProfessional] = useState<Professional | null>(null);

  const copyEmail = async (email: string) => {
    try {
      await navigator.clipboard.writeText(email);
      toast.success('Email gekopieerd!', {
        position: 'bottom-center',
        duration: 2000,
        style: {
          background: '#10b981',
          color: '#fff',
          padding: '12px 24px',
          borderRadius: '8px',
          fontSize: '14px',
          fontWeight: '500',
        },
      });
    } catch (err) {
      console.error('Failed to copy email:', err);
      toast.error('Kopiëren mislukt', {
        position: 'bottom-center',
        duration: 2000,
      });
    }
  };

  const handleContactClick = (professional: Professional) => {
    setSelectedProfessional(professional);
    setContactModalOpen(true);
  };

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
            <div className='flex-1'>
              <div className='font-medium text-slate-900'>
                {professional.name}
              </div>
              <div className='flex items-center gap-2'>
                <span className='text-sm text-slate-500'>
                  {professional.email}
                </span>
                <Copy
                  className='h-3.5 w-3.5 text-primary cursor-pointer hover:text-primary/80 transition-colors'
                  onClick={() => copyEmail(professional.email)}
                />
              </div>
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
        const remainingCategories = categories.slice(2);
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
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Badge
                      variant="secondary"
                      className="text-xs font-medium border px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 border-slate-200 cursor-help"
                    >
                      +{categories.length - 2}
                    </Badge>
                  </TooltipTrigger>
                  <TooltipContent
                    className="max-w-xs py-3 bg-white border border-primary/40 shadow-lg"
                    arrowClassName="fill-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.1)]"
                    sideOffset={5}
                  >
                    <div className="space-y-1">
                      <p className="font-semibold text-xs mb-2 text-slate-900">Overige categorieën:</p>
                      <div className="flex flex-wrap gap-1.5">
                        {remainingCategories.map((category, idx) => (
                          <span
                            key={idx}
                            className="text-xs bg-primary text-white px-2 py-0.5 rounded"
                          >
                            {category}
                          </span>
                        ))}
                      </div>
                    </div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
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
    {
      id: "actions",
      header: () => (
        <div className="text-right">{t('tableHeaders.actions', { defaultValue: 'Acties' })}</div>
      ),
      cell: ({ row }) => {
        const professional = row.original;
        return (
          <div className="flex items-center justify-end">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={() => handleContactClick(professional)}>
                  Contact
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onViewProfile?.(professional.id)}>
                  Zie Profiel
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => console.log('Block:', professional.id)}>
                  Blokkeren
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => console.log('Unblock:', professional.id)}
                  className="text-muted-foreground"
                >
                  Deblokkeren
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
    } as ColumnDef<Professional>,
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

      {/* Contact Modal */}
      {selectedProfessional && (
        <ContactProfessionalModal
          isOpen={contactModalOpen}
          onClose={() => setContactModalOpen(false)}
          professionalName={selectedProfessional.name}
          email={selectedProfessional.email}
          phone={selectedProfessional.phone || null}
        />
      )}
    </div>
  );
}
