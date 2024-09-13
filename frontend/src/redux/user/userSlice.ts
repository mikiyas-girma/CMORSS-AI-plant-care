import { createSlice } from '@reduxjs/toolkit';

export interface UserState {
  currentUser: null | object;
  isAuthenticated: boolean;
  error: null | object | string;
  loading: boolean;
}

const initialState: UserState = {
  currentUser: null,
  isAuthenticated: true,
  error: null,
  loading: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    signInFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { signInStart, signInSuccess, signInFailure } = userSlice.actions;
export default userSlice.reducer;
