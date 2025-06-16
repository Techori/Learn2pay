import React from 'react';
import type { FC } from 'react';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  children?: React.ReactNode; // Make children optional
  className?: string;
}

export const Checkbox: FC<CheckboxProps> = ({ children, className = "", ...props }) => (
  <label className={`inline-flex items-center ${className}`}>
    <input type="checkbox" className="mr-2" {...props} />
    {children}
  </label>
);
