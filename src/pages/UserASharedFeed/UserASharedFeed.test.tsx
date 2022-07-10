import React from 'react';
import { findByText, fireEvent, render } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { QueryClient, QueryClientProvider } from 'react-query';
import UserASharedFeed from './UserASharedFeed';
import '@testing-library/jest-dom/extend-expect';
import sinon from 'sinon';
import * as reactQuery from 'react-query';
import { SHARED_TOPICS_RESPONSE } from '../../mocks/responseBodies/getSharedTopicsResponse';

window.scrollTo = jest.fn();

// window.open = jest.fn();

const queryClient = new QueryClient();

const mockHistoryPush = jest.fn();

const mockHistoryGoBack = jest.fn();

jest.mock('react-query', () => ({
  ...jest.requireActual('react-query'),
  useMutation: () => jest.fn(),
})); 

const sandbox = sinon.createSandbox();
sandbox.stub(reactQuery, 'useQuery').returns({
  data: SHARED_TOPICS_RESPONSE,
  status: 'sucess',
  isLoading: false,
  error: null,
});

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'), // use actual for all non-hook parts
  useParams: () => ({
    conversationId: '66368131-9476-4DFB-9230-DF13D00DD4B9',
  }),
  useRouteMatch: () => ({ url: '/user-a-shared-feed/66368131-9476-4DFB-9230-DF13D00DD4B9' }),
  useHistory: () => ({
    push: mockHistoryPush,
    goBack: mockHistoryGoBack,
  }),
}));




describe('UserASharedFeed page', () => {

  it('shows User A shared feed page', async () => {
    const { getByText } = await render(
      <QueryClientProvider client={queryClient}>
        <UserASharedFeed />
      </QueryClientProvider>
    );
    expect(
       getByText(/Your shared feed with/i)
    ).toBeInTheDocument();
  });

  it('has impact/effect card', async () => {
    const { getByTestId } = await render(
      <QueryClientProvider client={queryClient}>
        <UserASharedFeed />
      </QueryClientProvider>
    );
    expect(getByTestId(`TopicsEffectCard-${SHARED_TOPICS_RESPONSE.climateEffects[0].effectId}-testid`)).toBeInTheDocument();
  });

  it('has mitigation action/solution cards', async () => {
    const { getByTestId } = await render(
      <QueryClientProvider client={queryClient}>
        <UserASharedFeed />
      </QueryClientProvider>
    );
    expect(getByTestId(`TopicsSolutionCard-${SHARED_TOPICS_RESPONSE.climateSolutions[0].solutionId}-testid`)).toBeInTheDocument();
    expect(getByTestId(`TopicsSolutionCard-${SHARED_TOPICS_RESPONSE.climateSolutions[1].solutionId}-testid`)).toBeInTheDocument();
  });

//   it('ConversationId is set', async () => {
//     const { getByText } = render(
//       <QueryClientProvider client={queryClient}>
//         <UserASharedFeed />
//       </QueryClientProvider>
//     );

//     expect(
//       getByText(
//         /Talking about climate change is the most effective way to take action./i
//       )
//     ).toBeInTheDocument();

//     expect(mockedSetIsUserB).toHaveBeenCalledTimes(2);
//     expect(mockedSetIsUserB).toHaveBeenCalledWith(true, '1234');
//   });

//   it('Framing button opens new window', async () => {
//     const { getByTestId } = render(
//       <QueryClientProvider client={queryClient}>
//         <UserASharedFeed />
//       </QueryClientProvider>
//     );

//     await act(async () => {
//       fireEvent.click(getByTestId('framing-button'));
//     });

//     expect(window.open).toHaveBeenCalled();
//     expect(window.open).toHaveBeenCalledWith(
//       'https://theconversation.com/communicating-climate-change-focus-on-the-framing-not-just-the-facts-73028'
//     );
//   });

//   it('Click on Next button changes route/page', () => {
//     const { getByTestId } = render(
//       <QueryClientProvider client={queryClient}>
//         <UserASharedFeed />
//       </QueryClientProvider>
//     );
//     fireEvent.click(getByTestId('how-cm-works-button'));
//     expect(mockHistoryPush).toHaveBeenCalledWith('/how-cm-works');
//   });
});
