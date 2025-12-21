'use client'
import { useEffect, useState, useRef, ReactNode, useMemo } from 'react'
import { SectionPill } from "@/components/ui/section-pill"
import { StatCard } from "@/components/ui/stat-card"
import { Button } from "@/components/ui/button"
import { Stat } from "@/data/stats"
import Image from 'next/image'
import { useTranslations } from 'next-intl'

export interface StatsSectionProps {
  pillText?: string;
  pillIcon?: ReactNode;
  heading?: string;
  description?: string;
  stats?: Stat[];
  showCTA?: boolean;
  ctaButtons?: ReactNode;
}

export default function StatsSection({
  pillText,
  pillIcon,
  heading,
  description,
  stats,
  showCTA = true,
  ctaButtons,
}: StatsSectionProps) {
  const t = useTranslations('homepage.stats');

  const defaultStatsData = useMemo<Stat[]>(() => [
    {
      id: "1",
      value: t('stat1Value'),
      numericValue: 10000,
      description: t('stat1Description'),
    },
    {
      id: "2",
      value: t('stat2Value'),
      numericValue: 4.98,
      description: t('stat2Description'),
    },
    {
      id: "3",
      value: t('stat3Value'),
      numericValue: 2000,
      description: t('stat3Description'),
    },
    {
      id: "4",
      value: t('stat4Value'),
      numericValue: 24,
      description: t('stat4Description'),
    },
  ], [t]);

  const statsData = stats || defaultStatsData;

  const defaultPillIcon = (
    <Image
      src='/icons/statsSection-pill-icon.svg'
      alt='Stats icon'
      width={14}
      height={14}
      className='w-3.5 h-3.5'
    />
  );
  const [isVisible, setIsVisible] = useState(false)
  const [animatedValues, setAnimatedValues] = useState<{ [key: string]: number }>({})
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [isVisible])

  useEffect(() => {
    if (isVisible) {
      statsData.forEach((stat) => {
        animateValue(stat.id, stat.numericValue, stat.value)
      })
    }
  }, [isVisible, statsData])

  const animateValue = (id: string, target: number, originalValue: string) => {
    const duration = 2000
    const startTime = Date.now()
    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)

      let currentValue: number
      if (originalValue.includes('.')) {
        currentValue = progress * target
      } else {
        currentValue = Math.floor(progress * target)
      }

      setAnimatedValues(prev => ({ ...prev, [id]: currentValue }))

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }
    animate()
  }

  const formatValue = (id: string, originalValue: string): string => {
    const animatedValue = animatedValues[id] || 0

    if (originalValue.includes('+')) {
      return `${Math.floor(animatedValue).toLocaleString()}+`
    } else if (originalValue.includes('.')) {
      return animatedValue.toFixed(2)
    } else if (originalValue.includes('<')) {
      return `<${Math.floor(animatedValue)}h`
    }

    return animatedValue.toString()
  }

  const defaultCTAButtons = (
    <>
      <Button
        variant='default'
        size='lg'
        className='bg-primary hover:bg-primary/90 text-white font-medium px-6 py-4 rounded-[12px] text-base'
      >
        {t('ctaPrimary')}
      </Button>
      <Button
        variant='default'
        size='lg'
        className='bg-accent hover:bg-accent/90 text-white font-medium px-6 py-4 rounded-[12px] text-base'
      >
        {t('ctaSecondary')}
      </Button>
    </>
  );

  return (
    <section
      ref={sectionRef}
      className='py-14 md:py-20 bg-gradient-to-b from-slate-50 to-white'
    >
      <div className='custom-container'>
        <div className='text-center mb-12 md:mb-24'>
          <SectionPill
            text={pillText ?? t('pillText')}
            icon={pillIcon ?? defaultPillIcon}
            className='bg-white/80 border border-[#023AA233] text-primary py-3.5 px-6 mb-3 md:mb-5'
            textClassName='font-montserrat text-sm font-normal'
            iconClassName='text-accent'
          />
          <h2 className='text-[32px] md:text-5xl font-normal text-foreground mb-2 md:mb-5 px-4'>
            {heading ?? t('heading')}
          </h2>
          <p className='text-muted-foreground text-base md:text-2xl px-4'>
            {description ?? t('description')}
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6'>
          {statsData.map((stat, index) => {
            const isBlue = index % 2 === 0;
            return (
              <StatCard
                key={stat.id}
                value={isVisible ? formatValue(stat.id, stat.value) : '0'}
                description={stat.description}
                cardClassName='h-full'
                cardStyle={{
                  background: isBlue
                    ? 'linear-gradient(90deg, #EFF6FF 0%, rgba(219, 234, 254, 0.5) 100%)'
                    : 'linear-gradient(90deg, #F0FDF4 0%, rgba(220, 252, 231, 0.5) 100%)',
                }}
                statClassName={isBlue ? 'text-primary' : 'text-accent'}
                barClassName={isBlue ? 'blue' : 'green'}
                fillPercentage={isVisible ? 65 : 0}
              />
            );
          })}
        </div>

        {/* CTA Buttons */}
        {showCTA && (
          <div className='flex flex-col md:flex-row justify-center gap-4 mt-12 md:mt-16'>
            {ctaButtons || defaultCTAButtons}
          </div>
        )}
      </div>
    </section>
  );
}