import React, { ChangeEvent } from "react";

interface SelectProps {
  label?: string;
  id: string;
  error?: string;
  options: string[];
  value: string;
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
}

const Select: React.FC<SelectProps> = ({
  label,
  id,
  options,
  error,
  value,
  onChange,
}) => (
  <div className="flex flex-col gap-2">
    {label && (
      <label htmlFor={id} className="text-sm font-medium text-gray-700">
        {label}
      </label>
    )}
    <div className="relative">
      <select
        id={id}
        value={value}
        onChange={onChange}
        className={`w-full appearance-none rounded-lg border border-gray-300 bg-white py-3 pl-4 pr-10 text-sm text-gray-700 shadow-sm focus:border-blue-500 focus:outline-none focus:ring focus:ring-blue-200
            ${
              error
                ? "border-red-500 focus:border-red-500 focus:ring-red-200"
                : "border-gray-300 focus:border-blue-500 focus:ring-blue-200"
            }
            `}
      >
        {options.map((item, i) => (
          <option key={i} value={item} className="text-black bg-white">
            {item}
          </option>
        ))}
      </select>
      {error && <span className="text-red-500 text-[12px]">{error}</span>}
      <span className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-gray-500">
        {">"}
      </span>
    </div>
  </div>
);

export default Select;
