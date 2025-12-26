'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';

export default function DashboardPage() {
  const { user, loading, signOut } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/login');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <div className='text-center'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto'></div>
          <p className='mt-4 text-muted-foreground'>Laden...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className='min-h-screen bg-gray-50 p-8'>
      <div className='max-w-7xl mx-auto'>
        <div className='bg-white rounded-lg shadow p-6'>
          <div className='flex justify-between items-center mb-4'>
            <h1 className='text-3xl font-bold'>
              Welkom, {user.user_metadata?.first_name || user.email}!
            </h1>
            <Button onClick={signOut} variant='outline'>
              Uitloggen
            </Button>
          </div>

          <div className='space-y-4'>
            <div className='border-l-4 border-green-500 bg-green-50 p-4'>
              <p className='font-semibold text-green-900'>
                ✅ Account succesvol aangemaakt!
              </p>
              <p className='text-green-700 text-sm mt-1'>
                Je bent nu ingelogd en kunt beginnen met het gebruik van Bouwmatcher.
              </p>
            </div>

            <div className='bg-gray-50 p-4 rounded'>
              <h2 className='font-semibold mb-2'>Account Details:</h2>
              <ul className='space-y-1 text-sm text-gray-600'>
                <li><strong>Email:</strong> {user.email}</li>
                <li><strong>User ID:</strong> {user.id}</li>
                <li><strong>Aangemaakt:</strong> {new Date(user.created_at).toLocaleDateString('nl-NL')}</li>
              </ul>
            </div>

            <div className='mt-6'>
              <p className='text-gray-600'>
                Dit is je dashboard. Hier kun je je projecten beheren en nieuwe opdrachten vinden.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
