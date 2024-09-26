import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Item } from "./itemsSlice";
import axios from "axios";
import { API_URL } from "@/constants";

export type CartItem = {
  product: Item;
  quantity: number;
};

type CartItemState = {
  cartItems: CartItem[];
  cartTotal: number;
};

const initialState: CartItemState = {
  cartItems: [],
  cartTotal: 0,
};

export const fetchCartItems = createAsyncThunk<
  CartItem[],
  undefined,
  { rejectValue: string }
>("cart/fetchCartItems", async function (_, { rejectWithValue }) {
  const cartResponse = await axios.get(`${API_URL}/cart`, {
    withCredentials: true,
  });
  if (!cartResponse) {
    return rejectWithValue("Network response was not ok");
  }
  const data = await cartResponse.data.data;
  console.log("data fetchCartItems: ", data);
  return data;
});

export const addCartItem = createAsyncThunk<
  CartItem,
  { id: Item["id"]; quantity: number },
  { rejectValue: string }
>("cart/addCartItem", async function ({ id, quantity }, { rejectWithValue }) {
  const cartItem = {
    data: [
      {
        id: id,
        quantity: quantity,
      },
    ],
  };
  const cartResponse = await axios.post(`${API_URL}/cart/update`, cartItem, {
    withCredentials: true,
  });
  if (!cartResponse) {
    return rejectWithValue("Network response was not ok");
  }
  const data = await cartResponse.data;
  console.log("data addCartItem: ", data);
  return data;
});

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    changeCartTotal(state, action: PayloadAction<CartItem[]>) {
      state.cartItems = action.payload;
      action.payload.forEach((item: CartItem) => {
        state.cartTotal += item.quantity * item.product.price;
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchCartItems.fulfilled,
      (state, action: PayloadAction<CartItem[]>) => {
        state.cartItems = action.payload;
      }
    );
    builder.addCase(
      addCartItem.fulfilled,
      (state, action: PayloadAction<CartItem>) => {
        state.cartItems.push(action.payload);
      }
    );
  },
});

export const { changeCartTotal } = cartSlice.actions;
export default cartSlice.reducer;
