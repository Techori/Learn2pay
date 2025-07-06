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
}) => {
  return (
    <input
      id={id}
      type={type}
      placeholder={placeholder}
      className={cn(
        "w-full p-2 rounded",
        "border border-[var(--input-border)]",
        "bg-[var(--input-bg)]",
        "text-[var(--input-text)]",
        "placeholder:text-[var(--text-secondary)]",
        "focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-opacity-50",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "disabled:bg-[var(--input-bg)]/50 disabled:text-[var(--text-secondary)]",
        "transition-colors duration-200",
        className
      )}
      {...props}
    />
  );
};
