import * as React from "react"
import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface KeyPointsProps {
  title: string
  points: string[]
  backgroundColor?: string
  headingIcon?: LucideIcon
  headingIconClassName?: string
  headingClassName?: string
  listIcon?: LucideIcon
  listIconClassName?: string
  listItemClassName?: string
  className?: string
}

export function KeyPoints({
  title,
  points,
  backgroundColor = "bg-accent/5",
  headingIcon: HeadingIcon,
  headingIconClassName = "text-secondary-foreground",
  headingClassName = "text-secondary-foreground font-montserrat",
  listIcon: ListIcon,
  listIconClassName = "text-emerald-600",
  listItemClassName = "text-secondary-foreground font-montserrat",
  className
}: KeyPointsProps) {
  return (
    <div className={cn(backgroundColor, "p-8.5 border-l-[6px] border-gray-200 rounded-2xl", className)}>
      <div className="flex items-center gap-3 mb-4">
        {HeadingIcon && (
          <HeadingIcon
            size={20}
            className={cn(headingIconClassName)}
          />
        )}
        <h3 className={cn("", headingClassName)}>
          {title}
        </h3>
      </div>
      <ul className="space-y-3">
        {points.map((point, index) => (
          <li key={index} className="flex items-start gap-2">
            {ListIcon ? (
              <ListIcon
                size={16}
                className={cn("mt-0.5 flex-shrink-0", listIconClassName)}
              />
            ) : (
              <div className="w-1 h-1 bg-current rounded-full mt-2 flex-shrink-0" />
            )}
            <span className={cn("text-sm", listItemClassName)}>
              {point}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}