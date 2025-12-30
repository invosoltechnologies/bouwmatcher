'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Award, Download, Trash2, FileText } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useTranslations } from 'next-intl';
import AddCertificateModal from './AddCertificateModal';
import { useDeleteCertificate } from '@/lib/hooks/professional/account/useCertificates';
import { toast } from 'react-hot-toast';
import type { Certificate } from '@/lib/types/account';

interface CertificatesCardProps {
  certificates?: Certificate[];
}

export default function CertificatesCard({
  certificates = [],
}: CertificatesCardProps) {
  const t = useTranslations('common.proDashboard.bedrijfsprofiel.certificates');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [certificateToDelete, setCertificateToDelete] = useState<string | null>(null);

  const deleteMutation = useDeleteCertificate({
    onSuccess: () => {
      toast.success(t('deleteSuccess'));
      setDeleteDialogOpen(false);
      setCertificateToDelete(null);
    },
    onError: (error) => {
      toast.error(error.message || t('deleteError'));
    },
  });

  const handleDeleteClick = (certificateId: string) => {
    setCertificateToDelete(certificateId);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (certificateToDelete) {
      deleteMutation.mutate(certificateToDelete);
    }
  };

  return (
    <>
      <Card className='p-4 sm:p-5 lg:p-6'>
        <CardHeader className='p-0 mb-4 sm:mb-5 lg:mb-6'>
          <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3'>
            <CardTitle className='text-base sm:text-lg lg:text-xl font-semibold'>
              {t('title')}
            </CardTitle>
            {certificates.length > 0 && (
              <Button
                onClick={() => setIsModalOpen(true)}
                variant='outline'
                size='sm'
                className='w-full sm:w-auto gap-2 rounded-xl border-2 border-primary text-primary px-4 py-2 text-sm'
              >
                <Plus className='w-3.5 h-3.5 sm:w-4 sm:h-4' />
                {t('add')}
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className='p-0'>
          {certificates.length === 0 ? (
            /* No Certificates Placeholder */
            <div className='flex flex-col items-center justify-center py-8 sm:py-12 text-center'>
              <div className='w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-slate-100 flex items-center justify-center mb-3 sm:mb-4'>
                <Award className='w-6 h-6 sm:w-8 sm:h-8 text-slate-400' />
              </div>
              <p className='text-xs sm:text-sm text-muted-foreground mb-4 sm:mb-6'>
                {t('emptyState')}
              </p>

              {/* Add Certificate Button */}
              <Button
                onClick={() => setIsModalOpen(true)}
                variant='outline'
                className='w-full sm:w-auto gap-2 rounded-xl border-2 border-primary text-primary px-4 py-2 text-sm'
              >
                <Plus className='w-3.5 h-3.5 sm:w-4 sm:h-4' />
                {t('addCertificate')}
              </Button>
            </div>
          ) : (
            /* Certificates Grid */
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4'>
              {certificates.map((certificate) => {
                const isImage = certificate.file_url.match(/\.(jpg|jpeg|png)$/i);

                return (
                  <div
                    key={certificate.id}
                    className='relative group rounded-xl overflow-hidden border border-gray-200 hover:border-primary transition-all'
                  >
                    {/* Certificate Preview */}
                    <div className='aspect-[4/3] bg-gradient-to-br from-blue-50 to-blue-100 relative overflow-hidden'>
                      {isImage ? (
                        <Image
                          src={certificate.file_url}
                          alt={certificate.title}
                          fill
                          className='object-cover'
                        />
                      ) : (
                        <div className='w-full h-full flex items-center justify-center'>
                          <FileText className='w-12 h-12 sm:w-16 sm:h-16 text-blue-400' />
                        </div>
                      )}

                      {/* Download Button Overlay */}
                      <a
                        href={certificate.file_url}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='absolute inset-0 flex items-center justify-center bg-blue-600/0 hover:bg-blue-600/80 transition-all opacity-0 hover:opacity-100'
                      >
                        <div className='text-white text-center'>
                          <Download className='w-5 h-5 sm:w-6 sm:h-6 mx-auto mb-1' />
                          <span className='text-xs sm:text-sm font-medium'>
                            {t('downloadPdf')}
                          </span>
                        </div>
                      </a>
                    </div>

                    {/* Certificate Info */}
                    <div className='p-3 sm:p-4 bg-white'>
                      <h4 className='text-sm sm:text-base font-medium text-secondary-foreground truncate mb-1'>
                        {certificate.title}
                      </h4>
                      <p className='text-xs sm:text-sm text-muted-foreground truncate'>
                        {t('idPrefix')}{certificate.id.slice(0, 12)}
                      </p>
                      {/* Delete Button Overlay */}
                      <button
                        onClick={() => handleDeleteClick(certificate.id)}
                        disabled={deleteMutation.isPending}
                        className='absolute top-1.5 right-1.5 sm:top-2 sm:right-2 p-1.5 sm:p-2 bg-white rounded-lg shadow-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50 disabled:opacity-50'
                        title={t('deleteTitle')}
                      >
                        <Trash2 className='w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-600' />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t('deleteConfirmTitle')}</AlertDialogTitle>
            <AlertDialogDescription>
              {t('deleteConfirmDescription')}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleteMutation.isPending}>
              {t('cancel')}
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              disabled={deleteMutation.isPending}
              className='bg-red-600 hover:bg-red-700'
            >
              {deleteMutation.isPending ? t('deleting') : t('delete')}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AddCertificateModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
