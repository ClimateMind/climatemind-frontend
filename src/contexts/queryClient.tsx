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
  // const { sessionId } = useSession();
  // const { accessToken } = useAuth();

  // useEffect(() => {
  //   // Prefetch myths
  //   queryClient.prefetchQuery('myths', new ClimateApi(sessionId, accessToken).getMyths);

  //   // Prefetch solutions when we have sessionId
  //   queryClient.prefetchQuery(['solutions', sessionId], () => {
  //     if (sessionId) {
  //       return new ClimateApi(sessionId, accessToken).getSolutions(sessionId);
  //     }
  //   });

  //   // Prefetch feed when we have sessionId
  //   queryClient.prefetchQuery(['feed', sessionId], () => {
  //     if (sessionId) {
  //       return new ClimateApi(sessionId, accessToken).getFeed(sessionId);
  //     }
  //   });
  // }, [sessionId]);
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

export default QueryProvider;
