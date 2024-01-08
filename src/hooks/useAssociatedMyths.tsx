import { useQueries } from 'react-query';
import { ClimateApi } from '../api/ClimateApi';
import { useAppSelector } from 'store/hooks';

export const useAssociatedMyths = (mythsIris: string[]) => {
  const { sessionId, user } = useAppSelector(state => state.auth);

  const associatedMyths = useQueries(
    mythsIris.map((iri) => {
      return {
        queryKey: ['myth', iri],
        queryFn: () => new ClimateApi(sessionId, user.accessToken).getOneMyth(iri),
      };
    })
  );
  return associatedMyths;
};
