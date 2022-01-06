import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import getSharedImpacts from '../api/getSharedImpacts';
import { TSharedImpacts } from '../types/SharedImpacts';
import { useAlignment } from './useAlignment';

export const useSharedImpacts = () => {
  // const { showToast } = useToast();
  const [sharedImpacts, setSharedImpacts] = useState({} as TSharedImpacts);
  const { alignmentId } = useAlignment();

  // Get the data
  const { data, isLoading, isError } = useQuery(['sharedImpacts', alignmentId], () => {
    if (alignmentId) {
      return getSharedImpacts(alignmentId);
    }
  });

  useEffect(() => {
    if (data) {
        setSharedImpacts(data);
    }
  }, [data]);

  return { sharedImpacts, isError, isLoading };
};
