import { configureStore } from '@reduxjs/toolkit';
import appSlice from '../slice/appSlice';
import { createWrapper } from 'next-redux-wrapper';

export const store = configureStore({
  reducer: {
    app: appSlice,
  },
});

const makeStore = () => store;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppStore = ReturnType<typeof makeStore>;
export const wrapper = createWrapper(makeStore);
