import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import Landing from '../../../pages/userB/Landing';
import { act } from 'react-dom/test-utils';
//import { QueryClient, QueryClientProvider } from 'react-query';
import { SessionContext } from '../../../contexts/session';

window.scrollTo = jest.fn();

window.open = jest.fn();

//const queryClient = new QueryClient();

const mockSession = {
  sessionId: '4567',
  quizId: '1234',
  zipCode: null,
  hasAcceptedCookies: true,
  setHasAcceptedCookies: () => {},
};

const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'), // use actual for all non-hook parts
  useParams: () => ({
    conversationId: '1234',
  }),
  useRouteMatch: () => ({ url: '/landing/1234' }),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
  useLocation: () => ({
    location: {
      pathname: '/how-cm-works',
    },
  }),
}));

const mockedSetIsUserB = jest.fn();
jest.mock('../../../hooks/useAlignment', () => ({
  useAlignment: () => ({
    setIsUserB: mockedSetIsUserB,
  }),
}));

jest.mock('../../../hooks/auth/useAuth', () => ({
  useAuth: () => ({
    isLoggedIn: false,
    logout: () => null,
  }),
}));

jest.mock('../../../hooks/useGetOneConversation', () => ({
  useGetOneConversation: (id: string) => {
    return {
      isError: false,
      isLoading: false,
      conversation: {
        consent: false,
        conversationId: '8CC3F52E-88E7-4643-A490-519E170DB470',
        conversationStatus: 0,
        conversationTimestamp: 'Sun, 16 Jan 2022 17:39:10 GMT',
        userA: {
          id: 'BC48D45A-E542-4E22-B1BC-7F48BFBADE5E',
          name: 'Nick',
          sessionId: '353DCA14-CC15-4500-9C79-3855BF3C7D7D',
        },
        userB: {
          name: 'Bill',
        },
      },
      error: false,
    };
  },
}));

describe('Landing page', () => {
  //NOTE: this test will fail once we change the static 'Stevie' for actual user names
  it('shows Powering climate conversations', () => {
    const { getByText } = render(
      <SessionContext.Provider value={mockSession}>
        <Landing />
      </SessionContext.Provider>
    );
    expect(
      getByText(/Nick invited you to take our core values quiz!/i)
    ).toBeInTheDocument();
  });

  it('ConversationId is set', async () => {
    const { getByText } = render(
      <SessionContext.Provider value={mockSession}>
        <Landing />
      </SessionContext.Provider>
    );

    expect(
      getByText(
        /Talking about climate change is the most effective way to take action./i
      )
    ).toBeInTheDocument();
  });

  it('Framing button opens new window', async () => {
    const { getByTestId } = render(
      <SessionContext.Provider value={mockSession}>
        <Landing />
      </SessionContext.Provider>
    );

    await act(async () => {
      fireEvent.click(getByTestId('framing-button'));
    });

    expect(window.open).toHaveBeenCalled();
    expect(window.open).toHaveBeenCalledWith(
      'https://theconversation.com/communicating-climate-change-focus-on-the-framing-not-just-the-facts-73028'
    );
  });

  it('Click on Next button changes route/page', () => {
    const { getByTestId } = render(
      <SessionContext.Provider value={mockSession}>
        <Landing />
      </SessionContext.Provider>
    );
    fireEvent.click(getByTestId('how-cm-works-button'));
    expect(mockHistoryPush).toHaveBeenCalledWith('/how-cm-works');
  });
});
