import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';
import AppBar from '../../../components/AppBar/AppBar';

describe('AppBar', () => {
  it('Contains the title and menu ', () => {
    const { getByText, getByRole } = render(<AppBar />);
    expect(getByText(/climate mind/i)).toBeInTheDocument();
    expect(getByRole('button')).toBeInTheDocument();
  });
  it('The menu can open', () => {
    const { getByTestId, getByRole, debug } = render(<AppBar />);
    const button = getByRole('button');
    fireEvent.click(button);
    wait(() => expect(getByTestId('TopMenuPaper')).toBeInTheDocument());
  });
});
