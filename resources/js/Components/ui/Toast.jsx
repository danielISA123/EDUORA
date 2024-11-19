import React, { useEffect, useState } from 'react';
import { XCircle, CheckCircle } from 'lucide-react';
import { Toaster as SonnerToaster } from 'sonner';
import { cn } from "@/lib/utils";

export default function Toast({ message, type = 'success', onClose }) {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
            onClose?.();
        }, 3000);

        return () => clearTimeout(timer);
    }, [onClose]);

    if (!isVisible) return null;

    return (
        <div className={`fixed bottom-4 right-4 z-50 flex items-center gap-2 rounded-md p-4 shadow-lg ${
            type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
            {type === 'success' ? (
                <CheckCircle className="h-5 w-5" />
            ) : (
                <XCircle className="h-5 w-5" />
            )}
            <span className="text-sm font-medium">{message}</span>
            <button
                onClick={() => {
                    setIsVisible(false);
                    onClose?.();
                }}
                className="ml-2 rounded-full p-1 hover:bg-black/5"
            >
                <XCircle className="h-4 w-4" />
            </button>
        </div>
    );
}

export function Toaster({ ...props }) {
    return (
        <SonnerToaster
            theme="light"
            className={cn("toaster group", props.className)}
            toastOptions={{
                classNames: {
                    toast: "group toast group-[.toaster]:bg-white group-[.toaster]:text-gray-950 group-[.toaster]:border-gray-200 group-[.toaster]:shadow-lg",
                    description: "group-[.toast]:text-gray-500",
                    actionButton: "group-[.toast]:bg-gray-900 group-[.toast]:text-gray-50",
                    cancelButton: "group-[.toast]:bg-gray-100 group-[.toast]:text-gray-500",
                },
            }}
            {...props}
        />
    );
}
