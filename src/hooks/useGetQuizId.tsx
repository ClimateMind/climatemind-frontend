import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { getQuizId } from '../api/getQuizId';
import { useAuth } from './auth/useAuth';
import { useSession } from './useSession';

export function useGetQuizId() {
  const { accessToken } = useAuth();
  const { sessionId } = useSession();
  const [quizId, setQuizId] = useState('');
  const isSessionId = sessionId !== null && sessionId !== '';

  // Fetch data with react query
  const { data, isLoading, isError } = useQuery(
    'quizId',
    () => getQuizId(accessToken),
    {
      enabled: isSessionId,
    }
  );

  useEffect(() => {
    if (data?.quizId) {
      setQuizId(data.quizId);
    }
  }, [data]);

  return {
    isLoading,
    isError,
    quizId,
  };
}
