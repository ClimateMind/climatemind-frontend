import React from 'react';
import { render, screen } from '@testing-library/react';
import { FooterAppBar } from './FooterAppBar';

describe('Footer App Bar', () => {
  it('renders the childred', () => {
    render(
      <FooterAppBar>
        <button>Click</button>
      </FooterAppBar>
    );
    expect(screen.getByRole('button', { name: 'Click' })).toBeInTheDocument();
  });
});
