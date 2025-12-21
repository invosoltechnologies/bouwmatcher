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
import { dashboardNavigation } from "@/config/professional-dashboard";
import { LogOut } from "lucide-react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useTranslations } from 'next-intl';

export default function Navbar() {
  const t = useTranslations('common.navbar');
  const [scrollY, setScrollY] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const pathname = usePathname();
  const isAuthRoute = pathname?.includes('/auth');
  const { user, loading } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    if (isLoggingOut) return;

    try {
      setIsLoggingOut(true);

      const response = await fetch('/api/auth/logout', {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error('Failed to logout');
      }

      toast.success(t('logoutSuccess'));
      setIsMobileMenuOpen(false);
      setIsAccountMenuOpen(false);

      // Redirect to home page
      router.push('/');
      router.refresh();
    } catch (error) {
      console.error('Logout error:', error);
      toast.error(t('logoutError'));
      setIsLoggingOut(false);
    }
  };

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

  // Calculate mobile top position - starts at 36px and goes to 0 when scrolled
  const mobileTopPosition = windowWidth < 768 ? `${Math.max(0, 36 - scrollY)}px` : `${84 - (scrollProgress * 84)}px`;

  return (
    <>
      <nav
        className="fixed left-0 right-0 z-50 py-3 md:py-4 px-4 md:px-7 bg-white border-b border-gray-200 md:rounded-[13px] transition-all duration-500 ease-out"
        style={{
          boxShadow: isScrolled ? '0px 4px 12px 0px #0000001A' : '0px 1px 2px 0px #0000000D',
          top: mobileTopPosition,
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
                {t('categories')}
              </Link>
              <Link
                href='/contact'
                className='text-foreground hover:text-primary transition-colors font-medium'
              >
                {t('contact')}
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
                  placeholder={t('searchPlaceholder')}
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
                        {t('login')}
                      </Button>
                    </Link>
                  )
                )}
              </div>
            )}

            {/* Language Switcher */}
            <LanguageSwitcher />

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
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-opacity duration-300 ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        style={{
          top: windowWidth < 768
            ? `${Math.max(0, 36 - scrollY) + 63}px`  // 36px initial gap + 63px navbar height (py-3 + content)
            : '96px'
        }}
      >
        <div
          className='absolute inset-0 bg-black/20 backdrop-blur-sm transition-opacity duration-300'
          onClick={() => setIsMobileMenuOpen(false)}
        />
        <div
          className={`relative bg-white border-b border-gray-200 shadow-lg transform transition-all duration-300 ease-out ${
            isMobileMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'
          }`}
        >
          <div className='flex flex-col px-6 py-6 space-y-1 max-h-[calc(100vh-120px)] overflow-y-auto'>
            {/* Navigation Links */}
            <Link
              href='/categories'
              className={`text-foreground hover:text-primary transition-all duration-200 font-medium text-base py-4 px-0 border-b border-gray-200 transform ${
                isMobileMenuOpen ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'
              }`}
              style={{ transitionDelay: '50ms' }}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t('categories')}
            </Link>
            <Link
              href='/contact'
              className={`text-foreground hover:text-primary transition-all duration-200 font-medium text-base py-4 px-0 border-b border-gray-200 transform ${
                isMobileMenuOpen ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'
              }`}
              style={{ transitionDelay: '100ms' }}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t('contact')}
            </Link>

            {/* Account Menu with Submenu */}
            {!loading && user && (
              <div
                className={`transform transition-all duration-300 border-b border-gray-200 ${
                  isMobileMenuOpen ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'
                }`}
                style={{ transitionDelay: '150ms' }}
              >
                <button
                  onClick={() => setIsAccountMenuOpen(!isAccountMenuOpen)}
                  className='w-full flex items-center justify-between text-foreground hover:text-primary transition-all duration-200 font-medium text-base py-4 px-0'
                >
                  <span>{t('account')}</span>
                  <svg
                    className={`w-4 h-4 transition-transform duration-200 ${
                      isAccountMenuOpen ? 'rotate-180' : ''
                    }`}
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M19 9l-7 7-7-7'
                    />
                  </svg>
                </button>

                {/* Account Submenu */}
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    isAccountMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className='pl-4 pb-2 space-y-2'>
                    {dashboardNavigation
                      .filter((item) => item.id !== 'home' && item.id !== 'logout')
                      .map((item) => (
                        <Link
                          key={item.id}
                          href={item.href}
                          className='flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors text-sm py-2'
                          onClick={() => {
                            setIsMobileMenuOpen(false);
                            setIsAccountMenuOpen(false);
                          }}
                        >
                          <Image
                            src={item.icon}
                            alt={item.label}
                            width={16}
                            height={16}
                            className='w-4 h-4'
                          />
                          <span>{item.label}</span>
                        </Link>
                      ))}

                    {/* Logout Button */}
                    <button
                      onClick={handleLogout}
                      disabled={isLoggingOut}
                      className='flex items-center gap-3 text-destructive hover:text-destructive/80 transition-colors text-sm py-2 w-full disabled:opacity-50'
                    >
                      <LogOut className='w-4 h-4' />
                      <span>{isLoggingOut ? t('loggingOut') : t('logout')}</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Login Button for non-authenticated users */}
            {!loading && !user && !isAuthRoute && (
              <div
                className={`transform transition-all duration-300 ${
                  isMobileMenuOpen ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'
                }`}
                style={{ transitionDelay: '150ms' }}
              >
                <Link
                  href='/auth/login'
                  onClick={() => setIsMobileMenuOpen(false)}
                  className='block text-foreground hover:text-primary transition-all duration-200 font-medium text-base py-4 px-0'
                >
                  {t('login')}
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}