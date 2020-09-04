import React from 'react';
import { useQuestions } from '../hooks/useQuestions';

const Quiz: React.FC = () => {
  const questions = useQuestions();

  return (
    <div>This is a placeholder for the quiz page
      <p>{questions.Directions}</p>
    </div>
  );
};

export default Quiz;
