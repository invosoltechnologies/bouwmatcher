'use client';

import { useLocale, useTranslations } from 'next-intl';
import { FAQAccordion } from '@/components/ui/faq-accordion';
import type { BlogPostFull } from '@/types/models/blog-post.model';

interface BlogFAQProps {
  blogPost: BlogPostFull;
}

export default function BlogFAQ({ blogPost }: BlogFAQProps) {
  const locale = useLocale();
  const t = useTranslations('blog.faq');

  // Generate FAQ items based on blog content
  // This creates generic FAQ items related to the blog topic
  const faqItems = [
    {
      question: locale === 'nl'
        ? 'Wat is het onderwerp van dit artikel?'
        : 'What is the topic of this article?',
      answer: locale === 'nl'
        ? `Dit artikel gaat over <strong>${blogPost.content?.title_nl || 'dit onderwerp'}</strong>. U vindt hierin nuttige informatie en tips.`
        : `This article is about <strong>${blogPost.content?.title_en || 'this topic'}</strong>. You'll find useful information and tips here.`
    },
    {
      question: locale === 'nl'
        ? 'Voor wie is dit artikel geschreven?'
        : 'Who is this article written for?',
      answer: locale === 'nl'
        ? 'Dit artikel is geschreven voor iedereen die meer wil weten over dit onderwerp en praktische advies zoekt.'
        : 'This article is written for anyone who wants to learn more about this topic and is looking for practical advice.'
    },
    {
      question: locale === 'nl'
        ? 'Kan ik aanvullende hulp krijgen?'
        : 'Can I get additional help?',
      answer: locale === 'nl'
        ? 'Ja, onze experts staan voor u klaar. Neem contact op met onze klantenservice voor persoonlijke ondersteuning.'
        : 'Yes, our experts are here to help you. Contact our customer service for personalized support.'
    },
    {
      question: locale === 'nl'
        ? 'Hoe kan ik deze informatie toepassen?'
        : 'How can I apply this information?',
      answer: locale === 'nl'
        ? 'Lees het artikel zorgvuldig door en pas de tips stap voor stap toe. Aarzel niet om om hulp te vragen als u vragen hebt.'
        : 'Read the article carefully and apply the tips step by step. Don\'t hesitate to ask for help if you have any questions.'
    },
    {
      question: locale === 'nl'
        ? 'Zijn er kosten verbonden aan dit advies?'
        : 'Are there any costs associated with this advice?',
      answer: locale === 'nl'
        ? 'Dit artikel biedt gratis informatie en advies. Voor professionele diensten kunt u contact opnemen met onze partners.'
        : 'This article provides free information and advice. For professional services, you can contact our partners.'
    },
    {
      question: locale === 'nl'
        ? 'Waar kan ik meer informatie vinden?'
        : 'Where can I find more information?',
      answer: locale === 'nl'
        ? 'Blader door onze andere artikelen of neem contact op met onze experts voor meer gedetailleerde informatie.'
        : 'Browse our other articles or contact our experts for more detailed information.'
    },
  ];

  return (
    <section className='py-8 md:py-14 bg-white'>
      <div className='custom-container'>
        <div className='max-w-4xl mx-auto'>
          {/* Header */}
          <div className='mb-10 md:mb-14 text-center'>
            <h2 className='text-2xl md:text-5xl font-display font-normal text-foreground mb-3 md:mb-5'>
              {locale === 'nl' ? 'Veelgestelde vragen' : 'Frequently Asked Questions'}
            </h2>
            <p className='text-muted-foreground text-base md:text-lg'>
              {locale === 'nl'
                ? 'Antwoorden op de meest gestelde vragen over dit onderwerp'
                : 'Answers to the most common questions about this topic'}
            </p>
          </div>

          {/* FAQ Accordion */}
          <FAQAccordion items={faqItems} className='space-y-4' />
        </div>
      </div>
    </section>
  );
}
