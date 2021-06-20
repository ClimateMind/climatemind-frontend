import React from 'react';
import { render } from '@testing-library/react';
import SourcesList from '../../../components/SourcesList';

const dummySources = [
  'http://www.climatemind.org',
  'https://scientistsspeakup.org/',
  'https://www.stanford.edu/',
];

describe('The sources list', () => {
  it('Contains all the links', () => {
    const { getByText } = render(<SourcesList sources={dummySources} />);
    dummySources.forEach((source) => {
      expect(getByText(source)).toBeInTheDocument();
    });
  });
  it('Displays a message when there are no sources', () => {
    const { getByText } = render(<SourcesList sources={[]} />);
    expect(getByText(/No sources to display/i)).toBeInTheDocument();
  });
});
