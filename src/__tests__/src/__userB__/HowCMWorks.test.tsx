import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import HowCMWorks from '../../../pages/userB/HowCMWorks';
import { act } from 'react-dom/test-utils';

window.scrollTo = jest.fn();

window.open = jest.fn();

const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'), // use actual for all non-hook parts
  useHistory: () => ({
    push: mockHistoryPush,
  }),
  useLocation: () => ({
    location: {
      pathname: '/questionnarie/123456',
      state: {
        from: undefined,
        id: '1234',
      },
    },
  }),
}));

// const mockedSetConversationId = jest.fn();
//   jest.mock('../../../hooks/useAlignment', () =>({
//     useAlignment: () => ({
//       conversationId: '123456',
//     }),
//   }));

describe('Landing page', () => {
  it('Shows correct page title', () => {
    const { getByText } = render(<HowCMWorks />);
    expect(getByText(/How does Climate Mind work/i)).toBeInTheDocument();
  });

  it('Further reading button opens new window', async () => {
    const { getByTestId } = render(<HowCMWorks />);

    await act(async () => {
      fireEvent.click(getByTestId('learn-more-button'));
    });

    expect(window.open).toHaveBeenCalled();
    expect(window.open).toHaveBeenCalledWith(
      'https://en.wikipedia.org/wiki/Theory_of_Basic_Human_Values'
    );
  });

  it('Click on Take Quis button changes route/page', () => {
    const { getByTestId } = render(<HowCMWorks />);
    // fireEvent.click(getByTestId('take-quiz-userb-button'));
    // expect(mockHistoryPush).toHaveBeenCalledWith('/questionarie/123456');
  });
});
