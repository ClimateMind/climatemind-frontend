import { useQuery } from 'react-query';
import { getAlignment } from '../api/getAlignment';
import { useGetOneConversation } from './useGetOneConversation';
import { useUserB } from './useUserB';

export function useSharedValues() {
  const { conversationId } = useUserB();
  const { conversation } = useGetOneConversation(conversationId);

  return useQuery(
    ['conversations', conversation?.alignmentScoresId],
    () => {
      if (conversation?.alignmentScoresId)
        return getAlignment(conversation?.alignmentScoresId);
    },
    {
      staleTime: 1000,
      enabled: !!conversation?.alignmentScoresId,
    }
  );
}
