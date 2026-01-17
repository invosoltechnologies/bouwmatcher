'use client';

import React, { useState, useMemo } from 'react';
import { useLeadPurchases } from '@/lib/hooks/admin/lead-purchases';
import LeadPurchasesTable from '@/components/admin-dashboard/LeadPurchasesTable';
import StatsCard from '@/components/admin-dashboard/StatsCard';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { DollarSign, TrendingUp, CreditCard, ShoppingCart, Search } from 'lucide-react';
import { useDebounce } from '@/hooks/useDebounce';

export default function LeadPurchasesPage() {
  const [search, setSearch] = useState('');
  const [paymentStatusFilter, setPaymentStatusFilter] = useState<string>('all');
  const [page, setPage] = useState(0);
  const pageSize = 20;

  const debouncedSearch = useDebounce(search, 500);

  // Fetch lead purchases
  const { data, isLoading, error } = useLeadPurchases({
    search: debouncedSearch,
    paymentStatus: paymentStatusFilter === 'all' ? undefined : paymentStatusFilter,
    limit: pageSize,
    offset: page * pageSize,
    sortBy: 'purchased_at',
    sortOrder: 'desc',
  });

  // Calculate stats
  const stats = useMemo(() => {
    if (!data?.purchases) {
      return {
        total: 0,
        totalRevenue: 0,
        thisMonth: 0,
        revenueThisMonth: 0,
        averagePrice: 0,
      };
    }

    const now = new Date();
    const oneMonthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());

    const totalRevenue = data.purchases.reduce((sum, p) => sum + Number(p.amount_paid), 0);

    const thisMonthPurchases = data.purchases.filter((p) => {
      const purchasedAt = new Date(p.purchased_at);
      return purchasedAt >= oneMonthAgo;
    });

    const revenueThisMonth = thisMonthPurchases.reduce((sum, p) => sum + Number(p.amount_paid), 0);

    return {
      total: data.total,
      totalRevenue,
      thisMonth: thisMonthPurchases.length,
      revenueThisMonth,
      averagePrice: data.total > 0 ? totalRevenue / data.total : 0,
    };
  }, [data]);

  // Format currency
  const formatCurrency = (amount: number) => {
    return `€${amount.toFixed(2)}`;
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Lead Aankopen</h1>
          <p className="text-slate-500 mt-1">Beheer alle lead aankopen en betalingen</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <StatsCard
          icon={ShoppingCart}
          iconColor="text-blue-600"
          iconBgColor="bg-blue-50"
          value={stats.total}
          label="Totaal aankopen"
        />
        <StatsCard
          icon={DollarSign}
          iconColor="text-green-600"
          iconBgColor="bg-green-50"
          value={formatCurrency(stats.totalRevenue)}
          label="Totale omzet"
        />
        <StatsCard
          icon={TrendingUp}
          iconColor="text-purple-600"
          iconBgColor="bg-purple-50"
          value={stats.thisMonth}
          label="Deze maand"
          change={{
            value: `${formatCurrency(stats.revenueThisMonth)}`,
            isPositive: true
          }}
        />
        <StatsCard
          icon={CreditCard}
          iconColor="text-amber-600"
          iconBgColor="bg-amber-50"
          value={formatCurrency(stats.averagePrice)}
          label="Gemiddelde prijs"
        />
        <StatsCard
          icon={DollarSign}
          iconColor="text-emerald-600"
          iconBgColor="bg-emerald-50"
          value={formatCurrency(stats.revenueThisMonth)}
          label="Omzet deze maand"
        />
      </div>

      {/* Filters */}
      <div className="bg-white border border-slate-200 rounded-lg p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              type="text"
              placeholder="Zoek op professional, klant, transactie ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Payment Status Filter */}
          <Select value={paymentStatusFilter} onValueChange={setPaymentStatusFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Filter op betaalstatus" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Alle statussen</SelectItem>
              <SelectItem value="completed">Voltooid</SelectItem>
              <SelectItem value="pending">In behandeling</SelectItem>
              <SelectItem value="failed">Mislukt</SelectItem>
              <SelectItem value="refunded">Terugbetaald</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Error State */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800">
            Fout bij het laden van lead aankopen: {error.message}
          </p>
        </div>
      )}

      {/* Table */}
      <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
        <LeadPurchasesTable data={data?.purchases || []} isLoading={isLoading} />
      </div>

      {/* Pagination Info */}
      {data && data.total > 0 && (
        <div className="flex items-center justify-between text-sm text-slate-600">
          <p>
            Toont {page * pageSize + 1} tot {Math.min((page + 1) * pageSize, data.total)} van{' '}
            {data.total} aankopen
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={page === 0}
              className="px-4 py-2 border border-slate-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50"
            >
              Vorige
            </button>
            <button
              onClick={() => setPage((p) => p + 1)}
              disabled={(page + 1) * pageSize >= data.total}
              className="px-4 py-2 border border-slate-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50"
            >
              Volgende
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
