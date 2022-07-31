import React from 'react';
import { render, screen, fireEvent, wait } from '@testing-library/react';
import { ConversationCardActions } from './ConversationCardActions';
import { TConversationState } from '../../types/Conversation';
import { QueryClient, QueryClientProvider } from 'react-query';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import userEvent from '@testing-library/user-event';

const mockQueryClient = new QueryClient();

const mockConversationId = '08f097e8-68b6-47bc-bbf1-df48b5d9ae0c';

describe('Conversation Card Actions', () => {
  it('is collapsed by default', () => {
    render(
      <ConversationCardActions>
        <p>I am the first react child</p>
        <p>I am the second react child</p>
        <p>I am the third react child</p>
      </ConversationCardActions>
    );
    expect(screen.getAllByRole('button', { name: 'LESS' })).toBeInTheDocument();
  });
});
