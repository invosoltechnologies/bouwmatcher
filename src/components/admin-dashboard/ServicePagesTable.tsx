'use client';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import {
  MoreHorizontal,
  Edit2,
  Trash2,
  ArrowUpDown,
  Check,
  Clock,
  FileText,
} from 'lucide-react';
import { useLocale } from 'next-intl';
import { ColumnDef } from '@tanstack/react-table';
import { DataTable } from '@/components/ui/data-table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { ServicePageDTO } from '@/lib/api/admin/service-pages.api';
import { formatDistanceToNow } from 'date-fns';
import { enUS, nl } from 'date-fns/locale';

interface ServicePagesTableProps {
  pages: ServicePageDTO[];
  onEdit: (page: ServicePageDTO) => void;
  onDelete: (page: ServicePageDTO) => void;
  onStatusChange: (page: ServicePageDTO, status: 'draft' | 'pending' | 'active') => void;
  onCreateNew: () => void;
}

const STATUS_CONFIG = {
  draft: {
    label: 'Draft',
    labelNL: 'Concept',
    bgColor: 'bg-slate-50',
    textColor: 'text-slate-700',
    borderColor: 'border-slate-200',
    icon: FileText,
  },
  pending: {
    label: 'Pending',
    labelNL: 'In behandeling',
    bgColor: 'bg-amber-50',
    textColor: 'text-amber-700',
    borderColor: 'border-amber-200',
    icon: Clock,
  },
  active: {
    label: 'Active',
    labelNL: 'Actief',
    bgColor: 'bg-green-50',
    textColor: 'text-green-700',
    borderColor: 'border-green-200',
    icon: Check,
  },
};

export default function ServicePagesTable({
  pages,
  onEdit,
  onDelete,
  onStatusChange,
  onCreateNew,
}: ServicePagesTableProps) {
  const locale = useLocale();

  const getStatusConfig = (status: string) => {
    return STATUS_CONFIG[status as keyof typeof STATUS_CONFIG] || STATUS_CONFIG.draft;
  };

  const columns: ColumnDef<ServicePageDTO>[] = [
    {
      accessorKey: 'category_name',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className="-ml-4"
          >
            {locale === 'nl' ? 'Categorie' : 'Category'}
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const page = row.original;
        const categoryName =
          locale === 'nl'
            ? page.category_name_nl || page.category_name
            : page.category_name_en || page.category_name;
        return (
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-slate-400" />
            <span className="font-medium text-slate-900">{categoryName}</span>
          </div>
        );
      },
    },
    {
      accessorKey: 'status',
      header: () => (
        <div>{locale === 'nl' ? 'Status' : 'Status'}</div>
      ),
      cell: ({ row }) => {
        const page = row.original;
        const config = getStatusConfig(page.status);
        const StatusIcon = config.icon;
        const statusLabel = locale === 'nl' ? config.labelNL : config.label;

        return (
          <div className="flex items-center gap-2">
            <Badge
              variant="outline"
              className={cn(
                'border px-2.5 py-0.5 text-xs font-medium rounded-full',
                config.bgColor,
                config.textColor,
                config.borderColor
              )}
            >
              <StatusIcon className="w-3 h-3 mr-1 inline" />
              {statusLabel}
            </Badge>
          </div>
        );
      },
    },
    {
      accessorKey: 'published_at',
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="-ml-4"
        >
          {locale === 'nl' ? 'Gepubliceerd' : 'Published'}
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => {
        const page = row.original;
        if (!page.published_at) {
          return <span className="text-sm text-slate-500">-</span>;
        }
        const dateLocale = locale === 'nl' ? nl : enUS;
        return (
          <span className="text-sm text-slate-600">
            {formatDistanceToNow(new Date(page.published_at), {
              addSuffix: true,
              locale: dateLocale,
            })}
          </span>
        );
      },
    },
    {
      accessorKey: 'updated_at',
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="-ml-4"
        >
          {locale === 'nl' ? 'Gewijzigd' : 'Last Edit'}
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => {
        const page = row.original;
        const dateLocale = locale === 'nl' ? nl : enUS;
        return (
          <span className="text-sm text-slate-600">
            {formatDistanceToNow(new Date(page.updated_at), {
              addSuffix: true,
              locale: dateLocale,
            })}
          </span>
        );
      },
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        const page = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem
                onClick={() => onEdit(page)}
                className="cursor-pointer"
              >
                <Edit2 className="w-4 h-4 mr-2" />
                {locale === 'nl' ? 'Bewerken' : 'Edit'}
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              {page.status !== 'active' && (
                <DropdownMenuItem
                  onClick={() => onStatusChange(page, 'active')}
                  className="cursor-pointer text-green-600"
                >
                  <Check className="w-4 h-4 mr-2" />
                  {locale === 'nl' ? 'Publiceren' : 'Publish'}
                </DropdownMenuItem>
              )}

              {page.status !== 'pending' && (
                <DropdownMenuItem
                  onClick={() => onStatusChange(page, 'pending')}
                  className="cursor-pointer text-amber-600"
                >
                  <Clock className="w-4 h-4 mr-2" />
                  {locale === 'nl' ? 'In behandeling' : 'Set Pending'}
                </DropdownMenuItem>
              )}

              {page.status !== 'draft' && (
                <DropdownMenuItem
                  onClick={() => onStatusChange(page, 'draft')}
                  className="cursor-pointer"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  {locale === 'nl' ? 'Als concept opslaan' : 'Save as Draft'}
                </DropdownMenuItem>
              )}

              <DropdownMenuSeparator />

              <DropdownMenuItem
                onClick={() => onDelete(page)}
                className="cursor-pointer text-red-600"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                {locale === 'nl' ? 'Verwijderen' : 'Delete'}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-b-lg border shadow-sm overflow-hidden">
        <DataTable columns={columns} data={pages} />
      </div>
    </div>
  );
}
