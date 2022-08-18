import React from 'react';
import { render } from '@testing-library/react';
import Error500 from '../../pages/Error500';

jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: jest.fn(),
  }),
  useLocation: () => ({
    pathname: jest.fn(),
  }),
}));

describe('Error 500 Page', () => {
  it('It has the message', () => {
    const title = 'It’s broken…';
    const message = 'the page that is, not the Earth';

    const { getByText } = render(<Error500 />);
    expect(getByText(title)).toBeInTheDocument();
    expect(getByText(message)).toBeInTheDocument();
  });

  it('It has the buttons', () => {
    const { getByRole } = render(<Error500 />);
    expect(
      getByRole('button', { name: /go back to previous page/i })
    ).toBeInTheDocument();
    expect(
      getByRole('button', { name: /get help \/ contact us/i })
    ).toBeInTheDocument();
  });
});
