import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { analyticsService } from "src/services";

interface UserInfo {
  firstName: string;
  lastName: string;
  email: string;
  userId: string;
  quizId: string;
}

interface User extends UserInfo {
  sessionId: string;
  isLoggedIn: boolean;
}

interface AuthState {
  userA: User;
  userB: User;
}

const initialState: AuthState = {
  userA: {
    sessionId: '',
    isLoggedIn: false,
    firstName: '',
    lastName: '',
    email: '',
    userId: '',
    quizId: '',
  },
  userB: {
    sessionId: '',
    isLoggedIn: false,
    firstName: '',
    lastName: '',
    email: '',
    userId: '',
    quizId: '',
  },
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginUserA: (state, action: PayloadAction<UserInfo>) => {
      state.userA = {
        ...state.userA,
        ...action.payload,
        isLoggedIn: true,
      };

      localStorage.setItem('userA', JSON.stringify(action.payload));
    },
    loginUserB: (state, action: PayloadAction<UserInfo>) => {
      state.userB = {
        ...state.userB,
        ...action.payload,
        isLoggedIn: true,
      };
    },
    logoutUserA: (state) => {
      state.userA.isLoggedIn = false;
    },
    logoutUserB: (state) => {
      state.userB = initialState.userB;
    },
    updateUserAInfo: (state, action: PayloadAction<Partial<User>>) => {
      state.userA = {
        ...state.userA,
        ...action.payload,
      };

      if (action.payload.sessionId) {
        analyticsService.setSessionId(action.payload.sessionId);
      }

      const { sessionId, ...userAWithoutSessionId } = state.userA;
      localStorage.setItem('userA', JSON.stringify(userAWithoutSessionId));
    },
    updateUserBInfo: (state, action: PayloadAction<Partial<User>>) => {
      state.userB = {
        ...state.userB,
        ...action.payload,
      };

      if (action.payload.sessionId) {
        analyticsService.setSessionId(action.payload.sessionId);
      }
    },
  },
});

export const {
  loginUserA,
  loginUserB,
  logoutUserA,
  logoutUserB,
  updateUserAInfo,
  updateUserBInfo,
} = authSlice.actions;

export default authSlice.reducer;
