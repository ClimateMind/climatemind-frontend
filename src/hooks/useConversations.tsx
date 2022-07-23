import { useEffect, useState } from 'react';
import { getConversations } from '../api/getConversations';
import { submitConversation } from '../api/postConversation';
import { useQuery, useMutation } from 'react-query';
import { TConversation } from '../types/Conversation';
import { useAuth } from './auth/useAuth';
import { useToast } from './useToast';

export function useConversations() {
  const { accessToken } = useAuth();
  const { showToast } = useToast();
  const [conversations, setConversations] = useState([] as TConversation[]);
  const [friend, setFriend] = useState('');
  const [conversationId, setConversationId] = useState('');
  // const [linkId, setLinkId] = useState('');

  // Fetch data with react query
  const { data, isLoading, isError } = useQuery(
    'conversations',
    getConversations,
    {
      staleTime: 1000, // Stale time shortened to make sure CRUD data is up to date.
    }
  );

  // set data to state when fetched
  useEffect(() => {
    if (data && data.conversations) {
      setConversations(data.conversations);
    }
  }, [data]);

  const mutation = useMutation(() => submitConversation(friend, accessToken), {
    onError: (error: any) => {
      showToast({
        message: error.response?.data?.error || 'Unknow Error has occoured',
        type: 'error',
      });
    },
    onSuccess: (response: { conversationId: string; message: string }) => {
      setConversationId(response.conversationId);
    },
  });

  const { mutateAsync } = mutation;

  const addConversation = async (friend: string) => {
    setFriend(friend);
    await mutateAsync();
  };

  return {
    conversations,
    isLoading,
    isError,
    addConversation,
    conversationId,
  };
}
