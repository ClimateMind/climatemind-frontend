import { render } from '@testing-library/react';
import React from 'react';
import { ValueIcon } from './ValueIcon';

describe('Value Icon', () => {
  it('Renders an image', () => {
    const { getByRole } = render(
      <ValueIcon valueId="hedonism" valueName="hedonism" />
    );
    const icon = getByRole('img');
    expect(icon).toBeInTheDocument();
  });

  it('Renders the alt text ', () => {
    const { getByAltText } = render(
      <ValueIcon valueId="hedonism" valueName="hedonism" />
    );
    const icon = getByAltText('hedonism icon');
    expect(icon).toBeInTheDocument();
  });
});
