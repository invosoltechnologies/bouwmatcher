'use client';

import React, { useState, useEffect } from 'react';
import { Search, FileText, BookOpen, Briefcase, Info, Home, Phone, HelpCircle, Shield, Cookie, AlertCircle } from 'lucide-react';
import { useRouter } from '@/i18n/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { servicesData } from '@/data/services';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';

export default function NavBarSearch() {
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const router = useRouter();
  const t = useTranslations('common.navbar');
  const locale = useLocale() as 'en' | 'nl';

  // Define General Pages
  const generalPages = [
    { id: 'home', labelEn: 'Home', labelNl: 'Home', href: '/', icon: Home },
    { id: 'contact', labelEn: 'Contact', labelNl: 'Contact', href: '/contact', icon: Phone },
    { id: 'faq-customers', labelEn: 'FAQ for Customers', labelNl: 'FAQ voor Klanten', href: '/faq-klanten', icon: HelpCircle },
    { id: 'faq-specialists', labelEn: 'FAQ for Specialists', labelNl: 'FAQ voor Specialisten', href: '/faq-specialisten', icon: HelpCircle },
    { id: 'terms', labelEn: 'Terms and Conditions', labelNl: 'Algemene Voorwaarden', href: '/terms', icon: FileText },
    { id: 'privacy', labelEn: 'Privacy Policy', labelNl: 'Privacybeleid', href: '/privacy-policy', icon: Shield },
    { id: 'cookies', labelEn: 'Cookies Policy', labelNl: 'Cookiebeleid', href: '/cookies-policy', icon: Cookie },
    { id: 'disclaimer', labelEn: 'Disclaimer', labelNl: 'Disclaimer', href: '/disclaimer', icon: AlertCircle },
  ];

  // Define Blogs
  const blogPages = [
    { id: 'blog', labelEn: 'Blog Listing', labelNl: 'Blog Overzicht', href: '/blog', icon: BookOpen },
  ];

  const handleSelect = (href: string) => {
    router.push(href as any);
    setOpen(false);
    setSearchValue('');
  };

  return (
    <div className='hidden lg:flex items-center'>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <div className='relative cursor-pointer'>
            <Search className='absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5 z-10' />
            <div className='pl-12 pr-4 py-[14px] w-80 bg-[#F8F8F8] border border-gray-200 rounded-[12px] text-muted-foreground hover:border-ring h-[42px] text-lg flex items-center shrink-0'>
              {t('searchPlaceholder')}
            </div>
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-0" align="start">
          <Command>
            <CommandInput 
              placeholder={t('searchPlaceholder')} 
              value={searchValue}
              onValueChange={setSearchValue}
            />
            <CommandList>
              <CommandEmpty>{t('noResultsFound') || 'No results found.'}</CommandEmpty>
              
              <CommandGroup heading={locale === 'en' ? 'General Pages' : 'Algemene Pagina\'s'}>
                {generalPages.map((page) => (
                  <CommandItem
                    key={page.id}
                    value={locale === 'en' ? page.labelEn : page.labelNl}
                    onSelect={() => handleSelect(page.href)}
                    className="flex items-center gap-2 group cursor-pointer"
                  >
                    <page.icon className="w-4 h-4 text-muted-foreground transition-colors group-data-[selected=true]:text-white" />
                    <span>{locale === 'en' ? page.labelEn : page.labelNl}</span>
                  </CommandItem>
                ))}
              </CommandGroup>

              <CommandGroup heading={locale === 'en' ? 'Blogs' : 'Blogs'}>
                {blogPages.map((blog) => (
                  <CommandItem
                    key={blog.id}
                    value={locale === 'en' ? blog.labelEn : blog.labelNl}
                    onSelect={() => handleSelect(blog.href)}
                    className="flex items-center gap-2 group cursor-pointer"
                  >
                    <blog.icon className="w-4 h-4 text-muted-foreground transition-colors group-data-[selected=true]:text-white" />
                    <span>{locale === 'en' ? blog.labelEn : blog.labelNl}</span>
                  </CommandItem>
                ))}
              </CommandGroup>

              <CommandGroup heading={locale === 'en' ? 'Services' : 'Diensten'}>
                {servicesData.map((service) => (
                  <CommandItem
                    key={service.slug}
                    value={locale === 'en' ? service.name_en : service.name_nl}
                    onSelect={() => handleSelect(`/service/${service.slug}`)}
                    className="flex items-center gap-2 group cursor-pointer"
                  >
                    <Briefcase className="w-4 h-4 text-muted-foreground transition-colors group-data-[selected=true]:text-white" />
                    <span>{locale === 'en' ? service.name_en : service.name_nl}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
