import type { FC, ReactNode, CSSProperties } from 'react';
import { cn } from "@/lib/utils";

interface CardProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties; // Allow passing style prop
}

export const Card: FC<CardProps> = ({ children, className, style }) => (
  <div
    className={cn(
      "border border-[var(--card-border)] bg-[var(--card-bg)]",
      "rounded-lg shadow-[var(--shadow)] p-4",
      "transition-colors duration-200",
      className
    )}
    style={style}
  >
    {children}
  </div>
);

export const CardHeader: FC<CardProps> = ({ children, className, style }) => (
  <div
    className={cn(
      "mb-4 border-b border-[var(--card-border)]",
      "pb-2 transition-colors duration-200",
      className
    )}
    style={style}
  >
    {children}
  </div>
);

export const CardTitle: FC<CardProps> = ({ children, className, style }) => (
  <h2
    className={cn(
      "text-xl font-bold text-[var(--text-color)]",
      "transition-colors duration-200",
      className
    )}
    style={style}
  >
    {children}
  </h2>
);

export const CardDescription: FC<CardProps> = ({ children, className, style }) => (
  <p
    className={cn(
      "text-[var(--text-secondary)]",
      "transition-colors duration-200",
      className
    )}
    style={style}
  >
    {children}
  </p>
);

export const CardContent: FC<CardProps> = ({ children, className, style }) => (
  <div
    className={cn(
      "mt-4",
      className
    )}
    style={style}
  >
    {children}
  </div>
);
