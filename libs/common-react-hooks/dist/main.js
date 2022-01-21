var $g5Y9E$react = require("react");

function $parcel$exportWildcard(dest, source) {
  Object.keys(source).forEach(function(key) {
    if (key === 'default' || key === '__esModule' || dest.hasOwnProperty(key)) {
      return;
    }

    Object.defineProperty(dest, key, {
      enumerable: true,
      get: function get() {
        return source[key];
      }
    });
  });

  return dest;
}
function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}
var $3a5e3b28ac2b8dd5$exports = {};

$parcel$export($3a5e3b28ac2b8dd5$exports, "useDebounceValue", () => $3a5e3b28ac2b8dd5$export$52bae15610182273);

let $3a5e3b28ac2b8dd5$export$52bae15610182273 = (value, delay)=>{
    const [debouncedValue, setDebouncedValue] = $g5Y9E$react.useState(value);
    $g5Y9E$react.useEffect(()=>{
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


var $4dbd76402c1a2bd2$exports = {};

$parcel$export($4dbd76402c1a2bd2$exports, "useClickOutside", () => $4dbd76402c1a2bd2$export$1896bab46732d207);

function $4dbd76402c1a2bd2$export$1896bab46732d207(ref, callback) {
    $g5Y9E$react.useEffect(()=>{
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


$parcel$exportWildcard(module.exports, $3a5e3b28ac2b8dd5$exports);
$parcel$exportWildcard(module.exports, $4dbd76402c1a2bd2$exports);


//# sourceMappingURL=main.js.map
