import { useEffect, useState } from 'react';
import { getConversations } from '../api/getConversations';
import { useQuery } from 'react-query';
import { TConversation } from '../types/Conversation';

export function useConversations() {
  const [conversations, setConversations] = useState([] as TConversation[]);

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

  const addConversation = () => {
    // TODO: Implement adding a conversation
  };

  return {
    conversations,
    isLoading,
    isError,
    addConversation,
  };
}
