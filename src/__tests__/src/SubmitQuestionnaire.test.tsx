import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import SubmitQuestionnaire from '../../pages/SubmitQuestionnaire';

// Mock react router to simulate history.push on button click
jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: jest.fn(),
  }),
}));

describe('Quiz Welcome', () => {
  it('has a get started button', () => {
    const { getByRole } = render(<SubmitQuestionnaire />);
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
    const { getByTestId } = render(<SubmitQuestionnaire />);
    expect(getByTestId('climate-mind-logo')).toBeInTheDocument();
  });
  it('the correct text shows', () => {
    const welcomeText = 'Woohoo! Good Job!';
    const climatePersonalityExp =
      'With the questions you just answered I can predict your Climate Personality.';
    const topThree =
      'This is a ranking of the top three personal values that you deploy when making decisions.';
    const { getByText } = render(<SubmitQuestionnaire />);

    expect(getByText(welcomeText)).toBeInTheDocument();
    expect(getByText(climatePersonalityExp)).toBeInTheDocument();
    expect(getByText(topThree)).toBeInTheDocument();
  });
  it('works', () => {
    expect(true).toBe(true);
  });
});
