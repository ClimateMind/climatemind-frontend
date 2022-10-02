import React from 'react';
import { screen, render } from '@testing-library/react';
import { NoConsent } from './UserBNoConsent';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import ROUTES from '../../../components/Router/RouteConfig';
import { QueryClient, QueryClientProvider } from 'react-query';

const mockPush = jest.fn();
const queryClient = new QueryClient();

jest.mock('react-router-dom', () => {
  const originalModule = jest.requireActual('react-router-dom');
  return {
    __esModule: true,
    ...originalModule,
    useHistory: jest.fn(() => ({
      push: mockPush,
    })),
    useLocation: jest.fn(() => ({
      state: { userAName: 'Nick' },
    })),
  };
});

jest.mock('../../../hooks/useUserB', () => ({
  useUserB: () => ({
    conversationId: '8CC3F52E-88E7-4643-A490-519E170DB470',
    isUserBJourney: true,
  }),
}));

describe('<NoConsent Page', () => {
  it('should display the text with the username', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <NoConsent />
        </MemoryRouter>
      </QueryClientProvider>
    );
    const name = screen.getByText(
      /your link from nick won't expire so you can return any time./i
    );
    expect(name).toBeInTheDocument();
  });

  it('should have the button', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <NoConsent />
        </MemoryRouter>
      </QueryClientProvider>
    );

    const button = screen.getByRole('button', { name: /back/i });
    userEvent.click(button);

    expect(button).toBeInTheDocument();
    expect(mockPush).toBeCalledWith({
      pathname: '/shared-impacts/8CC3F52E-88E7-4643-A490-519E170DB470',
      state: { from: undefined, id: '8CC3F52E-88E7-4643-A490-519E170DB470' },
    });
  });
});
