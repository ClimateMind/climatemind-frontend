import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import CMCard from '../../../components/CMCard';

const title = 'Card title';
const bodyText = 'This is card content';

describe('CMCard', () => {
  it('Expandable card renders', () => {
    const { getByTestId } = render(
      <CMCard title={title} bodyText={bodyText} />
    );
    expect(getByTestId('ExpandableCard')).toBeInTheDocument();
  });

  it('Has correct title', () => {
    const { getByText } = render(<CMCard title={title} bodyText={bodyText} />);
    expect(getByText(/Card title/i)).toBeInTheDocument();
  });

  it('Has correct body', () => {
    const { getByText } = render(<CMCard title={title} bodyText={bodyText} />);
    expect(getByText(/Card title/i)).toBeInTheDocument();
  });
});
