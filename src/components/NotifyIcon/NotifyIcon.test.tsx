import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { NotifyIcon } from './NotifyIcon';

describe('<NotifyIcon/> Component', () => {
  it('it renders', () => {
    render(<NotifyIcon />);
    expect(screen.getByText('1')).toBeInTheDocument();
  });
});
