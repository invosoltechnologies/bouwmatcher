export interface NavigationItem {
  id: string;
  label: string;
  href: string;
  icon: string;
  iconType?: 'svg' | 'lucide'; // Optional: defaults to 'svg'
  type: 'link' | 'action';
}

export const adminNavigation: NavigationItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    href: '/admin-dashboard',
    icon: 'LayoutDashboard',
    iconType: 'lucide',
    type: 'link',
  },
  {
    id: 'professionals',
    label: 'Professionals',
    href: '/admin-dashboard/professionals',
    icon: 'Users',
    iconType: 'lucide',
    type: 'link',
  },
  // {
  //   id: 'companies',
  //   label: 'Companies',
  //   href: '/admin-dashboard/companies',
  //   icon: 'Building2',
  //   iconType: 'lucide',
  //   type: 'link',
  // },
  // {
  //   id: 'verification',
  //   label: 'Verification',
  //   href: '/admin-dashboard/verification',
  //   icon: 'ShieldCheck',
  //   iconType: 'lucide',
  //   type: 'link',
  // },
  {
    id: 'reviews',
    label: 'Reviews',
    href: '/admin-dashboard/reviews',
    icon: 'Star',
    iconType: 'lucide',
    type: 'link',
  },
  // {
  //   id: 'projects',
  //   label: 'Projects',
  //   href: '/admin-dashboard/projects',
  //   icon: 'Briefcase',
  //   iconType: 'lucide',
  //   type: 'link',
  // },
  {
    id: 'service-categories',
    label: 'Service Categories',
    href: '/admin-dashboard/service-categories',
    icon: 'FolderTree',
    iconType: 'lucide',
    type: 'link',
  },
  {
    id: 'home',
    label: 'Home',
    href: '/',
    icon: 'Home',
    iconType: 'lucide',
    type: 'link',
  },
  {
    id: 'logout',
    label: 'Log out',
    href: '#',
    icon: 'LogOut',
    iconType: 'lucide',
    type: 'action',
  },
];

export interface PageConfig {
  title: string;
  description: string;
}

export const adminPageConfigs: Record<string, PageConfig> = {
  dashboard: {
    title: 'Admin Dashboard',
    description: 'Overview of platform statistics and recent activity',
  },
  professionals: {
    title: 'Professionals Management',
    description: 'Manage professional profiles and verification',
  },
  companies: {
    title: 'Companies Management',
    description: 'Manage company profiles and verification',
  },
  verification: {
    title: 'Verification Queue',
    description: 'Review and approve pending verifications',
  },
  reviews: {
    title: 'Reviews Management',
    description: 'Monitor and moderate user reviews',
  },
  projects: {
    title: 'Projects Management',
    description: 'View and manage all platform projects',
  },
  'service-categories': {
    title: 'Service Categories',
    description: 'Manage service categories and subcategories',
  },
  'service-categories-form': {
    title: 'Category Form',
    description: 'Create or edit a service category',
  },
};
