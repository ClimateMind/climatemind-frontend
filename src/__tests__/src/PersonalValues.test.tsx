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
    useClimatePersonality: jest.fn(() => [
      {
        valueDesc:
          'What is important to you is the safety, harmony and stability of society, of relationships, and of self. Security values derive from basic individual and group needs. You value a sense of belonging, social order and the reciprocation of favours.',
        valueName: 'security',
      },
      {
        valueDesc:
          "For you, respect, commitment and acceptance of the customs and ideas that one's culture or religion provides is highly important. It’s likely you practise a form of religious rites and beliefs. You are humble, devout and accepting of your portion in life.",
        valueName: 'tradition',
      },
      {
        valueDesc:
          'You are excellent at restraint of actions, inclinations, and impulses likely to upset or harm others and violate social expectations or norms. Conformity values derive from the requirement that individuals inhibit inclinations that might disrupt and undermine smooth interaction and group functioning. You are obedient, self-disciplined, loyal, responsible and polite.',
        valueName: 'conformity',
      },
    ]),
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
