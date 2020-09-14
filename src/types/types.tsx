export type TQuestion = {
  id: number;
  value: string;
  question: string;
};

type TAnswer = {
  id: string;
  text: string;
};

export type TAnswers = [TAnswer];

export type QuestionKey = keyof TQuestion;

export type Questions = {
  SetOne: TQuestion[];
  SetTwo: TQuestion[];
  Answers: TAnswers;
  Directions: string;
};
