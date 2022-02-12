import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import getSharedSolutions, { TSharedSolutionsResponse } from '../api/getSharedSolutions';
import { useAlignment } from './useAlignment';

export const useSharedSolutions = () => {
  const [sharedSolutions, setSharedSolutions] = useState({} as TSharedSolutionsResponse);
  const { alignmentScoresId } = useAlignment();

  const { data, isLoading, isError } = useQuery(['sharedImpacts', alignmentScoresId], () => {
    if (alignmentScoresId) {
      return getSharedSolutions(alignmentScoresId);
    }
  });

  useEffect(() => {
    if (data) {
        setSharedSolutions(data);
    }
  }, [data]);

  return { sharedSolutions, isError, isLoading };
};
