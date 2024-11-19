import * as React from "react";

const Select = React.forwardRef(({
    className = '',
    error = null,
    children,
    ...props
}, ref) => {
    const baseStyles = "flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";
    
    const errorStyles = error ? "border-red-500 focus-visible:ring-red-500" : "";

    return (
        <div className="space-y-1">
            <select
                ref={ref}
                className={`${baseStyles} ${errorStyles} ${className}`}
                {...props}
            >
                {children}
            </select>
            {error && (
                <p className="text-sm text-red-500">{error}</p>
            )}
        </div>
    );
});

Select.displayName = "Select";

export { Select };