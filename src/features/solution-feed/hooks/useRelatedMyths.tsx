import { useEffect, useState } from 'react';

import { useApiClient } from 'shared/hooks';
import { Myth } from 'shared/types';

function useRelatedMyths(solutionSpecificMythIRIs: string[]) {
  const apiClient = useApiClient();

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
  }, [solutionSpecificMythIRIs]);

  return { isLoading, relatedMyths };
}

export default useRelatedMyths;
