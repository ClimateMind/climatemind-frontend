import { useQuery } from '@tanstack/react-query';
import { useApiClient } from 'shared/hooks';

function useSelectedTopics(conversationId: string) {
  const apiClient = useApiClient();

  const selectedTopics = useQuery({
    queryKey: ['selectedTopics', conversationId],
    queryFn: () => apiClient.getSelectedTopics(conversationId),
    enabled: !!conversationId,
  });

  return { selectedTopics };
}

export default useSelectedTopics;
