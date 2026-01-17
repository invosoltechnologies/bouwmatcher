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
import { MoreHorizontal, Copy, User, Phone, Mail, AlertCircle, ArrowUpDown } from 'lucide-react';
import { ProjectLead } from '@/types/models/admin-project.model';
import { format } from 'date-fns';
import { nl } from 'date-fns/locale';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import ContactLeadModal from './ContactLeadModal';
import ViewCancellationModal from './ViewCancellationModal';

interface ProjectLeadsTableProps {
  data: ProjectLead[];
  isLoading?: boolean;
}

export default function ProjectLeadsTable({ data, isLoading }: ProjectLeadsTableProps) {
  const router = useRouter();
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [cancellationModalOpen, setCancellationModalOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState<ProjectLead | null>(null);

  // Copy to clipboard handler
  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} gekopieerd`);
  };

  // Format date helper
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'dd MMM yyyy', { locale: nl });
    } catch {
      return dateString;
    }
  };

  // Get client full name
  const getClientName = (lead: ProjectLead) => {
    if (lead.company_name) return lead.company_name;
    const firstName = lead.first_name || '';
    const lastName = lead.last_name || '';
    return `${firstName} ${lastName}`.trim() || 'Onbekend';
  };

  // Handle contact lead
  const handleContactLead = (lead: ProjectLead) => {
    setSelectedLead(lead);
    setContactModalOpen(true);
  };

  // Handle view cancellation
  const handleViewCancellation = (lead: ProjectLead) => {
    setSelectedLead(lead);
    setCancellationModalOpen(true);
  };

  // Handle view professional
  const handleViewProfessional = (professionalId: string) => {
    router.push(`/admin-dashboard/professionals?id=${professionalId}`);
  };

  // Get status badge variant
  const getStatusBadge = (lead: ProjectLead) => {
    if (lead.cancelled_at || lead.cancellation_reason) {
      return (
        <Badge className="bg-red-50 text-red-700 border-red-200">
          Geannuleerd
        </Badge>
      );
    }
    if (lead.assigned_professional_id) {
      return (
        <Badge className="bg-blue-50 text-blue-700 border-blue-200">
          Toegewezen
        </Badge>
      );
    }
    return (
      <Badge className="bg-green-50 text-green-700 border-green-200">
        Beschikbaar
      </Badge>
    );
  };

  // Define columns
  const columns: ColumnDef<ProjectLead>[] = useMemo(
    () => [
      // Index column
      {
        id: 'index',
        header: '#',
        cell: ({ row }) => <span className="text-slate-500">{row.index + 1}</span>,
        size: 50,
      },

      // Client Name + Email
      {
        accessorKey: 'client_name',
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
              className="hover:bg-transparent p-0"
            >
              Klant
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          );
        },
        cell: ({ row }) => {
          const lead = row.original;
          const clientName = getClientName(lead);

          return (
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                <User className="h-5 w-5 text-blue-600" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-medium text-slate-900 truncate">{clientName}</p>
                <div className="flex items-center gap-2 mt-1">
                  <Mail className="h-3 w-3 text-slate-400" />
                  <span className="text-sm text-slate-500 truncate">{lead.email}</span>
                  <button
                    onClick={() => copyToClipboard(lead.email, 'Email')}
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

      // Category + Subcategory
      {
        accessorKey: 'category',
        header: 'Categorie',
        cell: ({ row }) => {
          const lead = row.original;
          const category = lead.service_categories?.name_nl || '-';
          const subcategory = lead.service_subcategories?.name_nl;

          return (
            <div>
              <p className="font-medium text-slate-900">{category}</p>
              {subcategory && (
                <p className="text-sm text-slate-500 mt-1">{subcategory}</p>
              )}
            </div>
          );
        },
        size: 180,
      },

      // Project Type
      {
        accessorKey: 'request_type',
        header: 'Type',
        cell: ({ row }) => {
          const type = row.getValue('request_type') as string;
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

      // Phone
      {
        accessorKey: 'phone',
        header: 'Telefoon',
        cell: ({ row }) => {
          const phone = row.getValue('phone') as string | null;
          if (!phone) return <span className="text-slate-400">-</span>;

          return (
            <div className="flex items-center gap-2">
              <Phone className="h-3 w-3 text-slate-400" />
              <span className="text-sm">{phone}</span>
            </div>
          );
        },
        size: 140,
      },

      // Description with tooltip
      {
        accessorKey: 'description',
        header: 'Beschrijving',
        cell: ({ row }) => {
          const description = row.getValue('description') as string | null;
          if (!description) return <span className="text-slate-400">-</span>;

          const truncated =
            description.length > 40 ? description.substring(0, 40) + '...' : description;

          if (description.length <= 40) {
            return <span className="text-sm">{description}</span>;
          }

          return (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="text-sm cursor-help">{truncated}</span>
                </TooltipTrigger>
                <TooltipContent className="max-w-xs">
                  <p className="whitespace-pre-wrap">{description}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          );
        },
        size: 200,
      },

      // Execution Period
      {
        accessorKey: 'execution_timing',
        header: 'Uitvoering',
        cell: ({ row }) => {
          const timing = row.getValue('execution_timing') as string | null;
          if (!timing) return <span className="text-slate-400">-</span>;

          const timingMap: Record<string, string> = {
            asap: 'Zo snel mogelijk',
            within_1_month: 'Binnen 1 maand',
            within_3_months: 'Binnen 3 maanden',
            within_6_months: 'Binnen 6 maanden',
            no_rush: 'Geen haast',
          };

          return <span className="text-sm">{timingMap[timing] || timing}</span>;
        },
        size: 150,
      },

      // Assigned Professional
      {
        accessorKey: 'assigned_professional',
        header: 'Toegewezen aan',
        cell: ({ row }) => {
          const lead = row.original;
          const professional = lead.professional_profiles;

          if (!professional) {
            return <span className="text-slate-400">Niet toegewezen</span>;
          }

          return (
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center">
                <User className="h-3 w-3 text-green-600" />
              </div>
              <span className="text-sm font-medium">
                {professional.first_name} {professional.last_name}
              </span>
            </div>
          );
        },
        size: 180,
      },

      // Bid Count
      {
        accessorKey: 'bidCount',
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
              className="hover:bg-transparent p-0"
            >
              Biedingen
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          );
        },
        cell: ({ row }) => {
          const count = row.getValue('bidCount') as number;
          return (
            <div className="flex items-center justify-center">
              <span className="font-semibold text-lg text-blue-600">{count}</span>
            </div>
          );
        },
        size: 100,
      },

      // Status
      {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }) => {
          const lead = row.original;
          return getStatusBadge(lead);
        },
        size: 130,
      },

      // Created Date
      {
        accessorKey: 'created_at',
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
              className="hover:bg-transparent p-0"
            >
              Aangemaakt
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          );
        },
        cell: ({ row }) => {
          const date = row.getValue('created_at') as string;
          return <span className="text-sm text-slate-600">{formatDate(date)}</span>;
        },
        size: 120,
      },

      // Actions
      {
        id: 'actions',
        header: () => <div className="text-right">Acties</div>,
        cell: ({ row }) => {
          const lead = row.original;
          const isCancelled = lead.cancelled_at || lead.cancellation_reason;

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
                  <DropdownMenuItem onClick={() => handleContactLead(lead)}>
                    <Mail className="mr-2 h-4 w-4" />
                    Contact lead
                  </DropdownMenuItem>

                  {lead.assigned_professional_id && (
                    <DropdownMenuItem
                      onClick={() => handleViewProfessional(lead.assigned_professional_id!)}
                    >
                      <User className="mr-2 h-4 w-4" />
                      Zie professional
                    </DropdownMenuItem>
                  )}

                  {isCancelled && (
                    <DropdownMenuItem onClick={() => handleViewCancellation(lead)}>
                      <AlertCircle className="mr-2 h-4 w-4" />
                      Annuleringsreden
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
    []
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-slate-500">Laden...</div>
      </div>
    );
  }

  return (
    <>
      <DataTable
        columns={columns}
        data={data}
        searchKey="email"
        searchPlaceholder="Zoek op email, naam..."
      />

      {/* Contact Lead Modal */}
      {selectedLead && (
        <ContactLeadModal
          isOpen={contactModalOpen}
          onClose={() => {
            setContactModalOpen(false);
            setSelectedLead(null);
          }}
          leadName={getClientName(selectedLead)}
          email={selectedLead.email}
          phone={selectedLead.phone}
        />
      )}

      {/* Cancellation Modal */}
      {selectedLead && selectedLead.cancellation_reason && (
        <ViewCancellationModal
          isOpen={cancellationModalOpen}
          onClose={() => {
            setCancellationModalOpen(false);
            setSelectedLead(null);
          }}
          projectName={getClientName(selectedLead)}
          cancellationReason={selectedLead.cancellation_reason}
          cancelledAt={selectedLead.cancelled_at}
        />
      )}
    </>
  );
}
