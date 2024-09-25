import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  loading: false,
  error: null,
};

const itemSlice = createSlice({
  name: "item",
  initialState,
  reducers: {
    fetchItems(state) {
      state.loading = true;
      state.error = null;
      state.items = [];
    },
    fetchItemsSuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.items = action.payload;
    },
    fetchItemsError(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.items = [];
    },
  },
});

export const { fetchItems, fetchItemsSuccess, fetchItemsError } =
  itemSlice.actions;
export default itemSlice.reducer;
