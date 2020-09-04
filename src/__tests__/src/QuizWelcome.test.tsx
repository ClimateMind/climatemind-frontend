import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import QuizWelcome from '../../pages/MeetGuy';

// Mock react router to simulate history.push on button click
jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: jest.fn(),
  }),
}));

describe('Quiz Welcome', () => {
  it('has a get started button which has be clicked', () => {
    const { getByRole } = render(<QuizWelcome />);
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
    const { getByTestId } = render(<QuizWelcome />);
    expect(getByTestId('climate-mind-logo')).toBeInTheDocument();
  });
  it('shows welcome text ', () => {
    const { getByText } = render(<QuizWelcome />);
    expect(getByText(/find out your Climate Personality/i)).toBeInTheDocument();
  });
});
