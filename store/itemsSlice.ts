import {
  Action,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import axios from "axios";

import { API_URL } from '@/constants'

export type Item = {
  id: string;
  category: string;
  title: string;
  description: string;
  picture: string;
  rating: number;
  price: number;
};

type ItemsState = {
  items: Item[];
  loading: boolean;
  error: string | null;
};

const initialState: ItemsState = {
  items: [],
  loading: false,
  error: null,
};

export const fetchItems = createAsyncThunk<
  Item[],
  number,
  { rejectValue: string }
>("items/fetchItems", async function (page, { rejectWithValue }) {
  const itemsResponse = await axios.get(
    `${API_URL}/products?page=${page}&limit=15`,
    {
      withCredentials: true,
    }
  );
  if (!itemsResponse) {
    return rejectWithValue("Network response was not ok");
  }
  const data = await itemsResponse.data.data;
  return data;
});

const itemsSlice = createSlice({
  name: "items",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchItems.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      fetchItems.fulfilled,
      (state, action: PayloadAction<Item[]>) => {
        state.loading = false;
        state.items = action.payload;
      }
    );
    builder.addMatcher(isError, (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    });
  },
});

export default itemsSlice.reducer;

function isError(action: Action) {
  return action.type.endsWith("rejected");
}
