import { useQuery } from 'react-query';
import getFeed from '../api/getFeed';
import { useGetQuizId } from './useGetQuizId';

export const useClimateFeed = () => {
  const { quizId } = useGetQuizId();

  const query = useQuery(
    ['feed', quizId],
    () => {
      return getFeed(quizId);
    },
    { enabled: !!quizId }
  );

  if (query.status === 'idle') {
    return { isLoading: true, error: false, data: null };
  }
  return query;
};
