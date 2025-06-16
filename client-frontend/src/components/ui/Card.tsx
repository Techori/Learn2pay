import type { FC, ReactNode, CSSProperties } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties; // Allow passing style prop
}

export const Card: FC<CardProps> = ({ children, className, style }) => (
  <div className={`border rounded-lg shadow-md p-4 ${className ?? ''}`} style={style}>{children}</div>
);

export const CardHeader: FC<CardProps> = ({ children, className, style }) => (
  <div className={`mb-4 border-b pb-2 ${className ?? ''}`} style={style}>{children}</div>
);

export const CardTitle: FC<CardProps> = ({ children, className, style }) => (
  <h2 className={`text-xl font-bold ${className ?? ''}`} style={style}>{children}</h2>
);

export const CardDescription: FC<CardProps> = ({ children, className, style }) => (
  <p className={`text-gray-600 ${className ?? ''}`} style={style}>{children}</p>
);

export const CardContent: FC<CardProps> = ({ children, className, style }) => (
  <div className={`mt-4 ${className ?? ''}`} style={style}>{children}</div>
);
