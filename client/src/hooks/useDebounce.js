import { useState, useEffect } from "react";

export default function useDebounce(value, delay) {
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const debounceValueDelay = setTimeout(() => {
      setDebounceValue(value);
    }, delay);
    return () => clearTimeout(debounceValueDelay);
  }, [value, delay]);

  return debounceValue;
}
