import { configureStore, combineReducers } from "@reduxjs/toolkit";
import pageReducer from "./pageSlice";
import itemsReducer from "./itemsSlice";

const rootReducer = combineReducers({
  page: pageReducer,
  items: itemsReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
