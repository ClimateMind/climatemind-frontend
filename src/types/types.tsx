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

export type TResponse = {
  questionId: number;
  answerId: number;
};

export type TResponses = {
  SetOne: TResponse[];
};

type TPersonalValue = {
  valueDesc: string;
  valueName: string;
};

export type TClimateFeed = TClimateEffect[]

export type TClimateEffect = { 
  effectId : string,
  effectTitle : string, 
  effectShortDesc: string
}

export type TPersonalValues = [TPersonalValue];
