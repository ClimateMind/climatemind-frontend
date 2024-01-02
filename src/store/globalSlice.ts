import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface GlobalState {
  hasAcceptedCookies: boolean | undefined;
}

const initialState: GlobalState = {
  hasAcceptedCookies: localStorage.getItem('hasAcceptedCookies') === 'true' ? true : undefined,
};

export const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setHasAcceptedCookies: (state, action: PayloadAction<boolean | undefined>) => {
      state.hasAcceptedCookies = action.payload;
      if (action.payload !== undefined) {
        localStorage.setItem('hasAcceptedCookies', action.payload.toString());
      } else {
        localStorage.removeItem('hasAcceptedCookies');
      }
    },
  },
});

export const { setHasAcceptedCookies } = globalSlice.actions;
export default globalSlice.reducer;
