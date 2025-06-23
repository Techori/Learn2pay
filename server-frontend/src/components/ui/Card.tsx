
import type { FC, ReactNode, CSSProperties } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties; // Allow passing style prop
}

export const Card: FC<CardProps> = ({ children, className, style }) => (
  <div
    className={`border border-gray-700 bg-gray-800 rounded-lg shadow-md p-4
      dark:border-gray-200 dark:bg-white
      transition-colors duration-200
      ${className ?? ''}`}
    style={style}
  >
    {children}
  </div>
);

export const CardHeader: FC<CardProps> = ({ children, className, style }) => (
  <div
    className={`mb-4 border-b border-gray-700 pb-2
      dark:border-b dark:border-gray-200
      transition-colors duration-200
      ${className ?? ''}`}
    style={style}
  >
    {children}
  </div>
);

export const CardTitle: FC<CardProps> = ({ children, className, style }) => (
  <h2
    className={`text-xl font-bold text-gray-100 dark:text-gray-900
      transition-colors duration-200
      ${className ?? ''}`}
    style={style}
  >
    {children}
  </h2>
);

export const CardDescription: FC<CardProps> = ({ children, className, style }) => (
  <p
    className={`text-gray-400 dark:text-gray-600
      transition-colors duration-200
      ${className ?? ''}`}
    style={style}
  >
    {children}
  </p>
);

export const CardContent: FC<CardProps> = ({ children, className, style }) => (
  <div
    className={`mt-4 ${className ?? ''}`}
    style={style}
  >
    {children}
  </div>
);
