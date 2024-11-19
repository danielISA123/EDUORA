import React from 'react';
import { cn } from "@/lib/utils";

export default function SelectInput({ 
    className = '', 
    options = [], 
    defaultValue = '', 
    placeholder = 'Select an option',
    ...props 
}) {
    return (
        <select
            {...props}
            defaultValue={defaultValue}
            className={cn(
                "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm w-full",
                "text-gray-900 text-sm",
                className
            )}
        >
            <option value="" disabled>{placeholder}</option>
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
}