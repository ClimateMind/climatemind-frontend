import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { analyticsService } from "services";

type User = {
  accessToken: string;
  firstName: string;
  lastName: string;
  email: string;
  userId: string;
  quizId: string;
}

interface AuthState {
  isLoggedIn: boolean;
  user: User;
  sessionId: string;
}

const initialState: AuthState = {
  isLoggedIn: false,
  user: {
    accessToken: '',
    firstName: '',
    lastName: '',
    email: '',
    userId: '',
    quizId: '',
  },
  sessionId: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state.isLoggedIn = true;
      state.user = action.payload;

      // Save to local storage
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = initialState.user;

      // Remove from local storage
      localStorage.removeItem('user');
    },
    setSessionId: (state, action: PayloadAction<string>) => {
      state.sessionId = action.payload;
      analyticsService.setSessionId(action.payload);
    },
    setQuizId: (state, action: PayloadAction<string>) => {
      state.user.quizId = action.payload;
      localStorage.setItem('user', JSON.stringify(state.user));
    },
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.user.accessToken = action.payload;
      localStorage.setItem('user', JSON.stringify(state.user));
    },
  },
});

export const {
  login, logout,
  setSessionId, setQuizId, setAccessToken
} = authSlice.actions;

export default authSlice.reducer;
