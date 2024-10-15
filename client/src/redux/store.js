import { configureStore } from '@reduxjs/toolkit';
import useReducer from './user/useSlice';

export const store = configureStore({
  reducer: {
    user : useReducer,
  },
  middleware: (getDefaultMiddleware) =>getDefaultMiddleware({
  serializableCheck : false,
})

})