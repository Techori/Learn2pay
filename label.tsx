import React from 'react';
import type { FC } from 'react';

interface LabelProps {
  htmlFor: string;
  children: React.ReactNode;
  className?: string;
}

export const Label: FC<LabelProps> = ({ htmlFor, children, className }) => (
  <label htmlFor={htmlFor} className={`block mb-1 font-medium ${className}`}>
    {children}
  </label>
);
