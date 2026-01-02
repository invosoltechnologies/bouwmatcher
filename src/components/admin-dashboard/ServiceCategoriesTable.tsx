'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { MoreHorizontal, Edit2, Trash2, Power, ArrowUpDown } from 'lucide-react';
import Image from 'next/image';
import { ServiceCategory } from '@/types/categories';
import { useLocale } from 'next-intl';
import { ColumnDef } from "@tanstack/react-table"
import { DataTable } from "@/components/ui/data-table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface ServiceCategoriesTableProps {
  categories: ServiceCategory[];
  onEdit: (category: ServiceCategory) => void;
  onToggleStatus: (category: ServiceCategory) => void;
  onDelete: (category: ServiceCategory) => void;
  isLoading?: boolean;
}

export default function ServiceCategoriesTable({
  categories,
  onEdit,
  onToggleStatus,
  onDelete,
  isLoading = false,
}: ServiceCategoriesTableProps) {
  const locale = useLocale();

  const getCategoryName = (category: ServiceCategory) => {
    return locale === 'nl' ? category.name_nl : category.name_en || category.name_nl;
  };

  const columns: ColumnDef<ServiceCategory>[] = [
    {
      accessorKey: "name", // We might need a custom accessor for sorting by localized name
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="-ml-4"
          >
            {locale === 'nl' ? 'Categorie' : 'Category'}
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => {
        const category = row.original;
        return (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0">
              {category.icon_url ? (
                <Image
                  src={category.icon_url}
                  alt={getCategoryName(category)}
                  width={20}
                  height={20}
                  className="w-5 h-5 object-contain"
                />
              ) : (
                <span className="text-sm">📦</span>
              )}
            </div>
            <div>
              <p className="font-medium text-slate-900 text-sm">
                {getCategoryName(category)}
              </p>
              <p className="text-xs text-slate-500">{category.slug}</p>
            </div>
          </div>
        )
      },
      // Custom sorting function to sort by the displayed name
      sortingFn: (rowA, rowB) => {
        const nameA = getCategoryName(rowA.original).toLowerCase();
        const nameB = getCategoryName(rowB.original).toLowerCase();
        return nameA.localeCompare(nameB);
      }
    },
    {
      accessorKey: "professional_count",
      header: ({ column }) => {
        return (
          <div className="text-center">
             <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
              {locale === 'nl' ? 'Professionals' : 'Professionals'}
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          </div>
        )
      },
      cell: ({ row }) => {
        return (
          <div className="text-center font-medium text-slate-900">
            {row.original.professional_count || 0}
          </div>
        )
      }
    },
    {
      accessorKey: "is_active",
      header: () => <div className="text-center">{locale === 'nl' ? 'Status' : 'Status'}</div>,
      cell: ({ row }) => {
        const isActive = row.original.is_active;
        return (
          <div className="text-center">
            <Badge
              className={cn(
                'text-xs font-medium border-0 px-3 py-1',
                isActive
                  ? 'bg-green-100 text-green-700'
                  : 'bg-slate-100 text-slate-600'
              )}
            >
              {isActive
                ? locale === 'nl'
                  ? 'Actief'
                  : 'Active'
                : locale === 'nl'
                ? 'Inactief'
                : 'Inactive'}
            </Badge>
          </div>
        )
      }
    },
    {
      id: "actions",
      header: () => <div className="text-right">{locale === 'nl' ? 'Acties' : 'Actions'}</div>,
      cell: ({ row }) => {
        const category = row.original;
        return (
          <div className="text-right">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onEdit(category)}>
                  <Edit2 className="mr-2 h-4 w-4" />
                  {locale === 'nl' ? 'Bewerken' : 'Edit'}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onToggleStatus(category)}>
                  <Power className="mr-2 h-4 w-4" />
                  {category.is_active
                    ? locale === 'nl'
                      ? 'Deactiveren'
                      : 'Deactivate'
                    : locale === 'nl'
                    ? 'Activeren'
                    : 'Activate'}
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => onDelete(category)}
                  className="text-red-600 focus:text-red-600"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  {locale === 'nl' ? 'Verwijderen' : 'Delete'}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )
      },
    },
  ]

  return (
    <div className="border border-slate-200 rounded-lg overflow-hidden bg-white">
      <DataTable 
        columns={columns} 
        data={categories} 
        searchKey="name"
        searchPlaceholder={locale === 'nl' ? 'Zoeken...' : 'Search...'}
      />
    </div>
  );
}
