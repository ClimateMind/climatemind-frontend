import { useQuery } from '@tanstack/react-query';
import { useApiClient } from 'shared/hooks';

function useClimateFeed() {
  const apiClient = useApiClient();

  const climateFeed = useQuery({
    queryKey: ['climateFeed'],
    queryFn: apiClient.getClimateFeed,
  });

  return { climateFeed };
}

export default useClimateFeed;
