export type PostScores = {
  SetOne: { questionId: number; answerId: number }[];
  SetTwo: { questionId: number; answerId: number }[];
};

export type PostRegister = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  quizId: string;
};

export type PutSingleConversation = {
  conversationId: string;
  updatedConversation: {
    state?: number;
    receiverName?: string;
    userARating?: number;
  };
};
