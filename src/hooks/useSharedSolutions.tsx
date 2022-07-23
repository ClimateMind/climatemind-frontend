import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import getSharedSolutions from '../api/getSharedSolutions';
import { TSharedSolution } from '../types/SharedSolutions';
import { useAlignment } from './useAlignment';

export const useSharedSolutions = () => {
  const [solutions, setSolutions] = useState(null as TSharedSolution[] | null);
  const [userAName, setUserAname] = useState('');
  const [userBName, setUserBname] = useState('');
  const { alignmentScoresId } = useAlignment();

  const { data, isLoading, isError } = useQuery(
    ['sharedSolutions', alignmentScoresId],
    () => {
      if (alignmentScoresId) {
        return getSharedSolutions(alignmentScoresId);
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
