import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { getAlignment } from '../api/getAlignment';
import { useAlignment } from './useAlignment';
import { TAlignment } from '../types/Aligment';

export function useSharedValues() {
  const [sharedValues, setSharedValues] = useState({} as TAlignment);
  const { alignmentScoresId } = useAlignment();

  const { data, isLoading, isError } = useQuery(
    'conversations',
    () => getAlignment(alignmentScoresId),
    {
      staleTime: 1000, // Stale time shortened to make sure CRUD data is up to date.
    }
  );

  useEffect(() => {
    if (data) {
      setSharedValues(data);
    }
  }, [data, setSharedValues]);

  const { userAName, userBName } = sharedValues;

  return {
    userAName,
    userBName,
    sharedValues,
    isLoading,
    isError,
  };
}
