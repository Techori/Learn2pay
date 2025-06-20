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
        "flex min-h-[80px] w-full rounded-md border border-[#232b45] bg-[#181f32] px-3 py-2 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50 resize-none",
        className
      )} 
      {...props} 
    />
  )
);

Textarea.displayName = "Textarea";

export default Textarea;
