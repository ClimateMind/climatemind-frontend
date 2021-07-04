import { useQuery } from 'react-query';
import getFeed from '../api/getFeed';
import { useSession } from './useSession';

// TODO: Update to use new scores id
export const useClimateFeed = () => {
  const { sessionId } = useSession();

  const query = useQuery(['feed', sessionId], () => {
    if (sessionId) {
      return getFeed(sessionId);
    }
  });

  return query;
};
