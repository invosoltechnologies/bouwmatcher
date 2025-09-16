import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

interface StatCardProps {
  value: string
  description: string
  cardClassName?: string
  cardStyle?: React.CSSProperties
  statClassName?: string
  barClassName?: string
  descriptionClassName?: string
  fillPercentage?: number
}

export function StatCard({
  value,
  description,
  cardClassName,
  cardStyle,
  statClassName,
  barClassName,
  descriptionClassName,
  fillPercentage = 100
}: StatCardProps) {
  return (
    <Card
      className={cn(
        'p-8 text-center border-2 border-white rounded-2xl',
        cardClassName
      )}
      style={{
        boxShadow: '0px 16px 28.6px 0px #2D2D2D14',
        ...cardStyle,
      }}
    >
      <CardContent className='p-0'>
        <div className={cn('text-4xl font-normal mb-1.5', statClassName)}>{value}</div>
        <p
          className={cn('text-sm text-muted-foreground font-montserrat mb-3', descriptionClassName)}
        >
          {description}
        </p>
        {/* Progress bar */}
        <Progress
          value={fillPercentage}
          className={cn(
            'w-full h-1',
            barClassName?.includes('green')
              ? 'bg-accent/20 [&>[data-slot=progress-indicator]]:bg-accent [&>[data-slot=progress-indicator]]:transition-all [&>[data-slot=progress-indicator]]:duration-2000'
              : 'bg-primary/20 [&>[data-slot=progress-indicator]]:bg-primary [&>[data-slot=progress-indicator]]:transition-all [&>[data-slot=progress-indicator]]:duration-2000'
          )}
        />
      </CardContent>
    </Card>
  );
}