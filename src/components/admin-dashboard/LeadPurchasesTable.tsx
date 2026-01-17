'use client';

import React, { useState, useMemo } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { DataTable } from '@/components/ui/data-table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { MoreHorizontal, Copy, User, Mail, CreditCard, ArrowUpDown, Briefcase } from 'lucide-react';
import { LeadPurchase } from '@/types/models/admin-lead-purchase.model';
import { format } from 'date-fns';
import { nl } from 'date-fns/locale';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

interface LeadPurchasesTableProps {
  data: LeadPurchase[];
  isLoading?: boolean;
}

export default function LeadPurchasesTable({ data, isLoading }: LeadPurchasesTableProps) {
  const router = useRouter();

  // Copy to clipboard handler
  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} gekopieerd`);
  };

  // Format date helper
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'dd MMM yyyy HH:mm', { locale: nl });
    } catch {
      return dateString;
    }
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    return `€${amount.toFixed(2)}`;
  };

  // Get professional name
  const getProfessionalName = (purchase: LeadPurchase) => {
    const prof = purchase.professional_profiles;
    if (!prof) return 'Onbekend';
    return `${prof.first_name} ${prof.last_name}`;
  };

  // Get project client name
  const getProjectClientName = (purchase: LeadPurchase) => {
    const project = purchase.projects;
    if (!project) return 'Onbekend';
    if (project.company_name) return project.company_name;
    return `${project.first_name || ''} ${project.last_name || ''}`.trim() || 'Onbekend';
  };

  // Get payment status badge
  const getPaymentStatusBadge = (status: string) => {
    const statusMap: Record<string, { label: string; className: string }> = {
      completed: {
        label: 'Voltooid',
        className: 'bg-green-50 text-green-700 border-green-200',
      },
      pending: {
        label: 'In behandeling',
        className: 'bg-amber-50 text-amber-700 border-amber-200',
      },
      failed: {
        label: 'Mislukt',
        className: 'bg-red-50 text-red-700 border-red-200',
      },
      refunded: {
        label: 'Terugbetaald',
        className: 'bg-blue-50 text-blue-700 border-blue-200',
      },
    };

    const statusInfo = statusMap[status] || statusMap.pending;
    return <Badge className={statusInfo.className}>{statusInfo.label}</Badge>;
  };

  // Handle view professional
  const handleViewProfessional = (professionalId: string) => {
    router.push(`/admin-dashboard/professionals?id=${professionalId}`);
  };

  // Handle view project
  const handleViewProject = (projectId: string) => {
    router.push(`/admin-dashboard/projects?id=${projectId}`);
  };

  // Define columns
  const columns: ColumnDef<LeadPurchase>[] = useMemo(
    () => [
      // Index column
      {
        id: 'index',
        header: '#',
        cell: ({ row }) => <span className="text-slate-500">{row.index + 1}</span>,
        size: 50,
      },

      // Professional Name + Email
      {
        accessorKey: 'professional',
        header: 'Professional',
        cell: ({ row }) => {
          const purchase = row.original;
          const prof = purchase.professional_profiles;
          if (!prof) return <span className="text-slate-400">Geen data</span>;

          const fullName = `${prof.first_name} ${prof.last_name}`;

          return (
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                <User className="h-5 w-5 text-blue-600" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-medium text-slate-900 truncate">{fullName}</p>
                <div className="flex items-center gap-2 mt-1">
                  <Mail className="h-3 w-3 text-slate-400" />
                  <span className="text-sm text-slate-500 truncate">{prof.email}</span>
                  <button
                    onClick={() => copyToClipboard(prof.email, 'Email')}
                    className="p-1 hover:bg-slate-100 rounded transition-colors flex-shrink-0"
                    title="Kopieer email"
                  >
                    <Copy className="h-3 w-3 text-slate-400" />
                  </button>
                </div>
              </div>
            </div>
          );
        },
        size: 250,
      },

      // Project Info
      {
        accessorKey: 'project',
        header: 'Project',
        cell: ({ row }) => {
          const purchase = row.original;
          const project = purchase.projects;
          if (!project) return <span className="text-slate-400">Geen data</span>;

          const clientName = getProjectClientName(purchase);
          const category = project.service_categories?.name_nl || '-';
          const subcategory = project.service_subcategories?.name_nl;

          return (
            <div>
              <p className="font-medium text-slate-900">{clientName}</p>
              <p className="text-sm text-slate-600 mt-1">{category}</p>
              {subcategory && (
                <p className="text-xs text-slate-500 mt-0.5">{subcategory}</p>
              )}
            </div>
          );
        },
        size: 200,
      },

      // Project Type
      {
        accessorKey: 'project_type',
        header: 'Type',
        cell: ({ row }) => {
          const purchase = row.original;
          const type = purchase.projects?.request_type;
          if (!type) return <span className="text-slate-400">-</span>;

          return (
            <Badge
              variant={type === 'private' ? 'default' : 'secondary'}
              className={
                type === 'private'
                  ? 'bg-purple-50 text-purple-700 border-purple-200'
                  : 'bg-orange-50 text-orange-700 border-orange-200'
              }
            >
              {type === 'private' ? 'Particulier' : 'Zakelijk'}
            </Badge>
          );
        },
        size: 120,
      },

      // Amount Paid
      {
        accessorKey: 'amount_paid',
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
              className="hover:bg-transparent p-0"
            >
              Bedrag
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          );
        },
        cell: ({ row }) => {
          const amount = row.getValue('amount_paid') as number;
          return (
            <span className="font-semibold text-green-600">{formatCurrency(amount)}</span>
          );
        },
        size: 100,
      },

      // Payment Status
      {
        accessorKey: 'payment_status',
        header: 'Betaalstatus',
        cell: ({ row }) => {
          const status = row.getValue('payment_status') as string;
          return getPaymentStatusBadge(status);
        },
        size: 130,
      },

      // Payment Method
      {
        accessorKey: 'payment_method',
        header: 'Betaalmethode',
        cell: ({ row }) => {
          const method = row.getValue('payment_method') as string | null;
          if (!method) return <span className="text-slate-400">-</span>;

          const methodMap: Record<string, string> = {
            card: 'Creditcard',
            ideal: 'iDEAL',
            bancontact: 'Bancontact',
            paypal: 'PayPal',
          };

          return (
            <div className="flex items-center gap-2">
              <CreditCard className="h-4 w-4 text-slate-400" />
              <span className="text-sm">{methodMap[method] || method}</span>
            </div>
          );
        },
        size: 150,
      },

      // Transaction ID
      {
        accessorKey: 'transaction_id',
        header: 'Transactie ID',
        cell: ({ row }) => {
          const transactionId = row.getValue('transaction_id') as string | null;
          if (!transactionId) return <span className="text-slate-400">-</span>;

          const truncated = transactionId.length > 20
            ? transactionId.substring(0, 20) + '...'
            : transactionId;

          return (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-mono">{truncated}</span>
                    <button
                      onClick={() => copyToClipboard(transactionId, 'Transactie ID')}
                      className="p-1 hover:bg-slate-100 rounded transition-colors"
                      title="Kopieer transactie ID"
                    >
                      <Copy className="h-3 w-3 text-slate-400" />
                    </button>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="font-mono">{transactionId}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          );
        },
        size: 200,
      },

      // Purchased Date
      {
        accessorKey: 'purchased_at',
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
              className="hover:bg-transparent p-0"
            >
              Gekocht op
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          );
        },
        cell: ({ row }) => {
          const date = row.getValue('purchased_at') as string;
          return <span className="text-sm text-slate-600">{formatDate(date)}</span>;
        },
        size: 150,
      },

      // Actions
      {
        id: 'actions',
        header: () => <div className="text-right">Acties</div>,
        cell: ({ row }) => {
          const purchase = row.original;

          return (
            <div className="flex justify-end">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {purchase.professional_id && (
                    <DropdownMenuItem
                      onClick={() => handleViewProfessional(purchase.professional_id)}
                    >
                      <User className="mr-2 h-4 w-4" />
                      Zie professional
                    </DropdownMenuItem>
                  )}
                  {purchase.project_id && (
                    <DropdownMenuItem
                      onClick={() => handleViewProject(purchase.project_id)}
                    >
                      <Briefcase className="mr-2 h-4 w-4" />
                      Zie project
                    </DropdownMenuItem>
                  )}
                  {purchase.transaction_id && (
                    <DropdownMenuItem
                      onClick={() => copyToClipboard(purchase.transaction_id!, 'Transactie ID')}
                    >
                      <Copy className="mr-2 h-4 w-4" />
                      Kopieer transactie ID
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          );
        },
        size: 80,
      },
    ],
    [router]
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-slate-500">Laden...</div>
      </div>
    );
  }

  return (
    <DataTable
      columns={columns}
      data={data}
      searchKey="professional"
      searchPlaceholder="Zoek op professional, klant, transactie ID..."
    />
  );
}
