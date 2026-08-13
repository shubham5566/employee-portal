"use client";

import { forwardRef, SelectHTMLAttributes } from "react";

export interface SelectOption {
  label: string;
  value: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: SelectOption[];
  placeholder?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    { label, error, options, placeholder, id, className = "", ...props },
    ref
  ) => {
    const selectId = id ?? props.name;

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={selectId}
            className="text-sm font-medium text-slate-700"
          >
            {label}
          </label>
        )}
        <select
          ref={ref}
          id={selectId}
          className={`w-full rounded-lg border bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:ring-2 focus:ring-primary-200 ${
            error
              ? "border-red-400 focus:border-red-400"
              : "border-slate-300 focus:border-primary-400"
          } ${className}`}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${selectId}-error` : undefined}
          {...props}
        >
          {placeholder && (
            <option value="">
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {error && (
          <p id={`${selectId}-error`} className="text-xs text-red-600">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Select.displayName = "Select";
