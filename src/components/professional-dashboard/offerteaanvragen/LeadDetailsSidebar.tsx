'use client';

import { useTranslations } from 'next-intl';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MessageCircle, CheckCircle, Clock, Package } from 'lucide-react';

interface LeadDetailsSidebarProps {
  isLocked: boolean;
  status?: string;
}

export default function LeadDetailsSidebar({ isLocked, status }: LeadDetailsSidebarProps) {
  const t = useTranslations('common.proDashboard.offerteaanvragen.leadDetailsSidebar');

  // Status mapping for display
  const getStatusInfo = (projectStatus: string) => {
    const statusMap: Record<string, { labelKey: string; color: string }> = {
      'pending_quotes': { labelKey: 'statusPendingQuotes', color: 'bg-blue-100 text-blue-700' },
      'specialist_selected': { labelKey: 'statusSpecialistSelected', color: 'bg-green-100 text-green-700' },
      'in_progress': { labelKey: 'statusInProgress', color: 'bg-yellow-100 text-yellow-700' },
      'completed': { labelKey: 'statusCompleted', color: 'bg-gray-100 text-gray-700' },
    };

    return statusMap[projectStatus] || { labelKey: 'statusUnknown', color: 'bg-gray-100 text-gray-700' };
  };

  return (
    <div className="space-y-4">
      {/* Project Status Card - Only for Unlocked Leads */}
      {!isLocked && status && (
        <Card>
          <CardContent className="pt-6">
            <h3 className="font-semibold text-foreground mb-4">{t('projectStatusTitle')}</h3>

            <div className="space-y-3">
              <div>
                <p className="text-sm text-muted-foreground mb-2">{t('currentStatus')}</p>
                <Badge className={`${getStatusInfo(status).color} px-3 py-1 text-sm font-medium`}>
                  {t(getStatusInfo(status).labelKey)}
                </Badge>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mt-4">
                <p className="text-sm text-blue-900">
                  <strong>{t('noteTitle')}</strong> {t('noteDescription')}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* How to Receive Reviews Card */}
      <Card>
        <CardContent className="pt-6">
          <h3 className="font-semibold text-foreground mb-4">{t('reviewsTitle')}</h3>

          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="flex-shrink-0 mt-1">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <MessageCircle className="w-4 h-4 text-primary" />
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium text-foreground mb-1">{t('step1Title')}</h4>
                <p className="text-sm text-muted-foreground">{t('step1Description')}</p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex-shrink-0 mt-1">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-primary" />
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium text-foreground mb-1">{t('step2Title')}</h4>
                <p className="text-sm text-muted-foreground">{t('step2Description')}</p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex-shrink-0 mt-1">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <Package className="w-4 h-4 text-primary" />
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium text-foreground mb-1">{t('step3Title')}</h4>
                <p className="text-sm text-muted-foreground">{t('step3Description')}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tips Card */}
      <Card>
        <CardContent className="pt-6">
          <h3 className="font-semibold text-foreground mb-4">{t('tipsTitle')}</h3>

          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <Clock className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              <span>{t('tip1')}</span>
            </li>
            <li className="flex items-start gap-2">
              <Clock className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              <span>{t('tip2')}</span>
            </li>
            <li className="flex items-start gap-2">
              <Clock className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              <span>{t('tip3')}</span>
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* Help Card */}
      <Card>
        <CardContent className="pt-6">
          <h3 className="font-semibold text-foreground mb-3">{t('helpTitle')}</h3>
          <p className="text-sm text-muted-foreground mb-4">{t('helpDescription')}</p>
          <Button variant="outline" className="w-full">
            {t('contactButton')}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
