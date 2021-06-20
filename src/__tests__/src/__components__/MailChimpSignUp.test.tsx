import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import SignUpForm from '../../../components/EmailSubscribeForm';

jest.mock('react-query', () => ({
  ...jest.requireActual('react-query'),
  useMutation: () => jest.fn(),
}));

describe('Mailing List Sign Up ', () => {
  it('The button is disabled to start with', () => {
    const { getByRole, debug } = render(<SignUpForm />);
    const button = getByRole('button');
    expect(button).toHaveTextContent(/Sign Up/i);
    expect(button).toHaveAttribute('disabled');
  });
  it('It has the input field and label', () => {
    const { getByLabelText, getByText, debug } = render(<SignUpForm />);
    const label = getByText(/email/i);
    const input = getByLabelText(/email/i);
    expect(label);
    expect(input);
  });
  it('The button enables when the user enters valid email address', () => {
    const { getByRole } = render(<SignUpForm />);
    const button = getByRole('button');
    const input = getByRole('textbox');
    fireEvent.change(input, { target: { value: 'hello@climatemind.org' } });
    expect(button).not.toHaveAttribute('disabled');
  });
});
