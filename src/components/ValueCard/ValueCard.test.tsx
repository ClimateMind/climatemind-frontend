import React from 'react';
import { render } from '@testing-library/react';
import { ValueCard } from './ValueCard';

describe('User B Value Card', () => {
  it('Renders the value name and description', () => {
    const { getByText } = render(
      <ValueCard
        valueId="hedonism"
        valueName="hedonism"
        valueDescription="The value descirption"
      />
    );

    expect(getByText(/hedonism/i)).toBeInTheDocument();
  });

  it('hides description by default', () => {
    const { queryByText } = render(
      <ValueCard
        valueId="hedonism"
        valueName="hedonism"
        valueDescription="The value descirption"
      />
    );
    const desc = queryByText(/The value descirption/i);
    expect(desc).not.toBeInTheDocument();
  });
});
