/**
 * General Questions (Steps 2-8)
 * Static questions for all service categories
 *
 * Naming Convention:
 *
 * lead_*     - Information about the person/company submitting the project
 *              Examples: lead_first_name, lead_email, lead_phone, lead_company_name
 *
 * project_*  - Information about the project itself
 *              Examples: project_execution_timing, project_description, project_city
 *
 * This separation makes it clear what data belongs to the lead (person)
 * vs the project (work to be done)
 *
 * Values: saved directly to project_drafts table
 * Order: array index = display order (change order by reordering array)
 */

import { EXECUTION_DATE_OPTIONS } from './executionDates';

export interface QuestionOption {
  value: string;          // Value saved to database
  labelNl: string;
  labelEn: string;
}

export interface Question {
  id: string;             // Field ID (lead_* or project_*)
  labelNl: string;
  labelEn: string;
  type: 'radio' | 'text' | 'textarea';
  fieldName: string;      // Database column name
  required: boolean;
  placeholderNl?: string;
  placeholderEn?: string;
  helpNl?: string;
  helpEn?: string;
  options?: QuestionOption[];
}

// =============================================================================
// STEP 2: Request Type
// =============================================================================
export const STEP_2: Question[] = [
  {
    id: 'lead_request_type',
    labelNl: 'Soort aanvraag',
    labelEn: 'Type of request',
    type: 'radio',
    fieldName: 'request_type',
    required: true,
    options: [
      { value: 'private', labelNl: 'Particulier', labelEn: 'Private individual' },
      { value: 'business', labelNl: 'Zakelijk', labelEn: 'Business' },
    ],
  },
];

// =============================================================================
// STEP 3: Execution Timing
// =============================================================================
export const STEP_3: Question[] = [
  {
    id: 'project_execution_timing',
    labelNl: 'Uitvoeringsdatum',
    labelEn: 'Execution date',
    type: 'radio',
    fieldName: 'execution_timing',
    required: true,
    options: EXECUTION_DATE_OPTIONS.map((opt) => ({
      value: opt.value,
      labelNl: opt.labelNl,
      labelEn: opt.labelEn,
    })),
  },
];

// =============================================================================
// STEP 4: Photos (handled by PhotoUploadModal component)
// =============================================================================
export const STEP_4: Question[] = [
  {
    id: 'project_photos',
    labelNl: 'Wil je foto\'s toevoegen?',
    labelEn: 'Do you want to add photos?',
    type: 'radio',
    fieldName: 'has_photos',
    required: false,
    options: [
      { value: 'yes', labelNl: 'Ja', labelEn: 'Yes' },
      { value: 'no', labelNl: 'Nee', labelEn: 'No' },
    ],
  },
];

// =============================================================================
// STEP 5: Description
// =============================================================================
export const STEP_5: Question[] = [
  {
    id: 'project_description',
    labelNl: 'Projectomschrijving',
    labelEn: 'Project description',
    type: 'textarea',
    fieldName: 'description',
    required: true,
    placeholderNl: 'Geef een korte omschrijving van je project en ontvang nauwkeurigere offertes.',
    placeholderEn: 'Briefly describe your project and receive more accurate quotes.',
    helpNl: 'Geef een korte omschrijving van je project en ontvang nauwkeurigere offertes.',
    helpEn: 'Briefly describe your project and receive more accurate quotes.',
  },
];

// =============================================================================
// STEP 6: Location
// =============================================================================
export const STEP_6: Question[] = [
  {
    id: 'project_postcode',
    labelNl: 'Postcode',
    labelEn: 'Postcode',
    type: 'text',
    fieldName: 'postcode',
    required: true,
    placeholderNl: 'Postcode..',
    placeholderEn: 'Postcode..',
  },
  {
    id: 'project_city',
    labelNl: 'Woonplaats / Stad',
    labelEn: 'City',
    type: 'text',
    fieldName: 'city',
    required: true,
    placeholderNl: 'Woonplaats / Stad..',
    placeholderEn: 'City..',
  },
  {
    id: 'project_street_name',
    labelNl: 'Straatnaam',
    labelEn: 'Street name',
    type: 'text',
    fieldName: 'street_name',
    required: true,
    placeholderNl: 'Straatnaam..',
    placeholderEn: 'Street name..',
  },
  {
    id: 'project_street_number',
    labelNl: 'Nummer / Huisnummer',
    labelEn: 'Number / House number',
    type: 'text',
    fieldName: 'street_number',
    required: true,
    placeholderNl: 'Nummer / Huisnummer..',
    placeholderEn: 'Number / house number..',
  },
];

