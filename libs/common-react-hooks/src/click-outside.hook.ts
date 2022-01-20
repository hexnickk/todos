import { useEffect } from "react";

// reference -> https://stackoverflow.com/questions/32553158/detect-click-outside-react-component
export function useClickOutside(ref, callback) {
    useEffect(() => {
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                event.stopPropagation();
                callback?.(event);
            }
        }

        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [ref]);
}
