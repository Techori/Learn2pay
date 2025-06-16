import React from 'react';
import type { FC, ReactNode } from 'react';

interface SelectProps {
  value: string;
  onValueChange: (value: string) => void;
  required?: boolean;
  children: ReactNode;
  className?: string;
}

interface SelectItemProps {
  value: string;
  children: ReactNode;
  className?: string;
}

export const Select: FC<SelectProps> = ({
  value,
  onValueChange,
  required,
  children,
  className,
}) => {
  return (
    <select
      className={`w-full p-2 border rounded bg-gray-800 text-white border-gray-700 ${className ?? ''}`}
      value={value}
      onChange={e => onValueChange(e.target.value)}
      required={required}
    >
      {React.Children.map(children, child => {
        if (React.isValidElement(child) && child.type === SelectItem) {
          const { value, children, className } = child.props as SelectItemProps;
          return (
            <option value={value} className={className}>
              {children}
            </option>
          );
        }
        return null;
      })}
    </select>
  );
};

export const SelectItem: FC<SelectItemProps> = ({ value, children, className }) => (
  <option value={value} className={className}>
    {children}
  </option>
);

// Compatibility shims
export const SelectContent: FC<{ children: ReactNode; className?: string }> = ({ children, className }) => (
  <div className={className}>{children}</div>
);

export const SelectTrigger: FC<{ children: ReactNode; className?: string }> = ({ children, className }) => (
  <div className={className}>{children}</div>
);

export const SelectValue: FC<{ children: ReactNode; placeholder?: string }> = ({ children, placeholder }) => (
  <div>{children || placeholder}</div>
);
