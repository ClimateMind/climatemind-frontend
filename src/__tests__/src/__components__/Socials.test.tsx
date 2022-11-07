import React from 'react';
import { render } from '@testing-library/react';
import Socials from '../../../components/AppBar/Socials';

describe('Socials Grid', () => {
  it('Contains all the icons', () => {
    const { getByLabelText } = render(<Socials />);
    expect(getByLabelText(/facebook/i)).toBeInTheDocument();
    expect(getByLabelText(/instagram/i)).toBeInTheDocument();
    expect(getByLabelText(/linkedin/i)).toBeInTheDocument();
    expect(getByLabelText(/github/i)).toBeInTheDocument();
    // expect(getByLabelText(/youtube/i)).toBeInTheDocument();
    expect(getByLabelText(/twitter/i)).toBeInTheDocument();
    expect(getByLabelText(/telegram/i)).toBeInTheDocument();
  });
});
