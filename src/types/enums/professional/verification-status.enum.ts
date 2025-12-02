/**
 * Professional profile verification status enum
 * Matches the database CHECK constraint values
 */
export enum ProfileVerificationStatus {
  UNVERIFIED = 'unverified',
  PENDING = 'pending',
  IN_REVIEW = 'in_review',
  VERIFIED = 'verified',
  REJECTED = 'rejected',
  SUSPENDED = 'suspended',
}

/**
 * Gender enum matching database values
 */
export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other',
  PREFER_NOT_TO_SAY = 'prefer_not_to_say',
}

/**
 * Account status code for UI display
 */
export enum AccountStatusCode {
  BLOCKED = -1,
  VERIFIED = 1,
  IN_PROCESS = 2,
}
