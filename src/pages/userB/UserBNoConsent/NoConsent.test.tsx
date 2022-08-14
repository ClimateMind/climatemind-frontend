import React from 'react';
import { screen, render } from '@testing-library/react';
import { NoConsent } from './UserBNoConsent';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import ROUTES from '../../../components/Router/RouteConfig';

const mockPush = jest.fn();

jest.mock('react-router-dom', () => {
  const originalModule = jest.requireActual('react-router-dom');
  return {
    __esModule: true,
    ...originalModule,
    useHistory: jest.fn(() => ({
      push: mockPush,
    })),
    useLocation: jest.fn(() => ({
      state: { userAName: 'Nick' },
    })),
  };
});

describe('<NoConsent Page', () => {
  it('should display the text with the username', () => {
    render(
      <MemoryRouter>
        <NoConsent />
      </MemoryRouter>
    );
    const name = screen.getByText(
      /your link from nick won't expire so you can return any time./i
    );
    expect(name).toBeInTheDocument();
  });

  it('should have the button', () => {
    render(
      <MemoryRouter>
        <NoConsent />
      </MemoryRouter>
    );

    const button = screen.getByRole('button', { name: /back to impacts/i });
    userEvent.click(button);

    expect(button).toBeInTheDocument();
    expect(mockPush).toBeCalledWith(ROUTES.USERB_SHARED_IMPACTS);
  });
});
