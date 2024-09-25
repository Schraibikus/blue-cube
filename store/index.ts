import { configureStore } from "@reduxjs/toolkit";
import pageReducer from "./pageSlice";

const store = configureStore({
  reducer: {
    page: pageReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
