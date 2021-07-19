import { useQuery } from 'react-query';
import getFeed from '../api/getFeed';
import { useSession } from './useSession';

// TODO: Update to use new scores id
export const useClimateFeed = () => {
  const { quizId } = useSession();

  const query = useQuery(['feed', quizId], () => {
    if (quizId) {
      return getFeed(quizId);
    }
  });

  return query;
};
