import React from 'react';
import { render } from '@testing-library/react';

import PersonalValues from '../../pages/PersonalValues';

// Mock react router to simulate history.push on button click
jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: jest.fn(),
  }),
}));

// Mock useClimatePersonality hook
jest.mock('../../hooks/useClimatePersonality', () => {
  return {
    useClimatePersonality: jest.fn(() => {
      return {
        personalValues: [
          {
            "description": "You strive to control. Whether that is being dominant over people around you or having the power over resources. The functioning of social institutions requires some degree of status differentiation and so we must treat power as a value.", 
            "id": "power", 
            "name": "power", 
            "shortDescription": "You strive to control. Whether that is being dominant over people around you or having the power over resources. The functioning of social institutions requires some degree of status differentiation and so we must treat power as a value."
          }, 
          {
            "description": "Your goal is pleasure or sensuous gratification for oneself. Hedonism values derive from organismic needs and the pleasure associated with satisfying them. You enjoy life and are often self-indulgent. Your joy comes when you are able to fulfil your day with things that make you happy.", 
            "id": "hedonism", 
            "name": "hedonism", 
            "shortDescription": "Your goal is pleasure or sensuous gratification for oneself. Hedonism values derive from organismic needs and the pleasure associated with satisfying them. You enjoy life and are often self-indulgent. Your joy comes when you are able to fulfil your day with things that make you happy."
          }, 
          {
            "description": "You are independent and are happiest when choosing, creating or exploring. Self-direction derives from organismic needs for control and mastery. You are likely creative and relish in freedom and choosing your own goals. You are curious, have self-respect, intelligence and value your privacy.", 
            "id": "self_direction", 
            "name": "self direction", 
            "shortDescription": "You are independent and are happiest when choosing, creating or exploring. Self-direction derives from organismic needs for control and mastery. You are likely creative and relish in freedom and choosing your own goals. You are curious, have self-respect, intelligence and value your privacy."
          }
        ]};
      }
    ),
  };
});

describe('Climate Personality', () => {
  it('it has the call to action', () => {
    const { getByText } = render(<PersonalValues />);
    expect(
      getByText(/Ready to see how you can take action against climate change?/i)
    ).toBeInTheDocument();
  });
  it('has the button', () => {
    const { getByText } = render(<PersonalValues />);
    expect(getByText(/yes i’m ready!/i)).toBeInTheDocument();
  });
  it('it has the correct number of cards', () => {
    const { queryAllByTestId } = render(<PersonalValues />);
    const cards = queryAllByTestId('CMCard');
    expect(cards.length).toBe(3);
  });
});
