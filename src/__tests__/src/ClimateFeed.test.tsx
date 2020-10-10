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
        effectShortDesc:
          'What is important to you is the safety, harmony and stability of society, of relationships, and of self. Security values derive from basic individual and group needs. You value a sense of belonging, social order and the reciprocation of favours.',
        valueName: 'security',
      },
      {
        effectId: '10e5bb69-5d2c-4464-803a-53a871eafe5f',
        effectTitle: 'This is the first title',
        effectShortDesc:
          'What is important to you is the safety, harmony and stability of society, of relationships, and of self. Security values derive from basic individual and group needs. You value a sense of belonging, social order and the reciprocation of favours.',
        valueName: 'security',
      },
      {
        effectId: '10e5bb69-5d2c-4464-803a-53a871eafe5f',
        effectTitle: 'This is the first title',
        effectShortDesc:
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
});
