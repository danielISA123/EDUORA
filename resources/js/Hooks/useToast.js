import { useCallback } from 'react';
import { toast } from 'sonner';

export function useToast() {
    const success = useCallback((message) => {
        toast.success(message, {
            position: 'top-right',
            duration: 3000,
        });
    }, []);

    const error = useCallback((message) => {
        toast.error(message, {
            position: 'top-right',
            duration: 4000,
        });
    }, []);

    const promise = useCallback((promise, options) => {
        return toast.promise(promise, {
            loading: 'Loading...',
            ...options,
        });
    }, []);

    return { success, error, promise };
}