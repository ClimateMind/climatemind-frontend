import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { getAlignment } from '../api/getAlignment';
import { useAlignment } from './useAlignment';
import { useUserB } from './useUserB';
import { usePostAlignment } from './usePostAlignment';
import { useSession } from './useSession';

export function useSharedValues() {
  const { conversationId } = useUserB();
  const { alignmentScoresId } = useAlignment();
  const { submitAlignment, data } = usePostAlignment();
  const { quizId } = useSession();

  useEffect(() => {
    if (!!alignmentScoresId === false) {
      submitAlignment({ conversationId: conversationId, quizId: quizId });
    }
  }, [data, conversationId, quizId, alignmentScoresId, submitAlignment]);

  return useQuery(
    ['conversations', alignmentScoresId],
    () => getAlignment(alignmentScoresId),
    {
      staleTime: 1000,
      enabled: !!alignmentScoresId,
    }
  );
}
