import { useQuery } from 'react-query';
import { getOneConversation } from '../api/getOneConversation';

export function useGetOneConversation(conversationId: string) {
  const { error, isError, isLoading, data } = useQuery(
    `useGetOneConversation${conversationId}`,
    () => getOneConversation(conversationId),
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
