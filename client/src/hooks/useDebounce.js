import { useState, useEffect } from "react";

export default function useDebounce(value, delay) {
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const debounceValueDelay = setTimeout(() => {
      setDebounceValue(value);
    }, delay);
    return () => clearTimeout(debounceValueDelay);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return debounceValue;
}
