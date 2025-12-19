'use client';
import Image from "next/image";
import Link from "next/link";
import { Search, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import LanguageSwitcher from "@/components/ui/language-switcher";
import { usePathname } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import UserAvatarDropdown from "./UserAvatarDropdown";

export default function Navbar() {
  const [scrollY, setScrollY] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isAuthRoute = pathname?.includes('/auth');
  const { user, loading } = useAuth();

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
    <>
      <nav
        className="fixed left-0 right-0 z-50 py-3 md:py-4 px-4 md:px-7 bg-white border-b border-gray-200 md:rounded-[13px] transition-all duration-500 ease-out"
        style={{
          boxShadow: isScrolled ? '0px 4px 12px 0px #0000001A' : '0px 1px 2px 0px #0000000D',
          top: windowWidth >= 768 ? `${84 - (scrollProgress * 84)}px` : '36px',
          maxWidth: windowWidth > 1326
            ? `${1326 + (scrollProgress * (windowWidth - 1326))}px`
            : '100%',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
      >
        <div className='max-w-[1326px] mx-auto flex items-center justify-between'>
          <div className='flex items-center space-x-4 md:space-x-12'>
            <Link href='/' className='flex items-center'>
              <Image
                src='/images/logo.svg'
                alt='Bouw Matcher'
                width={105}
                height={40}
                className='h-8 md:h-10 w-[84px] md:w-[105px]'
              />
            </Link>

            {/* Navigation Items - Desktop */}
            <div className='hidden lg:flex items-center space-x-8'>
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

          {/* Right Side - Search, Login, Language Switcher, Menu */}
          <div className='flex items-center space-x-3 md:space-x-6'>
            {/* Search Bar - Desktop only */}
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

            {/* User Avatar or Login Button - Desktop */}
            {!loading && (
              <div className='hidden md:flex items-center'>
                {user ? (
                  <UserAvatarDropdown />
                ) : (
                  !isAuthRoute && (
                    <Link href='/auth/login'>
                      <Button
                        className='bg-primary hover:bg-primary/90 text-white px-4 md:px-[22px] py-2 md:py-3 border border-gray-200 font-medium text-base md:text-lg h-auto rounded-[12px]'
                        style={{
                          boxShadow:
                            '0px 10px 15px 0px #0000001A, 0px 4px 6px 0px #0000001A',
                        }}
                      >
                        Login
                      </Button>
                    </Link>
                  )
                )}
              </div>
            )}

            {/* Language Switcher - Desktop */}
            <div className='hidden md:block'>
              <LanguageSwitcher />
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className='lg:hidden p-2 text-primary hover:bg-gray-100 rounded-lg transition-colors'
              aria-label='Toggle menu'
            >
              {isMobileMenuOpen ? (
                <X className='w-6 h-6' />
              ) : (
                <Menu className='w-6 h-6' />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className='fixed inset-0 z-40 lg:hidden' style={{ top: '96px' }}>
          <div
            className='absolute inset-0 bg-black/20 backdrop-blur-sm'
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className='relative bg-white border-b border-gray-200 shadow-lg'>
            <div className='flex flex-col px-4 py-4 space-y-4'>
              {/* Search Bar Mobile */}
              <div className='relative'>
                <Search className='absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5 z-10' />
                <Input
                  type='search'
                  placeholder='Snel zoeken . . .'
                  className='pl-12 pr-4 py-3 w-full bg-[#F8F8F8] border border-gray-200 rounded-[12px] text-[#111111] placeholder-muted-foreground h-[42px]'
                />
              </div>

              {/* Navigation Links */}
              <Link
                href='/categories'
                className='text-foreground hover:text-primary transition-colors font-medium py-2'
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Categorieën
              </Link>
              <Link
                href='/contact'
                className='text-foreground hover:text-primary transition-colors font-medium py-2'
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </Link>

              {/* User Actions */}
              {!loading && !user && !isAuthRoute && (
                <Link href='/auth/login' onClick={() => setIsMobileMenuOpen(false)}>
                  <Button
                    className='w-full bg-primary hover:bg-primary/90 text-white px-4 py-3 border border-gray-200 font-medium text-base h-auto rounded-[12px]'
                    style={{
                      boxShadow:
                        '0px 10px 15px 0px #0000001A, 0px 4px 6px 0px #0000001A',
                    }}
                  >
                    Login
                  </Button>
                </Link>
              )}

              {/* Language Switcher Mobile */}
              <div className='pt-2 border-t border-gray-200'>
                <LanguageSwitcher />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}