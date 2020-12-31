import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';
import CardOverlay from '../../../components/CardOverlay';

const dummyAction = {
  solutionTitle: 'Title',
  shortDescription: 'Short Description',
  longDescription: 'Long Description',
  imageUrl: 'https://www.google.com',
};

describe('The Card Overlay', () => {
  it('The button is visible  ', () => {
    const { getByText } = render(<CardOverlay />);
    expect(getByText(/learn more/i)).toBeInTheDocument();
  });

  it('Open button text can be specified  ', () => {
    const { getByText } = render(<CardOverlay openButtonText="WHY?" />);
    expect(getByText(/WHY/i)).toBeInTheDocument();
  });

  it('It renders the children', async () => {
    const { getByText } = render(
      <CardOverlay>
        <p>It Renders Childred</p>
      </CardOverlay>
    );
    const button = getByText(/learn more/i);
    fireEvent.click(button);
    await wait(() => {
      expect(getByText(/It Renders Childred/i)).toBeInTheDocument();
    });
  });
});
