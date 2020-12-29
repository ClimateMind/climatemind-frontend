import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';
import ActionTabbedContent from '../../../components/ActionTabbedContent';

const dummyAction = {
  solutionTitle: 'Title',
  shortDescription: 'Short Description',
  longDescription: 'Long Description',
  imageUrl: 'https://www.google.com',
};

describe('It render the short and long desc', () => {
  it('It displays the short and long desc ', () => {
    const { getByText } = render(<ActionTabbedContent action={dummyAction} />);
    expect(getByText(dummyAction.shortDescription)).toBeInTheDocument();
    expect(getByText(dummyAction.longDescription)).toBeInTheDocument();
  });

  it('It can change to the sources tab ', async () => {
    const { getByText } = render(<ActionTabbedContent action={dummyAction} />);
    const button = getByText(/sources/i);
    fireEvent.click(button);
    await wait(() => {
      expect(getByText(/No Sources Yet/i)).toBeInTheDocument();
    });
  });
});
