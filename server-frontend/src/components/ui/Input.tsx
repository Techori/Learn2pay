import React from "react";
import type { FC } from "react";
import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Optional id to avoid mandatory id errors */
  id?: string;
  placeholder?: string;
  type?: string;
  className?: string;
}

export const Input: FC<InputProps> = ({
  id,
  placeholder,
  type = "text",
  className,
  ...props
}) => (
  <input
    id={id}
    type={type}
    placeholder={placeholder}
    className={cn(
      "w-full p-2 border rounded",
      "border-input-border bg-input-bg text-input-text",
      "placeholder:text-text-secondary/60",
      "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50",
      "disabled:bg-input-bg/50 disabled:text-text-secondary disabled:cursor-not-allowed",
      "transition-colors duration-200",
      className
    )}
    {...props}
  />
);
