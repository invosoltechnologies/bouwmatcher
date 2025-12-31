import * as React from "react"
import { cn } from "@/lib/utils"

interface AlertCardProps {
  children: React.ReactNode
  className?: string
}

function AlertCard({ children, className }: AlertCardProps) {
  return (
    <div className={cn("rounded-lg p-6 font-montserrat", className)}>
      {children}
    </div>
  )
}

interface AlertCardHeaderProps {
  children: React.ReactNode
  className?: string
}

function AlertCardHeader({ children, className }: AlertCardHeaderProps) {
  return (
    <h4 className={cn("text-2xl font-semibold mb-3", className)}>
      {children}
    </h4>
  )
}

interface AlertCardContentProps {
  children: React.ReactNode
  className?: string
}

function AlertCardContent({ children, className }: AlertCardContentProps) {
  return (
    <p className={cn("text-xl", className)}>
      {children}
    </p>
  )
}

export { AlertCard, AlertCardHeader, AlertCardContent }