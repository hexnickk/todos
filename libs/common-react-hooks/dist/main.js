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
var $dd1423d179143442$exports = {};

$parcel$export($dd1423d179143442$exports, "useDebounceValue", () => $dd1423d179143442$export$52bae15610182273);

let $dd1423d179143442$export$52bae15610182273 = (value, delay)=>{
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


$parcel$exportWildcard(module.exports, $dd1423d179143442$exports);


//# sourceMappingURL=main.js.map
