import { useMemo } from 'react-router/node_modules/@types/react';
import { useLocation } from 'react-router-dom';

export function useQuery() {
  const { search } = useLocation();

  return useMemo(() => new URLSearchParams(search), [search]);
}
