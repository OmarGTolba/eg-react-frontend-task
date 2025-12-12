import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ children, className = "", ...props }) => {
  const baseClasses = "cursor-pointer bg-blue-500 w-full text-white px-4 py-2 rounded hover:bg-blue-600 transition disabled:opacity-50 disabled:cursor-not-allowed";
  const mergedClasses = className ? `bg-blue-500 w-full text-white px-4 py-2 rounded hover:bg-blue-600 transition cursor-pointer ${className} ` : baseClasses;
  
  return (
    <button
      {...props}
      className={mergedClasses}
    >
      {children}
    </button>
  );
};