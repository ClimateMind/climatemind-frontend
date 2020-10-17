import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import PrevButton from '../../../components/PrevButton';

const title = 'Previous';
const clickPrevHandler = jest.fn();

describe('Back/Previous button', () => {
  it('Back button renders', () => {
    const { getByTestId } = render(
      <PrevButton text={title} clickPrevHandler={clickPrevHandler} />
    );
    expect(getByTestId('PrevButton')).toBeInTheDocument();
  });

  it('Back/Previous button has correct text', () => {
    const { getByText } = render(
      <PrevButton text={title} clickPrevHandler={clickPrevHandler} />
    );
    expect(getByText(/Previous/i)).toBeInTheDocument();
  });

  it('Back/Previous button calls click handler correctly', () => {
    const { getByText } = render(
      <PrevButton text={title} clickPrevHandler={clickPrevHandler} />
    );
    const backButton = getByText(title);
    fireEvent.click(backButton);
    expect(clickPrevHandler).toHaveBeenCalled();
  });
});
