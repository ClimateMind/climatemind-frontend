import { createSlice } from '@reduxjs/toolkit';

interface conversationDrawerState {
  conversationDrawerOpen: boolean;
}

const initialState: conversationDrawerState = {
  conversationDrawerOpen: false,
};

const conversationDrawerSlice = createSlice({
  name: 'conversationDrawerState',
  initialState,
  reducers: {
    setConversationDrawerOpen: (state, action) => {
      state.conversationDrawerOpen = action.payload;
    },
  },
});

export const { setConversationDrawerOpen } = conversationDrawerSlice.actions;

// Exporting the reducer with default
export default conversationDrawerSlice.reducer;
