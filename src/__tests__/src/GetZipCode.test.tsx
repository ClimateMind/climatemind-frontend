import React from 'react';
import { render } from '@testing-library/react';

import GetZipCode from '../../pages/GetZipCode';

// Mock react router
jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: jest.fn(),
  }),
}));

describe('Set Location Page', () => {
  it('has the correct text', () => {
    const h1 = 'Climate change is location dependant.';
    const pageDesc =
      'Entering your zip code tailors your results to include impacts affecting your local area.';
    const skipExplanation =
      'You don’t have to tell me but your feed won’t show local solutions.';
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
    expect(getByText(/DON'T USE LOCATION/i));
  });
});
