import { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { TConversation } from '../types/Conversation';
import { useErrorLogging } from './useErrorLogging';
import { useApiClient, useToastMessage } from 'shared/hooks';
import { useAppSelector } from 'store/hooks';

export function useConversations() {
  const apiClient = useApiClient();
  const { sessionId, user } = useAppSelector(state => state.auth);
  const { showSuccessToast, showErrorToast } = useToastMessage();

  const [conversations, setConversations] = useState([] as TConversation[]);
  const [friend, setFriend] = useState('');
  const [conversationId, setConversationId] = useState('');
  const { logError } = useErrorLogging();

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  // set data to state when fetched
  useEffect(() => {
    if (sessionId && user.accessToken) {
      setIsLoading(true);
      setIsError(false);
      apiClient.getAllConversations().then((data) => {
        setConversations(data.conversations);
        setIsLoading(false);
      }
      ).catch(() => {
        setIsLoading(false);
        setIsError(true);
      });
    }
  }, [sessionId, user.accessToken]);

  const mutation = useMutation(
    () => apiClient.createConversationInvite(friend),
    {
      onError: (error: any) => {
        showErrorToast(error.response?.data?.error || 'Unknow Error has occurred');
        logError(error);
      },
      onSuccess: (response: { conversationId: string; message: string }) => {
        setConversationId(response.conversationId);
      },
    }
  );

  const { mutateAsync } = mutation;

  const deleteConversationMutation = useMutation(
    (id: string) => apiClient.deleteConversation(id),
    {
      onError: (error: any) => {
        showErrorToast(error.response?.data?.error || 'Unknow Error has occurred');
        logError(error);
      },
      onSuccess: () => {
        // setConversations(
        //   conversations.filter(
        //     (x: TConversation) => x.conversationId !== response.conversationId
        //   )
        // );
        showSuccessToast('Conversation deleted');
        // setConversationId(response.conversationId);
      },
    }
  );

  const addConversation = async (friend: string) => {
    setFriend(friend);
    await mutateAsync();
  };

  const removeConversation = async (id: string) => {
    deleteConversationMutation.mutate(id);
  };

  return {
    conversations,
    isLoading,
    isError,
    addConversation,
    removeConversation,
    conversationId,
  };
}
