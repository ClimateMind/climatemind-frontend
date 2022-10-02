import { render, screen } from '@testing-library/react';
import React from 'react';
import { MockProviders } from '../MockProviders';
import { HowYouAlignButton } from './HowYouAlignButton';
import { QueryClient, QueryClientProvider } from 'react-query';

const mockConversationId = '08f097e8-68b6-47bc-bbf1-df48b5d9ae0c';

jest.mock('../../hooks/auth/useRefresh', () => ({
  useRefresh: () => ({
    postRefresh: jest.fn().mockResolvedValue({
      access_token:
        'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6dHJ1ZSwiaWF0IjoxNjIxMDc2NDA1LCJqdGkiOiJiMDMzNzFlNC1jODgzLTQ2MTAtOTA1Zi05NTA1YTBiOTVjYjAiLCJuYmYiOjE2MjEwNzY0MDUsInR5cGUiOiJhY2Nlc3MiLCJzdWIiOiI4RjEyMTIwMS0wNEZGLTRENTUtOERCNy1CQkNBQjE1QzRDQzIiLCJleHAiOjE2MjExNjI4MDV9.co-anCPDpuGK-A0_iu5nzAY52L6MxL7zTESOfW-UbyA',
      message: 'Successfully created user',
      user: {
        email: 'test233e3@example.com',
        first_name: 'Test',
        last_name: 'User ',
        session_id: '58627AD1-4252-4EAB-9892-7529291C7AC7',
        user_uuid: '8F121201-04FF-4D55-8DB7-BBCAB15C4CC2',
        quiz_id: 'c28efe02-e31f-4381-adb8-7f7b05edb25f',
      },
    }),
    isSuccess: true,
    isLoading: false,
    isError: false,
    error: false,
  }),
}));

describe('HowYouAlignButton', () => {
  it('shows a disabled button when user b is invited', () => {
    render(
      <MockProviders>
        <HowYouAlignButton
          conversationState={0}
          conversationId={mockConversationId}
        />
      </MockProviders>
    );
    expect(
      screen.getByRole('button', { name: 'SEE HOW YOU ALIGN' })
    ).toBeDisabled();
  });
  it('enables button after the user has consented', () => {
    render(
      <MockProviders>
        <HowYouAlignButton
          conversationState={1}
          conversationId={mockConversationId}
        />
      </MockProviders>
    );
    expect(
      screen.getByRole('button', { name: 'SEE HOW YOU ALIGN' })
    ).toBeEnabled();
  });

  it('is still enabled in later states', () => {
    render(
      <MockProviders>
        <HowYouAlignButton
          conversationState={2}
          conversationId={mockConversationId}
        />
      </MockProviders>
    );
    expect(
      screen.getByRole('button', { name: 'SEE HOW YOU ALIGN' })
    ).toBeEnabled();
  });
});
