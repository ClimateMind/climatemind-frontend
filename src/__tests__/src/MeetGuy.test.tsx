import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import MeetGuy from '../../pages/MeetGuy';

// Mock react router to simulate history.push on button click
jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: jest.fn(),
  }),
}));

describe('Quiz Welcome', () => {
  it('has a get started button which has be clicked', () => {
    const { getByRole } = render(<MeetGuy />);
    expect(getByRole('button'));
    fireEvent(
      getByRole('button'),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      })
    );
  });

  it('displays the app logo', () => {
    const { getByTestId } = render(<MeetGuy />);
    expect(getByTestId('climate-mind-logo')).toBeInTheDocument();
  });
  it('shows welcome text ', () => {
    const { getByText } = render(<MeetGuy />);
    expect(
      getByText(
        /I’ll help you uncover your personal values to understand what you care about most. Then we'll explore how climate change is affecting your core values and the attractive solutions available to address it/i
      )
    ).toBeInTheDocument();
  });
});
