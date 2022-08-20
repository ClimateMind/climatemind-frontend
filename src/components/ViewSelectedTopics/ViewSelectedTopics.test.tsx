import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ViewSelectedTopics } from './ViewSelectedTopics';
import { QueryClient, QueryClientProvider } from 'react-query';

const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
  useLocation: () => ({
    location: {
      pathname: '/user-a-shared-feed/08f097e8-68b6-47bc-bbf1-df48b5d9ae0c',
      search: '',
      hash: '',
      state: null,
      key: '5nvxpbdafa',
    },
  }),
}));

const mockQueryClient = new QueryClient();

const mockConversationId = '08f097e8-68b6-47bc-bbf1-df48b5d9ae0c';

describe('CompeteConversation Component', () => {
  it('shows a disabled button when user b is invited', () => {
    render(
      <QueryClientProvider client={mockQueryClient}>
        <ViewSelectedTopics
          conversationState={0}
          conversationId={mockConversationId}
        />
      </QueryClientProvider>
    );
    expect(
      screen.getByRole('button', { name: 'VIEW SELECTED TOPICS' })
    ).toBeDisabled();
  });

  it('shows a disabled button when user b has consented', () => {
    render(
      <QueryClientProvider client={mockQueryClient}>
        <ViewSelectedTopics
          conversationState={1}
          conversationId={mockConversationId}
        />
      </QueryClientProvider>
    );
    expect(
      screen.getByRole('button', { name: 'VIEW SELECTED TOPICS' })
    ).toBeInTheDocument();
  });

  it('enables the button when user b has viewed the alignment', () => {
    render(
      <QueryClientProvider client={mockQueryClient}>
        <ViewSelectedTopics
          conversationState={2}
          conversationId={mockConversationId}
        />
      </QueryClientProvider>
    );
    expect(screen.getByRole('button', { name: 'VIEW SELECTED TOPICS' }));
  });

  it('Click on VIEW SELECTED TOPICS button changes route/page', () => {
    const { getByTestId } = render(
      <QueryClientProvider client={mockQueryClient}>
        <ViewSelectedTopics
          conversationState={2}
          conversationId={mockConversationId}
        />
      </QueryClientProvider>
    );
    fireEvent.click(
      screen.getByRole('button', { name: 'VIEW SELECTED TOPICS' })
    );
    expect(mockHistoryPush).toHaveBeenCalledWith({
      pathname: '/user-a-shared-feed/08f097e8-68b6-47bc-bbf1-df48b5d9ae0c',
      state: { from: '/sharelink', id: '08f097e8-68b6-47bc-bbf1-df48b5d9ae0c' },
    });
  });
});
