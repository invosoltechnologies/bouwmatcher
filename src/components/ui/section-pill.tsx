import * as React from "react"
import { cn } from "@/lib/utils"

interface SectionPillProps {
  text: string
  icon?: React.ReactNode
  className?: string
  iconClassName?: string
  textClassName?: string
  stylePill?: React.CSSProperties
}

export function SectionPill({
  text,
  icon,
  className,
  iconClassName,
  textClassName,
  stylePill
}: SectionPillProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-medium",
        className
      )}
      style={stylePill}
    >
      {icon && (
        <span className={cn("flex-shrink-0", iconClassName)}>
          {icon}
        </span>
      )}
      <span className={cn("font-montserrat", textClassName)}>
        {text}
      </span>
    </div>
  )
}