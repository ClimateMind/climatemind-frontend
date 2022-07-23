import React from 'react';
import { render } from '@testing-library/react';

import GetZipCode from '../../pages/GetZipCode';

// Mock react router
jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: jest.fn(),
  }),
}));

window.scrollTo = jest.fn();

jest.mock('react-query', () => ({
  ...jest.requireActual('react-query'),
  useMutation: () => jest.fn(),
}));

describe('Set Location Page', () => {
  it('has the correct text', () => {
    const h1 = 'Climate change is location dependant.';
    const pageDesc =
      'Tailor your results to include impacts affecting your local area by entering your zip code below. (only available for US locations currently)';
    const skipExplanation =
      /If you don't live in the US or don't want local impacts indicated, click below/i;
    const dataPolicy =
      'But… just so you know, your information won’t be shared with anyone.';
    const { getByText } = render(<GetZipCode />);
    expect(getByText(h1));
    expect(getByText(pageDesc));
    expect(getByText(skipExplanation));
    expect(getByText(dataPolicy));
  });

  it('it has 2 buttons', () => {
    const { queryAllByRole } = render(<GetZipCode />);
    const buttons = queryAllByRole('button');
    expect(buttons.length).toBe(2);
  });

  it('it has the submit button', () => {
    const { getByText } = render(<GetZipCode />);
    expect(getByText(/submit/i));
  });
  it('it has the skip button', () => {
    const { getByText } = render(<GetZipCode />);
    expect(getByText(/DON'T USE ZIP CODE/i));
  });
});
