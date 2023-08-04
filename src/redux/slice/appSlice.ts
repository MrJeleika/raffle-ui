import { IPoolUser } from '@/types/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

interface IInitialState {
  poolUsers: IPoolUser[];
  randomNum: bigint;
  totalPoolBalance: bigint;
}

const initialState: IInitialState = {
  poolUsers: [],
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setLessons: (state, action: PayloadAction<IPoolUser[]>) => {
      state.poolUsers = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(HYDRATE as any, (state: IInitialState, action) => {
      if (action.payload) {
        state.poolUsers = action.payload.app.poolUsers;
      }
    });
  },
});

export const { setLessons } = appSlice.actions;
export default appSlice.reducer;
