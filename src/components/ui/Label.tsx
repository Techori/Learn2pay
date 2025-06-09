import * as React from "react";

export const Label = React.forwardRef<HTMLLabelElement, React.LabelHTMLAttributes<HTMLLabelElement>>(
  ({ className = "", ...props }, ref) => (
    <label
      ref={ref}
      className={`text-gray-400 font-medium mb-1 ${className}`}
      {...props}
    />
  )
);
Label.displayName = "Label";
