import { useQuery } from '@tanstack/react-query';
import { useApiClient } from 'shared/hooks';

function useConversation(conversationId: string) {
  const apiClient = useApiClient();

  const conversation = useQuery({
    queryKey: ['conversation', conversationId],
    queryFn: () => apiClient.getConversation(conversationId),
    enabled: !!conversationId,
  });

  return {
    isLoading: conversation.isPending,
    conversation: conversation.data,
  };
}

export default useConversation;
