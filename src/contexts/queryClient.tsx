import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

// Query client provider to allow useQuery
const queryClient = new QueryClient();

const QueryProvider: React.FC = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default QueryProvider;
