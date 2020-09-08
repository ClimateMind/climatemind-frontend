import { useContext } from 'react';
import { QuestionsContext } from '../contexts/questions';

export const useQuestions = () => {
  const questions = useContext(QuestionsContext);

  // The questions from the api should be shuffled into a random order
  // Currently shuffling the items based on sorting the questions arrays based on to random numbers values. not sure if it us truely random but seems to be random enough.
  const shuffledQuestions = { ...questions };

  if (questions.SetOne && questions.SetTwo) {
    const shuffledSetOne = questions.SetOne.sort(
      () => Math.random() - Math.random()
    );
    const shuffledSetTwo = questions.SetTwo.sort(
      () => Math.random() - Math.random()
    );
    shuffledQuestions.SetOne = shuffledSetOne;
    shuffledQuestions.SetTwo = shuffledSetTwo;
  }
  return shuffledQuestions;
};
