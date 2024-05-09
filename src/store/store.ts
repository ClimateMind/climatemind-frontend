import { configureStore } from '@reduxjs/toolkit';
import globalReducer from './globalSlice';
import { authReducer } from 'features/auth';
import { quizReducer } from 'features/quiz';
import { userBReducer } from 'features/userB';
import conversationDrawerReducer from 'features/conversations/state/conversationDrawerSlice';

export const store = configureStore({
  reducer: {
    global: globalReducer,
    auth: authReducer,
    quiz: quizReducer,
    userB: userBReducer,
    conversationDrawer: conversationDrawerReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
