import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavigationArrowProps {
  direction: "left" | "right";
  onClick: () => void;
  disabled?: boolean;
  className?: string;
}

export function NavigationArrow({ direction, onClick, disabled = false, className }: NavigationArrowProps) {
  const Icon = direction === "left" ? ChevronLeft : ChevronRight;

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "w-12 h-12 rounded-full border border-gray-200 bg-white hover:bg-gray-50 flex items-center justify-center transition-colors",
        "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white",
        className
      )}
    >
      <Icon className="w-5 h-5 text-muted-foreground" />
    </button>
  );
}