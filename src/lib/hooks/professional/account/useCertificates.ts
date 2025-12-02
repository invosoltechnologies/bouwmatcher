/**
 * Certificate Management Hooks
 * React Query hooks for uploading and deleting professional certificates
 */

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { accountKeys } from './useAccount';
import type {
  UploadCertificateResponse,
  DeleteCertificateResponse,
} from '@/types/dto/professional/account/certificates.dto';

interface UploadCertificateData {
  title: string;
  issuing_organization: string;
  issue_date: string;
  expiry_date: string;
  file: File;
}

interface UseUploadCertificateOptions {
  onSuccess?: (data: UploadCertificateResponse) => void;
  onError?: (error: Error) => void;
}

interface UseDeleteCertificateOptions {
  onSuccess?: (data: DeleteCertificateResponse) => void;
  onError?: (error: Error) => void;
}

/**
 * Upload a certificate
 */
async function uploadCertificate(
  data: UploadCertificateData
): Promise<UploadCertificateResponse> {
  const formData = new FormData();
  formData.append('file', data.file);
  formData.append('title', data.title);
  formData.append('issuing_organization', data.issuing_organization);
  formData.append('issue_date', data.issue_date);
  formData.append('expiry_date', data.expiry_date);

  const response = await fetch('/api/account/certificates', {
    method: 'POST',
    body: formData,
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error || 'Failed to upload certificate');
  }

  return result;
}

/**
 * Delete a certificate
 */
async function deleteCertificate(
  certificateId: string
): Promise<DeleteCertificateResponse> {
  const response = await fetch(
    `/api/account/certificates?certificateId=${encodeURIComponent(certificateId)}`,
    {
      method: 'DELETE',
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error || 'Failed to delete certificate');
  }

  return result;
}

/**
 * Hook to upload a certificate
 */
export function useUploadCertificate(options?: UseUploadCertificateOptions) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: uploadCertificate,
    onSuccess: (data) => {
      // Invalidate account query to refresh certificates list
      queryClient.invalidateQueries({ queryKey: accountKeys.detail() });
      options?.onSuccess?.(data);
    },
    onError: (error: Error) => {
      options?.onError?.(error);
    },
  });
}

/**
 * Hook to delete a certificate
 */
export function useDeleteCertificate(options?: UseDeleteCertificateOptions) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCertificate,
    onSuccess: (data) => {
      // Invalidate account query to refresh certificates list
      queryClient.invalidateQueries({ queryKey: accountKeys.detail() });
      options?.onSuccess?.(data);
    },
    onError: (error: Error) => {
      options?.onError?.(error);
    },
  });
}
