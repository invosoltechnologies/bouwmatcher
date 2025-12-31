'use client';

import { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { format } from 'date-fns';
import { nl } from 'date-fns/locale';
import { Calendar as CalendarIcon, Upload, File } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useTranslations } from 'next-intl';
import GlassyModal from '@/components/ui/glassy-modal';
import { useUploadCertificate } from '@/lib/hooks/professional/account/useCertificates';
import { toast } from 'react-hot-toast';
import { cn } from '@/lib/utils';

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ACCEPTED_FILE_TYPES = ['image/png', 'image/jpeg', 'image/jpg', 'application/pdf'];

interface AddCertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CertificateFormData {
  title: string;
  issuing_organization: string;
  issue_date: Date | undefined;
  expiry_date: Date | undefined;
  file: File | null;
}

export default function AddCertificateModal({
  isOpen,
  onClose,
}: AddCertificateModalProps) {
  const t = useTranslations('common.proDashboard.bedrijfsprofiel.modals.addCertificate');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [issueDate, setIssueDate] = useState<Date | undefined>();
  const [expiryDate, setExpiryDate] = useState<Date | undefined>();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CertificateFormData>();

  const uploadMutation = useUploadCertificate({
    onSuccess: () => {
      toast.success(t('success'));
      handleClose();
    },
    onError: (error) => {
      toast.error(error.message || t('error'));
    },
  });

  const handleClose = () => {
    reset();
    setSelectedFile(null);
    setIssueDate(undefined);
    setExpiryDate(undefined);
    onClose();
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];

    // Validate file type
    if (!ACCEPTED_FILE_TYPES.includes(file.type)) {
      toast.error(t('fileTypeError'));
      event.target.value = '';
      return;
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      toast.error(t('fileSizeError'));
      event.target.value = '';
      return;
    }

    setSelectedFile(file);
  };

  const onSubmit = (data: CertificateFormData) => {
    // Validate file
    if (!selectedFile) {
      toast.error(t('selectFileError'));
      return;
    }

    // Validate dates
    if (!issueDate) {
      toast.error(t('selectIssueDateError'));
      return;
    }

    if (!expiryDate) {
      toast.error(t('selectExpiryDateError'));
      return;
    }

    if (issueDate >= expiryDate) {
      toast.error(t('invalidDateRangeError'));
      return;
    }

    // Submit the form
    uploadMutation.mutate({
      title: data.title,
      issuing_organization: data.issuing_organization,
      issue_date: issueDate.toISOString().split('T')[0],
      expiry_date: expiryDate.toISOString().split('T')[0],
      file: selectedFile,
    });
  };

  return (
    <GlassyModal isOpen={isOpen} onClose={handleClose} title={t('title')} className="max-w-sm sm:max-w-md lg:max-w-lg">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 sm:space-y-4 w-full p-4 sm:p-6">
        {/* Title */}
        <div>
          <Label htmlFor="title" className="text-xs sm:text-sm font-medium text-secondary-foreground">
            {t('titleLabel')}
          </Label>
          <Input
            id="title"
            {...register('title', { required: t('titleRequired') })}
            className="mt-1.5 rounded-xl border-gray-300 text-sm sm:text-base"
            placeholder={t('titlePlaceholder')}
          />
          {errors.title && (
            <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.title.message}</p>
          )}
        </div>

        {/* Issuing Organization */}
        <div>
          <Label htmlFor="issuing_organization" className="text-xs sm:text-sm font-medium text-secondary-foreground">
            {t('organizationLabel')}
          </Label>
          <Input
            id="issuing_organization"
            {...register('issuing_organization', {
              required: t('organizationRequired'),
            })}
            className="mt-1.5 rounded-xl border-gray-300 text-sm sm:text-base"
            placeholder={t('organizationPlaceholder')}
          />
          {errors.issuing_organization && (
            <p className="mt-1 text-xs sm:text-sm text-red-600">
              {errors.issuing_organization.message}
            </p>
          )}
        </div>

        {/* Date Fields Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          {/* Issue Date */}
          <div>
            <Label className="text-xs sm:text-sm font-medium text-secondary-foreground">
              {t('issueDateLabel')}
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <button
                  type="button"
                  className={cn(
                    'w-full mt-1.5 px-3 sm:px-4 py-2 flex items-center justify-start gap-2 text-left font-normal border border-gray-300 rounded-xl bg-white hover:ring-2 hover:ring-primary hover:border-primary transition-all outline-none',
                    !issueDate && 'text-muted-foreground'
                  )}
                >
                  <CalendarIcon className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                  <span className="text-xs sm:text-sm">
                    {issueDate ? (
                      format(issueDate, 'dd/MM/yyyy', { locale: nl })
                    ) : (
                      t('datePlaceholder')
                    )}
                  </span>
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={issueDate}
                  onSelect={setIssueDate}
                  disabled={(date) => date > new Date()}
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Expiry Date */}
          <div>
            <Label className="text-xs sm:text-sm font-medium text-secondary-foreground">
              {t('expiryDateLabel')}
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <button
                  type="button"
                  className={cn(
                    'w-full mt-1.5 px-3 sm:px-4 py-2 flex items-center justify-start gap-2 text-left font-normal border border-gray-300 rounded-xl bg-white hover:ring-2 hover:ring-primary hover:border-primary transition-all outline-none',
                    !expiryDate && 'text-muted-foreground'
                  )}
                >
                  <CalendarIcon className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                  <span className="text-xs sm:text-sm">
                    {expiryDate ? (
                      format(expiryDate, 'dd/MM/yyyy', { locale: nl })
                    ) : (
                      t('datePlaceholder')
                    )}
                  </span>
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={expiryDate}
                  onSelect={setExpiryDate}
                  disabled={(date) => {
                    if (!issueDate) return true;
                    return date <= issueDate;
                  }}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* File Upload */}
        <div>
          <Label className="text-xs sm:text-sm font-medium text-secondary-foreground">
            {t('fileLabel')}
          </Label>
          <div
            onClick={() => fileInputRef.current?.click()}
            className="mt-1.5 border-2 border-dashed border-gray-300 rounded-xl p-4 sm:p-6 flex flex-col items-center justify-center cursor-pointer hover:border-primary hover:bg-primary/5 transition-all"
          >
            {selectedFile ? (
              <div className="flex items-center gap-2">
                <File className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                <span className="text-xs sm:text-sm text-secondary-foreground truncate max-w-[200px] sm:max-w-full">
                  {selectedFile.name}
                </span>
              </div>
            ) : (
              <>
                <Upload className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400 mb-2" />
                <p className="text-xs sm:text-sm text-secondary-foreground">
                  {t('filePrompt')}
                </p>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                  {t('fileRequirements')}
                </p>
              </>
            )}
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept=".jpg,.jpeg,.png,.pdf"
            onChange={handleFileSelect}
            className="hidden"
          />
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={handleClose}
            disabled={uploadMutation.isPending}
            className="w-full sm:w-auto rounded-xl py-2.5 sm:py-3 px-4 sm:px-6 text-sm sm:text-base"
          >
            {t('cancel')}
          </Button>
          <Button
            type="submit"
            disabled={uploadMutation.isPending}
            className="w-full sm:w-auto rounded-xl bg-primary text-white hover:bg-primary/90 py-2.5 sm:py-3 px-4 sm:px-6 text-sm sm:text-base"
          >
            {uploadMutation.isPending ? t('uploading') : t('save')}
          </Button>
        </div>
      </form>
    </GlassyModal>
  );
}
