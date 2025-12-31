/**
 * Certificate DTOs for professional profiles
 */

export interface Certificate {
  id: string;
  professional_profile_id: string;
  title: string;
  issuing_organization: string;
  issue_date: string; // ISO date string
  expiry_date: string; // ISO date string
  file_url: string;
  created_at: string;
  updated_at: string;
}

export interface UploadCertificateRequest {
  title: string;
  issuing_organization: string;
  issue_date: string; // ISO date string
  expiry_date: string; // ISO date string;
  file: File;
}

export interface UploadCertificateResponse {
  success: boolean;
  certificate: Certificate;
}

export interface DeleteCertificateRequest {
  certificateId: string;
}

export interface DeleteCertificateResponse {
  success: boolean;
  message: string;
}
