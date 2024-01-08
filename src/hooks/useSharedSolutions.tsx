import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { TSharedSolution } from '../types/SharedSolutions';
import { useAlignment } from './useAlignment';
import { useApiClient } from 'shared/hooks';

export const useSharedSolutions = () => {
  const apiClient = useApiClient();

  const [solutions, setSolutions] = useState(null as TSharedSolution[] | null);
  const [userAName, setUserAname] = useState('');
  const [userBName, setUserBname] = useState('');
  const { alignmentScoresId } = useAlignment();

  const { data, isLoading, isError } = useQuery(
    ['sharedSolutions', alignmentScoresId],
    () => {
      if (alignmentScoresId) {
        return apiClient.getSharedSolutions(alignmentScoresId);
      }
    }
  );

  useEffect(() => {
    if (data) {
      setUserAname(data.userAName);
      setUserBname(data.userBName);
      setSolutions(data.climateSolutions);
    }
  }, [data]);

  return { solutions, userAName, userBName, isError, isLoading };
};
