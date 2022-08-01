import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { NotifyIcon } from './NotifyIcon';

describe('<NotifyIcon/> Component', () => {
  afterEach(cleanup);

  it('it renders when the user has consented', () => {
    const showsInStates = [1, 2, 3, 4];

    showsInStates.forEach((state) => {
      render(<NotifyIcon state={state} />);
      console.log({ state });
      expect(screen.getByTestId(`NotifyIcon-${state}`)).toBeInTheDocument();
    });
  });

  it('it doesnt render in other conversation states', () => {
    const doesNotShowInStates = [0, 5];

    doesNotShowInStates.forEach((state) => {
      render(<NotifyIcon state={state} />);
      expect(screen.queryByText('1')).toBeNull();
    });
  });
});
