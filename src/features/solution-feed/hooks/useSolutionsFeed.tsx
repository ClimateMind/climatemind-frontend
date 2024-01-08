
import { useQuery } from '@tanstack/react-query';
import { useApiClient } from 'shared/hooks';

function useSolutionsFeed() {
  const apiClient = useApiClient();

  const solutionsFeed = useQuery({
    queryKey: ['solutionsFeed'],
    queryFn: apiClient.getSolutionsFeed,
  });

  return { solutionsFeed };
}

export default useSolutionsFeed;
