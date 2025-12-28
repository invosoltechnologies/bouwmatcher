import type {
  AccountData,
  AccountDataRaw,
  AccountStatusData,
  CompanyInfoData,
  ContactInfoData,
  ProfileCompletionData,
  ProfessionalProfile,
  Company,
} from '@/lib/types/account';

/**
 * Maps verification_status from database to status code
 * -1: inactive/blocked/rejected
 * 1: verified
 * 2: in process/pending
 */
export function getStatusCode(
  verificationStatus: string | null
): -1 | 1 | 2 {
  switch (verificationStatus?.toLowerCase()) {
    case 'verified':
      return 1;
    case 'pending':
    case 'in_review':
    case 'unverified':
      return 2;
    case 'rejected':
    case 'suspended':
      return -1;
    default:
      return 2; // default to pending
  }
}

/**
 * Transforms database data to AccountStatus format
 * Uses ONLY profile.is_verified (professional profile status)
 * Returns translation keys instead of hardcoded text
 */
export function transformToAccountStatus(
  profile: ProfessionalProfile,
  company: Company | null
): AccountStatusData {
  // Profile verification status
  const profileStatus = profile.is_verified || 'unverified';
  const statusCode = getStatusCode(profileStatus);

  let statusKey = 'inVerification';
  let descriptionKey = 'inVerification';
  let documentRequired = false;

  // Determine status based on profile.is_verified
  switch (profileStatus) {
    case 'verified':
      statusKey = 'verified';
      descriptionKey = 'verified';
      documentRequired = false;
      break;

    case 'in_review':
      statusKey = 'inReview';
      descriptionKey = 'inReview';
      documentRequired = false;
      break;

    case 'pending':
      statusKey = 'pending';
      descriptionKey = 'pending';
      documentRequired = false;
      break;

    case 'rejected':
      statusKey = 'rejected';
      descriptionKey = 'rejected';
      documentRequired = false;
      break;

    case 'suspended':
      statusKey = 'suspended';
      descriptionKey = 'suspended';
      documentRequired = false;
      break;

    case 'unverified':
    default:
      statusKey = 'inVerification';
      descriptionKey = 'inVerification';
      // Check if documents are needed
      const hasDocuments = company?.verification_documents;
      documentRequired = !hasDocuments;
      break;
  }

  return {
    statusKey,
    descriptionKey,
    statusCode,
    documentRequired,
  };
}

/**
 * Transforms Company data to CompanyInfo format
 */
export function transformToCompanyInfo(
  company: Company | null
): CompanyInfoData {
  if (!company) {
    return {
      companyName: '-',
      address: '-',
      postalCode: '-',
      city: '-',
      website: '-',
      businessId: '-',
      businessEmail: '-',
      businessPhone: '-',
      businessDescription: '-',
      logoUrl: '',
      companyId: '',
    };
  }

  // Construct full address from parts
  const address =
    company.full_address ||
    `${company.street_name || ''} ${company.house_number || ''}`.trim() ||
    '-';

  return {
    companyName: company.company_name || '-',
    address: address,
    postalCode: company.postal_code || '-',
    city: company.city || '-',
    website: company.website || '-',
    businessId: company.business_id || '-',
    businessEmail: company.business_email || '-',
    businessPhone: company.business_phone || '-',
    businessDescription: company.business_description || '-',
    logoUrl: company.logo_url || '',
    companyId: company.id || '',
  };
}

/**
 * Transforms Profile data to ContactInfo format
 */
export function transformToContactInfo(
  profile: ProfessionalProfile
): ContactInfoData {
  const fullName = `${profile.first_name} ${profile.last_name}`.trim();

  return {
    contactPerson: fullName || '-',
    // Use new email fields, fallback to main email if not set
    quotesEmail: profile.quotes_email || profile.email || '-',
    invoicesEmail: profile.invoices_email || profile.email || '-',
    generalEmail: profile.email || '-', // Main email is the general email
    phoneNumber: profile.phone || '-',
  };
}

/**
 * Calculates profile completion percentage and tasks
 * Returns translation keys instead of hardcoded text
 */
export function calculateProfileCompletion(
  profile: ProfessionalProfile,
  company: Company | null
): ProfileCompletionData {
  const tasks = [
    {
      id: '1',
      titleKey: 'uploadLogo',
      statusKey: 'completed',
      completed: true, // TODO: Check if logo and photos exist
    },
    {
      id: '2',
      titleKey: 'fillDescription',
      statusKey: company?.business_description ? 'completed' : 'pending',
      completed: !!company?.business_description,
    },
    {
      id: '3',
      titleKey: 'requestReview',
      statusKey: 'pending',
      completed: false, // TODO: Check review count
    },
    {
      id: '4',
      titleKey: 'verifyCompany',
      statusKey: company?.is_verified ? 'completed' : 'pending',
      completed: !!company?.is_verified,
    },
  ];

  // Calculate percentage
  const completedCount = tasks.filter((task) => task.completed).length;
  const percentage = Math.round((completedCount / tasks.length) * 100);

  return {
    percentage,
    tasks,
  };
}

/**
 * Main function to transform all account data
 */
export function transformAccountData(rawData: AccountDataRaw): AccountData {
  return {
    accountStatus: transformToAccountStatus(
      rawData.profile,
      rawData.company
    ),
    companyInfo: transformToCompanyInfo(rawData.company),
    contactInfo: transformToContactInfo(rawData.profile),
    profileCompletion: calculateProfileCompletion(
      rawData.profile,
      rawData.company
    ),
    roleInCompany: rawData.profile.role_in_company,
    portfolioPhotos: rawData.profile.portfolio_photos || [],
    certificates: rawData.profile.certificates || [],
    profilePictureUrl: rawData.profile.profile_picture_url || null,
    profileAnswers: rawData.profile.profile_answers || null,
  };
}
