'use client';

import { useState } from 'react';
import { Star, MoreHorizontal, ArrowUpDown, CheckCircle, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import type { Review } from '@/lib/hooks/admin/reviews';

interface ReviewsTableProps {
  reviews: Review[];
  onApprove?: (reviewId: string) => Promise<void>;
  onReject?: (reviewId: string) => void;
  onBulkApprove?: (reviewIds: string[]) => Promise<void>;
  onBulkReject?: (reviewIds: string[]) => void;
  loadingReviewId?: string | null;
  selectedRowIds?: Set<string>;
  onSelectionChange?: (selectedIds: Set<string>) => void;
}

export default function ReviewsTable({
  reviews,
  onApprove,
  onReject,
  onBulkApprove,
  onBulkReject,
  loadingReviewId,
  selectedRowIds,
  onSelectionChange,
}: ReviewsTableProps) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})

  // Sync rowSelection with parent component
  const handleRowSelectionChange = (newSelection: Record<string, boolean>) => {
    setRowSelection(newSelection)
    if (onSelectionChange) {
      const selectedIds = new Set(
        Object.entries(newSelection)
          .filter(([, selected]) => selected)
          .map(([rowId]) => {
            const rowIndex = parseInt(rowId)
            return reviews[rowIndex]?.id
          })
          .filter(Boolean) as string[]
      )
      onSelectionChange(selectedIds)
    }
  }

  const getStatusBadge = (status: 'pending' | 'approved' | 'rejected' | null) => {
    switch (status) {
      case 'pending':
        return {
          label: 'In afwachting',
          bg: 'bg-yellow-50',
          text: 'text-yellow-700',
          border: 'border-yellow-200'
        };
      case 'approved':
        return {
          label: 'Goedgekeurd',
          bg: 'bg-green-50',
          text: 'text-green-700',
          border: 'border-green-200'
        };
      case 'rejected':
        return {
          label: 'Afgewezen',
          bg: 'bg-red-50',
          text: 'text-red-700',
          border: 'border-red-200'
        };
      default:
        return {
          label: 'Onbekend',
          bg: 'bg-slate-50',
          text: 'text-slate-700',
          border: 'border-slate-200'
        };
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return '1 dag geleden';
    if (diffDays < 7) return `${diffDays} dagen geleden`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weken geleden`;
    return date.toLocaleDateString('nl-NL', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const columns: ColumnDef<Review>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
          className="translate-y-[2px]"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="translate-y-[2px]"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      id: "index",
      header: "#",
      cell: ({ row }) => (
        <span className="text-sm text-slate-600 font-medium">
          {row.index + 1}
        </span>
      ),
      enableSorting: false,
    },
    {
      accessorKey: "professional_name",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="-ml-4"
          >
            Professional
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => {
        const professionalName = row.getValue("professional_name") as string;
        const companyName = row.original.company_name;
        return (
          <div>
            <div className="font-medium text-slate-900 text-sm">
              {professionalName}
            </div>
            {companyName && (
              <div className="text-xs text-slate-500">
                {companyName}
              </div>
            )}
          </div>
        )
      }
    },
    {
      accessorKey: "category_name",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="-ml-4"
          >
            Project Type
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => {
        const categoryName = row.getValue("category_name") as string | null;
        const subcategoryName = row.original.subcategory_name;

        if (!categoryName) {
          return <span className="text-sm text-slate-400">-</span>;
        }

        return (
          <div className="flex flex-col gap-1">
            <span className="text-sm font-medium text-slate-900">
              {categoryName}
            </span>
            {subcategoryName && (
              <span className="text-xs text-slate-500">
                {subcategoryName}
              </span>
            )}
          </div>
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
            Rating
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => {
        const rating = row.getValue("rating") as number;
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
          </div>
        )
      }
    },
    {
      accessorKey: "review_text",
      header: "Review",
      cell: ({ row }) => {
        const reviewText = row.getValue("review_text") as string | null;

        if (!reviewText) {
          return <span className="text-sm text-slate-400">Geen review tekst</span>;
        }

        const truncated = reviewText.length > 50
          ? `${reviewText.substring(0, 50)}...`
          : reviewText;

        return (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="text-sm text-slate-700 max-w-[200px] truncate cursor-help">
                  "{truncated}"
                </div>
              </TooltipTrigger>
              <TooltipContent className="max-w-[400px]">
                <p className="text-sm">{reviewText}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )
      },
      enableSorting: false,
    },
    {
      accessorKey: "reviewer_name",
      header: "Beoordeeld door",
      cell: ({ row }) => {
        const reviewerName = row.getValue("reviewer_name") as string;
        return (
          <span className="text-sm text-slate-700">
            {reviewerName}
          </span>
        )
      }
    },
    {
      accessorKey: "created_at",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="-ml-4"
          >
            Datum
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => {
        return (
          <span className="text-sm text-slate-600 whitespace-nowrap">
            {formatDate(row.getValue("created_at"))}
          </span>
        )
      }
    },
    {
      accessorKey: "approval_status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("approval_status") as 'pending' | 'approved' | 'rejected' | null;
        const statusBadge = getStatusBadge(status);
        return (
          <Badge
            variant="outline"
            className={cn(
              'text-xs font-medium border px-2.5 py-0.5 rounded-full',
              statusBadge.bg,
              statusBadge.text,
              statusBadge.border
            )}
          >
            {statusBadge.label}
          </Badge>
        )
      }
    },
    {
      id: "actions",
      header: () => <div className="text-right">Acties</div>,
      cell: ({ row }) => {
        const review = row.original;
        const isLoading = loadingReviewId === review.id;
        const status = review.approval_status;

        return (
          <div className="flex items-center justify-end">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="h-8 w-8 p-0"
                  disabled={isLoading}
                >
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Acties</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {status !== 'approved' && (
                  <DropdownMenuItem
                    onClick={() => onApprove?.(review.id)}
                    className="text-green-600"
                  >
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Goedkeuren
                  </DropdownMenuItem>
                )}
                {status !== 'rejected' && (
                  <DropdownMenuItem
                    onClick={() => onReject?.(review.id)}
                    className="text-red-600"
                  >
                    <XCircle className="mr-2 h-4 w-4" />
                    Afwijzen
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )
      },
    },
  ]

  const table = useReactTable({
    data: reviews,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: handleRowSelectionChange,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  const selectedRows = table.getFilteredSelectedRowModel().rows
  const selectedReviewIds = selectedRows.map(row => row.original.id)

  const handleBulkApprove = async () => {
    if (onBulkApprove && selectedReviewIds.length > 0) {
      await onBulkApprove(selectedReviewIds)
      setRowSelection({})
    }
  }

  const handleBulkReject = () => {
    if (onBulkReject && selectedReviewIds.length > 0) {
      onBulkReject(selectedReviewIds)
      setRowSelection({})
    }
  }

  return (
    <div className="w-full">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Geen reviews gevonden
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
