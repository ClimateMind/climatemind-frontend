import { useState, useEffect } from 'react';

export function useSessionStorage(initialData: string, key: string) {
  const [data, setData] = useState<string | undefined>(undefined);

  // Check if there is already a value is session store or set to initial data
  useEffect(() => {
    const storedData = sessionStorage.getItem(key);
    storedData ? setData(storedData) : setData(initialData);
  }, [initialData, key]);

  // Set data to session store each time it changes
  useEffect(() => {
    data && sessionStorage.setItem(key, data);
  }, [data, key]);

  const storeValue = (data: string) => {
    setData(data);
  };

  return { data, storeValue };
}
