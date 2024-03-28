import { createSlice } from '@reduxjs/toolkit';

interface UserBState {
  userAName: string;
  alignmentScoresId: string;
}

const initialState: UserBState = {
  userAName: '',
  alignmentScoresId: '',
};

export const userBSlice = createSlice({
  name: 'userB',
  initialState,
  reducers: {
    setUserAName: (state, action) => {
      state.userAName = action.payload;
    },
    setAlignmentScoresId: (state, action) => {
      state.alignmentScoresId = action.payload;
    },
  },
});

export const { setUserAName, setAlignmentScoresId } = userBSlice.actions;
export default userBSlice.reducer;
