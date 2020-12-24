import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Card from '../../../components/Card';
import CMCardOverlay from '../../../components/CardOverlay';
import CMCardFoldout from '../../../components/CardFoldout';

const title = 'Card title';
const shortDescription = 'This is card content';

describe('CMCard', () => {
  it('CMcard renders', () => {
    const { getByTestId } = render(
      <Card title={title} shortDescription={shortDescription} index={1} />
    );
    expect(getByTestId('CMCard')).toBeInTheDocument();
  });

  it('It renders the short description', () => {
    const { getByText } = render(
      <Card
        header={<h1>{title}</h1>}
        title={title}
        shortDescription={shortDescription}
        index={1}
      />
    );
    expect(getByText(/This is card content/i)).toBeInTheDocument();
  });

  it('It shows footer Foldout component', () => {
    const { getByText } = render(
      <Card
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
      <Card
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

  it('It shows the preview component', () => {
    const { getByTestId, getByText } = render(
      <Card
        title={title}
        shortDescription={shortDescription}
        index={1}
        footer={
          <CMCardOverlay
            title="footer title overlay"
            shortDescription="footer description overlay"
          />
        }
        preview={<p>Reducing Food Waste</p>}
      />
    );
    expect(getByText(/reducing food waste/i)).toBeInTheDocument();
  });

  it('It shows the image', () => {
    const { getByTestId } = render(
      <Card
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
      <Card title={title} shortDescription={shortDescription} index={1} />
    );
    const CMCardImage = queryByTestId('CMCard-Image');
    expect(CMCardImage).toBe(null);
  });
});
