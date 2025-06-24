import React from "react";
import type { FC } from "react";

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
}) => (
  <input
    id={id}
    type={type}
    placeholder={placeholder}
    className={`
      w-full p-2 border border-gray-700 bg-gray-800 text-white rounded
      dark:border-gray-200 dark:bg-white dark:text-gray-900
      placeholder-gray-400 dark:placeholder-gray-600
      focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 dark:focus:ring-orange-300 dark:focus:ring-offset-white
      disabled:bg-gray-700 disabled:text-gray-400 dark:disabled:bg-gray-200 dark:disabled:text-gray-600
      transition-colors duration-200
      ${className}
    `}
    {...props}
  />
);
