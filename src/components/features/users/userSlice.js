import { createSlice } from "@reduxjs/toolkit";
const userSlice = createSlice({
  name: "user",
  initialState: {
    address: localStorage.getItem("userAddress")
      ? JSON.parse(localStorage.getItem("userAddress"))
      : null,
  },

  reducers: {
    setUserAddress: (state, action) => {
      state.address = action.payload;
    },
  },
});

export const { setUserAddress } = userSlice.actions;

export default userSlice;
