import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import Landing from '../../../pages/userB/Landing';
import { act } from 'react-dom/test-utils';

window.scrollTo = jest.fn();

window.open = jest.fn();

const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'), // use actual for all non-hook parts
  useParams: () => ({
    conversationId: '1234',
  }),
  useRouteMatch: () => ({ url: '/landing/1234' }),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
  useLocation: () => ({
    location: {
      pathname: '/how-cm-works',
    },
  }),
}));

const mockedSetIsUserB = jest.fn();
jest.mock('../../../hooks/useAlignment', () => ({
  useAlignment: () => ({
    setIsUserB: mockedSetIsUserB,
  }),
}));

describe('Landing page', () => {
  //NOTE: this test will fail once we change the static 'Stevie' for actual user names
  it('shows Powering climate conversations', () => {
    const { getByText } = render(<Landing />);
    expect(
      getByText(/You're invited you to take our core values quiz/i)
    ).toBeInTheDocument();
  });

  it('ConversationId is set', async () => {
    const { getByText } = render(<Landing />);

    expect(
      getByText(
        /Talking about climate change is the most effective way to take action./i
      )
    ).toBeInTheDocument();

    expect(mockedSetIsUserB).toHaveBeenCalledTimes(1);
    expect(mockedSetIsUserB).toHaveBeenCalledWith(true, '1234');
  });

  it('Framing button opens new window', async () => {
    const { getByTestId } = render(<Landing />);

    await act(async () => {
      fireEvent.click(getByTestId('framing-button'));
    });

    expect(window.open).toHaveBeenCalled();
    expect(window.open).toHaveBeenCalledWith(
      'https://theconversation.com/communicating-climate-change-focus-on-the-framing-not-just-the-facts-73028'
    );
  });

  it('Click on Next button changes route/page', () => {
    const { getByTestId } = render(<Landing />);
    fireEvent.click(getByTestId('how-cm-works-button'));
    expect(mockHistoryPush).toHaveBeenCalledWith('/how-cm-works');
  });
});
