import { configureStore, combineReducers } from "@reduxjs/toolkit";
import pageReducer from "./pageSlice";
import itemsReducer from "./itemsSlice";
import cartReducer from "./cartSlice";
import quantityReducer from "./quantitySlice";

const rootReducer = combineReducers({
  page: pageReducer,
  items: itemsReducer,
  cart: cartReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
