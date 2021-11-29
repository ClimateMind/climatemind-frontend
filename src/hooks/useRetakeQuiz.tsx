import react, { useEffect, useState } from 'react';

export const useRetakeQuiz = () => {
  const retakeQuiz = () => {
    // TODO: Retake the quiz logic here
    console.log('User will retake the quiz');
  };

  return { retakeQuiz };
};
