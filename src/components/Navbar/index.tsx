'use client';
import Image from "next/image";
import Link from "next/link";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import LanguageSwitcher from "@/components/ui/language-switcher";

export default function Navbar() {
  const [scrollY, setScrollY] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // Set initial window width
    setWindowWidth(window.innerWidth);

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Calculate smooth transition values based on scroll position
  const scrollProgress = Math.min(scrollY / 200, 1); // Complete transition over 200px
  const isScrolled = scrollY > 50;

  return (
    <nav
      className="fixed left-0 right-0 z-50 py-4 px-7 bg-white border-b border-gray-200 rounded-[13px] transition-all duration-500 ease-out"
      style={{
        boxShadow: isScrolled ? '0px 4px 12px 0px #0000001A' : '0px 1px 2px 0px #0000000D',
        top: `${84 - (scrollProgress * 84)}px`, // Smooth transition from 84px to 0px
        maxWidth: windowWidth > 1326
          ? `${1326 + (scrollProgress * (windowWidth - 1326))}px`
          : '100%', // Smooth width transition
        marginLeft: 'auto',
        marginRight: 'auto',
      }}
    >
      <div className='max-w-[1326px] mx-auto flex items-center justify-between'>
        <div className='flex items-center space-x-12'>
          <Link href='/' className='flex items-center'>
            <Image
              src='/images/logo.svg'
              alt='Bouw Matcher'
              width={105}
              height={40}
              className='h-10 w-[105px]'
            />
          </Link>

          {/* Navigation Items */}
          <div className='hidden md:flex items-center space-x-8'>
            <Link
              href='/categories'
              className='text-foreground hover:text-primary transition-colors font-medium'
            >
              Categorieën
            </Link>
            <Link
              href='/contact'
              className='text-foreground hover:text-primary transition-colors font-medium'
            >
              Contact
            </Link>
          </div>
        </div>
        {/* Logo */}

        {/* Right Side - Search, Login, Language Switcher */}
        <div className='flex items-center space-x-6'>
          {/* Search Bar */}
          <div className='hidden lg:flex items-center'>
            <div className='relative'>
              <Search className='absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5 z-10' />
              <Input
                type='search'
                placeholder='Snel zoeken . . .'
                className='pl-12 pr-4 py-[14px] w-80 bg-[#F8F8F8] border border-gray-200 rounded-[12px] text-[#111111] placeholder-muted-foreground hover:border-ring focus:border-ring focus:bg-[#F8F8F8] h-[42px] text-lg'
              />
            </div>
          </div>

          {/* Login Button */}
          <Button
            className='bg-primary hover:bg-primary/90 text-white px-[22px] py-3 border border-gray-200 font-medium text-lg h-auto rounded-[12px]'
            style={{
              boxShadow:
                '0px 10px 15px 0px #0000001A, 0px 4px 6px 0px #0000001A',
            }}
          >
            Login
          </Button>

          {/* Language Switcher */}
          <LanguageSwitcher />
        </div>
      </div>
    </nav>
  );
}