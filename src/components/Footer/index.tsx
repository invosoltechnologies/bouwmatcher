import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className='bg-gray-900 text-white'>
      <div className='custom-container pt-16 pb-8 flex flex-col gap-16'>
        <div className='flex flex-col lg:flex-row gap-12'>
          {/* Logo and Description */}
          <div className='flex-4'>
            <Link href='/' className='flex items-center mb-6'>
              <Image
                src='/images/logo.svg'
                alt='Bouw Matcher'
                width={186}
                height={79}
                className='w-[186px] h-[79px] brightness-0 invert'
              />
            </Link>
            <p className='text-white text-xl font-light leading-relaxed max-w-sm'>
              Het vertrouwde platform voor het matchen van bouwers en projecten.
            </p>
          </div>

          {/* Help Section */}
          <div className='flex-1'>
            <h3 className='text-white text-xl font-medium mb-6'>Help</h3>
            <div className='space-y-4'>
              <Link
                href='/blog'
                className='block text-white font-light hover:text-white hover:underline transition-colors'
              >
                Nieuws
              </Link>
              <Link
                href='/veelgestelde-vragen'
                className='block text-white font-light hover:text-white hover:underline transition-colors'
              >
                Veelgestelde vragen
              </Link>
              <Link
                href='/contact'
                className='block text-white font-light hover:text-white hover:underline transition-colors'
              >
                Contacteren
              </Link>
            </div>
          </div>

          {/* Contact Section */}
          <div className='flex-1'>
            <h3 className='text-white text-xl font-medium mb-6'>Contact</h3>
            <div className='space-y-4'>
              <div className='flex items-center gap-3'>
                <Image
                  src='/icons/phone.svg'
                  alt='Phone'
                  width={16}
                  height={16}
                  className='w-4 h-4 brightness-0 invert'
                />
                <span className='text-white font-light'>+32 491 11 59 49</span>
              </div>
              <div className='flex items-center gap-3'>
                <Image
                  src='/icons/whatsapp.svg'
                  alt='WhatsApp'
                  width={16}
                  height={16}
                  className='w-4 h-4 brightness-0 invert'
                />
                <Link
                  href='https://wa.me/32491115949'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-white font-light hover:text-white hover:underline transition-colors'
                >
                  +32 491 11 59 49
                </Link>
              </div>
              <div className='flex items-center gap-3'>
                <Image
                  src='/icons/mail.svg'
                  alt='Email'
                  width={16}
                  height={16}
                  className='w-4 h-4 brightness-0 invert'
                />
                <Link
                  href='mailto:support@bouwmatcher.com'
                  className='text-white font-light hover:text-white hover:underline transition-colors'
                >
                  support@bouwmatcher.com
                </Link>
              </div>
              <div className='flex items-start gap-3'>
                <Image
                  src='/icons/map.svg'
                  alt='Location'
                  width={16}
                  height={16}
                  className='w-4 h-4 brightness-0 invert mt-1'
                />
                <div className='text-white font-light'>
                  <div>Philips Site 5 bus 1</div>
                  <div>3001 Leuven, België</div>
                </div>
              </div>
            </div>
          </div>

          {/* Socials Section */}
          <div className='flex-1'>
            <h3 className='text-white text-xl font-medium mb-6'>Socials</h3>
            <div className='space-y-4'>
              <Link
                href='#'
                className='flex items-center gap-3 text-white font-light hover:text-white hover:underline transition-colors'
              >
                <Image
                  src='/icons/facebook.svg'
                  alt='Facebook'
                  width={16}
                  height={16}
                  className='w-4 h-4 brightness-0 invert'
                />
                <span>Facebook</span>
              </Link>
              <Link
                href='#'
                className='flex items-center gap-3 text-white font-light hover:text-white hover:underline transition-colors'
              >
                <Image
                  src='/icons/instagram.svg'
                  alt='Instagram'
                  width={16}
                  height={16}
                  className='w-4 h-4 brightness-0 invert'
                />
                <span>Instagram</span>
              </Link>
              <Link
                href='#'
                className='flex items-center gap-3 text-white font-light hover:text-white hover:underline transition-colors'
              >
                <Image
                  src='/icons/linkdin.svg'
                  alt='LinkedIn'
                  width={16}
                  height={16}
                  className='w-4 h-4 brightness-0 invert'
                />
                <span>LinkedIn</span>
              </Link>
            </div>
          </div>
        </div>
        {/* Bottom Bar */}
        <div className='border-t border-gray-800'>
          <div className='custom-container py-6'>
            <div className='flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white'>
              <div>© 2025 Bouwmatcher | Alle rechten voorbehouden</div>
              <div className='flex items-center gap-6'>
                <Link
                  href='/privacy-policy'
                  className='hover:text-white hover:underline transition-colors'
                >
                  Privacybeleid
                </Link>
                <Link
                  href='/terms-conditions'
                  className='hover:text-white hover:underline transition-colors'
                >
                  Algemene voorwaarden
                </Link>
                <Link
                  href='/cookie-policy'
                  className='hover:text-white hover:underline transition-colors'
                >
                  Cookiebeleid
                </Link>
                <Link
                  href='/disclaimer'
                  className='hover:text-white hover:underline transition-colors'
                >
                  Disclaimer
                </Link>
                <span>Ondernemingsnummer - BE 1024.216.268</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}