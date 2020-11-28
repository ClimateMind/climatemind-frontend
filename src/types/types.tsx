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

export type TQuestions = {
  SetOne: TQuestion[];
  SetTwo: TQuestion[];
  Answers: TAnswers;
  Directions: string;
};

export type TResponse = {
  questionId: number;
  answerId: number;
};

export type TResponses = {
  SetOne: TResponse[];
};

export type TPersonalityContext = {
  data: TPersonalValues;
  isLoading: boolean;
  isError: boolean;
};

type TPersonalValue = {
  description: string;
  id: string;
  name: string;
  shortDescription: string;
};
export type TClimateFeed = TClimateEffect[];

export type TClimateEffect = {
  effectId: string;
  effectTitle: string;
  effectDescription: string;
  effectShortDescription: string;
  effectScore: number;
  imageUrl: string;
};

// export type TPersonalValues = [TPersonalValue];
export type TPersonalValues = {
  personalValues: [TPersonalValue];
};

// export type TPersonalValuesObj = {
//   personalValues: TPersonalValues
// };
