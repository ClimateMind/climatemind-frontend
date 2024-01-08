import { useQueries } from 'react-query';
import { ClimateApi } from '../api/ClimateApi';
import { useSession } from './useSession';
import { useAppSelector } from 'store/hooks';

export const useAssociatedMyths = (mythsIris: string[]) => {
  const { sessionId } = useSession();
  const { accessToken } = useAppSelector(state => state.auth.user);

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
