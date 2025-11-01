'use client';
import Image from "next/image";
import Link from "next/link";
import LanguageSwitcher from "@/components/ui/language-switcher";

export default function AuthNavbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 w-full z-50 bg-white/80" style={{ backdropFilter: 'blur(66.5px)' }}>
      <div className='max-w-[1326px] mx-auto flex items-center justify-between py-4 px-7'>
        <Link href='/' className='flex items-center'>
          <Image
            src='/images/logo.svg'
            alt='Bouw Matcher'
            width={105}
            height={40}
            className='h-10 w-[105px]'
          />
        </Link>

        <LanguageSwitcher />
      </div>
    </nav>
  );
}
