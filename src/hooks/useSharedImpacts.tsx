import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { ClimateApi } from '../api/ClimateApi';
import { TSharedImpact } from '../types/SharedImpacts';
import { useAuth } from './auth/useAuth';
import { useAlignment } from './useAlignment';
import { useSession } from './useSession';

export const useSharedImpacts = () => {
  const { sessionId } = useSession();
  const { accessToken } = useAuth();
  
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
        return new ClimateApi(sessionId, accessToken).getSharedImpacts(alignmentScoresId);
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
