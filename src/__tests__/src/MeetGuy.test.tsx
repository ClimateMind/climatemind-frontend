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
    expect(getByText(/find out your Climate Personality/i)).toBeInTheDocument();
  });
  it('Matches the snapshot', () => {
    const { getByTestId } = render(<MeetGuy />);
    expect(getByTestId('MeetGuy')).toMatchSnapshot();
  });
});
