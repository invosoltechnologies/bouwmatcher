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
 */
export function transformToAccountStatus(
  profile: ProfessionalProfile,
  company: Company | null
): AccountStatusData {
  // Profile verification status
  const profileStatus = profile.is_verified || 'unverified';
  const statusCode = getStatusCode(profileStatus);

  let status = 'In verificatie';
  let description = 'Je aanmelding wordt geverifieerd. Dit kan 1-2 werkdagen duren.';
  let documentRequired = false;

  // Determine status based on profile.is_verified
  switch (profileStatus) {
    case 'verified':
      status = 'Geverifieerd';
      description = 'Je account is geverifieerd en actief.';
      documentRequired = false;
      break;

    case 'in_review':
      status = 'In beoordeling';
      description = 'Je aanmelding wordt beoordeeld door ons team.';
      documentRequired = false;
      break;

    case 'pending':
      status = 'In afwachting';
      description = 'Je aanmelding is ontvangen en wacht op verificatie.';
      documentRequired = false;
      break;

    case 'rejected':
      status = 'Afgewezen';
      description = 'Je aanvraag is afgewezen. Neem contact op met support voor meer informatie.';
      documentRequired = false;
      break;

    case 'suspended':
      status = 'Geschorst';
      description = 'Je account is tijdelijk geschorst. Neem contact op met support.';
      documentRequired = false;
      break;

    case 'unverified':
    default:
      status = 'In verificatie';
      description = 'Je aanmelding wordt geverifieerd. Dit kan 1-2 werkdagen duren.';
      // Check if documents are needed
      const hasDocuments = company?.verification_documents;
      documentRequired = !hasDocuments;
      break;
  }

  return {
    status,
    description,
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
 */
export function calculateProfileCompletion(
  profile: ProfessionalProfile,
  company: Company | null
): ProfileCompletionData {
  const tasks = [
    {
      id: '1',
      title: 'Upload een logo en bedrijfsfoto',
      statusText: 'Klaar',
      completed: true, // TODO: Check if logo and photos exist
    },
    {
      id: '2',
      title: 'Vul je omschrijving & doelregio in',
      statusText: company?.business_description ? 'Klaar' : 'Nog te doen',
      completed: !!company?.business_description,
    },
    {
      id: '3',
      title: 'Vraag ten minste 1 review aan',
      statusText: 'Nog te doen',
      completed: false, // TODO: Check review count
    },
    {
      id: '4',
      title: 'Verifieer je bedrijfsgegevens',
      statusText: company?.is_verified ? 'Klaar' : 'Nog te doen',
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
  };
}
