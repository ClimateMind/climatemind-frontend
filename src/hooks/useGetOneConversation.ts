import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { getOneConversation } from '../api/getOneConversation';
import useLocalStorage from './useLocalStorage';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function useGetOneConversation(conversationId: string) {
  const [, setValue] = useLocalStorage('userA', '');
  const { error, isError, isLoading, data } = useQuery(
    ['conversations', conversationId],
    () => getOneConversation(conversationId),
    {
      // Set retries to one so that if the page is not found the user sees the error quicker
      retry: 1,
    }
  );

  const conversation = data;

  useEffect(() => {
    if (conversation?.userA?.name) {
      setValue(conversation.userA.name);
    }
  }, [conversation, setValue]);

  return {
    isError,
    isLoading,
    conversation,
    error,
  };
}
