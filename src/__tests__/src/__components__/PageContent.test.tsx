import React from 'react';
import { render } from '@testing-library/react';
import PageContent from '../../../components/PageSection';

describe('Page Content', () => {
  it('It renders children', () => {
    const { getByText } = render(
      <PageContent>
        <h1>This is a title</h1>
        <p>This is a paragraph</p>
      </PageContent>
    );
    const title = getByText('This is a title');
    const paragraph = getByText('This is a paragraph');
    expect(title);
    expect(paragraph);
  });
});
