import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';
import CardOverlay from '../../../components/MythOverlay';

const dummyAction = {
  solutionTitle: 'Title',
  shortDescription: 'Short Description',
  longDescription: 'Long Description',
  imageUrl: 'https://www.google.com',
};

describe('The Button is visible', () => {
  it('Overlay can be show  ', () => {
    const { getByText } = render(
      <CardOverlay shortDescription={dummyAction.shortDescription} />
    );
    expect(getByText(/learn more/i)).toBeInTheDocument();
  });

  it('The button is visible ', async () => {
    const { getByText } = render(
      <CardOverlay shortDescription={dummyAction.shortDescription}>
        <p>It Renders Childred</p>
      </CardOverlay>
    );
    const button = getByText(/learn more/i);
    fireEvent.click(button);
    await wait(() => {
      expect(getByText(/Short Description/i)).toBeInTheDocument();
      expect(getByText(/It Renders Childred/i)).toBeInTheDocument();
    });
  });
});
