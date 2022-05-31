import { useQuery } from 'react-query';
import { getSharedFeed } from '../api/getSharedFeed';

export const useClimateSharedFeed = (id: string) => {
  return useQuery(['shared-feed', id], () => getSharedFeed(id));
};
