/**
 * Single source of truth for project status display logic
 * Used by both lead cards (QuotationRequestCard) and lead details sidebar (LeadDetailsSidebar)
 *
 * Ensures consistent status display across all components
 */

export interface StatusInfo {
  labelKey: string;
  color: string;
}

/**
 * Get the display information for a project status
 *
 * This is the single source of truth for project status display.
 * Both QuotationRequestCard and LeadDetailsSidebar should use this function.
 *
 * @param projectStatus - The project status from database ('pending_quotes', 'specialist_selected', etc.)
 * @param isAssignedToMe - Whether the current professional is assigned to this project
 * @returns StatusInfo with labelKey (for translations) and color (Tailwind classes)
 *
 * @example
 * // For a project assigned to current professional
 * getProjectStatusInfo('specialist_selected', true)
 * // Returns: { labelKey: 'statusAssignedToMe', color: 'bg-green-100 text-green-700' }
 *
 * @example
 * // For a project assigned to someone else
 * getProjectStatusInfo('specialist_selected', false)
 * // Returns: { labelKey: 'statusSpecialistSelected', color: 'bg-green-100 text-green-700' }
 */
export function getProjectStatusInfo(
  projectStatus: string,
  isAssignedToMe: boolean = false
): StatusInfo {
  // Override status display if assigned to current professional
  if (projectStatus === 'specialist_selected' && isAssignedToMe) {
    return {
      labelKey: 'statusAssignedToMe',
      color: 'bg-green-100 text-green-700',
    };
  }

  const statusMap: Record<string, StatusInfo> = {
    'pending_quotes': {
      labelKey: 'statusPendingQuotes',
      color: 'bg-blue-100 text-blue-700',
    },
    'specialist_selected': {
      labelKey: 'statusSpecialistSelected',
      color: 'bg-green-100 text-green-700',
    },
    'in_progress': {
      labelKey: 'statusInProgress',
      color: 'bg-yellow-100 text-yellow-700',
    },
    'completed': {
      labelKey: 'statusCompleted',
      color: 'bg-gray-100 text-gray-700',
    },
  };

  return (
    statusMap[projectStatus] || {
      labelKey: 'statusUnknown',
      color: 'bg-gray-100 text-gray-700',
    }
  );
}

/**
 * Determine if a lead card should be displayed as inactive/disabled
 *
 * A card is inactive when it's purchased (unlocked) but not in an active state.
 * Active states are: pending_quotes OR assigned to current professional
 *
 * @param isLocked - Whether the lead is locked (not purchased)
 * @param isVisibilityActive - Whether the lead should be shown as active
 * @returns Whether the card should appear inactive/disabled
 *
 * @example
 * // Card for purchased lead in pending_quotes (active)
 * isLeadCardInactive(false, true) // Returns: false
 *
 * @example
 * // Card for purchased lead in specialist_selected status by another professional (inactive)
 * isLeadCardInactive(false, false) // Returns: true
 */
export function isLeadCardInactive(
  isLocked: boolean,
  isVisibilityActive: boolean = true
): boolean {
  // Card is inactive if it's unlocked (purchased) AND not visibility active
  return !isLocked && !isVisibilityActive;
}

/**
 * Get card styling based on active/inactive state
 *
 * Provides consistent styling for lead cards across components
 *
 * @param isInactive - Whether the card is inactive
 * @returns Tailwind CSS classes for the card
 *
 * @example
 * // Active card styling
 * getLeadCardClasses(false)
 * // Returns: 'bg-white border-gray-200 hover:border-primary/50'
 *
 * @example
 * // Inactive card styling
 * getLeadCardClasses(true)
 * // Returns: 'bg-gray-50 border-gray-200 opacity-60'
 */
export function getLeadCardClasses(isInactive: boolean): string {
  if (isInactive) {
    return 'bg-gray-50 border-gray-200 opacity-60';
  }
  return 'bg-white border-gray-200 hover:border-primary/50';
}
