import { ReactNode } from 'react';
import Navbar from '@/components/Navbar';

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <>
      <Navbar />
      <div
        className='min-h-screen flex items-center justify-center px-4 pt-32 pb-8'
        style={{
          background: 'linear-gradient(90deg, rgba(10, 178, 126, 0.1) 0%, rgba(2, 58, 162, 0.1) 100%)',
        }}
      >
        {children}
      </div>
    </>
  );
}
