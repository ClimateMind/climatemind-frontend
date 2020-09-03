export type Question = {
    id: number;
    value: string;
    question: string;
  };
  
  export type QuestionKey = keyof Question;
  
  export type Questions = {
    SetOne: Question[];
    SetTwo: Question[];
    Answers: {
      1: string;
      2: string;
      3: string;
      4: string;
      5: string;
      6: string;
    };
    Directions: string;
  };