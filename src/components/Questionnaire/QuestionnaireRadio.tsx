'use client';
import * as React from "react";
import { RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface QuestionnaireRadioProps {
  id: string;
  name: string;
  value: string;
  label: string;
  description?: string;
  checked?: boolean;
  disabled?: boolean;
  onChange?: (value: string) => void;
}

export default function QuestionnaireRadio({
  id,
  value,
  label,
  description,
  checked = false,
  disabled = false,

}: QuestionnaireRadioProps) {
  return (
    <div
      className={cn(
        'flex items-start w-full px-2.5 py-3 md:px-3 md:py-4 rounded-lg md:rounded-xl border transition-all',
        disabled
          ? 'opacity-50 cursor-not-allowed bg-gray-50'
          : 'cursor-pointer',
        !disabled && checked
          ? 'bg-gradient-to-r from-[rgba(10,178,126,0.10)] to-[rgba(2,58,162,0.10)] border-primary/20'
          : !disabled
          ? 'bg-white border-neutral-800/20 hover:border-primary/40'
          : 'border-neutral-800/10'
      )}
    >
      <RadioGroupItem
        value={value}
        id={id}
        disabled={disabled}
        circleClassName={'size-2.5 md:size-3.5'}
        className={cn(
          'w-4 h-4 md:w-6 md:h-6 border-2 shrink-0 mt-0.5',
          checked
            ? 'border-primary'
            : 'border-neutral-800/20'
        )}
      />
      <Label
        htmlFor={id}
        className={cn(
          'ml-3.5 flex-1',
          disabled ? 'cursor-not-allowed' : 'cursor-pointer',
          checked ? 'text-primary' : 'text-muted-foreground'
        )}
      >
        <span className={cn(
          'block text-base md:text-lg font-medium',
          checked ? 'text-primary' : 'text-foreground'
        )}>
          {label}
        </span>
        {description && (
          <span className={cn(
            'block text-sm md:text-base mt-1',
            checked ? 'text-primary/70' : 'text-muted-foreground'
          )}>
            {description}
          </span>
        )}
      </Label>
    </div>
  );
}