// =============================================================================
// STEP 7: Contact Details
// =============================================================================

// For Private individuals
export const STEP_7_PRIVATE: Question[] = [
  {
    id: 'lead_first_name',
    labelNl: 'Voornaam',
    labelEn: 'First name',
    type: 'text',
    fieldName: 'first_name',
    required: true,
    placeholderNl: 'Voornaam..',
    placeholderEn: 'First name..',
  },
  {
    id: 'lead_last_name',
    labelNl: 'Achternaam',
    labelEn: 'Last name',
    type: 'text',
    fieldName: 'last_name',
    required: true,
    placeholderNl: 'Achternaam..',
    placeholderEn: 'Last name..',
  },
  {
    id: 'lead_phone',
    labelNl: 'Telefoonnummer',
    labelEn: 'Phone number',
    type: 'text',
    fieldName: 'phone',
    required: true,
    placeholderNl: 'Telefoonnummer..',
    placeholderEn: 'Phone number..',
  },
  {
    id: 'lead_email',
    labelNl: 'E-mailadres',
    labelEn: 'Email address',
    type: 'text',
    fieldName: 'email',
    required: true,
    placeholderNl: 'E-mailadres..',
    placeholderEn: 'Email address..',
  },
];

// For Business
export const STEP_7_BUSINESS: Question[] = [
  {
    id: 'lead_company_name',
    labelNl: 'Bedrijfsnaam',
    labelEn: 'Company name',
    type: 'text',
    fieldName: 'company_name',
    required: true,
    placeholderNl: 'Bedrijfsnaam..',
    placeholderEn: 'Company name..',
  },
  {
    id: 'lead_first_name',
    labelNl: 'Voornaam',
    labelEn: 'First name',
    type: 'text',
    fieldName: 'first_name',
    required: true,
    placeholderNl: 'Voornaam..',
    placeholderEn: 'First name..',
  },
  {
    id: 'lead_last_name',
    labelNl: 'Achternaam',
    labelEn: 'Last name',
    type: 'text',
    fieldName: 'last_name',
    required: true,
    placeholderNl: 'Achternaam..',
    placeholderEn: 'Last name..',
  },
  {
    id: 'lead_phone',
    labelNl: 'Telefoonnummer',
    labelEn: 'Phone number',
    type: 'text',
    fieldName: 'phone',
    required: true,
    placeholderNl: 'Telefoonnummer..',
    placeholderEn: 'Phone number..',
  },
  {
    id: 'lead_email',
    labelNl: 'E-mailadres',
    labelEn: 'Email address',
    type: 'text',
    fieldName: 'email',
    required: true,
    placeholderNl: 'E-mailadres..',
    placeholderEn: 'Email address..',
  },
];

// =============================================================================
// HELPERS
// =============================================================================

/**
 * Get questions for a specific step
 */
export function getQuestionsForStep(
  step: number,
  requestType?: 'private' | 'business'
): Question[] {
  switch (step) {
    case 2:
      return STEP_2;
    case 3:
      return STEP_3;
    case 4:
      return STEP_4;
    case 5:
      return STEP_5;
    case 6:
      return STEP_6;
    case 7:
      return requestType === 'business' ? STEP_7_BUSINESS : STEP_7_PRIVATE;
    default:
      return [];
  }
}

/**
 * Get field name from question ID
 * Removes lead_ or project_ prefix to get database column name
 */
export function getFieldName(questionId: string): string | undefined {
  // Remove prefix to get database column name
  if (questionId.startsWith('lead_')) {
    return questionId.replace('lead_', '');
  }
  if (questionId.startsWith('project_')) {
    return questionId.replace('project_', '');
  }
  return undefined;
}