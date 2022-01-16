import React from 'react';
import { ReactQueryDevtools } from 'react-query/devtools';
import { MemoryRouter } from 'react-router-dom';
import { AlignmentContext, TAlignmentContext } from '../../contexts/alignment';
import AuthProvider from '../../contexts/auth';
import { NotificationProvider } from '../../contexts/notifications';
import QueryProvider from '../../contexts/queryClient';
import { SessionProvider } from '../../contexts/session';

// The purpose of this component is to provide mock providers which can be wrapped round a stoybook story. For a alignment a default value has been provided but can also be passed in for insances where a different value is required.

interface Props {
  alignmentMockValues?: TAlignmentContext;
}

const mockAlignment = {
  conversationId: '370d887e-2f2a-4357-9e8c-c01a9ea4e161',
  alignmentId: '58eea207-9dc0-466d-bbfa-c5585eb6411e',
  alignmentScoresId: '5c6229c9-008e-4f0e-b3d4-97c2d54ded34',
  selectedImpacts: [] as string[],
  selectedSolutions: [] as string[],
  isUserB: true,
};

export const MockProviders: React.FC<Props> = ({
  children,
  alignmentMockValues = mockAlignment,
}) => {
  return (
    <>
      <MemoryRouter>
        <AuthProvider>
          <NotificationProvider>
            <QueryProvider>
              <ReactQueryDevtools />
              <SessionProvider>
                <AlignmentContext.Provider value={alignmentMockValues}>
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
