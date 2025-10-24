'use client';

import { useMemo } from 'react';

interface PasswordStrengthProps {
  password: string;
}

type StrengthLevel = {
  score: number;
  label: string;
  color: string;
  bgColor: string;
  width: string;
};

/**
 * Password strength calculator based on your rules:
 * - Minimum 8 characters + Alphanumeric = OK
 * - + 1 Capital letter = Good
 * - + 1 Special character = Excellent
 */
function calculatePasswordStrength(password: string): StrengthLevel {
  if (!password) {
    return { score: 0, label: '', color: '', bgColor: '', width: '0%' };
  }

  const length = password.length;
  const hasLowercase = /[a-z]/.test(password);
  const hasUppercase = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[^a-zA-Z0-9]/.test(password);

  // Check minimum requirements
  const meetsMinLength = length >= 8;
  const isAlphanumeric = (hasLowercase || hasUppercase) && hasNumber;

  // Determine score based on your rules
  let score = 0;

  if (!meetsMinLength) {
    // Less than 8 characters = Weak
    score = 0;
  } else if (meetsMinLength && isAlphanumeric && !hasUppercase && !hasSpecial) {
    // 8+ chars + alphanumeric (lowercase + numbers) = OK
    score = 1;
  } else if (meetsMinLength && isAlphanumeric && hasUppercase && !hasSpecial) {
    // 8+ chars + alphanumeric + 1 capital = Good
    score = 2;
  } else if (meetsMinLength && isAlphanumeric && hasUppercase && hasSpecial) {
    // 8+ chars + alphanumeric + 1 capital + 1 special = Excellent
    score = 3;
  } else if (meetsMinLength && isAlphanumeric) {
    // Has minimum but unclear combination
    score = 1;
  }

  const levels: { [key: number]: StrengthLevel } = {
    0: {
      score: 0,
      label: 'Te Zwak',
      color: 'text-red-600',
      bgColor: 'bg-red-500',
      width: '25%',
    },
    1: {
      score: 1,
      label: 'OK',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-500',
      width: '50%',
    },
    2: {
      score: 2,
      label: 'Goed',
      color: 'text-green-600',
      bgColor: 'bg-green-500',
      width: '75%',
    },
    3: {
      score: 3,
      label: 'Uitstekend',
      color: 'text-green-700',
      bgColor: 'bg-green-600',
      width: '100%',
    },
  };

  return levels[score];
}

// Estimate time to crack (simplified)
function estimateCrackTime(password: string): string {
  if (!password) return '';

  const length = password.length;
  let charsetSize = 0;

  if (/[a-z]/.test(password)) charsetSize += 26;
  if (/[A-Z]/.test(password)) charsetSize += 26;
  if (/[0-9]/.test(password)) charsetSize += 10;
  if (/[^a-zA-Z0-9]/.test(password)) charsetSize += 32;

  const combinations = Math.pow(charsetSize, length);
  const guessesPerSecond = 1e9; // 1 billion guesses per second (modern GPU)

  const seconds = combinations / guessesPerSecond;

  if (seconds < 1) return 'Instant';
  if (seconds < 60) return `${Math.round(seconds)} Seconden`;
  if (seconds < 3600) return `${Math.round(seconds / 60)} Minuten`;
  if (seconds < 86400) return `${Math.round(seconds / 3600)} Uren`;
  if (seconds < 2592000) return `${Math.round(seconds / 86400)} Dagen`;
  if (seconds < 31536000) return `${Math.round(seconds / 2592000)} Maanden`;
  return `${Math.round(seconds / 31536000)} Jaren`;
}

export default function PasswordStrength({ password }: PasswordStrengthProps) {
  const strength = useMemo(() => calculatePasswordStrength(password), [password]);
  const crackTime = useMemo(() => estimateCrackTime(password), [password]);

  if (!password) return null;

  return (
    <div className='mt-3 space-y-2'>
      <div className='flex items-center justify-between'>
        <span className='text-sm text-muted-foreground'>
          Wachtwoord sterkte
        </span>
        {strength.label && (
          <span className={`text-sm font-medium ${strength.color}`}>
            {strength.label}
          </span>
        )}
      </div>

      {/* Progress bar */}
      <div className='h-2 bg-gray-200 rounded-full overflow-hidden'>
        <div
          className={`h-full ${strength.bgColor} transition-all duration-300 ease-out`}
          style={{ width: strength.width }}
        />
      </div>

      {/* Crack time estimate */}
      {crackTime && (
        <p className='text-xs text-muted-foreground'>
          Geschatte tijd om te kraken: <span className='font-medium'>{crackTime}</span>
        </p>
      )}

      {/* Requirements checklist */}
      {strength.score < 3 && (
        <div className='text-xs text-muted-foreground space-y-1 mt-2'>
          <p className='font-medium'>Vereisten:</p>
          <ul className='space-y-0.5 ml-2'>
            <li className={password.length >= 8 ? 'text-green-600' : ''}>
              {password.length >= 8 ? '✓' : '○'} Minimaal 8 tekens
            </li>
            <li className={/[a-z]/.test(password) || /[A-Z]/.test(password) ? 'text-green-600' : ''}>
              {/[a-z]/.test(password) || /[A-Z]/.test(password) ? '✓' : '○'} Bevat letters
            </li>
            <li className={/[0-9]/.test(password) ? 'text-green-600' : ''}>
              {/[0-9]/.test(password) ? '✓' : '○'} Bevat cijfers
            </li>
          </ul>
          {strength.score >= 1 && (
            <div className='mt-2'>
              <p className='font-medium'>Voor een hoger niveau:</p>
              <ul className='space-y-0.5 ml-2'>
                <li className={/[A-Z]/.test(password) ? 'text-green-600' : ''}>
                  {/[A-Z]/.test(password) ? '✓' : '○'} Voeg een hoofdletter toe (voor &ldquo;Goed&rdquo;)
                </li>
                <li className={/[^a-zA-Z0-9]/.test(password) ? 'text-green-600' : ''}>
                  {/[^a-zA-Z0-9]/.test(password) ? '✓' : '○'} Voeg een speciaal teken toe (!@#$%) (voor &ldquo;Uitstekend&rdquo;)
                </li>
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
