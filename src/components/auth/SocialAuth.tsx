import Image from 'next/image';
import { Button } from '@/components/ui/button';

export default function SocialAuth() {
  const handleGoogleLogin = () => {
    // TODO: Implement Google OAuth
    console.log('Google login');
  };

  const handleFacebookLogin = () => {
    // TODO: Implement Facebook OAuth
    console.log('Facebook login');
  };

  const handleAppleLogin = () => {
    // TODO: Implement Apple OAuth
    console.log('Apple login');
  };

  return (
    <div className='space-y-4'>
      <div className='relative'>
        <div className='absolute inset-0 flex items-center'>
          <div className='w-full border-t border-dashed border-gray-300'></div>
        </div>
        <div className='relative flex justify-center text-sm'>
          <span className='px-4 bg-white text-muted-foreground'>
            Of inloggen met
          </span>
        </div>
      </div>

      <div className='grid grid-cols-3 gap-3'>
        <Button
          type='button'
          variant='outline'
          onClick={handleGoogleLogin}
          className='w-full bg-white border border-gray-200 hover:bg-gray-50 rounded-[12px] h-12'
        >
          <Image
            src='/images/auth/google.svg'
            alt='Google'
            width={24}
            height={24}
            className='w-6 h-6'
          />
        </Button>

        <Button
          type='button'
          variant='outline'
          onClick={handleFacebookLogin}
          className='w-full bg-white border border-gray-200 hover:bg-gray-50 rounded-[12px] h-12'
        >
          <Image
            src='/images/auth/facebook.svg'
            alt='Facebook'
            width={24}
            height={24}
            className='w-6 h-6'
          />
        </Button>

        <Button
          type='button'
          variant='outline'
          onClick={handleAppleLogin}
          className='w-full bg-white border border-gray-200 hover:bg-gray-50 rounded-[12px] h-12'
        >
          <Image
            src='/images/auth/apple.svg'
            alt='Apple'
            width={24}
            height={24}
            className='w-6 h-6'
          />
        </Button>
      </div>
    </div>
  );
}
