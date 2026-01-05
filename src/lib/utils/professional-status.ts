import { ProfessionalProfile } from '@/types/models/professional-profile.model';
import { ProfessionalCompany } from '@/types/models/professional-company.model';
import { ProfileVerificationStatus } from '@/types/enums/professional/verification-status.enum';

export type ProfessionalStatusType = 'verified' | 'pending' | 'in_review' | 'unverified' | 'rejected' | 'suspended';

/**
 * Computes the professional status based on profile and company data
 *
 * Verification workflow:
 * 1. If professional is suspended → 'suspended'
 * 2. If professional is rejected → 'rejected'
 * 3. If professional has a company:
 *    - If company is verified → 'verified'
 *    - If company is in review → 'in_review'
 *    - If company is pending → 'pending'
 * 4. If professional has no company → 'unverified'
 *
 * @param profile - Professional profile data
 * @param company - Associated professional company data (optional)
 * @returns Professional status
 */
export function getProfessionalStatus(
  profile: Partial<ProfessionalProfile>,
  company?: Partial<ProfessionalCompany> | null
): ProfessionalStatusType {
  // Check suspended status first
  if (profile.is_verified === ProfileVerificationStatus.SUSPENDED) {
    return 'suspended';
  }

  // Check rejected status
  if (profile.is_verified === ProfileVerificationStatus.REJECTED) {
    return 'rejected';
  }

  // If professional has a company, use company verification status
  if (company?.id) {
    const verificationStatus = company.verification_status?.toLowerCase();
    const isVerified = company.is_verified === true;

    // Company is verified
    if (isVerified || verificationStatus === 'verified') {
      return 'verified';
    }

    // Company is in review
    if (verificationStatus === 'in_review') {
      return 'in_review';
    }

    // Company is pending verification
    if (verificationStatus === 'pending') {
      return 'pending';
    }

    // Company status is rejected
    if (verificationStatus === 'rejected') {
      return 'rejected';
    }
  }

  // Check profile-level verification status
  const profileStatus = profile.is_verified as string | null;
  if (profileStatus) {
    switch (profileStatus.toLowerCase()) {
      case ProfileVerificationStatus.VERIFIED:
        return 'verified';
      case ProfileVerificationStatus.IN_REVIEW:
        return 'in_review';
      case ProfileVerificationStatus.PENDING:
        return 'pending';
      case ProfileVerificationStatus.REJECTED:
        return 'rejected';
      default:
        break;
    }
  }

  // Default: unverified
  return 'unverified';
}

/**
 * Gets a human-readable status label
 * Can be used with i18n: t(`status.${statusLabel}`)
 *
 * @param status - Professional status
 * @returns Status label for translation key
 */
export function getStatusLabel(status: ProfessionalStatusType): string {
  switch (status) {
    case 'verified':
      return 'verified';
    case 'pending':
      return 'pending';
    case 'in_review':
      return 'in_review';
    case 'rejected':
      return 'rejected';
    case 'suspended':
      return 'suspended';
    case 'unverified':
      return 'unverified';
    default:
      return 'unverified';
  }
}

/**
 * Checks if a professional can accept projects based on their status
 *
 * @param status - Professional status
 * @returns Whether professional can accept projects
 */
export function canAcceptProjects(status: ProfessionalStatusType): boolean {
  return status === 'verified';
}

/**
 * Checks if a professional needs to complete verification
 *
 * @param status - Professional status
 * @returns Whether professional needs to verify
 */
export function needsVerification(status: ProfessionalStatusType): boolean {
  return status === 'unverified' || status === 'pending' || status === 'in_review';
}

/**
 * Checks if professional status is final (cannot change without admin action)
 *
 * @param status - Professional status
 * @returns Whether status is final
 */
export function isFinalStatus(status: ProfessionalStatusType): boolean {
  return status === 'verified' || status === 'rejected' || status === 'suspended';
}
