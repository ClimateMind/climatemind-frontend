import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { useAlignment } from './useAlignment';
import { useUserB } from './useUserB';
import { usePostAlignment } from './usePostAlignment';
import { useAppSelector } from 'store/hooks';
import { useApiClient } from 'shared/hooks';

export function useSharedValues() {
  const apiClient = useApiClient();
  const { user } = useAppSelector(state => state.auth);
  
  const { conversationId } = useUserB();
  const { alignmentScoresId } = useAlignment();
  const { submitAlignment, data } = usePostAlignment();

  useEffect(() => {
    if (!!alignmentScoresId === false) {
      submitAlignment({ conversationId: conversationId!, quizId: user.quizId });
    }
  }, [data, conversationId, user.quizId, alignmentScoresId, submitAlignment]);

  return useQuery(
    ['conversations', alignmentScoresId],
    () => apiClient.getAlignmentScores(alignmentScoresId),
    {
      staleTime: 1000,
      enabled: !!alignmentScoresId,
    }
  );
}
