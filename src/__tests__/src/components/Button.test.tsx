import React from 'react';
import { render } from '@testing-library/react';

import Button from '../../../components/Button';

describe('Button', () => {
  it('renders the button with the corresponding button text', () => {
    const {getByRole} = render(<Button displayText={'Testy McTestface'} onClick={jest.fn()}/>);
    expect(getByRole('button', {name: 'Testy McTestface'})).toBeInTheDocument();
  });
})
