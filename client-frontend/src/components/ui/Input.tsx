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
    className={`w-full p-2 border rounded ${className}`}
    {...props}
  />
);
