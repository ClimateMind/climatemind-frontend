import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import CMCard from '../../../components/Card';
import CMCardOverlay from '../../../components/CardOverlay';
import CMCardFoldout from '../../../components/CardFoldout';

const title = 'Card title';
const shortDescription = 'This is card content';
const description =
  'Your goal is pleasure or sensuous gratification for oneself.';

describe('CMCard', () => {
  it('CMcard renders', () => {
    const { getByTestId } = render(
      <CMCard title={title} shortDescription={shortDescription} index={1} />
    );
    expect(getByTestId('CMCard')).toBeInTheDocument();
  });

  it('Has correct title', () => {
    const { getByText } = render(
      <CMCard title={title} shortDescription={shortDescription} index={1} />
    );
    expect(getByText(/Card title/i)).toBeInTheDocument();
  });

  it('Has correct body', () => {
    const { getByText } = render(
      <CMCard title={title} shortDescription={shortDescription} index={1} />
    );
    expect(getByText(/Card title/i)).toBeInTheDocument();
  });
  it('It shows the correct card number', () => {
    const { getByText } = render(
      <CMCard title={title} shortDescription={shortDescription} index={1} />
    );
    expect(getByText(/NO. 2/i)).toBeInTheDocument(); // Card Number is Index +1
  });
  it('It can hide the card number', () => {
    const { queryByText } = render(
      <CMCard
        title={title}
        shortDescription={shortDescription}
        index={1}
        numberedCards={false}
      />
    );
    const search_text = queryByText(/NO. 2/i);
    expect(search_text).toBe(null);
  });
  it('It shows footer Foldout component', () => {
    const { getByText } = render(
      <CMCard
        title={title}
        shortDescription={shortDescription}
        index={1}
        footer={<CMCardFoldout description="footer title foldout" />}
      />
    );
    expect(getByText(/MORE/i)).toBeInTheDocument();
    const expandFooter = getByText(/MORE/i);
    fireEvent.click(expandFooter);
    expect(getByText(/footer title foldout/i)).toBeInTheDocument();
  });

  it('It shows footer Overlay component', () => {
    const { getByText } = render(
      <CMCard
        title={title}
        shortDescription={shortDescription}
        index={1}
        footer={
          <CMCardOverlay
            title="footer title overlay"
            shortDescription="footer description overlay"
          />
        }
      />
    );
    expect(getByText(/MORE/i)).toBeInTheDocument();
    const expandFooter = getByText(/MORE/i);
    fireEvent.click(expandFooter);
    expect(getByText(/footer title overlay/i)).toBeInTheDocument();
  });

  it('It shows an Action Headline', () => {
    const { getByTestId, getByText } = render(
      <CMCard
        title={title}
        shortDescription={shortDescription}
        index={1}
        footer={
          <CMCardOverlay
            title="footer title overlay"
            shortDescription="footer description overlay"
          />
        }
        actionHeadline="Reducing Food Waste"
      />
    );
    expect(getByTestId('ActionHeadline')).toBeInTheDocument();
    expect(getByText(/reducing food waste/i)).toBeInTheDocument();
  });

  it('It shows the image', () => {
    const { getByTestId } = render(
      <CMCard
        title={title}
        shortDescription={shortDescription}
        imageUrl="https://picsum.photos/350/250"
        index={1}
      />
    );
    expect(getByTestId('CMCard-Image')).toBeInTheDocument();
  });
  it('It hides the image', () => {
    const { queryByTestId } = render(
      <CMCard title={title} shortDescription={shortDescription} index={1} />
    );
    const CMCardImage = queryByTestId('CMCard-Image');
    expect(CMCardImage).toBe(null);
  });
});
