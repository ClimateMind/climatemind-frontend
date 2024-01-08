import { QueryClient, QueryClientProvider } from 'react-query';

// Query client provider to allow useQuery

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 300000, // 5 minutes
    },
  },
});

interface Props {
  children: React.ReactNode;
}

export function QueryProvider({ children }: Props) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

export default QueryProvider;
