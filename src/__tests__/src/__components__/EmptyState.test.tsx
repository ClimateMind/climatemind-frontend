import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import EmptyState from '../../../components/EmptyState';

const message = 'There was an error';

describe('Empty State', () => {
  it('Contains the message', () => {
    const { getByText } = render(<EmptyState message={message} />);
    expect(getByText(message)).toBeInTheDocument();
  });
});
