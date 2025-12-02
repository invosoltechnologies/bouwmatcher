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
      toast.success('Certificaat succesvol toegevoegd');
      handleClose();
    },
    onError: (error) => {
      toast.error(error.message || 'Kon certificaat niet uploaden');
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
      toast.error('Alleen JPG, PNG en PDF bestanden zijn toegestaan');
      event.target.value = '';
      return;
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      toast.error('Bestand mag maximaal 10MB groot zijn');
      event.target.value = '';
      return;
    }

    setSelectedFile(file);
  };

  const onSubmit = (data: CertificateFormData) => {
    // Validate file
    if (!selectedFile) {
      toast.error('Selecteer een bestand');
      return;
    }

    // Validate dates
    if (!issueDate) {
      toast.error('Selecteer een uitgiftedatum');
      return;
    }

    if (!expiryDate) {
      toast.error('Selecteer een vervaldatum');
      return;
    }

    if (issueDate >= expiryDate) {
      toast.error('Vervaldatum moet na de uitgiftedatum zijn');
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
    <GlassyModal isOpen={isOpen} onClose={handleClose} title="Certificaten & Kwaliteitsmarken">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full">
        {/* Title */}
        <div>
          <Label htmlFor="title" className="text-sm font-medium text-secondary-foreground">
            Eigen titel
          </Label>
          <Input
            id="title"
            {...register('title', { required: 'Titel is verplicht' })}
            className="mt-1.5 rounded-xl border-gray-300"
            placeholder="Bijv. VCA Certificaat"
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
          )}
        </div>

        {/* Issuing Organization */}
        <div>
          <Label htmlFor="issuing_organization" className="text-sm font-medium text-secondary-foreground">
            Uitgevende organisatie
          </Label>
          <Input
            id="issuing_organization"
            {...register('issuing_organization', {
              required: 'Uitgevende organisatie is verplicht',
            })}
            className="mt-1.5 rounded-xl border-gray-300"
            placeholder="Bijv. SSVV"
          />
          {errors.issuing_organization && (
            <p className="mt-1 text-sm text-red-600">
              {errors.issuing_organization.message}
            </p>
          )}
        </div>

        {/* Date Fields Row */}
        <div className="grid grid-cols-2 gap-4">
          {/* Issue Date */}
          <div>
            <Label className="text-sm font-medium text-secondary-foreground">
              Uitgiftedatum
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <button
                  type="button"
                  className={cn(
                    'w-full mt-1.5 px-4 py-2 flex items-center justify-start gap-2 text-left font-normal border border-gray-300 rounded-xl bg-white hover:ring-2 hover:ring-primary hover:border-primary transition-all outline-none',
                    !issueDate && 'text-muted-foreground'
                  )}
                >
                  <CalendarIcon className="h-4 w-4 flex-shrink-0" />
                  <span className="text-sm">
                    {issueDate ? (
                      format(issueDate, 'dd/MM/yyyy', { locale: nl })
                    ) : (
                      'dd/mm/yyyy'
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
            <Label className="text-sm font-medium text-secondary-foreground">
              Geldig t/m
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <button
                  type="button"
                  className={cn(
                    'w-full mt-1.5 px-4 py-2 flex items-center justify-start gap-2 text-left font-normal border border-gray-300 rounded-xl bg-white hover:ring-2 hover:ring-primary hover:border-primary transition-all outline-none',
                    !expiryDate && 'text-muted-foreground'
                  )}
                >
                  <CalendarIcon className="h-4 w-4 flex-shrink-0" />
                  <span className="text-sm">
                    {expiryDate ? (
                      format(expiryDate, 'dd/MM/yyyy', { locale: nl })
                    ) : (
                      'dd/mm/yyyy'
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
          <Label className="text-sm font-medium text-secondary-foreground">
            Bestand
          </Label>
          <div
            onClick={() => fileInputRef.current?.click()}
            className="mt-1.5 border-2 border-dashed border-gray-300 rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer hover:border-primary hover:bg-primary/5 transition-all"
          >
            {selectedFile ? (
              <div className="flex items-center gap-2">
                <File className="w-5 h-5 text-primary" />
                <span className="text-sm text-secondary-foreground">
                  {selectedFile.name}
                </span>
              </div>
            ) : (
              <>
                <Upload className="w-8 h-8 text-gray-400 mb-2" />
                <p className="text-sm text-secondary-foreground">
                  Klik om bestand te selecteren
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  JPG, PNG of PDF - max 10MB
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
        <div className="flex items-center justify-end gap-3 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={handleClose}
            disabled={uploadMutation.isPending}
            className="rounded-xl"
          >
            Annuleren
          </Button>
          <Button
            type="submit"
            disabled={uploadMutation.isPending}
            className="rounded-xl bg-primary text-white hover:bg-primary/90"
          >
            {uploadMutation.isPending ? 'Uploaden...' : 'Opslaan'}
          </Button>
        </div>
      </form>
    </GlassyModal>
  );
}
