import React from 'react';
import { render } from '@testing-library/react';
import Paragraphs from '../../../components/Paragraphs';

describe('Paragraphs component', () => {
  const dummyText =
    'This is the first paragraph. \n This is the second paragraph';

  it('It has the correct number of paragraphs', () => {
    const { queryAllByTestId, getByText } = render(
      <Paragraphs text={dummyText} />
    );
    const paras = queryAllByTestId('paragraphs-p');
    expect(paras.length).toBe(2);
  });

  it('It has the correct text', () => {
    const { queryAllByTestId, getByText } = render(
      <Paragraphs text={dummyText} />
    );

    expect(getByText(/This is the first paragraph/)).toBeInTheDocument();
    expect(getByText(/This is the second paragraph/)).toBeInTheDocument();
  });
});
