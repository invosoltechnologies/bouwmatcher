'use client';

import React, { useState, useMemo } from 'react';
import { useProjects } from '@/lib/hooks/admin/projects';
import ProjectLeadsTable from '@/components/admin-dashboard/ProjectLeadsTable';
import StatsCard from '@/components/admin-dashboard/StatsCard';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Briefcase, TrendingUp, UserCheck, XCircle, Search } from 'lucide-react';
import { useDebounce } from '@/hooks/useDebounce';

export default function ProjectsPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [page, setPage] = useState(0);
  const pageSize = 20;

  const debouncedSearch = useDebounce(search, 500);

  // Fetch projects
  const { data, isLoading, error } = useProjects({
    search: debouncedSearch,
    status: statusFilter === 'all' ? undefined : statusFilter,
    limit: pageSize,
    offset: page * pageSize,
    sortBy: 'created_at',
    sortOrder: 'desc',
  });

  // Calculate stats
  const stats = useMemo(() => {
    if (!data?.projects) {
      return {
        total: 0,
        newThisMonth: 0,
        assigned: 0,
        cancelled: 0,
        available: 0,
      };
    }

    const now = new Date();
    const oneMonthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());

    return {
      total: data.total,
      newThisMonth: data.projects.filter((p) => {
        const createdAt = new Date(p.created_at);
        return createdAt >= oneMonthAgo;
      }).length,
      assigned: data.projects.filter((p) => p.assigned_professional_id).length,
      cancelled: data.projects.filter((p) => p.cancelled_at || p.cancellation_reason).length,
      available: data.projects.filter(
        (p) => !p.assigned_professional_id && !p.cancelled_at && !p.cancellation_reason
      ).length,
    };
  }, [data]);

  return (
    <div className="custom-container">
      {/* Header */}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-6">
        <StatsCard
          icon={Briefcase}
          iconColor="text-blue-600"
          iconBgColor="bg-blue-50"
          value={stats.total}
          label="Totaal projecten"
        />
        <StatsCard
          icon={TrendingUp}
          iconColor="text-green-600"
          iconBgColor="bg-green-50"
          value={stats.newThisMonth}
          label="Nieuw deze maand"
          change={{ value: `${stats.total > 0 ? Math.round((stats.newThisMonth / stats.total) * 100) : 0}%`, isPositive: true }}
        />
        <StatsCard
          icon={UserCheck}
          iconColor="text-purple-600"
          iconBgColor="bg-purple-50"
          value={stats.assigned}
          label="Toegewezen"
        />
        <StatsCard
          icon={Briefcase}
          iconColor="text-amber-600"
          iconBgColor="bg-amber-50"
          value={stats.available}
          label="Beschikbaar"
        />
        <StatsCard
          icon={XCircle}
          iconColor="text-red-600"
          iconBgColor="bg-red-50"
          value={stats.cancelled}
          label="Geannuleerd"
        />
      </div>

      {/* Filters */}
      <div className="bg-white border border-slate-200 rounded-t-lg p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              type="text"
              placeholder="Zoek op naam, email, beschrijving..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Status Filter */}
          <Select value={statusFilter} onValueChange={setStatusFilter} >
            <SelectTrigger iconWidth={20} iconHeight={20} >
              <SelectValue placeholder="Filter op status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Alle statussen</SelectItem>
              <SelectItem value="completed">Voltooid</SelectItem>
              <SelectItem value="draft">Concept</SelectItem>
              <SelectItem value="active">Actief</SelectItem>
              <SelectItem value="cancelled">Geannuleerd</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Error State */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-b-lg p-4">
          <p className="text-red-800">
            Fout bij het laden van projecten: {error.message}
          </p>
        </div>
      )}

      {/* Table */}
      <div className="bg-white border border-slate-200 rounded-b-lg overflow-hidden">
        <ProjectLeadsTable data={data?.projects || []} isLoading={isLoading} />
      </div>

      {/* Pagination Info */}
      {data && data.total > 0 && (
        <div className="flex items-center justify-between text-sm text-slate-600">
          <p>
            Toont {page * pageSize + 1} tot {Math.min((page + 1) * pageSize, data.total)} van{' '}
            {data.total} projecten
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
