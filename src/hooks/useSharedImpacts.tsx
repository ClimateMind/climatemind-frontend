import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { TSharedImpact } from '../types/SharedImpacts';
import { useAlignment } from './useAlignment';
import { useApiClient } from 'shared/hooks';

export const useSharedImpacts = () => {
  const apiClient = useApiClient();

  // const [sharedImpacts, setSharedImpacts] = useState({} as TSharedImpactsResponse);
  const [impacts, setImpacts] = useState(null as TSharedImpact[] | null);
  const [userAName, setUserAname] = useState('');
  const [userBName, setUserBname] = useState('');
  const { alignmentScoresId } = useAlignment();

  // Get the data
  // const { data, isLoading, isError } = useQuery(['sharedImpacts', alignmentId], () => {
  //   if (alignmentId) {
  //     return getSharedImpacts(alignmentId);
  //   }
  // });

  const { data, isLoading, isError } = useQuery(
    ['sharedImpacts', alignmentScoresId],
    () => {
      if (alignmentScoresId) {
        return apiClient.getSharedImpacts(alignmentScoresId);
      }
    }
  );

  useEffect(() => {
    if (data) {
      setImpacts(data.climateEffects);
      setUserAname(data.userAName);
      setUserBname(data.userBName);
    }
  }, [data]);

  return { impacts, userAName, userBName, isError, isLoading };
};
