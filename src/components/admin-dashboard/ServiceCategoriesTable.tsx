'use client';

import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { MoreHorizontal, Edit2, Trash2, Power } from 'lucide-react';
import Image from 'next/image';
import { ServiceCategory } from '@/types/categories';
import { useLocale } from 'next-intl';

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

  return (
    <div className="border border-slate-200 rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-slate-50 hover:bg-slate-50">
            <TableHead className="font-semibold">
              {locale === 'nl' ? 'Categorie' : 'Category'}
            </TableHead>
            <TableHead className="text-center font-semibold">
              {locale === 'nl' ? 'Professionals' : 'Professionals'}
            </TableHead>
            <TableHead className="text-center font-semibold">
              {locale === 'nl' ? 'Status' : 'Status'}
            </TableHead>
            <TableHead className="text-right font-semibold">
              {locale === 'nl' ? 'Acties' : 'Actions'}
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-8">
                <p className="text-sm text-slate-500">
                  {locale === 'nl'
                    ? 'Geen categorieën gevonden'
                    : 'No categories found'}
                </p>
              </TableCell>
            </TableRow>
          ) : (
            categories.map((category) => (
              <TableRow key={category.id}>
                {/* Category Name with Icon */}
                <TableCell>
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
                </TableCell>

                {/* Professional Count */}
                <TableCell className="text-center">
                  <span className="font-medium text-slate-900">
                    {category.professional_count || 0}
                  </span>
                </TableCell>

                {/* Status */}
                <TableCell className="text-center">
                  <Badge
                    className={cn(
                      'text-xs font-medium border-0 px-3 py-1',
                      category.is_active
                        ? 'bg-green-100 text-green-700'
                        : 'bg-slate-100 text-slate-600'
                    )}
                  >
                    {category.is_active
                      ? locale === 'nl'
                        ? 'Actief'
                        : 'Active'
                      : locale === 'nl'
                      ? 'Inactief'
                      : 'Inactive'}
                  </Badge>
                </TableCell>

                {/* Actions */}
                <TableCell className="text-right">
                  <TableRowActions
                    category={category}
                    locale={locale}
                    onEdit={onEdit}
                    onToggleStatus={onToggleStatus}
                    onDelete={onDelete}
                  />
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}

interface TableRowActionsProps {
  category: ServiceCategory;
  locale: string;
  onEdit: (category: ServiceCategory) => void;
  onToggleStatus: (category: ServiceCategory) => void;
  onDelete: (category: ServiceCategory) => void;
}

function TableRowActions({
  category,
  locale,
  onEdit,
  onToggleStatus,
  onDelete,
}: TableRowActionsProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="sm"
        className="p-0 hover:bg-slate-200"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <MoreHorizontal className="w-4 h-4 text-slate-600" />
      </Button>

      {menuOpen && (
        <div className="absolute right-0 top-full mt-1 w-48 bg-white border border-slate-200 rounded-lg shadow-lg z-10">
          <button
            onClick={() => {
              setMenuOpen(false);
              onEdit(category);
            }}
            className="w-full text-left px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors flex items-center gap-2 first:rounded-t-lg"
          >
            <Edit2 className="w-4 h-4" />
            {locale === 'nl' ? 'Bewerken' : 'Edit'}
          </button>
          <button
            onClick={() => {
              setMenuOpen(false);
              onToggleStatus(category);
            }}
            className="w-full text-left px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors flex items-center gap-2"
          >
            <Power className="w-4 h-4" />
            {category.is_active
              ? locale === 'nl'
                ? 'Deactiveren'
                : 'Deactivate'
              : locale === 'nl'
              ? 'Activeren'
              : 'Activate'}
          </button>
          <button
            onClick={() => {
              setMenuOpen(false);
              onDelete(category);
            }}
            className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2 last:rounded-b-lg"
          >
            <Trash2 className="w-4 h-4" />
            {locale === 'nl' ? 'Verwijderen' : 'Delete'}
          </button>
        </div>
      )}

      {menuOpen && (
        <div
          className="fixed inset-0 z-0"
          onClick={() => setMenuOpen(false)}
        />
      )}
    </div>
  );
}
