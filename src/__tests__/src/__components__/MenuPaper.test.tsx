import React from 'react';
import { render } from '@testing-library/react';
import MenuPaper from '../../../components/AppBar/MenuPaper';

describe('Top Menu Paper', () => {
  const { getByText, getByTestId } = render(<MenuPaper isShowing={true} />);

  it('Contains the menu items, socials and email button', () => {
    expect(getByText(/About ClimateMind/i)).toBeInTheDocument();
    expect(getByText(/Scientists Speak Up/i)).toBeInTheDocument();
    expect(getByText(/What's an Ontology/i)).toBeInTheDocument();
    expect(getByTestId('socials')).toBeInTheDocument();
    expect(getByText(/email us/i)).toBeInTheDocument();
  });
});
