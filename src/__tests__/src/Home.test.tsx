import React from 'react';
import { render } from '@testing-library/react';
import Home from '../../pages/Home';
window.scrollTo = jest.fn();

// Mock react router
jest.mock('react-router-dom', () => {
  return {
    useHistory: () => ({
      push: jest.fn(),
    }),
  };
});

describe('Home page', () => {
  it('has a get started button', () => {
    const { getByRole } = render(<Home />);
    expect(getByRole('button', { name: /get started/i })).toBeInTheDocument();
  });
  it('displays the app logo', () => {
    const { getByTestId } = render(<Home />);
    expect(getByTestId('climate-mind-logo')).toBeInTheDocument();
  });
  it('shows Powering climate conversations', () => {
    const { getByText } = render(<Home />);
    expect(getByText(/Powering climate conversations/i)).toBeInTheDocument();
  });
  it('shows Powering Climate Conversations Heading', () => {
    const { getByText } = render(<Home />);
    expect(getByText(/Powering climate conversations/i)).toBeInTheDocument();
  });
  it('shows What is Climate Mind Setting', () => {
    const { getByText } = render(<Home />);
    expect(getByText(/What is Climate Mind/i)).toBeInTheDocument();
  });
});
