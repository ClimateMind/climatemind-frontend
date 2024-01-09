import { useQuery } from '@tanstack/react-query';
import { useApiClient } from 'shared/hooks';

function useGetAllConversations() {
  const apiClient = useApiClient();

  const conversations = useQuery({
    queryKey: ['conversations'],
    queryFn: apiClient.getAllConversations,
  });

  return {
    isLoading: conversations.isPending,
    conversations: conversations.data?.conversations,
  };
}

export default useGetAllConversations;
