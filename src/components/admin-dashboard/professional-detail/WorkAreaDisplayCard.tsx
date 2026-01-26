'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { MapPin } from 'lucide-react';

interface WorkAreaDisplayCardProps {
  workAddress: string | null;
  workPostalCode: string | null;
  workCity: string | null;
  workCountry: string | null;
  serviceRadiusKm: number | null;
}

export default function WorkAreaDisplayCard({
  workAddress,
  workPostalCode,
  workCity,
  workCountry,
  serviceRadiusKm,
}: WorkAreaDisplayCardProps) {
  const fullAddress = [workAddress, workPostalCode, workCity, workCountry]
    .filter(Boolean)
    .join(', ');

  return (
    <Card className="px-5 gap-4">
      <CardHeader className="p-0 gap-0">
        <CardTitle className="text-xl leading-normal">Werkgebied</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        {fullAddress ? (
          <div className="space-y-4">
            {/* Address */}
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-slate-900 mb-1">
                  Werklocatie
                </p>
                <p className="text-sm text-slate-600">{fullAddress}</p>
              </div>
            </div>

            {/* Service Radius */}
            {serviceRadiusKm !== null && (
              <div className="pt-4 border-t border-slate-200">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-600">
                    Service Radius
                  </span>
                  <span className="text-base font-semibold text-primary">
                    {serviceRadiusKm} km
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-2">
                  Actief binnen een straal van {serviceRadiusKm} kilometer van de werklocatie
                </p>
              </div>
            )}
          </div>
        ) : (
          <p className="text-sm text-slate-500 py-4 text-center">
            Geen werkgebied opgegeven
          </p>
        )}
      </CardContent>
    </Card>
  );
}
