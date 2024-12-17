import React, { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  error?: string; 
}

const Input: React.FC<InputProps> = ({ id, label, error, ...props }) => (
  <div className="flex flex-col gap-2">
    <label htmlFor={id} className="text-sm font-medium text-gray-700">
      {label}
    </label>
    <input
      id={id}
      className={`w-full rounded-lg border p-3 text-sm ${
        error ? "border-red-500 focus:border-red-500 focus:ring-red-200" : "border-gray-300 focus:border-blue-500 focus:ring-blue-200"
      }`}
      {...props}
    />
    {error && <span className="text-[12px] text-red-500">{error}</span>} {/* Komunikat błędu */}
  </div>
);

export default Input;
