import {useState as $hCgyA$useState, useEffect as $hCgyA$useEffect} from "react";

function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}
var $efe664e7e4bfd8af$exports = {};

$parcel$export($efe664e7e4bfd8af$exports, "useDebounceValue", () => $efe664e7e4bfd8af$export$52bae15610182273);

let $efe664e7e4bfd8af$export$52bae15610182273 = (value, delay)=>{
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




export {$efe664e7e4bfd8af$export$52bae15610182273 as useDebounceValue};
//# sourceMappingURL=module.js.map
