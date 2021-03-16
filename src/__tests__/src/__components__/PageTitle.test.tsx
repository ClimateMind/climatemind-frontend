import React from 'react';
import { render } from '@testing-library/react';
import PageTitle from '../../../components/PageTitle';

describe('Page Title', () => {
  it('It renders children', () => {
    const { getByText } = render(
      <PageTitle>
        <h1>This is a title</h1>
        <p>This is a paragraph</p>
      </PageTitle>
    );
    const title = getByText('This is a title');
    const paragraph = getByText('This is a paragraph');
    expect(title);
    expect(paragraph);
  });
});
