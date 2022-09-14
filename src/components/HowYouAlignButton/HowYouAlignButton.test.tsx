import { render, screen } from '@testing-library/react';
import React from 'react';
import { MockProviders } from '../MockProviders';
import { HowYouAlignButton } from './HowYouAlignButton';
import { QueryClient, QueryClientProvider } from 'react-query';

const mockConversationId = '08f097e8-68b6-47bc-bbf1-df48b5d9ae0c';
const queryClient = new QueryClient();

describe('HowYouAlignButton', () => {
  it('shows a disabled button when user b is invited', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <MockProviders>
          <HowYouAlignButton
            conversationState={0}
            conversationId={mockConversationId}
          />
        </MockProviders>
      </QueryClientProvider>
    );
    expect(
      screen.getByRole('button', { name: 'SEE HOW YOU ALIGN' })
    ).toBeDisabled();
  });
  it('enables button after the user has consented', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <MockProviders>
          <HowYouAlignButton
            conversationState={1}
            conversationId={mockConversationId}
          />
        </MockProviders>
      </QueryClientProvider>
    );
    expect(
      screen.getByRole('button', { name: 'SEE HOW YOU ALIGN' })
    ).toBeEnabled();
  });
  it('is still enabled in later states', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <MockProviders>
          <HowYouAlignButton
            conversationState={2}
            conversationId={mockConversationId}
          />
        </MockProviders>
      </QueryClientProvider>
    );
    expect(
      screen.getByRole('button', { name: 'SEE HOW YOU ALIGN' })
    ).toBeEnabled();
  });
});
