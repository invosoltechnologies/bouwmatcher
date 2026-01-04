/**
 * Centralized execution date options
 * Used in both ProjectForm and Step 3 questionnaire
 * Single source of truth for consistency
 */

export interface ExecutionDateOption {
  value: string;
  labelNl: string;
  labelEn: string;
}

export const EXECUTION_DATE_OPTIONS: ExecutionDateOption[] = [
  {
    value: 'as_soon_as_possible',
    labelNl: 'Zo snel mogelijk',
    labelEn: 'As soon as possible',
  },
  {
    value: 'within_1_month',
    labelNl: 'Binnen 1 maand',
    labelEn: 'Within 1 month',
  },
  {
    value: 'within_3_months',
    labelNl: 'Binnen 3 maanden',
    labelEn: 'Within 3 months',
  },
  {
    value: 'within_6_months',
    labelNl: 'Binnen 6 maanden',
    labelEn: 'Within 6 months',
  },
  {
    value: 'more_than_6_months',
    labelNl: 'Over meer dan 6 maanden',
    labelEn: 'In more than 6 months',
  },
  {
    value: 'no_preference',
    labelNl: 'Nog niet beslist',
    labelEn: 'Not yet decided',
  },
];
