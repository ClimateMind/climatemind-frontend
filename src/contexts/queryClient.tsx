import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { getMyths } from '../api/getMyths';
import { getSolutions } from '../api/getSolutions';

// Query client provider to allow useQuery
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 300000, // 5 minutes
    },
  },
});
queryClient.prefetchQuery('myths', getMyths);
queryClient.prefetchQuery('solutions', getSolutions);

const QueryProvider: React.FC = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default QueryProvider;
