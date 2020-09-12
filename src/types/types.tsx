export type TQuestion = {
  id: number;
  value: string;
  question: string;
};

export type TAnswers = {
  1: string;
  2: string;
  3: string;
  4: string;
  5: string;
  6: string;
};

export type QuestionKey = keyof TQuestion;

export type Questions = {
  SetOne: TQuestion[];
  SetTwo: TQuestion[];
  Answers: TAnswers;
  Directions: string;
};
