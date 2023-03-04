import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { ClimateApi } from '../api/ClimateApi';
import { useAuth } from './auth/useAuth';
import useLocalStorage from './useLocalStorage';
import { useSession } from './useSession';

export function useGetOneConversation(conversationId: string) {
  const { sessionId } = useSession();
  const { accessToken } = useAuth();
  
  const [, setValue] = useLocalStorage('userA', '');
  const { error, isError, isLoading, data } = useQuery(
    ['conversations', conversationId],
    () => new ClimateApi(sessionId, accessToken).getOneConversation(conversationId),
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
