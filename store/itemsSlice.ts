import { createSlice } from "@reduxjs/toolkit";
import { ProductsItem } from "@/pages/products";

const initialState = {
  items: [] as ProductsItem[],
  loading: false,
  error: null,
};

const itemsSlice = createSlice({
  name: "items",
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
  itemsSlice.actions;
export default itemsSlice.reducer;
