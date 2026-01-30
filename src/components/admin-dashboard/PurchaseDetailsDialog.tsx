'use client';

import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { LeadPurchase } from '@/types/models/admin-lead-purchase.model';
import { format } from 'date-fns';
import { nl } from 'date-fns/locale';
import {
  User,
  Mail,
  Phone,
  Briefcase,
  MapPin,
  CreditCard,
  FileText,
  Calendar,
  Hash,
  DollarSign,
  Building2,
  Copy,
  Printer,
} from 'lucide-react';
import toast from 'react-hot-toast';

interface PurchaseDetailsDialogProps {
  purchase: LeadPurchase;
  open: boolean;
  onClose: () => void;
}

export default function PurchaseDetailsDialog({
  purchase,
  open,
  onClose,
}: PurchaseDetailsDialogProps) {
  const professional = purchase.professional_profiles;
  const project = purchase.projects;

  // Format date
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'dd MMMM yyyy, HH:mm', { locale: nl });
    } catch {
      return dateString;
    }
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('nl-NL', {
      style: 'currency',
      currency: 'EUR',
    }).format(amount);
  };

  // Get client name
  const getClientName = () => {
    if (!project) return 'Onbekend';
    if (project.company_name) return project.company_name;
    return `${project.first_name || ''} ${project.last_name || ''}`.trim() || 'Onbekend';
  };

  // Get payment method label
  const getPaymentMethodLabel = (method: string | null) => {
    if (!method) return '-';
    const methodMap: Record<string, string> = {
      card: 'Creditcard',
      ideal: 'iDEAL',
      bancontact: 'Bancontact',
      paypal: 'PayPal',
    };
    return methodMap[method] || method;
  };

  // Get status badge
  const getStatusBadge = (status: string) => {
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

  // Copy to clipboard
  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} gekopieerd`);
  };

  // Handle print
  const handlePrint = () => {
    window.print();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Factuur Details</span>
            <Button variant="outline" className='mr-6'  onClick={handlePrint}>
              <Printer className="h-4 w-4 mr-2" />
              Print
            </Button>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 print:space-y-4">
          {/* Invoice Number & Status */}
          <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg border-2 border-green-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 mb-1">Factuurnummer</p>
                <div className="flex items-center gap-2">
                  <p className="text-2xl font-bold text-blue-900">
                    {purchase.invoice_number || 'Geen factuurnummer'}
                  </p>
                  {purchase.invoice_number && (
                    <button
                      onClick={() => copyToClipboard(purchase.invoice_number!, 'Factuurnummer')}
                      className="p-1 hover:bg-white/50 rounded transition-colors"
                      title="Kopieer factuurnummer"
                    >
                      <Copy className="h-4 w-4 text-blue-600" />
                    </button>
                  )}
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-slate-600 mb-2">Status</p>
                {getStatusBadge(purchase.payment_status)}
              </div>
            </div>
          </div>

          {/* Professional Information */}
          <div className="bg-slate-50 p-5 rounded-lg">
            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
              <User className="h-5 w-5 text-blue-600" />
              Professional
            </h3>
            {professional ? (
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <User className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-slate-900">
                      {professional.first_name} {professional.last_name}
                    </p>
                    <div className="mt-2 space-y-1">
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Mail className="h-4 w-4" />
                        <span>{professional.email}</span>
                        <button
                          onClick={() => copyToClipboard(professional.email, 'Email')}
                          className="p-1 hover:bg-slate-200 rounded transition-colors"
                        >
                          <Copy className="h-3 w-3" />
                        </button>
                      </div>
                      {professional.phone && (
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <Phone className="h-4 w-4" />
                          <span>{professional.phone}</span>
                        </div>
                      )}
                      {professional.invoices_email && professional.invoices_email !== professional.email && (
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <FileText className="h-4 w-4" />
                          <span>Factuur email: {professional.invoices_email}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-slate-400">Geen professional data</p>
            )}
          </div>

          {/* Lead/Project Information */}
          <div className="bg-blue-50 p-5 rounded-lg">
            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-blue-600" />
              Lead Details
            </h3>
            {project ? (
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-slate-600 mb-1">Klant</p>
                    <p className="font-medium text-slate-900">{getClientName()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 mb-1">Type</p>
                    <Badge
                      variant={project.request_type === 'private' ? 'default' : 'secondary'}
                      className={
                        project.request_type === 'private'
                          ? 'bg-purple-50 text-purple-700 border-purple-200'
                          : 'bg-orange-50 text-orange-700 border-orange-200'
                      }
                    >
                      {project.request_type === 'private' ? 'Particulier' : 'Zakelijk'}
                    </Badge>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-slate-600 mb-1">Categorie</p>
                  <p className="font-medium text-slate-900">
                    {project.service_categories?.name_nl || '-'}
                  </p>
                </div>

                {project.service_subcategories?.name_nl && (
                  <div>
                    <p className="text-sm text-slate-600 mb-1">Subcategorie</p>
                    <p className="font-medium text-slate-900">
                      {project.service_subcategories.name_nl}
                    </p>
                  </div>
                )}

                {project.city && (
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-slate-500" />
                    <span className="text-slate-700">{project.city}</span>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-slate-400">Geen project data</p>
            )}
          </div>

          {/* Payment Details */}
          <div className="border-2 border-slate-200 rounded-lg overflow-hidden">
            <div className="bg-slate-100 px-5 py-3 border-b border-slate-200">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-green-600" />
                Betalingsgegevens
              </h3>
            </div>
            <div className="p-5 space-y-3">
              <div className="flex items-center justify-between py-2 border-b border-slate-100">
                <div className="flex items-center gap-2 text-slate-600">
                  <Calendar className="h-4 w-4" />
                  <span>Factuurdatum</span>
                </div>
                <span className="font-medium text-slate-900">
                  {formatDate(purchase.purchased_at)}
                </span>
              </div>

              <div className="flex items-center justify-between py-2 border-b border-slate-100">
                <div className="flex items-center gap-2 text-slate-600">
                  <CreditCard className="h-4 w-4" />
                  <span>Betalingsmethode</span>
                </div>
                <span className="font-medium text-slate-900">
                  {getPaymentMethodLabel(purchase.payment_method)}
                </span>
              </div>

              {purchase.transaction_id && (
                <div className="flex items-center justify-between py-2 border-b border-slate-100">
                  <div className="flex items-center gap-2 text-slate-600">
                    <Hash className="h-4 w-4" />
                    <span>Transactie ID</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm text-slate-900">
                      {purchase.transaction_id.substring(0, 20)}...
                    </span>
                    <button
                      onClick={() => copyToClipboard(purchase.transaction_id!, 'Transactie ID')}
                      className="p-1 hover:bg-slate-100 rounded transition-colors"
                    >
                      <Copy className="h-3 w-3 text-slate-500" />
                    </button>
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between py-3 bg-green-50 px-4 rounded-lg mt-4">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-green-600" />
                  <span className="font-semibold text-slate-900">Totaal Betaald</span>
                </div>
                <span className="text-2xl font-bold text-green-600">
                  {formatCurrency(purchase.amount_paid)}
                </span>
              </div>
            </div>
          </div>

          {/* Footer Note */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-sm text-amber-900">
            <p className="flex items-start gap-2">
              <FileText className="h-4 w-4 mt-0.5 flex-shrink-0" />
              <span>
                Deze factuur is automatisch gegenereerd bij aankoop van de lead. De professional heeft deze factuur per email ontvangen.
              </span>
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
