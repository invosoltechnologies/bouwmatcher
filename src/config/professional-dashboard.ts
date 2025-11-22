export interface NavigationItem {
  id: string;
  label: string;
  href: string;
  icon: string;
  type: 'link' | 'action';
}

export const dashboardNavigation: NavigationItem[] = [
  {
    id: 'offerteaanvragen',
    label: 'Offerteaanvragen',
    href: '/pro-dashboard/offerteaanvragen',
    icon: '/icons/professional-dashboard/offerteaanvragen.svg',
    type: 'link',
  },
  {
    id: 'bedrijfsprofiel',
    label: 'Bedrijfsprofiel',
    href: '/pro-dashboard/bedrijfsprofiel',
    icon: '/icons/professional-dashboard/bedrijfsprofiel.svg',
    type: 'link',
  },
  {
    id: 'werkgebied',
    label: 'Werkgebied',
    href: '/pro-dashboard/werkgebied',
    icon: '/icons/professional-dashboard/werkgebied.svg',
    type: 'link',
  },
  {
    id: 'faq',
    label: 'FAQ',
    href: '/pro-dashboard/faq',
    icon: '/icons/professional-dashboard/faq.svg',
    type: 'link',
  },
  {
    id: 'account',
    label: 'Account',
    href: '/pro-dashboard/account',
    icon: '/icons/professional-dashboard/account.svg',
    type: 'link',
  },
  {
    id: 'home',
    label: 'Home',
    href: '/',
    icon: '/icons/professional-dashboard/home.svg',
    type: 'link',
  },
  {
    id: 'logout',
    label: 'Log out',
    href: '#',
    icon: '/icons/professional-dashboard/logout.svg',
    type: 'action',
  },
];

export interface PageConfig {
  title: string;
  description: string;
}

export const pageConfigs: Record<string, PageConfig> = {
  offerteaanvragen: {
    title: 'Offerteaanvragen',
    description: 'Beheer je inkomende projectaanvragen',
  },
  bedrijfsprofiel: {
    title: 'Bedrijfsprofiel',
    description: 'Beheer je bedrijfsinformatie, foto’s en reviews',
  },
  werkgebied: {
    title: 'Werkgebied',
    description: 'Beheer je regio’s, straal en rubrieken',
  },
  faq: {
    title: 'FAQ',
    description: 'Veelgestelde vragen en antwoorden',
  },
  account: {
    title: 'Account',
    description: 'Beheer je instellingen, bedrijf- en contactgegevens',
  },
};
