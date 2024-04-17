import { useQuery } from '@tanstack/react-query';
import { useApiClient } from 'shared/hooks';
import { useParams } from 'react-router-dom';

function useSelectedTopics() {
  const { conversationId } = useParams();

  if (!conversationId) {
    throw new Error('Conversation ID is undefined');
  }

  const apiClient = useApiClient();
  const selectedTopics = useQuery({
    queryKey: ['selectedTopics', conversationId],
    queryFn: () => apiClient.getSelectedTopics(conversationId),
  });

  return { selectedTopics };
}

export default useSelectedTopics;
