import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItem: localStorage.getItem("cartItem")
      ? JSON.parse(localStorage.getItem("cartItem"))
      : [],
  },
  reducers: {
    addToCart: (state, action) => {
      var product = { ...action.payload };
      var p = state.cartItem.find((item) => item.id === product.id);
      if (p) {
        p.orderCount = p.orderCount + 1;
      } else {
        product = { ...product, orderCount: 1 };
        state.cartItem.push(product);
      }
      localStorage.setItem("cartItem", JSON.stringify(state.cartItem));
    },
    removeToCart: (state, action) => {
      var product = { ...action.payload };
      var p = state.cartItem.find((item) => item.id === product.id);
      if (p.orderCount > 1) {
        p.orderCount = p.orderCount - 1;
      } else {
        state.cartItem.pop(p);
      }
      localStorage.setItem("cartItem", JSON.stringify(state.cartItem));
    },
    deleteToCart: (state, action) => {
      var product = { ...action.payload };
      var p = state.cartItem.find((item) => item.id === product.id);
      if (p) {
        state.cartItem.pop(p);
      }
      localStorage.setItem("cartItem", JSON.stringify(state.cartItem));
    },
  },
});

export const { addToCart, removeToCart, deleteToCart, checkout } =
  cartSlice.actions;
export default cartSlice;
