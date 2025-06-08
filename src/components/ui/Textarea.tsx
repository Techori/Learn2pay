import * as React from "react";

export const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className = "", ...props }, ref) => (
    <textarea
      ref={ref}
      className={`block w-full rounded border border-gray-700 bg-gray-900 px-3 py-2 text-white placeholder-gray-400 focus:border-orange-500 focus:ring-orange-500 ${className}`}
      {...props}
    />
  )
);
Textarea.displayName = "Textarea";
//className={`  placeholder-gray-400 focus:border-orange-500 focus:ring-orange-500 ${className}`}