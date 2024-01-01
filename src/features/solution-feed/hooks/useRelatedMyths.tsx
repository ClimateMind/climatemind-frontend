import { useEffect, useState } from 'react';

import { ClimateApi } from 'api/ClimateApi';
import { useAuth } from 'hooks/auth/useAuth';
import { useSession } from 'hooks/useSession';
import { GetOneMyth } from 'api/responses';
import { TMyth } from 'types/Myths';

function useRelatedMyths(solutionSpecificMythIRIs: string[]) {
  const { sessionId } = useSession();
  const { accessToken } = useAuth();

  const [isLoading, setIsLoading] = useState(false);
  const [relatedMyths, setRelatedMyths] = useState<TMyth[]>([]);

  useEffect(() => {
    async function fetchRelatedMyths() {
      setIsLoading(true);

      try {
        const promises = solutionSpecificMythIRIs.map(async (mythIRI) => {
          return await new ClimateApi(sessionId, accessToken).getOneMyth(mythIRI);
        });

        const responses = await Promise.all(promises);

        setRelatedMyths(responses.map((response: GetOneMyth) => response.myth));
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
  }, [solutionSpecificMythIRIs, sessionId, accessToken]);

  return { isLoading, relatedMyths };
}

export default useRelatedMyths;
