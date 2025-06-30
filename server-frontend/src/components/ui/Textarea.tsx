import React from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn(
        "flex min-h-[80px] w-full rounded-md border",
        "border-input-border bg-input-bg text-input-text",
        "px-3 py-2 placeholder:text-text-secondary/60",
        "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50",
        "resize-none",
        "transition-colors duration-200",
        className
      )}
      {...props}
    />
  )
);

Textarea.displayName = "Textarea";

export default Textarea;