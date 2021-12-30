import React from 'react';
import { ReactQueryDevtools } from 'react-query/devtools';
import { MemoryRouter } from 'react-router-dom';
import AuthProvider from '../../contexts/auth';
import { NotificationProvider } from '../../contexts/notifications';
import QueryProvider from '../../contexts/queryClient';
import { SessionProvider } from '../../contexts/session';
import { AlignmentContext } from '../../contexts/alignment';

const mockAlignment = {
  conversationId: '370d887e-2f2a-4357-9e8c-c01a9ea4e161',
  alignmentId: '5c6229c9-008e-4f0e-b3d4-97c2d54ded34',
  selectedImpacts: [] as string[],
  selectedSolutions: [] as string[],
  isUserB: true,
};

export const MockProviders: React.FC = ({ children }) => {
  return (
    <>
      <MemoryRouter>
        <AuthProvider>
          <NotificationProvider>
            <QueryProvider>
              <ReactQueryDevtools />
              <SessionProvider>
                <AlignmentContext.Provider value={mockAlignment}>
                  {children}
                </AlignmentContext.Provider>
              </SessionProvider>
            </QueryProvider>
          </NotificationProvider>
        </AuthProvider>
      </MemoryRouter>
    </>
  );
};
