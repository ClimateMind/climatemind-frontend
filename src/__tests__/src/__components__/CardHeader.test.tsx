import React from 'react';
import { render } from '@testing-library/react';
import CardHeader from '../../../components/CardHeader';

describe('It renders the title', () => {
  it('Header with title renders', () => {
    const { getByText } = render(<CardHeader title="Card Title" index={1} />);
    expect(getByText(/Card Title/i)).toBeInTheDocument();
  });
  it('Pre title renders', () => {
    const { getByText } = render(
      <CardHeader preTitle="Pre Title" title="Card Title" index={1} />
    );
    expect(getByText(/Pre Title/i)).toBeInTheDocument();
  });
  it('It has the correct bgColor', () => {
    const { container } = render(
      <CardHeader
        preTitle="Pre Title"
        title="Card Title"
        index={1}
        bgColor="red"
      />
    );
  });
  it('It has the icon container', () => {
    const { getByTestId } = render(
      <CardHeader
        preTitle="Pre Title"
        title="Card Title"
        index={1}
        bgColor="red"
        cardIcon="prevention"
      />
    );
    expect(getByTestId('CardIcon')).toBeInTheDocument();
  });
});
