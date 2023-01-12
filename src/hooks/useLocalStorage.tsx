import { useCallback, useEffect, useState } from 'react';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function useLocalStorage<T>(key: string, initialValue?: T) {
  // Get from local storage then
  // parse stored json or return initialValue
  const readValue = useCallback(() => {
    // Prevent build error "window is undefined" but keep keep working
    if (typeof window === 'undefined') {
      return initialValue;
    }
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key “${key}”:`, error);
      return initialValue;
    }
  }, [initialValue, key]);
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState(readValue);
  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue = (value: T) => {
    // Prevent build error "window is undefined" but keep keep working
    if (typeof window == 'undefined') {
      console.warn(
        `Tried setting localStorage key “${key}” even though environment is not a client`
      );
    }
    try {
      // Allow value to be a function so we have the same API as useState
      const newValue = value instanceof Function ? value(storedValue) : value;
      // Save to local storage
      window.localStorage.setItem(key, JSON.stringify(newValue));
      // Save state
      setStoredValue(newValue);
      // We dispatch a custom event so every useLocalStorage hook are notified
      window.dispatchEvent(new Event('local-storage'));
    } catch (error) {
      console.warn(`Error setting localStorage key “${key}”:`, error);
    }
  };
  useEffect(() => {
    setStoredValue(readValue());
  }, [readValue]);
  useEffect(() => {
    const handleStorageChange = () => {
      setStoredValue(readValue());
    };
    // this only works for other documents, not the current one
    window.addEventListener('storage', handleStorageChange);
    // this is a custom event, triggered in writeValueToLocalStorage
    window.addEventListener('local-storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('local-storage', handleStorageChange);
    };
  }, [readValue]);
  return [storedValue, setValue];
}
export default useLocalStorage;
