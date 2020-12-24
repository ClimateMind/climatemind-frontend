import React from 'react';
import { render } from '@testing-library/react';
import MythCard from '../../../components/MythCard';

const myth = {
  id: '1',
  myth: 'Global warming stopped in 1998.',
  fact:
    'Our planet has continued to build up heat since 1998 - global warming is still happening',
};

describe('It shows the myth details', () => {
  it('Back button renders', () => {
    const { getByText } = render(<MythCard myth={myth} />);
    expect(getByText(/Global warming stopped in 1998./i)).toBeInTheDocument();
    expect(
      getByText(
        /Our planet has continued to build up heat since 1998 - global warming is still happening/i
      )
    ).toBeInTheDocument();
  });
});
