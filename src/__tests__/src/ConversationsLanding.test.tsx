import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';
// import * as hooks from '../../hooks/auth/useAuth';
// import useAuth from '../../hooks/auth/useAuth';
import ConversationsLanding from '../../pages/ConversationsLanding';

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

// jest.mock('useAuth', () => ({
//   useAuth: () => true
// }));

const mockConfig = {
  isLoggedIn: true
};

jest.mock('../../hooks/auth/useAuth', () => ({
  useAuth: () => mockConfig
}));

describe('ConversationsLanding page', () => {
  it('it has correct action text', () => {
    const { getByText } = render(<ConversationsLanding />);
    expect(getByText(/How to talk about Climate Change…/i)).toBeInTheDocument();
    expect(
      getByText(
        /Talking about climate change is the most effective way to take action./i
      )
    ).toBeInTheDocument();
    expect(getByText(/Step 1: Bond/i)).toBeInTheDocument();
  });

  it('it has Start talking button', () => {
    const { getByTestId } = render(<ConversationsLanding />);
    expect(getByTestId('start-talking-with-people-button')).toBeInTheDocument();
  });
});