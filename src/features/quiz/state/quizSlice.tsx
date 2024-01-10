import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface QuizState {
  quizAnswers: {
    SetOne: { questionId: number; answerId: number }[];
    SetTwo: { questionId: number; answerId: number }[];
  };
}

const initialState: QuizState = {
  quizAnswers: { SetOne: [], SetTwo: [] },
};

export const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    resetQuizAnswers: (state) => {
      state.quizAnswers = { SetOne: [], SetTwo: [] };
    },
    addQuizAnswer: (state, action: PayloadAction<{ questionSet: number; questionId: number; answerId: number }>) => {
      if (action.payload.questionSet === 1) {
        // If the question is already answered, remove it from the array
        if (state.quizAnswers.SetOne.find((x) => x.questionId === action.payload.questionId)) {
          state.quizAnswers.SetOne = state.quizAnswers.SetOne.filter(
            (x) => x.questionId !== action.payload.questionId
          );
        }

        // Add the new answer to the array
        state.quizAnswers.SetOne.push({
          questionId: action.payload.questionId,
          answerId: action.payload.answerId,
        });
      } else if (action.payload.questionSet === 2) {
        // If the question is already answered, remove it from the array
        if (state.quizAnswers.SetTwo.find((x) => x.questionId === action.payload.questionId)) {
          state.quizAnswers.SetTwo = state.quizAnswers.SetTwo.filter(
            (x) => x.questionId !== action.payload.questionId
          );
        }

        // Add the new answer to the array
        state.quizAnswers.SetTwo.push({
          questionId: action.payload.questionId,
          answerId: action.payload.answerId,
        });
      }
    },
  },
});

export const { resetQuizAnswers, addQuizAnswer } = quizSlice.actions;
export default quizSlice.reducer;
