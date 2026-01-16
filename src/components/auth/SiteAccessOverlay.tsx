'use client';

import { useState, useEffect } from 'react';
import { Construction, Lock, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useTranslations } from 'next-intl';

export function SiteAccessOverlay() {
  const t = useTranslations('common.siteAccess');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  // Only render if environment variable is explicitly set to 'true'
  // This allows easy disabling for local development
  const isProtectionEnabled = process.env.NEXT_PUBLIC_ENABLE_SITE_PROTECTION === 'true';

  useEffect(() => {
    // Check localStorage for existing authentication
    try {
      const stored = localStorage.getItem('authenticated_visitor');
      if (stored) {
        const data = JSON.parse(stored);
        const now = new Date().getTime();

        // Check if authentication is still valid (within 1 hour)
        if (data.expiresAt && now < data.expiresAt) {
          setIsAuthenticated(true);
        } else {
          // Expired - remove it
          localStorage.removeItem('authenticated_visitor');
        }
      }
    } catch (error) {
      // If there's any error parsing localStorage, clear it
      localStorage.removeItem('authenticated_visitor');
    }

    setIsLoading(false);
  }, []);

  // Prevent background scroll when overlay is visible
  useEffect(() => {
    if (isProtectionEnabled && !isAuthenticated && !isLoading) {
      // Save original overflow style
      const originalOverflow = document.body.style.overflow;

      // Disable scroll
      document.body.style.overflow = 'hidden';

      // Restore on cleanup
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isProtectionEnabled, isAuthenticated, isLoading]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const correctPassword = process.env.NEXT_PUBLIC_SITE_ACCESS_PASSWORD;

    if (!correctPassword) {
      setError(t('errorNotConfigured'));
      return;
    }

    if (password === correctPassword) {
      // Set authentication with 1-hour expiration
      const expiresAt = new Date().getTime() + (60 * 60 * 1000); // 1 hour from now

      try {
        localStorage.setItem('authenticated_visitor', JSON.stringify({
          authenticated: true,
          expiresAt,
          timestamp: new Date().toISOString()
        }));
        setIsAuthenticated(true);
        setPassword(''); // Clear password input
      } catch (error) {
        setError(t('errorSaveAuth'));
      }
    } else {
      setError(t('errorIncorrect'));
      setPassword(''); // Clear password input on error
    }
  };

  // Don't render if protection is not enabled
  if (!isProtectionEnabled) {
    return null;
  }

  // Don't show anything while checking localStorage
  if (isLoading) {
    return null;
  }

  // If authenticated, don't render the overlay
  if (isAuthenticated) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      {/* Glassy Blurred Overlay - matching existing GlassyModal pattern */}
      <div
        className="absolute inset-0 bg-neutral-700/75"
        style={{ backdropFilter: 'blur(14.5px)' }}
        aria-hidden="true"
      />

      {/* Modal Content */}
      <div className="relative z-50 w-full max-w-md mx-4 bg-white rounded-2xl shadow-2xl p-8 animate-in fade-in zoom-in-95 duration-200">
        {/* Icon Container */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
            <Construction className="w-10 h-10 text-primary" strokeWidth={2} />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-semibold text-center text-neutral-900 mb-2">
          {t('title')}
        </h2>

        {/* Subtitle */}
        <p className="text-muted-foreground text-center mb-6">
          {t('subtitle')}
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <div className="relative">
              <Input
                type={showPassword ? 'text' : 'password'}
                placeholder={t('passwordPlaceholder')}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError('');
                }}
                className="w-full pr-10"
                autoFocus
                autoComplete="off"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label={showPassword ? t('hidePassword') : t('showPassword')}
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
            {error && (
              <p className="text-destructive text-sm mt-2 flex items-center gap-1">
                <span className="text-base">⚠️</span>
                {error}
              </p>
            )}
          </div>

          <Button type="submit" className="w-full">
            <Lock className="w-4 h-4 mr-2" />
            {t('accessButton')}
          </Button>
        </form>

        {/* Footer Note */}
        <p className="text-xs text-muted-foreground text-center mt-6">
          {t('footerNote')}
        </p>
      </div>
    </div>
  );
}
