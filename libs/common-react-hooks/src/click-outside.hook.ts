import { useEffect, MutableRefObject } from "react";

// reference -> https://stackoverflow.com/questions/32553158/detect-click-outside-react-component
export function useClickOutside(
    ref: MutableRefObject<any>,
    callback: (event: Event) => unknown
) {
    useEffect(() => {
        function handleClickOutside(event: Event) {
            if (ref.current && !ref.current.contains(event.target)) {
                callback?.(event);
            }
        }

        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [ref, callback]);
}
