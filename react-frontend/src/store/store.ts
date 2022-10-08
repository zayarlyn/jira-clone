import { configureStore } from '@reduxjs/toolkit';
import { api } from '../api/api';
import queryReducer from './slices/querySlice';

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    query: queryReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
