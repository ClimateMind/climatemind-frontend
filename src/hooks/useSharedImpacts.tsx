import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import getSharedImpacts from '../api/getSharedImpacts';
import { TSharedImpacts } from '../types/SharedImpacts';
import { useAlignment } from './useAlignment';
// import { useSession } from './useSession';

export const useSharedImpacts = () => {
  // const { showToast } = useToast();
  const [sharedImpacts, setSharedImpacts] = useState({} as TSharedImpacts);
  // const { alignmentId } = useAlignment();
  // const { alignmentScoresId } = useSession();
  const { alignmentScoresId } = useAlignment();

  // Get the data
  // const { data, isLoading, isError } = useQuery(['sharedImpacts', alignmentId], () => {
  //   if (alignmentId) {
  //     return getSharedImpacts(alignmentId);
  //   }
  // });

  const { data, isLoading, isError } = useQuery(['sharedImpacts', alignmentScoresId], () => {
    if (alignmentScoresId) {
      return getSharedImpacts(alignmentScoresId);
    }
  });

  useEffect(() => {
    if (data) {
        setSharedImpacts(data);
    }
  }, [data]);

  return { sharedImpacts, isError, isLoading };
};
