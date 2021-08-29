import { useQuery } from 'react-query';
import getFeed from '../api/getFeed';
import { useSession } from './useSession';

export const useClimateFeed = () => {
  const { quizId } = useSession();

  const query = useQuery(['feed', quizId], () => {
    if (quizId) {
      return getFeed(quizId);
    }
  });

  return query;
};
