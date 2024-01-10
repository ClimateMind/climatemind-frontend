import { configureStore } from '@reduxjs/toolkit';
import globalReducer from './globalSlice';
import { authReducer } from 'features/auth';
import { quizReducer } from 'features/quiz';

export const store = configureStore({
  reducer: {
    global: globalReducer,
    auth: authReducer,
    quiz: quizReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
