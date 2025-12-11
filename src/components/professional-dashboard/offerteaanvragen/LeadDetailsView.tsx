'use client';

import { Lock, Calendar, MapPin, Image as ImageIcon } from 'lucide-react';
import { format } from 'date-fns';
import { nl } from 'date-fns/locale';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLeadDetails } from '@/lib/hooks/professional/leads';

interface LeadDetailsViewProps {
  leadId: string;
  onClose: () => void;
}

export default function LeadDetailsView({ leadId, onClose }: LeadDetailsViewProps) {
  const { data, isLoading, error } = useLeadDetails(leadId);

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
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <p className="text-destructive mb-2">Er is een fout opgetreden</p>
          <Button onClick={onClose} variant="outline">
            Terug naar overzicht
          </Button>
        </div>
      </div>
    );
  }

  const { lead, photos, is_locked } = data;
  const categoryName = lead.service_categories?.name_nl || 'Project';
  const city = lead.city || 'Onbekende locatie';

  return (
    <div className="space-y-4">
      {/* Full Width Unlock Warning Card */}
      {is_locked && (
        <div
          className="bg-white rounded-lg p-5"
          style={{ boxShadow: '0px 5.5px 16.5px 0px #023AA214' }}
        >
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
            <Button className="bg-accent text-accent-foreground hover:bg-accent/90 px-6 rounded-lg">
              Ontgrendel contactgegevens
            </Button>
            <Button variant="outline" className="px-6 rounded-lg text-primary ">
              Account verifiëren
            </Button>
          </div>
        </div>
      )}

      {/* Two Column Layout */}
      <div className="flex gap-6">
        {/* Left Column - Main Content */}
        <div className="flex-1 space-y-4">
          {/* Header with Lock Status and Price */}
          <div
            className="bg-white rounded-lg p-5 flex items-start justify-between"
            style={{ boxShadow: '0px 5.5px 16.5px 0px #023AA214' }}
          >
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                {is_locked && <Lock className="h-4 w-4 text-muted-foreground" />}
                <h2 className="text-xl font-semibold text-foreground">
                  {categoryName} in {city}
                </h2>
              </div>
              <p className="text-sm text-muted-foreground">
                {lead.first_name}, {lead.last_name}
              </p>
            </div>
            {is_locked && (
              <div className="flex items-center gap-3">
                <Badge className="bg-primary text-primary-foreground px-4 py-2 text-base font-semibold rounded-md">
                  € 15,00
                </Badge>
              </div>
            )}
          </div>

          {/* Request Details */}
          <div
            className="bg-white rounded-lg p-5"
            style={{ boxShadow: '0px 5.5px 16.5px 0px #023AA214' }}
          >
            <h3 className="font-semibold text-foreground mb-4">Opdracht</h3>

            <div className="space-y-4">
              {/* Description */}
              <div>
                <h4 className="text-sm font-medium text-foreground mb-2">Omschrijving:</h4>
                <p className="text-sm text-muted-foreground">
                  {lead.description || 'Ik ben op zoek naar gevelreparatie, reiniging en voegen.'}
                </p>
              </div>

              {/* Meta Information */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-foreground mb-1">Categorie:</h4>
                  <p className="text-sm text-muted-foreground">{categoryName}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-foreground mb-1">Soort aanvraag:</h4>
                  <p className="text-sm text-muted-foreground capitalize">{lead.request_type}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-foreground mb-1">Uitvoeringsdatum:</h4>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>
                      {lead.execution_timing === 'within_1_month' && 'Binnen 1 maand'}
                      {lead.execution_timing === 'within_3_months' && 'Binnen 3 maanden'}
                      {lead.execution_timing === 'within_6_months' && 'Binnen 6 maanden'}
                      {!lead.execution_timing && 'Binnen 1 maand'}
                    </span>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-foreground mb-1">Type:</h4>
                  <p className="text-sm text-muted-foreground">{categoryName}</p>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-foreground mb-1">Openbare grootte:</h4>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>40-70 m²</span>
                </div>
              </div>
            </div>
          </div>

          {/* Remark Section */}
          <div
            className="bg-white rounded-lg p-5"
            style={{ boxShadow: '0px 5.5px 16.5px 0px #023AA214' }}
          >
            <h3 className="font-semibold text-foreground mb-3">Opmerking</h3>
            <p className="text-sm text-muted-foreground">
              We willen een verklaring in de badkamer laten herstellen.
            </p>
          </div>

          {/* Contact Information - Locked/Unlocked */}
          <div
            className="bg-white rounded-lg p-5"
            style={{ boxShadow: '0px 5.5px 16.5px 0px #023AA214' }}
          >
            <div className="flex items-center gap-2 mb-4">
              {is_locked && <Lock className="h-4 w-4 text-yellow-600" />}
              <h3 className="font-semibold text-foreground">Contactinformatie</h3>
            </div>

            {is_locked && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4 flex items-start gap-2">
                <Lock className="h-4 w-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-yellow-800">
                  Contactgegevens verborgen – ontgrendel om de bedrijven.
                </p>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium text-foreground mb-1">Naam:</h4>
                <p className="text-sm text-muted-foreground">
                  {lead.first_name}, {lead.last_name}
                </p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-foreground mb-1">Telefoon:</h4>
                <p className="text-sm text-muted-foreground">{lead.phone}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <h4 className="text-sm font-medium text-foreground mb-1">E-mail:</h4>
                <p className="text-sm text-muted-foreground">{lead.email}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-foreground mb-1">Adres:</h4>
                <p className="text-sm text-muted-foreground">
                  {lead.street_name || lead.street_number}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <h4 className="text-sm font-medium text-foreground mb-1">Postcode:</h4>
                <p className="text-sm text-muted-foreground">{lead.postcode}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-foreground mb-1">Plaats:</h4>
                <p className="text-sm text-muted-foreground">{lead.city}</p>
              </div>
            </div>
          </div>

          {/* Photos Section */}
          <div
            className="bg-white rounded-lg p-5"
            style={{ boxShadow: '0px 5.5px 16.5px 0px #023AA214' }}
          >
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
                    <img
                      src={photo.storage_path}
                      alt={photo.file_name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Offer Details */}
          <div
            className="bg-white rounded-lg p-5"
            style={{ boxShadow: '0px 5.5px 16.5px 0px #023AA214' }}
          >
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
          </div>
        </div>

        {/* Right Column - Empty for now (will add sidebar content later) */}
        <div className="w-80">
          {/* Placeholder for future sidebar content */}
        </div>
      </div>
    </div>
  );
}
