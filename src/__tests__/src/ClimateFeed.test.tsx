import React from 'react';
import { render } from '@testing-library/react';

import ClimateFeed from '../../pages/ClimateFeed';

// Mock useClimatePeronality hook
jest.mock('../../hooks/useClimateFeed', () => {
  return {
    useClimateFeed: jest.fn(() => [
      {
        effectId: '10e5bb69-5d2c-4464-803a-53a871eafe5f',
        effectTitle: 'This is the first title',
        effectDescription:
          'What is important to you is the safety, harmony and stability of society, of relationships, and of self. Security values derive from basic individual and group needs. You value a sense of belonging, social order and the reciprocation of favours.',
        valueName: 'security',
      },
      {
        effectId: '10e5bb69-5d2c-4464-803a-53a871eafe5f',
        effectTitle: 'This is the second title',
        effectDescription:
          'What is important to you is the safety, harmony and stability of society, of relationships, and of self. Security values derive from basic individual and group needs. You value a sense of belonging, social order and the reciprocation of favours.',
        valueName: 'security',
      },
      {
        effectId: '10e5bb69-5d2c-4464-803a-53a871eafe5f',
        effectTitle: 'This is the third title',
        effectDescription:
          'What is important to you is the safety, harmony and stability of society, of relationships, and of self. Security values derive from basic individual and group needs. You value a sense of belonging, social order and the reciprocation of favours.',
        valueName: 'security',
      },
    ]),
  };
});

describe('Climate Personality', () => {
  it('it has the correct number of cards', () => {
    const { queryAllByTestId } = render(<ClimateFeed />);
    const cards = queryAllByTestId('CMCard');
    expect(cards.length).toBe(3);
  });
  it('it has all the titles', () => {
    const { getByText } = render(<ClimateFeed />);
    const title1 = getByText('This is the first title');
    const title2 = getByText('This is the second title');
    const title3 = getByText('This is the third title');
    expect(title1).toBeInTheDocument();
    expect(title2).toBeInTheDocument();
    expect(title3).toBeInTheDocument();
  });
});
