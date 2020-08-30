import React from 'react';
import { render } from '@testing-library/react';

import QuizWelcome from '../../pages/QuizWelcome';

describe('Quiz Welcome', () => {
  it('has a get started button', () => {
    const { getByRole } = render(<QuizWelcome />);
    expect(getByRole('button', { name: /let's go/i })).toBeInTheDocument();
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
