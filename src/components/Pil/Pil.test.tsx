import React from 'react';
import { render, screen } from '@testing-library/react';
import { Pil } from './Pil';

describe('Pil component', () => {
  it('it has the correct text ', () => {
    render(<Pil text="Hello" />);
    expect(screen.getByText(/hello/)).toBeInTheDocument();
  });
});
