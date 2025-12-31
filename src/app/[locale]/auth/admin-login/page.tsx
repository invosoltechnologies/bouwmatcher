'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from '@/i18n/navigation';
import toast from 'react-hot-toast';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import AuthNavbar from '@/components/auth/AuthNavbar';

interface AdminLoginFormData {
  email: string;
  password: string;
}

export default function AdminLoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AdminLoginFormData>();

  const onSubmit = async (data: AdminLoginFormData) => {
    setIsLoading(true);

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        toast.error(result.error || 'Invalid admin credentials');
        setIsLoading(false);
        return;
      }

      if (result.success) {
        toast.success('Admin login successful');
        setTimeout(() => {
          router.push('/admin-dashboard');
        }, 500);
      } else {
        toast.error(result.error || 'Invalid admin credentials');
      }
    } catch (error) {
      console.error('Admin login error:', error);
      toast.error('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen pt-8 md:pt-10 flex flex-col"
      style={{
        background:
          'linear-gradient(90deg, rgba(10, 178, 126, 0.1) 0%, rgba(2, 58, 162, 0.1) 100%)',
      }}
    >
      <AuthNavbar />

      <main className="flex-1 flex items-center justify-center px-4 pt-20 md:pt-24 pb-8 md:pb-12">
        <div className="w-full max-w-md md:max-w-lg lg:max-w-xl px-4">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[55px] font-normal text-center mb-8 md:mb-12 leading-tight">
            <span
              style={{
                background:
                  'linear-gradient(90deg, #023AA2 0%, #0AB27E 62.02%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Admin
            </span>{' '}
            Login
          </h1>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 md:space-y-6">
            <div>
              <Input
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address',
                  },
                })}
                type="email"
                placeholder="admin@bouwmatcher.be"
                className="h-12 md:h-14 lg:h-[60px] bg-white border-neutral-300 rounded-lg px-4 md:px-6 lg:px-7 text-base md:text-lg lg:text-xl font-medium"
                style={{ boxShadow: '0px 2px 6.5px 0px #0000001A' }}
                disabled={isLoading}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <Input
                {...register('password', {
                  required: 'Password is required',
                })}
                type="password"
                placeholder="Password"
                className="h-12 md:h-14 lg:h-[60px] bg-white border-neutral-300 rounded-lg px-4 md:px-6 lg:px-7 text-base md:text-lg lg:text-xl font-medium"
                style={{ boxShadow: '0px 2px 6.5px 0px #0000001A' }}
                disabled={isLoading}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full text-base md:text-lg lg:text-2xl py-3 md:py-4 lg:py-4.5 font-medium rounded-[7px] mt-4 md:mt-7"
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </Button>
          </form>
        </div>
      </main>
    </div>
  );
}
