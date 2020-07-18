import React from 'react';
import { render } from '@testing-library/react';

import ClimateMindContainer from '../../ClimateMindContainer';

describe('Landing page', () => {
  it('has a get started button', () => {
    const {getByRole} = render(<ClimateMindContainer/>);
    expect(getByRole('button', {name: /get started/i})).toBeInTheDocument();
  });
  it('displays the app logo', () => {
    const {getByTestId} = render(<ClimateMindContainer/>);
    expect(getByTestId("climate-mind-logo")).toBeInTheDocument();
  });
  it('shows welcome text ', () => {
    const {getByText} = render(<ClimateMindContainer/>);
    expect(getByText(/welcome to/i)).toBeInTheDocument();
  });
})
