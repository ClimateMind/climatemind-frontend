import { useQuery } from 'react-query';
import { useApiClient } from 'shared/hooks';

export function useGetOneConversation(conversationId: string) {
  const apiClient = useApiClient();

  const { error, isError, isLoading, data } = useQuery(
    ['conversations', conversationId],
    () => apiClient.getConversation(conversationId),
    {
      // Set retries to one so that if the page is not found the user sees the error quicker
      retry: 1,
    }
  );

  const conversation = data;

  return {
    isError,
    isLoading,
    conversation,
    error,
  };
}
