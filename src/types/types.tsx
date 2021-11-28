import { TPersonalValues } from './PersonalValues';

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
  [name: string]: TResponse[];
};

export type TPersonalityContext = {
  data: TPersonalValues;
  isLoading: boolean;
  isError: boolean;
};

export type TClimateEffects = TClimateEffect[];

export type TClimateEffect = {
  effectId: string;
  effectTitle: string;
  effectDescription: string;
  effectShortDescription: string;
  effectSolutions: any;
  effectSources: string[];
  // effectScore: number;
  imageUrl: string;
  actionHeadline: string;
  isPossiblyLocal: 0 | 1;
  effectSpecificMythIRIs: string[];
};

// export type TPersonalValues = [TPersonalValue];
