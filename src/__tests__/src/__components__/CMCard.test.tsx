import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import CMCard from '../../../components/CMCard';

const title = 'Card title';
const bodyText = 'This is card content';

describe('CMCard', () => {
  it('CMcard renders', () => {
    const { getByTestId } = render(
      <CMCard title={title} bodyText={bodyText} index={1} />
    );
    expect(getByTestId('CMCard')).toBeInTheDocument();
  });

  it('Has correct title', () => {
    const { getByText } = render(
      <CMCard title={title} bodyText={bodyText} index={1} />
    );
    expect(getByText(/Card title/i)).toBeInTheDocument();
  });

  it('Has correct body', () => {
    const { getByText } = render(
      <CMCard title={title} bodyText={bodyText} index={1} />
    );
    expect(getByText(/Card title/i)).toBeInTheDocument();
  });
  it('It show the correct card number', () => {
    const { getByText } = render(
      <CMCard title={title} bodyText={bodyText} index={1} />
    );
    expect(getByText(/NO. 2/i)).toBeInTheDocument(); // Card Number is Index +1
  });
  it('It can hide the card number', () => {
    const { queryByText } = render(
      <CMCard
        title={title}
        bodyText={bodyText}
        index={1}
        numberedCards={false}
      />
    );
    const search_text = queryByText(/NO. 2/i);
    expect(search_text).toBe(null);
  });
});
