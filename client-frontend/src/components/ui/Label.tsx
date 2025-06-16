import * as React from "react";

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {}

export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className = "", ...props }, ref) => (
    <label ref={ref} className={`block mb-1 font-medium ${className}`} {...props} />
  )
);

Label.displayName = "Label";
