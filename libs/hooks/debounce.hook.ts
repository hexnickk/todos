import { useState, useEffect } from 'react';

// reference -> https://dev.to/gabe_ragland/debouncing-with-react-hooks-jci
export let useDebounceValue = <T>(value: T, delay: number) => {
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value]);

    return debouncedValue;
};
