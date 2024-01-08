import { useQueries } from 'react-query';
import { useApiClient } from 'shared/hooks';

export const useAssociatedMyths = (mythsIris: string[]) => {
  const apiClient = useApiClient();

  const associatedMyths = useQueries(
    mythsIris.map((iri) => {
      return {
        queryKey: ['myth', iri],
        queryFn: () => apiClient.getMyth(iri),
      };
    })
  );
  return associatedMyths;
};
