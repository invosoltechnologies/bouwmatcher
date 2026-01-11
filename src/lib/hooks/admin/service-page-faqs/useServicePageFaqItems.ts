import { useQuery } from '@tanstack/react-query';
import { adminServicePageFaqsApi } from '@/lib/api/admin/service-page-faqs.api';

export const servicePageFaqItemsQueryKeys = {
  all: ['service-page-faq-items'] as const,
  byFaqId: (faqId: string) =>
    [...servicePageFaqItemsQueryKeys.all, 'by-faq-id', faqId] as const,
};

export function useServicePageFaqItems(faqId: string | null) {
  return useQuery({
    queryKey: servicePageFaqItemsQueryKeys.byFaqId(faqId || ''),
    queryFn: () => adminServicePageFaqsApi.getItems(faqId!),
    enabled: !!faqId,
  });
}
