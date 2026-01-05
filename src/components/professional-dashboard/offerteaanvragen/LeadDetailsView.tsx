'use client';

import { useState } from 'react';
import { Lock, Image as ImageIcon } from 'lucide-react';
import { format } from 'date-fns';
import { nl, enUS } from 'date-fns/locale';
import { useTranslations, useLocale } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardAction } from '@/components/ui/card';
import { useLeadDetails } from '@/lib/hooks/professional/leads';
import { useAccount } from '@/lib/hooks/professional/account';
import PurchaseLeadDialog from './PurchaseLeadDialog';
import LeadDetailsSidebar from './LeadDetailsSidebar';
import { PurchaseLeadDialogData } from '@/types/models/payment.model';

interface LeadDetailsViewProps {
  leadId: string;
  onClose: () => void;
}

export default function LeadDetailsView({ leadId, onClose }: LeadDetailsViewProps) {
  const t = useTranslations('common.proDashboard.offerteaanvragen.leadDetails');
  const locale = useLocale();
  const dateLocale = locale === 'nl' ? nl : enUS;
  const { data, isLoading, error } = useLeadDetails(leadId);
  const { data: accountData } = useAccount();
  const [showPurchaseDialog, setShowPurchaseDialog] = useState(false);
  const [purchaseDialogData, setPurchaseDialogData] = useState<PurchaseLeadDialogData | null>(null);

  // Check if account is verified
  const isVerified = accountData?.accountData?.accountStatus?.status === 'verified';

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">{t('loading')}</p>
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
        <div className="text-center max-w-md px-4">
          {isVerificationError ? (
            <>
              <div className="mb-4">
                <div className="w-16 h-16 rounded-full bg-yellow-100 flex items-center justify-center mx-auto mb-4">
                  <Lock className="w-8 h-8 text-yellow-600" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {t('verificationRequired')}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {t('verificationMessage')}
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button onClick={onClose} variant="outline">
                  {t('backToOverview')}
                </Button>
                <Button onClick={() => window.location.href = '/pro-dashboard/profiel'}>
                  {t('verificationButton')}
                </Button>
              </div>
            </>
          ) : (
            <>
              <p className="text-destructive mb-2">{t('error')}</p>
              <Button onClick={onClose} variant="outline">
                {t('backToOverview')}
              </Button>
            </>
          )}
        </div>
      </div>
    );
  }

  const { lead, photos, is_locked } = data;
  const categoryName = (locale === 'nl' ? lead.service_categories?.name_nl : lead.service_categories?.name_en) || 'Project';
  const city = lead.city || (locale === 'nl' ? 'Onbekende locatie' : 'Unknown location');

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
              {t('unlockWarningTitle')}
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              {t('unlockWarningDescription')}
            </p>
            <ul className="space-y-2 mb-4">
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="text-green-600 mt-0.5">✓</span>
                <span>{t('unlockStep1')}</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="text-green-600 mt-0.5">✓</span>
                <span>{t('unlockStep2')}</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="text-green-600 mt-0.5">✓</span>
                <span>{t('unlockStep3')}</span>
              </li>
            </ul>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                className="bg-accent text-accent-foreground hover:bg-accent/90 px-6 rounded-lg"
                onClick={handleUnlockClick}
              >
                {t('unlockButton')}
              </Button>
              {!isVerified && (
                <Button variant="outline" className="px-6 rounded-lg text-primary">
                  {t('verifyAccountButton')}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Two Column Layout - Responsive */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Column - Main Content */}
        <div className="flex-1 space-y-4">
          {/* Combined Card: Header + Request Details */}
          <Card>
            <CardHeader className="border-b border-b-slate-200">
              <div className="flex items-center gap-2">
                {is_locked && <Lock className="h-4 w-4 text-muted-foreground" />}
                <CardTitle className="text-lg sm:text-xl">
                  {categoryName} {locale === 'nl' ? 'in' : 'in'} {city}
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
              <h3 className="font-semibold text-foreground mb-4">{t('requestTitle')}</h3>

              <div className="space-y-4">
                {/* Description */}
                <div>
                  <p className="text-sm font-medium text-foreground mb-2">{t('description')}</p>
                  <p className="text-sm text-muted-foreground">
                    {lead.description || (locale === 'nl' ? 'Geen omschrijving beschikbaar' : 'No description available')}
                  </p>
                </div>

                {/* Info Grid - Using Badge/Gray Background Design */}
                <div className="space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                    <span className="text-sm text-muted-foreground min-w-[140px]">{t('category')}</span>
                    <Badge variant="secondary" className="bg-muted text-muted-foreground font-normal w-fit">
                      {categoryName}
                    </Badge>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                    <span className="text-sm text-muted-foreground min-w-[140px]">{t('requestType')}</span>
                    <Badge variant="secondary" className="bg-muted text-muted-foreground font-normal capitalize w-fit">
                      {lead.request_type}
                    </Badge>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                    <span className="text-sm text-muted-foreground min-w-[140px]">{t('executionTiming')}</span>
                    <Badge variant="secondary" className="bg-muted text-muted-foreground font-normal w-fit">
                      {lead.execution_timing ? t(`executionTimings.${lead.execution_timing}`) : t('executionTimings.within_1_month')}
                    </Badge>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                    <span className="text-sm text-muted-foreground min-w-[140px]">{t('type')}</span>
                    <Badge variant="secondary" className="bg-muted text-muted-foreground font-normal w-fit">
                      {categoryName}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Remark Section */}
          <Card>
            <CardContent>
              <h3 className="font-semibold text-foreground mb-3">{t('remarkTitle')}</h3>
              <div className="bg-slate-50 rounded-lg p-3">
                <p className="text-sm text-muted-foreground">
                  {lead.description || (locale === 'nl' ? 'Geen opmerking beschikbaar' : 'No remark available')}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information - Locked/Unlocked */}
          <Card>
            <CardContent>
              <h3 className="font-semibold text-foreground mb-4">{t('contactInfoTitle')}</h3>

              {is_locked && (
                <div
                  className="rounded-lg p-3 mb-4 flex items-start gap-2 border border-slate-200"
                  style={{ background: '#FFB0201F' }}
                >
                  <Lock className="h-4 w-4 text-foreground mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-foreground">
                    {t('contactLocked')}
                  </p>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">{t('name')}</p>
                  <p className="text-sm font-medium text-foreground">
                    {lead.first_name}, {lead.last_name}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">{t('phone')}</p>
                  <p className="text-sm font-medium text-foreground">{lead.phone}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">{t('email')}</p>
                  <p className="text-sm font-medium text-foreground break-all">{lead.email}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">{t('address')}</p>
                  <p className="text-sm font-medium text-foreground">
                    {lead.street_name || lead.street_number}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">{t('postcode')}</p>
                  <p className="text-sm font-medium text-foreground">{lead.postcode}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">{t('city')}</p>
                  <p className="text-sm font-medium text-foreground">{lead.city}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Photos Section */}
          <Card>
            <CardContent>
              <h3 className="font-semibold text-foreground mb-4">{t('photosTitle')}</h3>

              {photos.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <ImageIcon className="h-12 w-12 text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground">
                    {t('noPhotos')}
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
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
              <h3 className="font-semibold text-foreground mb-4">{t('offerDetailsTitle')}</h3>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">{t('offerId')}</span>
                  <span className="text-sm font-medium text-foreground break-all">
                    {lead.id.slice(0, 13).toUpperCase()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">{t('date')}</span>
                  <span className="text-sm font-medium text-foreground">
                    {format(new Date(lead.created_at), 'd MMM yyyy', { locale: dateLocale })}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">{t('time')}</span>
                  <span className="text-sm font-medium text-foreground">
                    {format(new Date(lead.created_at), 'HH:mm', { locale: dateLocale })}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Sidebar - Hidden on mobile */}
        <div className="hidden lg:block lg:w-80">
          <LeadDetailsSidebar
            isLocked={is_locked}
            status={lead.status}
            isAssignedToMe={lead.is_assigned_to_me}
          />
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
