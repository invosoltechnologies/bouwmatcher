import * as React from "react"
import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface DataCollectionCardProps {
  icon: LucideIcon
  iconColor: string
  title: string
  items: string[]
  className?: string
}

function DataCollectionCard({
  icon: Icon,
  iconColor,
  title,
  items,
  className
}: DataCollectionCardProps) {
  return (
    <div className={cn("border border-gray-200 rounded-lg pt-11 p-9 bg-white", className)}>
      <div className="flex items-center gap-3 mb-4">
        <Icon className={cn("w-6 h-6", iconColor)} />
        <h3 className="text-secondary-foreground text-2xl font-semibold">
          {title}
        </h3>
      </div>
      <ul className="space-y-1">
        {items.map((item, index) => (
          <li key={index} className="text-slate-700 text-xl font-montserrat">
            • {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

export { DataCollectionCard }