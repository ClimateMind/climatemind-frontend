import React from 'react';
import { render, screen, wait } from '@testing-library/react';

import ClimateFeed from '../../pages/ClimateFeed';

jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: jest.fn(),
  }),
}));

jest.mock('../../api/getFeed', () => ({
  climateEffects: [
    {
      actionHeadline: "Reducing Food Waste", 
      effectDescription: "No long desc available at present", 
      effectId: "R8epBa4UvcieLTynfK3E84u", 
      effectScore: 14.0, 
      effectShortLong: "No short desc available at present", 
      effectTitle: "This is the first title", 
      imageUrl: "https://cdn.pixabay.com/photo/2018/10/29/13/46/hunter-3781224_960_720.jpg"
    },
    { actionHeadline: "This is the second title", 
      effectDescription: "No long desc available at present", 
      effectId: "RnbPKhyIQNnShkRKHqGrGm", 
      effectScore: 14.0, 
      effectShortLong: "No short desc available at present", 
      effectTitle: "This is the second title", 
      imageUrl: "https://api.creativecommons.engineering/v1/thumbs/1dc085e5-a90e-4f3e-ae79-17d8e209516c"
    },
    { actionHeadline: "This is the third title", 
      effectDescription: "No long desc available at present", 
      effectId: "RO1J1OifvuO602qTIrSXdB", 
      effectScore: 14.0, 
      effectShortLong: "No short desc available at present", 
      effectTitle: "This is the second title", 
      imageUrl: "https://live.staticflickr.com/3382/3630262585_f9e666b8bb_b.jpg"
    }  
  ]
}));

describe('Climate Feed', () => {
  it('it has the correct number of cards', async () => {
    const { queryAllByTestId } = render(<ClimateFeed />);
    const cards = queryAllByTestId('CMCard');
    wait(() => expect(cards.length).toBe(3));
  });

  it('it has all the titles', async () => {
    const { getByText } = render(<ClimateFeed />);
    wait(() => expect(getByText(/reducing food waste/i)).toBeInTheDocument());
    wait(() => expect(getByText(/this is the second title/i)).toBeInTheDocument());
    wait(() => expect(getByText(/this is the third title/i)).toBeInTheDocument());
  });
});
