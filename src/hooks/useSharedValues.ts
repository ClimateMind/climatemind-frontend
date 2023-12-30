import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { useAlignment } from './useAlignment';
import { useUserB } from './useUserB';
import { usePostAlignment } from './usePostAlignment';
import { useSession } from './useSession';
import { ClimateApi } from '../api/ClimateApi';
import { useAuth } from './auth/useAuth';

export function useSharedValues() {
  const { sessionId, quizId } = useSession();
  const { accessToken } = useAuth();
  
  const { conversationId } = useUserB();
  const { alignmentScoresId } = useAlignment();
  const { submitAlignment, data } = usePostAlignment();

  useEffect(() => {
    if (!!alignmentScoresId === false) {
      submitAlignment({ conversationId: conversationId!, quizId: quizId! });
    }
  }, [data, conversationId, quizId, alignmentScoresId, submitAlignment]);

  return useQuery(
    ['conversations', alignmentScoresId],
    () => new ClimateApi(sessionId, accessToken).getAlignment(alignmentScoresId),
    {
      staleTime: 1000,
      enabled: !!alignmentScoresId,
    }
  );
}
