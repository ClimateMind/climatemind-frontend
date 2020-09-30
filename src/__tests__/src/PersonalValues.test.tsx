import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import PersonalValues from '../../pages/PersonalValues';

// Mock react router to simulate history.push on button click
jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: jest.fn(),
  }),
}));

describe('Climate Personality', () => {
  // TODO - It has the correct number of cards

  it('it has the call to action', () => {
    const { getByText } = render(<PersonalValues />);
    expect(
      getByText(/Ready to see how you can take action against climate change?/i)
    ).toBeInTheDocument();
  });
  it('has the button', () => {
    const { getByText } = render(<PersonalValues />);
    expect(getByText(/yes i’m ready!/i)).toBeInTheDocument();
  });
});
