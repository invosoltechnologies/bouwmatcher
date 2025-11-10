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
 * -1: inactive/blocked
 * 1: verified
 * 2: in process/pending
 */
export function getStatusCode(
  verificationStatus: string | null
): -1 | 1 | 2 {
  switch (verificationStatus?.toLowerCase()) {
    case 'verified':
    case 'active':
      return 1;
    case 'pending':
    case 'in_review':
    case 'submitted':
      return 2;
    case 'rejected':
    case 'blocked':
    case 'inactive':
      return -1;
    default:
      return 2; // default to pending
  }
}

/**
 * Transforms database data to AccountStatus format
 */
export function transformToAccountStatus(
  profile: ProfessionalProfile,
  company: Company | null
): AccountStatusData {
  const verificationStatus = company?.verification_status || 'pending';
  const statusCode = getStatusCode(verificationStatus);

  let status = 'In verificatie';
  let description =
    'Je aanmelding wordt geverifieerd. Dit kan 1-2 werkdagen duren.';
  let documentRequired = false;

  if (statusCode === 1) {
    status = 'Geverifieerd';
    description = 'Je account is geverifieerd en actief.';
    documentRequired = false;
  } else if (statusCode === -1) {
    status = 'Geblokkeerd';
    description =
      'Je account is geblokkeerd. Neem contact op met support voor meer informatie.';
    documentRequired = false;
  } else {
    // Check if documents are needed
    const hasDocuments = company?.verification_documents;
    documentRequired = !hasDocuments;
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
    // These will use the new email fields once added to database
    quotesEmail: profile.quotes_email || profile.email || '-',
    invoicesEmail: profile.invoices_email || profile.email || '-',
    generalEmail: profile.general_email || profile.email || '-',
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
  };
}
