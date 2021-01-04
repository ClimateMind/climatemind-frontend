import React from 'react';
import { render } from '@testing-library/react';
import MenuPaper from '../../../components/AppBar/MenuPaper';

const mockHistoryPush = jest.fn();
jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

describe('Top Menu Paper', () => {
  it('Contains the menu items, socials and email button', () => {
    const mockIsShowing = jest.fn();
    const { getByText, getByTestId } = render(<MenuPaper isShowing={true} />);

    expect(getByText(/About ClimateMind/i)).toBeInTheDocument();
    expect(getByText(/Scientists Speak Up/i)).toBeInTheDocument();
    expect(getByText(/What's an Ontology/i)).toBeInTheDocument();
    expect(getByTestId('socials')).toBeInTheDocument();
    expect(getByText(/email us/i)).toBeInTheDocument();
  });
});
