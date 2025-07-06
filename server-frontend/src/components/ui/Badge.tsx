import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils/lib";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-[var(--primary)] text-white hover:bg-[var(--primary-hover)]",
        secondary:
          "border-transparent bg-[var(--secondary)] text-white hover:bg-[var(--secondary)]/90",
        destructive:
          "border-transparent bg-[var(--danger)] text-white hover:bg-[var(--danger)]/90",
        outline: 
          "text-[var(--text-secondary)] border-[var(--border-color)] hover:bg-[var(--card-bg)]/80",
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