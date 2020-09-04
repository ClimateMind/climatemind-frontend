import React, { useState, useEffect } from 'react';
import Question from '../components/Question';
import Loading from './Loading';
import { useQuestions } from '../hooks/useQuestions';
import { TQuestion, TAnswers } from '../types/types';

import { pickRandom } from '../helpers';

const Questionaire: React.FC<{}> = () => {
  // Fetch Questions from the api
  const questions = useQuestions();

  const [answers, setAnswers] = useState<string[] | null>();

  // Questions still to be answered
  const [questionsToAnswer, setQuestionsToAnswer] = useState<
    TQuestion[] | null
  >(null);

  // Current Question being answered
  const [currentQuestion, setCurrentQuestion] = useState<TQuestion | null>(
    null
  );

  // Number of questions that have been answered
  const [questionsAnswered, setQuestionsAnswered] = useState(0);

  const changeQuestion = () => {
    console.log('trying to chnage qquestion');
    // Pick a random question from the Questions to answer
    const pick = pickRandom(questionsToAnswer);
    console.log(pick);
    // Set the current quesion to the picked one
    setCurrentQuestion(pick);
    // Remove new question from the list
  };

  const setAnswer = (questionId: number, value: string) => {
    // const answer = {
    //   questionId,
    //   value,
    // };
    changeQuestion();
    console.log('Setting answer');
    // Add one to the questions answered
    // Store the answers for later
  };

  // Setting the questions on load;
  useEffect(() => {
    //Set questionsToAnswer when API response received
    if (questions.SetOne) {
      const questionsToAnswer: TQuestion[] = [...questions.SetOne];
      setQuestionsToAnswer(questionsToAnswer);
    }
    // Set answers when API response received
    if (questions.Answers && !answers) {
      const answers = Object.values(questions.Answers);
      setAnswers(answers);
    }
  }, [questions]);

  // Set the initial question to answer
  useEffect(() => {
    if (!currentQuestion && questionsToAnswer) {
      changeQuestion();
    }
  }, [questionsToAnswer]);

  // Return loader until the current question is set
  if (!currentQuestion || !answers) {
    return <div>loading</div>;
  }
  // return <div>Quiz Loaded</div>;
  return (
    <div>
      <Question
        index={currentQuestion.id}
        question={currentQuestion.question}
        answers={answers}
        setAnswer={setAnswer}
      />
    </div>
  );
};

export default Questionaire;
