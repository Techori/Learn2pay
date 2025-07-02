import React from 'react';
import type { FC } from 'react';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  children?: React.ReactNode; // Make children optional
  className?: string;
}

export const Checkbox: FC<CheckboxProps> = ({ children, className = "", ...props }) => (
  <label className={`inline-flex items-center text-gray-900 dark:text-gray-100 ${className}`}>
    <input type="checkbox" className="mr-2 bg-white border-gray-300 text-orange-600 focus:ring-orange-500 dark:bg-gray-900 dark:border-gray-700 dark:text-orange-400" {...props} />
    {children}
  </label>
);
