import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils/lib";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-white hover:bg-primary-hover dark:bg-primary dark:text-white dark:hover:bg-primary-hover",
        secondary:
          "border-transparent bg-secondary text-white hover:bg-secondary/90 dark:bg-secondary dark:text-white dark:hover:bg-secondary/90",
        destructive:
          "border-transparent bg-danger text-white hover:bg-danger/90 dark:bg-danger dark:text-white dark:hover:bg-danger/90",
        outline: 
          "text-text-secondary border-border hover:bg-card-bg/80 dark:text-text-secondary dark:border-border dark:hover:bg-card-bg/80",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };