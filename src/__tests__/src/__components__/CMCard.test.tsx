import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import CMCard from '../../../components/CMCard';

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
  // it('It shows MORE option', () => {
  //   const { getByText } = render(
  //     <CMCard
  //       title={title}
  //       shortDescription={shortDescription}
  //       description={description}
  //       index={1}
  //     />
  //   );
  //   expect(getByText(/MORE/i)).toBeInTheDocument();
  // });
  // it('Shows detailed text', () => {
  //   const { getByText } = render(
  //     <CMCard
  //       title={title}
  //       shortDescription={shortDescription}
  //       description={description}
  //       index={1}
  //     />
  //   );
  //   const moreButton = getByText(/MORE/i);
  //   fireEvent.click(moreButton);
  //   expect(
  //     getByText(/Your goal is pleasure or sensuous gratification for oneself/i)
  //   ).toBeInTheDocument();
  //   expect(getByText(/LESS/i)).toBeInTheDocument();
  // });
  it('It shows the image', () => {
    const { getByTestId } = render(
      <CMCard
        title={title}
        shortDescription={shortDescription}
        description={description}
        imageUrl="https://picsum.photos/350/250"
        index={1}
      />
    );
    expect(getByTestId('CMCard-Image')).toBeInTheDocument();
  });
  it('It hides the image', () => {
    const { queryByTestId } = render(
      <CMCard
        title={title}
        shortDescription={shortDescription}
        description={description}
        index={1}
      />
    );
    const CMCardImage = queryByTestId('CMCard-Image');
    expect(CMCardImage).toBe(null);
  });
});
