import { useQueries } from 'react-query';
import { ClimateApi } from '../api/ClimateApi';
import { useAuth } from './auth/useAuth';
import { useSession } from './useSession';

export const useAssociatedMyths = (mythsIris: string[]) => {
  const { sessionId } = useSession();
  const { accessToken } = useAuth();

  const associatedMyths = useQueries(
    mythsIris.map((iri) => {
      return {
        queryKey: ['myth', iri],
        queryFn: () => new ClimateApi(sessionId, accessToken).getOneMyth(iri),
      };
    })
  );
  return associatedMyths;
};
