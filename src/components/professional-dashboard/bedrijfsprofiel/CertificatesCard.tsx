'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Award, Download, Trash2, FileText } from 'lucide-react';
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
  const [isModalOpen, setIsModalOpen] = useState(false);

  const deleteMutation = useDeleteCertificate({
    onSuccess: () => {
      toast.success('Certificaat succesvol verwijderd');
    },
    onError: (error) => {
      toast.error(error.message || 'Kon certificaat niet verwijderen');
    },
  });

  const handleDelete = (certificateId: string) => {
    if (confirm('Weet je zeker dat je dit certificaat wilt verwijderen?')) {
      deleteMutation.mutate(certificateId);
    }
  };

  return (
    <>
      <Card>
        <CardHeader>
          <div className='flex items-center justify-between'>
            <CardTitle className='text-lg font-semibold'>
              Certificaten & Kwaliteitsmarken
            </CardTitle>
            {certificates.length > 0 && (
              <Button
                onClick={() => setIsModalOpen(true)}
                variant='outline'
                size='sm'
                className='gap-2 rounded-xl border-2 border-primary text-primary px-4 py-2'
              >
                <Plus className='w-4 h-4' />
                Toevoegen
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {certificates.length === 0 ? (
            /* No Certificates Placeholder */
            <div className='flex flex-col items-center justify-center py-12 text-center'>
              <div className='w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4'>
                <Award className='w-8 h-8 text-slate-400' />
              </div>
              <p className='text-sm text-muted-foreground mb-6'>
                Geen certificaten toegevoegd
              </p>

              {/* Add Certificate Button */}
              <Button
                onClick={() => setIsModalOpen(true)}
                variant='outline'
                className='gap-2 rounded-xl border-2 border-primary text-primary px-4 py-2'
              >
                <Plus className='w-4 h-4' />
                Certificaat toevoegen
              </Button>
            </div>
          ) : (
            /* Certificates Grid */
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
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
                          <FileText className='w-16 h-16 text-blue-400' />
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
                          <Download className='w-6 h-6 mx-auto mb-1' />
                          <span className='text-sm font-medium'>
                            Download PDF
                          </span>
                        </div>
                      </a>
                    </div>

                    {/* Certificate Info */}
                    <div className='p-4 bg-white'>
                      <h4 className='font-medium text-secondary-foreground truncate mb-1'>
                        {certificate.title}
                      </h4>
                      <p className='text-sm text-muted-foreground truncate'>
                        ID: #{certificate.id.slice(0, 12)}
                      </p>
                      {/* Delete Button Overlay */}
                      <button
                        onClick={() => handleDelete(certificate.id)}
                        disabled={deleteMutation.isPending}
                        className='absolute top-2 right-2 p-2 bg-white rounded-lg shadow-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50 disabled:opacity-50'
                        title='Verwijder certificaat'
                      >
                        <Trash2 className='w-4 h-4 text-red-600' />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      <AddCertificateModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
