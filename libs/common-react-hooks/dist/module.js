import {useState as $hCgyA$useState, useEffect as $hCgyA$useEffect} from "react";

function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}
var $51e007112a91c565$exports = {};

$parcel$export($51e007112a91c565$exports, "useDebounceValue", () => $51e007112a91c565$export$52bae15610182273);

let $51e007112a91c565$export$52bae15610182273 = (value, delay)=>{
    const [debouncedValue, setDebouncedValue] = $hCgyA$useState(value);
    $hCgyA$useEffect(()=>{
        const handler = setTimeout(()=>{
            setDebouncedValue(value);
        }, delay);
        return ()=>{
            clearTimeout(handler);
        };
    }, [
        value,
        delay
    ]);
    return debouncedValue;
};


var $16113f1836cb432c$exports = {};

$parcel$export($16113f1836cb432c$exports, "useClickOutside", () => $16113f1836cb432c$export$1896bab46732d207);

function $16113f1836cb432c$export$1896bab46732d207(ref, callback) {
    $hCgyA$useEffect(()=>{
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) callback?.(event);
        }
        document.addEventListener("click", handleClickOutside);
        return ()=>{
            document.removeEventListener("click", handleClickOutside);
        };
    }, [
        ref,
        callback
    ]);
}




export {$51e007112a91c565$export$52bae15610182273 as useDebounceValue, $16113f1836cb432c$export$1896bab46732d207 as useClickOutside};
//# sourceMappingURL=module.js.map
