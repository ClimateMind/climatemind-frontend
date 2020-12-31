import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Card from '../../../components/Card';
import CMCardOverlay from '../../../components/MythOverlay';
import CMCardFoldout from '../../../components/CardFoldout';

const title = 'Card title';
const shortDescription = 'This is card content';

describe('CMCard', () => {
  it('CMcard renders', () => {
    const { getByTestId } = render(<Card index={1} />);
    expect(getByTestId('CMCard')).toBeInTheDocument();
  });

  it('It renders the children', () => {
    const { getByText } = render(
      <Card header={<h1>{title}</h1>} index={1}>
        <p>It renders the children</p>
      </Card>
    );
    expect(getByText(/It renders the children/i)).toBeInTheDocument();
  });

  it('It shows footer Foldout component', () => {
    const { getByText } = render(
      <Card
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
        index={1}
        footer={
          <CMCardOverlay
            cardHeader={<p>footer title overlay</p>}
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
      <Card imageUrl="https://picsum.photos/350/250" index={1} />
    );
    expect(getByTestId('CMCard-Image')).toBeInTheDocument();
  });
  it('It hides the image', () => {
    const { queryByTestId } = render(<Card index={1} />);
    const CMCardImage = queryByTestId('CMCard-Image');
    expect(CMCardImage).toBe(null);
  });
});
