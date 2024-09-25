import { createSlice } from "@reduxjs/toolkit";

type PageState = {
  page: number;
};

const initialState: PageState = {
  page: 1,
};

const pageSlice = createSlice({
  name: "page",
  initialState,
  reducers: {
    nextPage(state, action) {
      state.page += action.payload;
    },
    currentPage(state, action) {
      state.page = action.payload + 1;
    },
  },
});

export const { nextPage, currentPage } = pageSlice.actions;
export default pageSlice.reducer;
