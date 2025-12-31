/**
 * Validate password strength based on rules:
 * - Minimum 8 characters
 * - Must be alphanumeric (letters + numbers)
 * - Returns score: 0 = Too Weak, 1 = OK, 2 = Good, 3 = Excellent
 */
export function validatePasswordStrength(password: string): {
  isValid: boolean;
  score: number;
  message: string;
} {
  if (!password) {
    return {
      isValid: false,
      score: 0,
      message: 'Wachtwoord is verplicht',
    };
  }

  const length = password.length;
  const hasLowercase = /[a-z]/.test(password);
  const hasUppercase = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[^a-zA-Z0-9]/.test(password);

  // Check minimum requirements
  const meetsMinLength = length >= 8;
  const isAlphanumeric = (hasLowercase || hasUppercase) && hasNumber;

  // Reject if doesn't meet minimum
  if (!meetsMinLength) {
    return {
      isValid: false,
      score: 0,
      message: 'Wachtwoord moet minimaal 8 tekens bevatten',
    };
  }

  if (!isAlphanumeric) {
    return {
      isValid: false,
      score: 0,
      message: 'Wachtwoord moet letters én cijfers bevatten',
    };
  }

  // Calculate score
  let score = 1; // Meets minimum = OK

  if (hasUppercase) {
    score = 2; // Good
  }

  if (hasUppercase && hasSpecial) {
    score = 3; // Excellent
  }

  return {
    isValid: true,
    score,
    message: 'Wachtwoord voldoet aan de eisen',
  };
}
