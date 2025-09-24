import * as React from "react"
import { cn } from "@/lib/utils"

interface BorderedCardProps {
  children: React.ReactNode
  borderColor: string
  className?: string
}

function BorderedCard({ children, borderColor, className }: BorderedCardProps) {
  return (
    <div className={cn("pl-6 py-4", borderColor, className)}>
      {children}
    </div>
  )
}

interface BorderedCardHeaderProps {
  children: React.ReactNode
  className?: string
}

function BorderedCardHeader({ children, className }: BorderedCardHeaderProps) {
  return (
    <h4 className={cn("text-secondary-foreground text-2xl font-montserrat font-semibold mb-3", className)}>
      {children}
    </h4>
  )
}

interface BorderedCardContentProps {
  children: React.ReactNode
  className?: string
}

function BorderedCardContent({ children, className }: BorderedCardContentProps) {
  return (
    <p className={cn("text-secondary-foreground text-xl font-montserrat", className)}>
      {children}
    </p>
  )
}

export { BorderedCard, BorderedCardHeader, BorderedCardContent }