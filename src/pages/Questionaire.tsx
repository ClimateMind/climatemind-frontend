import React, { useState, useEffect, useCallback } from 'react';
import Question from '../components/Question';
import { useQuestions } from '../hooks/useQuestions';
import { TQuestion } from '../types/types';

import { pickRandom } from '../helpers';

const Questionaire: React.FC<{}> = () => {
  // Fetch Questions from the api
  const questions = useQuestions();

  // List of answers
  const [answers, setAnswers] = useState<string[] | null>(null);

  // Questions still to be answered
  const [questionsToAnswer, setQuestionsToAnswer] = useState<TQuestion[] | []>(
    []
  );

  // Current Question being answered
  const [currentQuestion, setCurrentQuestion] = useState<TQuestion | null>(
    null
  );

  // Number of questions that have been answered
  const [progress, setProgress] = useState(1);

  // Pick a random question from the Questions to answer
  const changeQuestion = useCallback(() => {
    const pick = pickRandom(questionsToAnswer);
    setCurrentQuestion(pick);
  }, [questionsToAnswer, setCurrentQuestion]);

  // Handle answering of a question
  const setAnswer = (questionId: number, value: string) => {
    // TODO Store Answers in state
    const answer = {
      questionId,
      value,
    };
    console.log(answer);
    // Change question and update progress
    changeQuestion();
    const newProgress = progress + 1;
    setProgress(newProgress);
  };

  // Setting the questions and answers on load;
  useEffect(() => {
    // TODO - For just now we are only using SetOne
    if (questions.SetOne) {
      console.log('in set one');
      const questionsToAnswer: TQuestion[] = [...questions.SetOne];
      setQuestionsToAnswer(questionsToAnswer);
    }
  }, [questions]);

  // Setting the answers
  useEffect(() => {
    if (questions.Answers && !answers) {
      const answers = Object.values(questions.Answers);
      setAnswers(answers);
    }
  }, [questions, answers, questionsToAnswer, setQuestionsToAnswer]);

  // // Set the first question to answer
  useEffect(() => {
    if (!currentQuestion && questionsToAnswer) {
      changeQuestion();
    }
  }, [questionsToAnswer, changeQuestion, currentQuestion]);

  // //Remove the current question from the list of ones to answers
  useEffect(() => {
    let newQuestionList = questionsToAnswer;
    newQuestionList = newQuestionList?.filter(
      (q) => q.id !== currentQuestion?.id
    );
    setQuestionsToAnswer(newQuestionList);
  }, [currentQuestion, setQuestionsToAnswer]);

  // Return loader until the current question is set
  if (!currentQuestion || !answers) {
    return <div>loading</div>;
  }

  return (
    <div>
      <Question
        questionNumber={progress}
        index={currentQuestion.id}
        question={currentQuestion.question}
        answers={answers}
        setAnswer={setAnswer}
      />
    </div>
  );
};

export default Questionaire;
