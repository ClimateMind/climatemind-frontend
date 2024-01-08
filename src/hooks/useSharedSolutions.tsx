import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { ClimateApi } from '../api/ClimateApi';
import { TSharedSolution } from '../types/SharedSolutions';
import { useAlignment } from './useAlignment';
import { useSession } from './useSession';
import { useAppSelector } from 'store/hooks';

export const useSharedSolutions = () => {
  const { sessionId } = useSession();
  const { accessToken } = useAppSelector(state => state.auth.user);

  const [solutions, setSolutions] = useState(null as TSharedSolution[] | null);
  const [userAName, setUserAname] = useState('');
  const [userBName, setUserBname] = useState('');
  const { alignmentScoresId } = useAlignment();

  const { data, isLoading, isError } = useQuery(
    ['sharedSolutions', alignmentScoresId],
    () => {
      if (alignmentScoresId) {
        return new ClimateApi(sessionId, accessToken).getSharedSolutions(
          alignmentScoresId
        );
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
