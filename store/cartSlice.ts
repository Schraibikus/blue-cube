// import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// import { CartTotal, CartItemType } from "@/types";

// const initialState: CartTotal = {
//   items: [],
//   total: 0,
// };

// export const cartSlice = createSlice({
//   name: "cart",
//   initialState,
//   reducers: {
//     getCartItems(state, action: PayloadAction<any>) {
//       state.items = action.payload;
//       action.payload.forEach((item: CartItemType) => {
//         state.total += item.book.amount * item.qantity;
//       });
//     },
//     addCartItem(state, action: PayloadAction<any>) {
//       const LSstate = localStorage.getItem("persist:root");
//       const parsedLSstate = LSstate ? JSON.parse(LSstate) : {};
//       const curCart = JSON.parse(parsedLSstate.cart);
//       const itemInCart = curCart.items.find(
//         (item: CartItemType) => item.id === action.payload.id
//       );

//       if (!itemInCart) {
//         const item: CartItemType = {
//           id: action.payload.id,
//           book: {
//             imageUrl: action.payload.volumeInfo.imageLinks.thumbnail,
//             authors: action.payload.volumeInfo.authors,
//             title: action.payload.volumeInfo.title,
//             averageRating: action.payload.volumeInfo.averageRating,
//             ratingCount: action.payload.volumeInfo.ratingsCount,
//             amount: action.payload.saleInfo?.listPrice?.amount
//               ? action.payload.saleInfo.listPrice.amount
//               : 0,
//             currencyCode: action.payload.saleInfo?.listPrice?.currencyCode
//               ? action.payload.saleInfo.listPrice.currencyCode
//               : "",
//           },
//           qantity: 1,
//           delivery: "delivery",
//         };
//         curCart.items.push(item);
//       } else {
//         itemInCart.qantity++;
//       }
//       const newCart = JSON.stringify(curCart);
//       parsedLSstate.cart = newCart;
//       localStorage.setItem("persist:root", JSON.stringify(parsedLSstate));
//     },
//     changeQantity(state, action: PayloadAction<any>) {
//       const LSstate = localStorage.getItem("persist:root");
//       const parsedLSstate = LSstate ? JSON.parse(LSstate) : {};
//       const curCart = JSON.parse(parsedLSstate.cart);
//       const item = curCart.items.find(
//         (item: CartItemType) => item.id === action.payload[1]
//       );
//       const itemIndex = curCart.items.findIndex(
//         (item: CartItemType) => item.id === action.payload[1]
//       );
//       const stateItem = state.items.find(
//         (item: CartItemType) => item.id === action.payload[1]
//       );
//       const stateItemIndex = state.items.findIndex(
//         (item: CartItemType) => item.id === action.payload[1]
//       );
//       if (action.payload[0] === "minus") {
//         stateItem && stateItem.qantity--;
//         item.qantity--;
//         state.total -= item.book.amount;
//         if (item.qantity <= 0) {
//           item.qantity = 0;
//           stateItem && (stateItem.qantity = 0);
//           curCart.items.splice(itemIndex, 1);
//           state.items.splice(stateItemIndex, 1);
//         }
//       } else {
//         stateItem && stateItem.qantity++;
//         item.qantity++;
//         state.total += item.book.amount;
//       }
//       const newCart = JSON.stringify(curCart);
//       parsedLSstate.cart = newCart;
//       localStorage.setItem("persist:root", JSON.stringify(parsedLSstate));
//     },
//   },
// });

// export const { getCartItems, addCartItem, changeQantity } = cartSlice.actions;
// export default cartSlice.reducer;
