import React from "react";
import type { FC } from "react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/context/ThemeContext";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Optional id to avoid mandatory id errors */
  id?: string;
  placeholder?: string;
  type?: string;
  className?: string;
}

export const Input: FC<InputProps> = ({
  id,
  placeholder,
  type = "text",
  className,
  ...props
}) => {
  const { theme } = useTheme();
  
  return (
    <input
      id={id}
      type={type}
      placeholder={placeholder}
      className={cn(
        "w-full p-2 border rounded",
        "focus:outline-none focus:ring-2 focus:ring-opacity-50",
        "disabled:cursor-not-allowed",
        "transition-colors duration-200",
        theme === "dark" 
          ? "border-gray-700 bg-gray-800 text-gray-200 placeholder:text-gray-500 focus:ring-gray-600 disabled:bg-gray-800/50 disabled:text-gray-500" 
          : "border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 focus:ring-gray-300 disabled:bg-gray-100 disabled:text-gray-500",
        className
      )}
      {...props}
    />
  );
};
