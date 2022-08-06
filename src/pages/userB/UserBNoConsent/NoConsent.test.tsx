import React from 'react';
import { screen, render } from '@testing-library/react';
import { NoConsent } from './UserBNoConsent';
import { MemoryRouter, Route } from 'react-router-dom';

jest.mock('react-router-dom', () => {
  // Require the original module to not be mocked...
  const originalModule = jest.requireActual('react-router-dom');

  return {
    __esModule: true,
    ...originalModule,
    useHistory: jest.fn(() => ({
      push: jest.fn(),
    })),
    useLocation: jest.fn(() => ({
      state: { userBName: 'Nick' },
    })),
  };
});

describe('<NoConsent Page', () => {
  it('it should display the text with the username', () => {
    render(
      <MemoryRouter>
        <NoConsent />
      </MemoryRouter>
    );
    const name = screen.getByText(
      /Your link from nick won't expire so you can return any time./i
    );
    expect(name).toBeInTheDocument();
  });
});
