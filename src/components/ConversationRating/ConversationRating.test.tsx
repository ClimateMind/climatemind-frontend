import { render, screen } from '@testing-library/react';
import React from 'react';
import { ConversationRating } from './ConversationRating';

describe('Conversation Rating Component', () => {
  it('It shows all the rating buttons', () => {
    render(
      <ConversationRating
        conversationRating={null}
        conversationState={4}
        conversationId="1234"
      />
    );
    const buttons = screen.queryAllByRole('button');
    expect(buttons.length).toBe(5);
  });
});
