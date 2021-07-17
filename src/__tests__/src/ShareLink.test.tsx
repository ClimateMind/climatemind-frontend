import React from 'react';
import { fireEvent, render } from '@testing-library/react';

import ShareLink from '../../pages/ShareLink';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';

// Mock react router
jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: jest.fn(),
  }),
}));

const mockedShowToast = jest.fn();
jest.mock('../../hooks/useToast', () => ({
  useToast: () => ({
    showToast: mockedShowToast
  })
}));

describe('Share Link Page', () => {
  it('Has the correct text', () => {
    const inputTitle = 'Add their name';

    const { getByText } = render(<ShareLink />);
    expect(getByText(inputTitle));
  });

  it('Has a Generate Link button disabled by default', () => {
    const {getByRole} = render(<ShareLink />);

    expect(getByRole('button')).toBeDisabled();
  });
  
  it('Enables Generate link when User writes text', async () => {
    const {getByRole, getByLabelText} = render(<ShareLink />);

    await act(()=> userEvent.type(getByLabelText(/name to send to/i), 'Testname') );

    expect(getByRole('button')).toBeEnabled();
  });

  it('Opens dialog when user clicks Generate link', async () => {
    const dialogText = 'Copy Link';
    const {getByRole, getByLabelText, getByText} = render(<ShareLink />);

    await act(()=> userEvent.type(getByLabelText(/name to send to/i), 'Testname') );

    await act(async () => {
      fireEvent.click(getByRole('button'));
    });

    expect(getByText(dialogText));
  });

  it('Shows Toast message when link copied successfully', async () => {
    const {getByRole, getByLabelText, getByTestId} = render(<ShareLink />);

    await act(()=> userEvent.type(getByLabelText(/name to send to/i), 'Testname') );

    await act(async () => {
      fireEvent.click(getByRole('button'));
    });

    await act(async () => {
      fireEvent.click(getByTestId('copy-link-button'));
    });

    expect(mockedShowToast).toHaveBeenCalledTimes(1);
  });
});
