import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  /** Button style variant */
  variant?: "default" | "ghost" | "link" | "outline" | "destructive" | "secondary";
  size?: "default" | "lg" | "sm";
}

const variantClasses: Record<string, string> = {
  default:
    "bg-[var(--primary)] text-[var(--button-text)] hover:bg-[var(--primary-hover)]",
  ghost:
    "bg-transparent text-[var(--text-secondary)] hover:text-[var(--primary)] hover:bg-[var(--primary)]/10",
  link:
    "bg-transparent underline text-[var(--primary)] hover:text-[var(--primary-dark)] p-0 h-auto",
  outline:
    "border border-[var(--primary)] text-[var(--primary)] bg-transparent hover:bg-[var(--primary)] hover:text-[var(--button-text)]",
  destructive:
    "bg-[var(--danger)] text-white hover:bg-[var(--danger)]/90",
  secondary:
    "bg-[var(--secondary)] text-white hover:bg-[var(--secondary)]/90",
};

const sizeClasses: Record<string, string> = {
  default: "px-4 py-2 text-base",
  lg: "px-8 py-4 text-lg",
  sm: "px-2 py-1 text-sm",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className = "", variant = "default", size = "default", ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        variantClasses[variant],
        sizeClasses[size],
        "rounded-md font-medium transition-colors",
        "focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-2",
        "disabled:opacity-50 disabled:pointer-events-none",
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
);

Button.displayName = "Button";

// Export helper to extract button classes without needing children
export function buttonVariants({
  variant = "default",
  size = "default",
  className = "",
}: {
  variant?: keyof typeof variantClasses;
  size?: keyof typeof sizeClasses;
  className?: string;
}) {
  return cn(
    variantClasses[variant],
    sizeClasses[size],
    "rounded-md font-medium transition-colors",
    "focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-2",
    "disabled:opacity-50 disabled:pointer-events-none",
    className
  );
}

export default Button;