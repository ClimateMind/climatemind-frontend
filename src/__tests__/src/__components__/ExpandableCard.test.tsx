import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ExpandableCard from '../../../components/ExpandableCard';

const title = 'Card title';
const content = 'This is card content';

describe('ExpandableCard', () => {
  it('Expandable card renders', () => {
    const { getByTestId } = render(<ExpandableCard title={title} />);
    expect(getByTestId('ExpandableCard')).toBeInTheDocument();
  });

  it('Has correct title', () => {
    const { getByText } = render(<ExpandableCard title={title} />);
    expect(getByText(/Card title/i)).toBeInTheDocument();
  });

  it('Has renders children correctly', () => {
    const { getByText } = render(
      <ExpandableCard title={title}>{content}</ExpandableCard>
    );
    const expander = getByText(title);
    fireEvent.click(expander);
    expect(getByText(/This is card content/i)).toBeInTheDocument();
  });
});
