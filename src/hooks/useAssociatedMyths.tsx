import { useQueries } from 'react-query';
import { getOneMyth } from '../api/getOneMyth';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useAssociatedMyths = (mythsIris: string[]) => {
  const associatedMyths = useQueries(
    mythsIris.map((iri) => {
      return {
        queryKey: ['myth', iri],
        queryFn: () => getOneMyth(iri),
      };
    })
  );
  return associatedMyths;
};
