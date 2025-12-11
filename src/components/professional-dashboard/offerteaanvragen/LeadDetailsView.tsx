'use client';

import { useState } from 'react';
import { Lock, Image as ImageIcon } from 'lucide-react';
import { format } from 'date-fns';
import { nl } from 'date-fns/locale';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardAction } from '@/components/ui/card';
import { useLeadDetails } from '@/lib/hooks/professional/leads';
import PurchaseLeadDialog from './PurchaseLeadDialog';
import { PurchaseLeadDialogData } from '@/types/models/payment.model';

interface LeadDetailsViewProps {
  leadId: string;
  onClose: () => void;
}

export default function LeadDetailsView({ leadId, onClose }: LeadDetailsViewProps) {
  const { data, isLoading, error } = useLeadDetails(leadId);
  const [showPurchaseDialog, setShowPurchaseDialog] = useState(false);
  const [purchaseDialogData, setPurchaseDialogData] = useState<PurchaseLeadDialogData | null>(null);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Lead details laden...</p>
        </div>
      </div>
    );
  }

  if (error || !data) {
    // Check if it's a verification error (403)
    const isVerificationError = error?.message?.includes('Verification required') ||
                                 error?.message?.includes('geverifieerd');

    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center max-w-md">
          {isVerificationError ? (
            <>
              <div className="mb-4">
                <div className="w-16 h-16 rounded-full bg-yellow-100 flex items-center justify-center mx-auto mb-4">
                  <Lock className="w-8 h-8 text-yellow-600" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Verificatie vereist
                </h3>
                <p className="text-muted-foreground mb-4">
                  Je moet geverifieerd zijn om lead details te bekijken. Voltooi de verificatie om toegang te krijgen tot interessante aanvragen.
                </p>
              </div>
              <div className="flex gap-3 justify-center">
                <Button onClick={onClose} variant="outline">
                  Terug naar overzicht
                </Button>
                <Button onClick={() => window.location.href = '/pro-dashboard/profiel'}>
                  Verificatie voltooien
                </Button>
              </div>
            </>
          ) : (
            <>
              <p className="text-destructive mb-2">Er is een fout opgetreden</p>
              <Button onClick={onClose} variant="outline">
                Terug naar overzicht
              </Button>
            </>
          )}
        </div>
      </div>
    );
  }

  const { lead, photos, is_locked } = data;
  const categoryName = lead.service_categories?.name_nl || 'Project';
  const city = lead.city || 'Onbekende locatie';

  // Format price from backend (already calculated based on request type)
  const formattedPrice = lead.lead_price
    ? `€ ${lead.lead_price.toFixed(2).replace('.', '.')}`
    : 'Contact Support';

  // Handle unlock button click
  const handleUnlockClick = () => {
    if (!lead.lead_price) return;

    setPurchaseDialogData({
      leadId: lead.id,
      leadPrice: lead.lead_price,
      categoryName,
      city,
      customerName: `${lead.first_name} ${lead.last_name}`,
    });
    setShowPurchaseDialog(true);
  };

  return (
    <div className="space-y-4">
      {/* Full Width Unlock Warning Card */}
      {is_locked && (
        <Card>
          <CardContent>
            <h3 className="font-semibold text-foreground mb-3">
              Wil je reageren op deze opdracht?
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Ontgrendel de contactgegevens door je account te verifiëren en het toegangstarief te betalen.
            </p>
            <ul className="space-y-2 mb-4">
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="text-green-600 mt-0.5">✓</span>
                <span>Bevestig je e-mail en bedrijfsgegevens.</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="text-green-600 mt-0.5">✓</span>
                <span>Betaal voor het aangegeven tarief per opdracht – geen verborgen kosten.</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="text-green-600 mt-0.5">✓</span>
                <span>Na betaling zie je de contactgegevens en kun je meteen reageren.</span>
              </li>
            </ul>
            <div className="flex gap-3">
              <Button
                className="bg-accent text-accent-foreground hover:bg-accent/90 px-6 rounded-lg"
                onClick={handleUnlockClick}
              >
                Ontgrendel contactgegevens
              </Button>
              <Button variant="outline" className="px-6 rounded-lg text-primary">
                Account verifiëren
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Two Column Layout */}
      <div className="flex gap-6">
        {/* Left Column - Main Content */}
        <div className="flex-1 space-y-4">
          {/* Combined Card: Header + Request Details */}
          <Card>
            <CardHeader className="border-b border-b-slate-200">
              <div className="flex items-center gap-2">
                {is_locked && <Lock className="h-4 w-4 text-muted-foreground" />}
                <CardTitle className="text-xl">
                  {categoryName} in {city}
                </CardTitle>
              </div>
              <CardDescription>
                {lead.first_name}, {lead.last_name}
              </CardDescription>
              {is_locked && (
                <CardAction>
                  <Badge className="bg-primary text-primary-foreground px-4 py-2 text-base font-semibold rounded-2xl">
                    {formattedPrice}
                  </Badge>
                </CardAction>
              )}
            </CardHeader>

            <CardContent>
              <h3 className="font-semibold text-foreground mb-4">Opdracht</h3>

              <div className="space-y-4">
                {/* Description */}
                <div>
                  <p className="text-sm font-medium text-foreground mb-2">Omschrijving:</p>
                  <p className="text-sm text-muted-foreground">
                    {lead.description || 'Ik ben op zoek naar gevelreparatie, reiniging en voegen.'}
                  </p>
                </div>

                {/* Info Grid - Using Badge/Gray Background Design */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-muted-foreground min-w-[140px]">Categorie:</span>
                    <Badge variant="secondary" className="bg-muted text-muted-foreground font-normal">
                      {categoryName}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-sm text-muted-foreground min-w-[140px]">Soort aanvraag:</span>
                    <Badge variant="secondary" className="bg-muted text-muted-foreground font-normal capitalize">
                      {lead.request_type}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-sm text-muted-foreground min-w-[140px]">Uitvoeringsdatum:</span>
                    <Badge variant="secondary" className="bg-muted text-muted-foreground font-normal">
                      {lead.execution_timing === 'within_1_month' && 'Binnen 1 maand'}
                      {lead.execution_timing === 'within_3_months' && 'Binnen 3 maanden'}
                      {lead.execution_timing === 'within_6_months' && 'Binnen 6 maanden'}
                      {!lead.execution_timing && 'Binnen 1 maand'}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-sm text-muted-foreground min-w-[140px]">Type:</span>
                    <Badge variant="secondary" className="bg-muted text-muted-foreground font-normal">
                      {categoryName}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-sm text-muted-foreground min-w-[140px]">Oppervlakte gevel:</span>
                    <Badge variant="secondary" className="bg-muted text-muted-foreground font-normal">
                      40-70 m²
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Remark Section */}
          <Card>
            <CardContent>
              <h3 className="font-semibold text-foreground mb-3">Opmerking</h3>
              <div className="bg-slate-50 rounded-lg p-3">
                <p className="text-sm text-muted-foreground">
                  {lead.description || 'We willen een verklaring in de badkamer laten herstellen.'}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information - Locked/Unlocked */}
          <Card>
            <CardContent>
              <h3 className="font-semibold text-foreground mb-4">Contactinformatie</h3>

              {is_locked && (
                <div
                  className="rounded-lg p-3 mb-4 flex items-start gap-2 border border-slate-200"
                  style={{ background: '#FFB0201F' }}
                >
                  <Lock className="h-4 w-4 text-foreground mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-foreground">
                    Contactgegevens verborgen – ontgrendel om te bekijken.
                  </p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Naam:</p>
                  <p className="text-sm font-medium text-foreground">
                    {lead.first_name}, {lead.last_name}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Telefoon:</p>
                  <p className="text-sm font-medium text-foreground">{lead.phone}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">E-mail:</p>
                  <p className="text-sm font-medium text-foreground">{lead.email}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Adres:</p>
                  <p className="text-sm font-medium text-foreground">
                    {lead.street_name || lead.street_number}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Postcode:</p>
                  <p className="text-sm font-medium text-foreground">{lead.postcode}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Plaats:</p>
                  <p className="text-sm font-medium text-foreground">{lead.city}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Photos Section */}
          <Card>
            <CardContent>
              <h3 className="font-semibold text-foreground mb-4">Foto&apos;s</h3>

              {photos.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <ImageIcon className="h-12 w-12 text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground">
                    Er zijn geen foto&apos;s toegevoegd
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-3 gap-4">
                  {photos.map((photo) => (
                    <div
                      key={photo.id}
                      className="aspect-square rounded-lg overflow-hidden bg-muted"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={photo.storage_path}
                        alt={photo.file_name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Offer Details */}
          <Card>
            <CardContent>
              <h3 className="font-semibold text-foreground mb-4">Offerte details</h3>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Offerte ID:</span>
                  <span className="text-sm font-medium text-foreground">
                    {lead.id.slice(0, 13).toUpperCase()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Datum:</span>
                  <span className="text-sm font-medium text-foreground">
                    {format(new Date(lead.created_at), 'd MMM yyyy', { locale: nl })}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Tijdstip:</span>
                  <span className="text-sm font-medium text-foreground">
                    {format(new Date(lead.created_at), 'HH:mm', { locale: nl })}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Empty for now (will add sidebar content later) */}
        <div className="w-80">
          {/* Placeholder for future sidebar content */}
        </div>
      </div>

      {/* Purchase Lead Dialog */}
      <PurchaseLeadDialog
        open={showPurchaseDialog}
        onOpenChange={setShowPurchaseDialog}
        data={purchaseDialogData}
      />
    </div>
  );
}
