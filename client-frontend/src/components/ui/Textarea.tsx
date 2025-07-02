import React from "react";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => (
    <textarea ref={ref} className={`w-full p-2 border rounded bg-white text-black border-gray-300 dark:bg-gray-900 dark:text-white dark:border-gray-700 ${className}`} {...props} />
  )
);

Textarea.displayName = "Textarea";

export default Textarea;
