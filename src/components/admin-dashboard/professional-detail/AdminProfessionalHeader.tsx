'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

interface AdminProfessionalHeaderProps {
  avatar: string | null;
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
  status: 'verified' | 'pending' | 'in_review' | 'unverified' | 'rejected' | 'suspended';
  rating: number;
  reviewCount: number;
  onBack: () => void;
  onVerify?: () => void;
  onUnverify?: () => void;
  onBlock?: () => void;
  onUnblock?: () => void;
  onContact?: () => void;
}

export default function AdminProfessionalHeader({
  avatar,
  firstName,
  lastName,
  email,
  phone,
  status,
  rating,
  reviewCount,
  onBack,
  onVerify,
  onUnverify,
  onBlock,
  onUnblock,
  onContact,
}: AdminProfessionalHeaderProps) {
  const fullName = `${firstName} ${lastName}`;

  const getStatusColor = (
    statusCode: string
  ): { bg: string; text: string; border: string; label: string } => {
    switch (statusCode) {
      case 'verified':
        return {
          bg: 'bg-green-50',
          text: 'text-green-700',
          border: 'border-green-200',
          label: 'Geverifieerd',
        };
      case 'pending':
        return {
          bg: 'bg-amber-50',
          text: 'text-amber-700',
          border: 'border-amber-200',
          label: 'In afwachting',
        };
      case 'in_review':
        return {
          bg: 'bg-blue-50',
          text: 'text-blue-700',
          border: 'border-blue-200',
          label: 'In review',
        };
      case 'rejected':
        return {
          bg: 'bg-red-50',
          text: 'text-red-700',
          border: 'border-red-200',
          label: 'Afgewezen',
        };
      case 'suspended':
        return {
          bg: 'bg-red-100',
          text: 'text-red-800',
          border: 'border-red-300',
          label: 'Geschorst',
        };
      case 'unverified':
        return {
          bg: 'bg-slate-100',
          text: 'text-slate-600',
          border: 'border-slate-200',
          label: 'Niet geverifieerd',
        };
      default:
        return {
          bg: 'bg-slate-50',
          text: 'text-slate-700',
          border: 'border-slate-200',
          label: 'Onbekend',
        };
    }
  };

  const statusColors = getStatusColor(status);

  return (
    <div className="space-y-4">
      {/* Back Button + Actions Row */}
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          onClick={onBack}
          className="text-slate-600 hover:text-white gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Terug naar professionals
        </Button>

        {/* <div className="flex items-center gap-2">
          {onContact && (
            <Button variant="outline" onClick={onContact} className="gap-2">
              Contact
            </Button>
          )}

          {status === 'unverified' && onVerify && (
            <Button onClick={onVerify} className="gap-2 bg-green-600 hover:bg-green-700">
              Verifiëren
            </Button>
          )}

          {status === 'verified' && onUnverify && (
            <Button
              variant="outline"
              onClick={onUnverify}
              className="gap-2 border-amber-600 text-amber-600 hover:bg-amber-50"
            >
              Niet Verifiëren
            </Button>
          )}

          {status !== 'suspended' && onBlock && (
            <Button
              variant="outline"
              onClick={onBlock}
              className="gap-2 border-red-600 text-red-600 hover:bg-red-50"
            >
              Blokkeren
            </Button>
          )}

          {status === 'suspended' && onUnblock && (
            <Button onClick={onUnblock} className="gap-2 bg-blue-600 hover:bg-blue-700">
              Deblokkeren
            </Button>
          )}
        </div> */}
      </div>

      {/* Professional Header Card */}
      <Card className="px-6 py-5">
        <CardContent className="p-0">
          <div className="flex items-start gap-6">
            {/* Avatar */}
            <div className="w-24 h-24 rounded-full overflow-hidden bg-primary/80 border-2 border-primary flex-shrink-0 relative">
              {avatar ? (
                <Image
                  src={avatar}
                  alt={fullName}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-white capitalize font-semibold text-3xl bg-primary/80">
                  {firstName.charAt(0)}
                </div>
              )}
            </div>

            {/* Info */}
            <div className="flex-1">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h1 className="text-2xl font-semibold text-slate-900 mb-2">
                    {fullName}
                  </h1>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-sm text-slate-600">{email}</span>
                    {phone && (
                      <>
                        <span className="text-slate-300">•</span>
                        <span className="text-sm text-slate-600">{phone}</span>
                      </>
                    )}
                  </div>
                </div>

                {/* Status Badge */}
                <Badge
                  variant="outline"
                  className={cn(
                    'text-sm font-medium border px-3 py-1 rounded-full capitalize',
                    statusColors.bg,
                    statusColors.text,
                    statusColors.border
                  )}
                >
                  {statusColors.label}
                </Badge>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        'w-5 h-5',
                        i < Math.floor(rating)
                          ? 'text-yellow-400 fill-yellow-400'
                          : 'text-slate-200 fill-slate-200'
                      )}
                    />
                  ))}
                </div>
                <span className="text-base font-medium text-slate-900">
                  {rating.toFixed(1)}
                </span>
                <span className="text-sm text-slate-500">
                  ({reviewCount} {reviewCount === 1 ? 'beoordeling' : 'beoordelingen'})
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
