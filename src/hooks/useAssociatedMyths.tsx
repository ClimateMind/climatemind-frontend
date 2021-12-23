import { useQueries } from 'react-query';
import { getOneMyth } from '../api/getOneMyth';

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
