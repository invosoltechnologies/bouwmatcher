'use client';

import { useTranslations } from 'next-intl';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProfileTask {
  id: string;
  titleKey: string;
  statusKey: string;
  completed: boolean;
}

interface ProfileCompletionCardProps {
  completionPercentage: number;
  tasks: ProfileTask[];
}

export default function ProfileCompletionCard({
  completionPercentage,
  tasks,
}: ProfileCompletionCardProps) {
  const t = useTranslations('common.proDashboard.account.profileCompletion');

  return (
    <Card className='px-5 gap-4'>
      <CardHeader className='p-0 gap-0'>
        <div className='flex items-center justify-between mb-4'>
          <CardTitle className='text-base leading-normal font-normal'>
            {t('title')}
          </CardTitle>
          <span className='text-primary text-base font-bold'>
            {completionPercentage}%
          </span>
        </div>
        {/* Progress Bar */}
        <Progress value={completionPercentage} className='h-1.5 bg-slate-200' />
      </CardHeader>

      <CardContent className='p-0'>
        <div className='space-y-4'>
          {tasks.map((task) => (
            <div key={task.id} className='flex items-start gap-3'>
              {/* Check Icon */}
              <div
                className={cn(
                  'w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5',
                  task.completed ? 'bg-accent' : 'bg-slate-200'
                )}
              >
                {task.completed && <Check className='w-3 h-3 text-white' />}
              </div>

              {/* Task Content */}
              <div className='flex-1'>
                <p className='text-secondary-foreground text-sm font-medium leading-normal'>
                  {t(`tasks.${task.titleKey}` as any)}
                </p>
                <p
                  className={cn(
                    'text-xs mt-0.5',
                    task.completed ? 'text-accent' : 'text-muted-foreground'
                  )}
                >
                  {t(task.statusKey as any)}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Edit Button */}
        {/* <Button
          variant='outline'
          size='default'
          onClick={onEditClick}
          className='w-full mt-6 text-primary border-primary font-normal text-base rounded-xl'
        >
          Wijzig
        </Button> */}
      </CardContent>
    </Card>
  );
}
