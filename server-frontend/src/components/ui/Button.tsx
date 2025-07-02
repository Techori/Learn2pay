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
    "bg-primary text-button-text hover:bg-primary-hover dark:bg-primary dark:text-white dark:hover:bg-primary-hover",
  ghost:
    "bg-transparent text-text-secondary hover:text-primary hover:bg-primary/10 dark:text-text-secondary dark:hover:text-primary dark:hover:bg-primary/5",
  link:
    "bg-transparent underline text-primary hover:text-primary-dark p-0 h-auto dark:text-primary dark:hover:text-primary-dark",
  outline:
    "border border-primary text-primary bg-transparent hover:bg-primary hover:text-button-text dark:border-primary dark:text-primary dark:hover:bg-primary dark:hover:text-white",
  destructive:
    "bg-danger text-white hover:bg-danger/90 dark:bg-danger dark:text-white dark:hover:bg-danger/90",
  secondary:
    "bg-secondary text-white hover:bg-secondary/90 dark:bg-secondary dark:text-white dark:hover:bg-secondary/90",
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
        "rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-primary dark:focus:ring-offset-gray-900 disabled:opacity-50 disabled:pointer-events-none",
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
    "rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-primary dark:focus:ring-offset-gray-900 disabled:opacity-50 disabled:pointer-events-none",
    className
  );
}

export default Button;