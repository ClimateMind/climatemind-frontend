import React from 'react';
import { screen, render } from '@testing-library/react';
import { ConversationCardUserBName } from './ConversationCardUserBName';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from 'react-query';

const mockQueryClient = new QueryClient();
const mockUpdateConversation = jest.fn();

jest.mock('../../hooks/useUpdateConversation', () => {
  return {
    __esModule: true,
    useUpdateConversation: jest.fn(() => ({
      updateConversation: mockUpdateConversation,
    })),
  };
});

describe('<ConversationCardUserBName/> Component', () => {
  it('should render and display the correct user name', () => {
    render(
      <QueryClientProvider client={mockQueryClient}>
        <ConversationCardUserBName
          conversationId="39859830-1c40-4b55-8176-0091be223f5c"
          invitedUserName="Nick"
          isEditable={true}
        />
      </QueryClientProvider>
    );

    expect(screen.getByText(/nick/i)).toBeInTheDocument();
  });

  it('does not show the edit button when the card is collapsed', () => {
    render(
      <QueryClientProvider client={mockQueryClient}>
        <ConversationCardUserBName
          conversationId="39859830-1c40-4b55-8176-0091be223f5c"
          invitedUserName="Nick"
          isEditable={false}
        />
      </QueryClientProvider>
    );

    const editButton = screen.queryByLabelText(/edit name/i);
    expect(editButton).toBeNull();
  });

  it('allows the user to edit the name', async () => {
    render(
      <QueryClientProvider client={mockQueryClient}>
        <ConversationCardUserBName
          conversationId="39859830-1c40-4b55-8176-0091be223f5c"
          invitedUserName="Nick"
          isEditable={true}
        />
      </QueryClientProvider>
    );

    const editButton = screen.getByLabelText(/edit name/i);
    userEvent.click(editButton);
    const textField = screen.getByRole('textbox');
    expect(textField).toBeInTheDocument();
  });

  it('allows the user update the name', async () => {
    render(
      <QueryClientProvider client={mockQueryClient}>
        <ConversationCardUserBName
          conversationId="39859830-1c40-4b55-8176-0091be223f5c"
          invitedUserName="Nick"
          isEditable={true}
        />
      </QueryClientProvider>
    );

    const editButton = screen.getByLabelText(/edit name/i);
    userEvent.click(editButton);
    const textField = await screen.findByRole('textbox');
    userEvent.type(textField, 'Samuel');
    const updateButton = screen.getByLabelText(/update name/i);
    userEvent.click(updateButton);
    expect(mockUpdateConversation).toBeCalledWith({ receiverName: 'Samuel' });
  });
});
