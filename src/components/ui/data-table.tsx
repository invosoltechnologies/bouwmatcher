"use client"

import * as React from "react"
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
import { ChevronLeft, ChevronRight, Download } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  searchKey?: string
  searchPlaceholder?: string
  getRowClassName?: (row: TData) => string
}

export function DataTable<TData, TValue>({
  columns,
  data,
  searchKey,
  searchPlaceholder = "Filter...",
  getRowClassName,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 25,
  })

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination,
    },
  })

  // Export to CSV function
  const exportToCSV = () => {
    const rows = table.getFilteredRowModel().rows
    if (rows.length === 0) return

    // Get headers
    const headers = columns
      .filter((col) => col.id !== 'actions' && col.id !== 'index')
      .map((col) => {
        if (typeof col.header === 'string') return col.header
        const accessorKey = 'accessorKey' in col ? col.accessorKey : col.id
        return accessorKey || col.id || ''
      })

    // Get data rows
    const csvData = rows.map((row) => {
      return columns
        .filter((col) => col.id !== 'actions' && col.id !== 'index')
        .map((col) => {
          const accessorKey = 'accessorKey' in col ? col.accessorKey : col.id
          const cellValue = row.getValue(accessorKey as string)
          if (Array.isArray(cellValue)) {
            return cellValue.join('; ')
          }
          return cellValue || ''
        })
    })

    // Create CSV string
    const csvContent = [
      headers.join(','),
      ...csvData.map((row) => row.map((cell) => `"${cell}"`).join(',')),
    ].join('\n')

    // Download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', `professionals_report_${new Date().toISOString().split('T')[0]}.csv`)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
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
                  className={getRowClassName ? getRowClassName(row.original) : ""}
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
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {/* Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-4 border-t">
        {/* Left side: Record count and page size selector */}
        <div className="flex items-center gap-4">
          <div className="text-sm text-slate-600">
            Showing {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1}-
            {Math.min(
              (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
              table.getFilteredRowModel().rows.length
            )}{" "}
            from {table.getFilteredRowModel().rows.length} Records
          </div>

          <Select
            value={pagination.pageSize.toString()}
            onValueChange={(value) => {
              table.setPageSize(Number(value))
            }}
          >
            <SelectTrigger className=" h-8" iconWidth={12} iconHeight={12}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10 / page</SelectItem>
              <SelectItem value="25">25 / page</SelectItem>
              <SelectItem value="50">50 / page</SelectItem>
              <SelectItem value="100">100 / page</SelectItem>
            </SelectContent>
          </Select>

          <Button
            variant="outline"

            onClick={exportToCSV}
            className="gap-2"
          >
            <Download className="w-4 h-4" />
            Download Report
          </Button>
        </div>

        {/* Right side: Pagination */}
        <div className="flex items-center gap-2">
          <Button
            variant="outline"

            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="gap-1"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </Button>

          {/* Page numbers */}
          <div className="flex items-center gap-1">
            {Array.from({ length: table.getPageCount() }, (_, i) => i).map((pageIndex) => {
              const currentPage = table.getState().pagination.pageIndex
              // Show first page, last page, current page, and pages around current
              if (
                pageIndex === 0 ||
                pageIndex === table.getPageCount() - 1 ||
                (pageIndex >= currentPage - 1 && pageIndex <= currentPage + 1)
              ) {
                return (
                  <Button
                    key={pageIndex}
                    variant={currentPage === pageIndex ? "default" : "outline"}
                    size="sm"
                    onClick={() => table.setPageIndex(pageIndex)}
                    className="w-8 h-8 p-0"
                  >
                    {pageIndex + 1}
                  </Button>
                )
              } else if (
                pageIndex === currentPage - 2 ||
                pageIndex === currentPage + 2
              ) {
                return <span key={pageIndex} className="px-1">...</span>
              }
              return null
            })}
          </div>

          <Button
            variant="outline"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="gap-1"
          >
            Next
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
