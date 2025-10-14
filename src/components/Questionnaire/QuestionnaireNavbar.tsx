'use client';
import Image from "next/image";
import Link from "next/link";
import LanguageSwitcher from "@/components/ui/language-switcher";

export default function QuestionnaireNavbar() {
  return (
    <nav className="w-full bg-white border-b border-gray-200">
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
