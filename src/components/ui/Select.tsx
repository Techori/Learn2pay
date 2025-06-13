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
}

export const Select: FC<SelectProps> = ({
  value,
  onValueChange,
  required,
  children,
  className,
}) => (
  <select
    className={`w-full p-2 border rounded ${className ?? ''}`}
    value={value}
    onChange={e => onValueChange(e.target.value)}
    required={required}
  >
    {children}
  </select>
);

export const SelectItem: FC<SelectItemProps> = ({ value, children }) => (
  <option value={value}>{children}</option>
);

// Compatibility shims for your usage in login.tsx
export const SelectContent: FC<{ children: ReactNode }> = ({ children }) => <>{children}</>;
export const SelectTrigger: FC<{ children: ReactNode; className?: string }> = ({ children, className }) => (
  <div className={className ?? ''}>{children}</div>
);
export const SelectValue: FC<{ children: ReactNode }> = ({ children }) => <>{children}</>;
