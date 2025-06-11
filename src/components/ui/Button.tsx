import React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "ghost" | "link" | "outline";
  size?: "default" | "lg" | "sm";
}

const variantClasses: Record<string, string> = {
  default: "bg-orange-500 text-white hover:bg-orange-600",
  ghost: "bg-transparent text-gray-300 hover:text-orange-500",
  link: "bg-transparent underline text-blue-600 hover:text-blue-800 p-0 h-auto",
  outline: "border border-orange-500 text-orange-500 bg-transparent hover:bg-orange-500 hover:text-white",
};

const sizeClasses: Record<string, string> = {
  default: "px-4 py-2 text-base",
  lg: "px-8 py-4 text-lg",
  sm: "px-2 py-1 text-sm",
};

export const Button: React.FC<ButtonProps> = ({
  children,
  className = "",
  variant = "default",
  size = "default",
  ...props
}) => (
  <button
    className={`${variantClasses[variant]} ${sizeClasses[size]} rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ${className}`}
    {...props}
  >
    {children}
  </button>
);

export default Button;
