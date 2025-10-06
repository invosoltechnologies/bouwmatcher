'use client';
import * as React from "react";
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
  name,
  value,
  label,
  checked = false,
  onChange,
}: QuestionnaireRadioProps) {
  return (
    <label
      htmlFor={id}
      className={cn(
        "flex items-center w-full px-6 py-4 rounded-xl border-2 cursor-pointer transition-all",
        checked
          ? "bg-[#E8F4FD] border-primary"
          : "bg-white border-gray-200 hover:border-gray-300"
      )}
    >
      <input
        type="radio"
        id={id}
        name={name}
        value={value}
        checked={checked}
        onChange={(e) => onChange?.(e.target.value)}
        className="w-5 h-5 text-primary border-gray-300 focus:ring-primary focus:ring-2"
      />
      <span className="ml-4 text-base font-medium text-foreground">
        {label}
      </span>
    </label>
  );
}
