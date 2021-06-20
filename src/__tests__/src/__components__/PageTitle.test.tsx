import React from 'react';
import { render } from '@testing-library/react';
import PageTitle from '../../../components/PageTitle';

describe('Page Title', () => {
  it('It renders children', () => {
    const { getByText } = render(<PageTitle>This is a title</PageTitle>);
    const title = getByText('This is a title');
    expect(title);
  });
});
