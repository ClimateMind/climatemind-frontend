import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { getAlignment } from '../api/getAlignment';
import { useAlignment } from './useAlignment';

export function useSharedValues() {
  const [sharedValues, setSharedValues] = useState({} as any);
  const { alignmentId } = useAlignment();

  const { data, isLoading, isError } = useQuery(
    'conversations',
    () => getAlignment(alignmentId),
    {
      staleTime: 1000, // Stale time shortened to make sure CRUD data is up to date.
    }
  );

  useEffect(() => {
    if (data) {
      setSharedValues(data);
    }
  }, [data, setSharedValues]);

  return {
    sharedValues,
    isLoading,
    isError,
  };
}
