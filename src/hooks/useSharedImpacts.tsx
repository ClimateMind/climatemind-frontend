import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { ClimateApi } from '../api/ClimateApi';
import { TSharedImpact } from '../types/SharedImpacts';
import { useAlignment } from './useAlignment';
import { useSession } from './useSession';
import { useAppSelector } from 'store/hooks';

export const useSharedImpacts = () => {
  const { sessionId } = useSession();
  const { accessToken } = useAppSelector(state => state.auth.user);

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
        return new ClimateApi(sessionId, accessToken).getSharedImpacts(
          alignmentScoresId
        );
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
