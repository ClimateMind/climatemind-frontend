import { useQuery } from 'react-query';
import { getAlignment } from '../api/getAlignment';
import { useAlignment } from './useAlignment';

export function useSharedValues() {
  const { alignmentScoresId } = useAlignment();

  return useQuery(
    ['conversations', alignmentScoresId],
    () => getAlignment(alignmentScoresId),
    {
      staleTime: 1000,
    }
  );
}
