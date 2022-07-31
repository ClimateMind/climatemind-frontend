import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { NotifyIcon } from './NotifyIcon';

describe('<NotifyIcon/> Component', () => {
  it('it renders when the user has consented', () => {
    render(<NotifyIcon state={1} />);
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('it doesnt render in other conversation states', () => {
    const otherStates = [0, 2, 3, 4, 5];

    otherStates.forEach((state) => {
      render(<NotifyIcon state={state} />);
      expect(screen.queryByText('1')).toBeNull();
    });
  });
});
