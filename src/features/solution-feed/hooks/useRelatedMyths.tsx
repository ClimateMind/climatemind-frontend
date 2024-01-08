import { useEffect, useState } from 'react';

import { useAppSelector } from 'store/hooks';
import { useApiClient } from 'shared/hooks';
import { Myth } from 'shared/types';

function useRelatedMyths(solutionSpecificMythIRIs: string[]) {
  const apiClient = useApiClient();
  const { sessionId, user } = useAppSelector(state => state.auth);

  const [isLoading, setIsLoading] = useState(false);
  const [relatedMyths, setRelatedMyths] = useState<Myth[]>([]);

  useEffect(() => {
    async function fetchRelatedMyths() {
      setIsLoading(true);

      try {
        const promises = solutionSpecificMythIRIs.map(async (mythIRI) => {
          return await apiClient.getMyth(mythIRI);
        });

        const responses = await Promise.all(promises);

        setRelatedMyths(responses);
      } catch (error) {
        console.error('Error fetching related myths:', error);
      } finally {
        setIsLoading(false);
      }
    }

    if (solutionSpecificMythIRIs.length === 0) {
      setRelatedMyths([]);
      return;
    }
    
    fetchRelatedMyths();
  }, [solutionSpecificMythIRIs, sessionId, user.accessToken]);

  return { isLoading, relatedMyths };
}

export default useRelatedMyths;
