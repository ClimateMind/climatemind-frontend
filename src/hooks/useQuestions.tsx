import { useContext } from "react";
import { QuestionsContext } from "../contexts/questions";

export const useQuestions = () => {
  const questions = useContext(QuestionsContext);

  return questions;
};