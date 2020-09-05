import React, { useState, useEffect, useCallback } from 'react';
import Question from '../components/Question';
import { useQuestions } from '../hooks/useQuestions';
import { TQuestion } from '../types/types';

const Questionaire: React.FC<{}> = () => {
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
  // Question number user is on
  const [progress, setProgress] = useState(1);

  // Pick a random question from the Questions to answer
  const changeQuestion = useCallback(() => {
    const randomQuestionIndex = Math.floor(
      Math.random() * questionsToAnswer.length
    );
    setCurrentQuestion(questionsToAnswer[randomQuestionIndex]);
    const remainingQuestions = [...questionsToAnswer];
    remainingQuestions.splice(randomQuestionIndex, 1);
    console.log(remainingQuestions);
    setQuestionsToAnswer(remainingQuestions);
  }, [setQuestionsToAnswer, questionsToAnswer]);

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

  // // // Set the first question to answer
  useEffect(() => {
    if (!currentQuestion && questionsToAnswer.length) {
      changeQuestion();
    }
  }, [questionsToAnswer, currentQuestion, changeQuestion]);

  if (!currentQuestion || !answers) {
    return <div>loading</div>;
  }

  if (questionsToAnswer.length === 0) {
    return <div>Quiz Complete let's submit</div>;
  }

  return (
    <div>
      <Question
        key={currentQuestion.id}
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
