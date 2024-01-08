
import { useQuery } from '@tanstack/react-query';
import { useApiClient } from 'shared/hooks';

function useMythsFeed() {
  const apiClient = useApiClient();

  const mythsFeed = useQuery({
    queryKey: ['mythsFeed'],
    queryFn: apiClient.getMythsFeed,
  });

  return { mythsFeed };
}

export default useMythsFeed;
