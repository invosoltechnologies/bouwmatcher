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
import type { BlogPostFull } from '@/types/models/blog-post.model';
import { formatDistanceToNow } from 'date-fns';
import { enUS, nl } from 'date-fns/locale';

interface BlogPostsTableProps {
  posts: BlogPostFull[];
  onEdit: (post: BlogPostFull) => void;
  onDelete: (post: BlogPostFull) => void;
  onStatusChange: (post: BlogPostFull, status: 'draft' | 'pending' | 'published') => void;
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
  published: {
    label: 'Published',
    labelNL: 'Gepubliceerd',
    bgColor: 'bg-green-50',
    textColor: 'text-green-700',
    borderColor: 'border-green-200',
    icon: Check,
  },
};

export default function BlogPostsTable({
  posts,
  onEdit,
  onDelete,
  onStatusChange,
}: BlogPostsTableProps) {
  const locale = useLocale();

  const getStatusConfig = (status: string) => {
    return STATUS_CONFIG[status as keyof typeof STATUS_CONFIG] || STATUS_CONFIG.draft;
  };

  const columns: ColumnDef<BlogPostFull>[] = [
    {
      accessorKey: 'title',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className="-ml-4"
          >
            {locale === 'nl' ? 'Titel' : 'Title'}
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const post = row.original;
        const title =
          locale === 'nl'
            ? post.content?.title_nl || 'Untitled'
            : post.content?.title_en || 'Untitled';
        return (
          <div className="flex items-center gap-2 max-w-md">
            <FileText className="w-4 h-4 text-slate-400 flex-shrink-0" />
            <span className="font-medium text-slate-900 truncate" title={title}>
              {title}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: 'category',
      header: () => (
        <div>{locale === 'nl' ? 'Categorie' : 'Category'}</div>
      ),
      cell: ({ row }) => {
        const post = row.original;
        if (!post.service_category) {
          return <span className="text-sm text-slate-500">-</span>;
        }
        const categoryName =
          locale === 'nl'
            ? post.service_category.name_nl
            : post.service_category.name_en;
        return <span className="text-sm text-slate-600">{categoryName}</span>;
      },
    },
    {
      accessorKey: 'status',
      header: () => (
        <div>{locale === 'nl' ? 'Status' : 'Status'}</div>
      ),
      cell: ({ row }) => {
        const post = row.original;
        const config = getStatusConfig(post.status);
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
        const post = row.original;
        if (!post.published_at) {
          return <span className="text-sm text-slate-500">-</span>;
        }
        const dateLocale = locale === 'nl' ? nl : enUS;
        return (
          <span className="text-sm text-slate-600">
            {formatDistanceToNow(new Date(post.published_at), {
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
        const post = row.original;
        const dateLocale = locale === 'nl' ? nl : enUS;
        return (
          <span className="text-sm text-slate-600">
            {formatDistanceToNow(new Date(post.updated_at), {
              addSuffix: true,
              locale: dateLocale,
            })}
          </span>
        );
      },
    },
    {
      id: 'actions',
      header: () => (
        <div className="text-right pr-2">{locale === 'nl' ? 'Acties' : 'Actions'}</div>
      ),
      cell: ({ row }) => {
        const post = row.original;

        return (
          <div className='flex justify-end'>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onEdit(post)}>
                  <Edit2 className="mr-2 h-4 w-4" />
                  {locale === 'nl' ? 'Bewerken' : 'Edit'}
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                  onClick={() => onStatusChange(post, 'draft')}
                  disabled={post.status === 'draft'}
                >
                  <FileText className="mr-2 h-4 w-4" />
                  {locale === 'nl' ? 'Naar Concept' : 'Move to Draft'}
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={() => onStatusChange(post, 'pending')}
                  disabled={post.status === 'pending'}
                >
                  <Clock className="mr-2 h-4 w-4" />
                  {locale === 'nl' ? 'Naar In behandeling' : 'Move to Pending'}
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={() => onStatusChange(post, 'published')}
                  disabled={post.status === 'published'}
                >
                  <Check className="mr-2 h-4 w-4" />
                  {locale === 'nl' ? 'Publiceren' : 'Publish'}
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                  onClick={() => onDelete(post)}
                  className="text-red-600 focus:text-red-600 focus:bg-red-50"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  {locale === 'nl' ? 'Verwijderen' : 'Delete'}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
    },
  ];

  return (
    <div className="space-y-4">
      <DataTable columns={columns} data={posts} />
    </div>
  );
}
