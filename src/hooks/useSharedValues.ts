import { useQuery } from 'react-query';
import { getAlignment } from '../api/getAlignment';

export function useSharedValues(alignmentScoresId: string) {
  // const { alignmentScoresId } = useAlignment();

  return useQuery(
    ['conversations', alignmentScoresId],
    () => getAlignment(alignmentScoresId),
    {
      staleTime: 1000,
    }
  );
}
