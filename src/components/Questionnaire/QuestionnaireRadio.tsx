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
  checked?: boolean;
  onChange?: (value: string) => void;
}

export default function QuestionnaireRadio({
  id,
  value,
  label,
  checked = false,

}: QuestionnaireRadioProps) {
  return (
    <div
      className={cn(
        'flex items-center w-full px-3 py-4 rounded-xl border cursor-pointer transition-all',
        checked
          ? 'bg-gradient-to-r from-[rgba(10,178,126,0.10)] to-[rgba(2,58,162,0.10)] border-primary/20'
          : 'bg-white border-neutral-800/20 hover:border-primary/40'
      )}
    >
      <RadioGroupItem
        value={value}
        id={id}
        circleClassName={'size-3.5'}
        className={cn(
          'w-6 h-6 border-2 shrink-0',
          checked
            ? 'border-primary'
            : 'border-neutral-800/20'
        )}
      />
      <Label
        htmlFor={id}
        className={cn(
          'ml-3.5 text-lg font-medium cursor-pointer flex-1',
          checked ? 'text-primary' : 'text-muted-foreground'
        )}
      >
        {label}
      </Label>
    </div>
  );
}
