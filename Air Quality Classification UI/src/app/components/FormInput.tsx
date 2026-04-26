import { Info } from "lucide-react";
import { useState } from "react";

interface FormInputProps {
  label: string;
  name: string;
  type?: string;
  value: string | number;
  onChange: (value: string) => void;
  placeholder?: string;
  tooltip?: string;
  required?: boolean;
}

export function FormInput({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  tooltip,
  required = false,
}: FormInputProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="relative">
      <label htmlFor={name} className="block text-gray-300 mb-2 flex items-center gap-2">
        {label}
        {required && <span className="text-red-400">*</span>}
        {tooltip && (
          <div
            className="relative inline-block"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
          >
            <Info className="w-4 h-4 text-gray-500 cursor-help" />
            {showTooltip && (
              <div className="absolute left-0 top-6 z-10 w-64 p-3 bg-gray-800 text-gray-200 rounded-lg shadow-xl border border-gray-700">
                {tooltip}
              </div>
            )}
          </div>
        )}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
      />
    </div>
  );
}
