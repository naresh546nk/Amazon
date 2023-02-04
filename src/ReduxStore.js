import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./components/features/cartSlice";
import userSlice from "./components/features/users/userSlice";

const ReduxStore = configureStore({
  reducer: {
    user: userSlice.reducer,
    cart: cartSlice.reducer,
  },
});

export default ReduxStore;
