import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { getMyths } from '../api/getMyths';

// Query client provider to allow useQuery
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 300000, // 5 minutes
    },
  },
});
queryClient.prefetchQuery('myths', getMyths);
// disable pre-fetch for solutions for now, since we currently cannot access sessionId from here
// queryClient.prefetchQuery(['solutions', sessionId], () => {
//   if (sessionId) {
//     return getSolutions(sessionId);
//   }
// });

const QueryProvider: React.FC = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default QueryProvider;
