import React from 'react';
import {
  render,
  screen,
  fireEvent,
  wait,
  act,
  queryByTestId,
} from '@testing-library/react';
import { StoryBookProviders } from '../../stories/utils/StoryBookProviders';
import { StoryWrapper } from '../StoryWrapper';
import ConversationCard from './ConversationCard';
import userEvent from '@testing-library/user-event';

const mockConversation = {
  alignmentScoresId: '41858A81-2442-4E5A-ADF5-29E9CB784A7F',
  consent: true,
  conversationId: 'C2E719FA-40A3-45BB-B808-8CD5D570B745',
  conversationTimestamp: 'Sat, 30 Jul 2022 20:17:02 GMT',
  state: 0,
  userA: {
    id: '90842AF5-8690-46AE-8C71-2649CCE22AE9',
    name: 'Nick',
    sessionId: '6D79B0E2-FC54-4A2D-A430-03E12E81A125',
  },
  userARating: null,
  userB: {
    name: 'Wilma',
  },
};

describe('Conversation Card', () => {
  it('is collaped by default', () => {
    render(
      <StoryBookProviders>
        <StoryWrapper>
          <ConversationCard conversation={mockConversation} />
        </StoryWrapper>
      </StoryBookProviders>
    );

    expect(screen.getByText(/Invited Wilma to talk/i)).toBeInTheDocument();
    expect(screen.queryByText(/took the values quiz/i)).not.toBeVisible();
    expect(screen.getByRole('button', { name: 'MORE' })).toBeInTheDocument();
  });

  it('can be expanded', () => {
    render(
      <StoryBookProviders>
        <StoryWrapper>
          <ConversationCard conversation={mockConversation} />
        </StoryWrapper>
      </StoryBookProviders>
    );

    const button = screen.getByRole('button', { name: 'MORE' });
    act(() => userEvent.click(button));

    expect(screen.queryByText(/took the values quiz/i)).toBeVisible();
    expect(screen.getByRole('button', { name: 'LESS' })).toBeInTheDocument();
  });

  it('has all the actions on the expanded card', () => {
    render(
      <StoryBookProviders>
        <StoryWrapper>
          <ConversationCard conversation={mockConversation} />
        </StoryWrapper>
      </StoryBookProviders>
    );

    const button = screen.getByRole('button', { name: 'MORE' });
    userEvent.click(button);

    const alignButton = screen.getByRole('button', {
      name: 'SEE HOW YOU ALIGN',
    });

    const topicsButton = screen.getByRole('button', {
      name: 'VIEW SELECTED TOPICS',
    });

    const talkedButton = screen.getByRole('button', {
      name: 'VIEW SELECTED TOPICS',
    });

    const linkCopyButton = screen.getByRole('button', {
      name: /COPY LINK/i,
    });

    expect(screen.getByText(/Wilma took the values quiz/i)).toBeVisible();
    expect(alignButton).toBeInTheDocument();
    expect(alignButton).toBeDisabled();

    expect(
      screen.getByText(/See what you can discuss with Wilma/i)
    ).toBeVisible();
    expect(topicsButton).toBeInTheDocument();
    expect(topicsButton).toBeDisabled();

    expect(
      screen.getByText(/Have you had your conversation with Wilma/i)
    ).toBeVisible();
    expect(talkedButton).toBeInTheDocument();
    expect(talkedButton).toBeDisabled();

    expect(linkCopyButton).toBeInTheDocument();
    expect(linkCopyButton).toBeEnabled();
  });

  it('It has the correct buttons enabled for consented state: 1', () => {
    render(
      <StoryBookProviders>
        <StoryWrapper>
          <ConversationCard conversation={{ ...mockConversation, state: 1 }} />
        </StoryWrapper>
      </StoryBookProviders>
    );

    const button = screen.getByRole('button', { name: 'MORE' });
    act(() => userEvent.click(button));

    const alignButton = screen.getByRole('button', {
      name: 'SEE HOW YOU ALIGN',
    });

    const topicsButton = screen.getByRole('button', {
      name: 'VIEW SELECTED TOPICS',
    });

    const talkedButton = screen.getByRole('button', {
      name: 'YES WE TALKED!',
    });

    expect(alignButton).toBeEnabled();
    expect(topicsButton).toBeDisabled();
    expect(talkedButton).toBeDisabled();
  });

  it('It has the correct buttons enabled for viewed alignment state: 2', () => {
    render(
      <StoryBookProviders>
        <StoryWrapper>
          <ConversationCard conversation={{ ...mockConversation, state: 2 }} />
        </StoryWrapper>
      </StoryBookProviders>
    );

    const button = screen.getByRole('button', { name: 'MORE' });
    act(() => userEvent.click(button));

    const alignButton = screen.getByRole('button', {
      name: 'SEE HOW YOU ALIGN',
    });

    const topicsButton = screen.getByRole('button', {
      name: 'VIEW SELECTED TOPICS',
    });

    const talkedButton = screen.getByRole('button', {
      name: 'YES WE TALKED!',
    });

    expect(alignButton).toBeEnabled();
    expect(topicsButton).toBeEnabled();
    expect(talkedButton).toBeDisabled();
  });

  it('It has the correct buttons enabled for viewed topics state: 3', () => {
    render(
      <StoryBookProviders>
        <StoryWrapper>
          <ConversationCard conversation={{ ...mockConversation, state: 3 }} />
        </StoryWrapper>
      </StoryBookProviders>
    );

    const button = screen.getByRole('button', { name: 'MORE' });
    act(() => userEvent.click(button));

    const alignButton = screen.getByRole('button', {
      name: 'SEE HOW YOU ALIGN',
    });

    const topicsButton = screen.getByRole('button', {
      name: 'VIEW SELECTED TOPICS',
    });

    const talkedButton = screen.getByRole('button', {
      name: 'YES WE TALKED!',
    });

    expect(alignButton).toBeEnabled();
    expect(topicsButton).toBeEnabled();
    expect(talkedButton).toBeEnabled();
  });

  it('It shows the text for conversation completed state: 4', () => {
    render(
      <StoryBookProviders>
        <StoryWrapper>
          <ConversationCard conversation={{ ...mockConversation, state: 4 }} />
        </StoryWrapper>
      </StoryBookProviders>
    );

    const button = screen.getByRole('button', { name: 'MORE' });
    act(() => userEvent.click(button));

    const alignButton = screen.getByRole('button', {
      name: 'SEE HOW YOU ALIGN',
    });

    const topicsButton = screen.getByRole('button', {
      name: 'VIEW SELECTED TOPICS',
    });

    const talkedButton = screen.queryByRole('button', {
      name: 'YES WE TALKED!',
    });

    const ratingButtons = screen.queryAllByTestId('btn-rate-conversation');

    expect(alignButton).toBeEnabled();
    expect(topicsButton).toBeEnabled();
    expect(talkedButton).toBeNull();

    expect(ratingButtons.length).toBe(5);
  });
});
