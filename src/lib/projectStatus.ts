/**
 * Project Status Configuration
 * Centralized status constants and display information
 */

export const PROJECT_STATUS = {
  PENDING_QUOTES: 'pending_quotes',
  SPECIALIST_SELECTED: 'specialist_selected',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
} as const;

export type ProjectStatus = typeof PROJECT_STATUS[keyof typeof PROJECT_STATUS];

export const PROJECT_STATUS_DISPLAY: Record<ProjectStatus, {
  label: string;
  color: string;
  progressStep: number;
  description: string;
}> = {
  pending_quotes: {
    label: 'Wachten op offertes',
    color: 'blue',
    progressStep: 0,
    description: 'Je aanvraag is verstuurd naar vakspecialisten in jouw regio.',
  },
  specialist_selected: {
    label: 'Vakspecialist gekozen',
    color: 'purple',
    progressStep: 1,
    description: 'Je hebt een vakspecialist gekozen voor dit project.',
  },
  in_progress: {
    label: 'In uitvoering',
    color: 'orange',
    progressStep: 2,
    description: 'De vakspecialist is bezig met jouw project.',
  },
  completed: {
    label: 'Project afgerond',
    color: 'green',
    progressStep: 3,
    description: 'Het project is succesvol afgerond.',
  },
  cancelled: {
    label: 'Project geannuleerd',
    color: 'gray',
    progressStep: 3,
    description: 'Dit project is geannuleerd.',
  },
};

/**
 * Check if status is terminal (completed or cancelled)
 * Terminal statuses expire the access token
 */
export function isStatusTerminal(status: ProjectStatus): boolean {
  return status === PROJECT_STATUS.COMPLETED || status === PROJECT_STATUS.CANCELLED;
}

/**
 * Get display information for a status
 */
export function getStatusDisplay(status: ProjectStatus) {
  return PROJECT_STATUS_DISPLAY[status];
}

/**
 * Get progress percentage (0-100) for a status
 */
export function getStatusProgress(status: ProjectStatus): number {
  const step = PROJECT_STATUS_DISPLAY[status].progressStep;
  return Math.round((step / 3) * 100);
}
