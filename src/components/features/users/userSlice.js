import { createSlice } from "@reduxjs/toolkit";
const userSlice = createSlice({
  name: "user",
  initialState: {
    userInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null,
    address: localStorage.getItem("userAddress")
      ? JSON.parse(localStorage.getItem("userAddress"))
      : null,
    paymentMethod: localStorage.getItem("paymentMethod"),
  },

  reducers: {
    userSignin: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(state.userInfo));
    },
    userLogout: (state, action) => {
      state.userInfo = null;
      state.address = null;
      localStorage.removeItem("userInfo");
      localStorage.removeItem("userAddress");
    },
    setUserAddress: (state, action) => {
      state.address = action.payload;
      localStorage.setItem("userAddress", JSON.stringify(state.address));
    },
    setPaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
      localStorage.setItem("paymentMethod", state.paymentMethod);
    },
    logout: (state, action) => {
      state.address = null;
      state.setPaymentMethod = "";
    },
  },
});

export const { setUserAddress, setPaymentMethod, logout } = userSlice.actions;

export default userSlice;
