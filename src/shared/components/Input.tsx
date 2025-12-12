import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({ label, error, className = "", ...props }) => {
  const baseClasses = "border p-2 rounded w-full";
  const errorClasses = error ? "border-red-500" : "border-gray-300";
  const customClasses = className || "";
  const mergedClasses = `${baseClasses} ${errorClasses} ${customClasses}`.trim();
  
  return (
    <div className="flex flex-col mb-4">
      <label className="mb-1 font-medium text-gray-700">{label}</label>
      <input
        {...props}
  
      className={`border p-2 rounded ${error ? "border-red-500" : "border-gray-300"}`}
        />
      {error && <span className="text-red-500 text-sm mt-1">{error}</span>}
    </div>
  );
};