import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { MemoryRouter } from 'react-router-dom';
import { AlignmentProvider } from '../../contexts/alignment';
import AuthProvider from '../../contexts/auth';
import { NotificationProvider } from '../../contexts/notifications';
import QueryProvider from '../../contexts/queryClient';
import { QuestionsProvider } from '../../contexts/questions';
import { ResponsesProvider } from '../../contexts/responses';
import { SessionProvider } from '../../contexts/session';

const queryClient = new QueryClient();

export const StoryBookProviders: React.FC = ({ children }) => (
  <MemoryRouter>
    <AuthProvider>
      <NotificationProvider>
        <QueryProvider>
          <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools />
            <SessionProvider>
              <AlignmentProvider>
                <QuestionsProvider>
                  <ResponsesProvider>{children}</ResponsesProvider>
                </QuestionsProvider>
              </AlignmentProvider>
            </SessionProvider>
          </QueryClientProvider>
        </QueryProvider>
      </NotificationProvider>
    </AuthProvider>
  </MemoryRouter>
);
