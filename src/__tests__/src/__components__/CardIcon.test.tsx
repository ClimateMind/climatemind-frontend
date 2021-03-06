import React from 'react';
import { render } from '@testing-library/react';
import CardIcon from '../../../components/CardIcon';

describe('It renders the  icon', () => {
  it('Displays the protection icon', () => {
    const { getByTestId } = render(<CardIcon actionType="adaptation" />);
    expect(getByTestId('CardIconAdaptation')).toBeInTheDocument();
  });
  it('Displays the prevention icon', () => {
    const { getByTestId } = render(<CardIcon actionType="mitigation" />);
    expect(getByTestId('CardIconMitigation')).toBeInTheDocument();
  });
  it('Displays the idea icon', () => {
    const { getByTestId } = render(<CardIcon actionType="idea" />);
    expect(getByTestId('CardIconIdea')).toBeInTheDocument();
  });
});
