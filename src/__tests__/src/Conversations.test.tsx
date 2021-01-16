import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';

import Conversations from '../../pages/Conversations';

window.scrollTo = jest.fn();
// Mock react router to simulate history.push on button click
const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
  useLocation: () => ({
    location: {
      pathname: '/conversations',
    },
  }),
}));

jest.mock('react-query', () => ({
  ...jest.requireActual('react-query'),
  useMutation: () => jest.fn(),
}));

describe('Conversations page', () => {
  it('it has correct action text', () => {
    const { getByText } = render(<Conversations />);
    expect(getByText(/Coming soon!/i)).toBeInTheDocument();
    expect(
      getByText(
        /Want to be the first to use our revolutionary feature\? Or just want to stay in the loop for important updates\? Drop us your email below./i
      )
    ).toBeInTheDocument();
    expect(getByText(/hello@climatemind.org/i)).toBeInTheDocument();
  });

  it('it has the signup form', () => {
    const { getByTestId } = render(<Conversations />);
    expect(getByTestId('MailChimpSignUp')).toBeInTheDocument();
  });
});
