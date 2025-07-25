import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils/lib";
const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-orange-500 text-white hover:bg-orange-600 dark:bg-orange-400 dark:text-gray-900 dark:hover:bg-orange-500",
        secondary:
          "border-transparent bg-gray-700 text-white hover:bg-gray-600 dark:bg-gray-200 dark:text-gray-900 dark:hover:bg-gray-300",
        destructive:
          "border-transparent bg-red-500 text-white hover:bg-red-600 dark:bg-red-400 dark:text-gray-900 dark:hover:bg-red-500",
        outline: "text-gray-300 border-gray-600 dark:text-gray-100 dark:border-gray-400",
      },
    },
    defaultVariants: {
      variant: "default"
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
