import { useEffect, useState } from "react";

export function useDebouncer(value, delay = 500) {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setDebouncedValue(value)
        }, delay);


        return () => clearTimeout(timeout);
    }, [value, delay]);

    return debouncedValue;
}