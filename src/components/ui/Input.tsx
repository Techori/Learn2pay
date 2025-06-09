import * as React from "react";

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className = "", ...props }, ref) => (
    <input
      ref={ref}
      className={`block w-full rounded border border-gray-700 bg-gray-900 px-3 py-2 text-white placeholder-gray-400 focus:border-orange-500 focus:ring-orange-500  ${className}`}
      {...props}
    />
  )
);
Input.displayName = "Input";
