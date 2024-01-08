import { useEffect } from 'react';
import { useQuery } from 'react-query';

import { ClimateApi } from '../api/ClimateApi';
import { useAppSelector } from 'store/hooks';

export function useGetOneConversation(conversationId: string) {
  const { sessionId, user } = useAppSelector(state => state.auth);

  const { error, isError, isLoading, data } = useQuery(
    ['conversations', conversationId],
    () => new ClimateApi(sessionId, user.accessToken).getOneConversation(conversationId),
    {
      // Set retries to one so that if the page is not found the user sees the error quicker
      retry: 1,
    }
  );

  const conversation = data;

  useEffect(() => {
    if (conversation?.userA?.name) {
      localStorage.setItem('userA', conversation.userA.name);
    }
  }, [conversation]);

  return {
    isError,
    isLoading,
    conversation,
    error,
  };
}
