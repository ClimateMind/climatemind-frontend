import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Question from '../../../components/Question';

const TestQuestion = {
  questionId: 1,
  questionNumber: 1,
  question: 'What is the capital of spain',
  answers: ['Madrid', 'Seville', 'London', 'Alicante', 'Marbella'],
};

const setAnswer = jest.fn();

describe('Question Renders', () => {
  it('it loads', () => {
    const { getByTestId } = render(
      <Question {...TestQuestion} setAnswer={setAnswer} />
    );
    expect(getByTestId('Question')).toBeInTheDocument();
  });
  it('Displays the question', () => {
    const { getByText } = render(
      <Question {...TestQuestion} setAnswer={setAnswer} />
    );
    expect(getByText('What is the capital of spain')).toBeInTheDocument();
  });
  it('displays all of answers', () => {
    const { getByText } = render(
      <Question {...TestQuestion} setAnswer={setAnswer} />
    );
    expect(getByText('Madrid')).toBeInTheDocument();
    expect(getByText('Seville')).toBeInTheDocument();
    expect(getByText('London')).toBeInTheDocument();
    expect(getByText('Alicante')).toBeInTheDocument();
    expect(getByText('Marbella')).toBeInTheDocument();
  });

  it('it sets the answer correctly', () => {
    const { getByText } = render(
      <Question {...TestQuestion} setAnswer={setAnswer} />
    );
    const myAnswer = getByText('Madrid');
    fireEvent.click(myAnswer);
  });
});
