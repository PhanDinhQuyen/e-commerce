import { useState, useEffect } from "react";

let debounceTimer;

export default function useDebounce(value, delay) {
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      setDebounceValue(value);
    }, delay);
  }, [value, delay]);

  return debounceValue;
}
