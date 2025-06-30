import type { FC, ReactNode, CSSProperties } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties; // Allow passing style prop
}

export const Card: FC<CardProps> = ({ children, className, style }) => (
  <div
    className={`border border-card-border bg-card-bg rounded-lg shadow-card p-4
      transition-colors duration-200
      ${className ?? ''}`}
    style={style}
  >
    {children}
  </div>
);

export const CardHeader: FC<CardProps> = ({ children, className, style }) => (
  <div
    className={`mb-4 border-b border-card-border pb-2
      transition-colors duration-200
      ${className ?? ''}`}
    style={style}
  >
    {children}
  </div>
);

export const CardTitle: FC<CardProps> = ({ children, className, style }) => (
  <h2
    className={`text-xl font-bold text-text
      transition-colors duration-200
      ${className ?? ''}`}
    style={style}
  >
    {children}
  </h2>
);

export const CardDescription: FC<CardProps> = ({ children, className, style }) => (
  <p
    className={`text-text-secondary
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
